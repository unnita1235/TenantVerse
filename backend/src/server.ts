import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.routes';
import tenantRoutes from './routes/tenant.routes';
import userRoutes from './routes/user.routes';
import subscriptionRoutes from './routes/subscription.routes';
import dashboardRoutes from './routes/dashboard.routes';
import adminRoutes from './routes/admin.routes';
import { errorHandler } from './middleware/error.middleware';
import { logger } from './utils/logger';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security: Validate required environment variables
const requiredEnvVars = ['JWT_SECRET'];
const missingVars = requiredEnvVars.filter((varName) => !process.env[varName]);
if (missingVars.length > 0) {
      logger.error('Missing required environment variables:', new Error(missingVars.join(', ')));
      process.exit(1);
}

// Middleware
const allowedOrigins = process.env.FRONTEND_URL
  ? process.env.FRONTEND_URL.split(',').map((url) => url.trim())
      : ['http://localhost:9002'];

app.use(
      cors({
              origin: (origin, callback) => {
                        // Allow requests with no origin (mobile apps, curl, etc.)
                        if (!origin) return callback(null, true);

                        if (allowedOrigins.includes(origin) || process.env.NODE_ENV === 'development') {
                                    callback(null, true);
                        } else {
                                    callback(new Error('Not allowed by CORS'));
                        }
              },
              credentials: true,
              optionsSuccessStatus: 200,
      }),
    );

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get('/api/health', (req, res) => {
      res.json({
              status: 'ok',
              timestamp: new Date().toISOString(),
              uptime: process.uptime(),
              environment: process.env.NODE_ENV || 'development',
      });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tenants', tenantRoutes);
app.use('/api/users', userRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/admin', adminRoutes);

// 404 handler
app.use((req, res) => {
      res.status(404).json({
              success: false,
              message: 'Route not found',
      });
});

// Error handling middleware (must be last)
app.use(errorHandler);

// Connect to MongoDB - graceful fallback for development
const connectDB = async () => {
      let mongoUri = process.env.MONGODB_URI;

      const tryConnect = async (uri: string) => {
              try {
                        await mongoose.connect(uri, {
                                    serverSelectionTimeoutMS: 5000,
                        });
                        logger.info(`Connected to MongoDB at ${uri}`);
                        return true;
              } catch (error) {
                        logger.warn(`Failed to connect to MongoDB at ${uri}`, error);
                        return false;
              }
      };

      // 1. Try configured URI
      if (mongoUri && mongoUri !== 'mongodb+srv://<db_username>:<db_password>@cluster0.xxxxx.mongodb.net/tenantverse?retryWrites=true&w=majority') {
              const success = await tryConnect(mongoUri);
              if (success) return;
      }

      // 2. Fallback to Memory Server (skip on Alpine Linux)
      const isAlpine = process.platform === 'linux';

      if (isAlpine && !mongoUri) {
              logger.warn('Running on Alpine Linux without valid MONGODB_URI');
              logger.warn('In-memory MongoDB is not supported on Alpine Linux');
              logger.warn('Starting without database - API will be available but database operations will fail');
              logger.warn('Please configure MONGODB_URI environment variable for production use');
              return; // Allow the app to continue without MongoDB for now
      }

      try {
              if (!isAlpine) {
                        logger.info('Attempting to start in-memory MongoDB server...');
                        const { MongoMemoryServer } = await import('mongodb-memory-server');
                        const mongod = await MongoMemoryServer.create();
                        mongoUri = mongod.getUri();

                        logger.info(`Started in-memory MongoDB at ${mongoUri}`);

                        await mongoose.connect(mongoUri);
                        logger.info('Connected to in-memory MongoDB');
              }
      } catch (error) {
              logger.warn('Failed to start in-memory MongoDB', error);
              logger.warn('Starting without database - some features will not work');
              // Don't exit, allow app to run without database
      }
};

connectDB().then(() => {
      app.listen(PORT, () => {
              logger.info(`Server running on port ${PORT}`, { environment: process.env.NODE_ENV });
              logger.info(`Health check available at http://localhost:${PORT}/api/health`);
      });
}).catch((error) => {
      logger.error('Fatal error during startup', error);
      process.exit(1);
});

export default app;
