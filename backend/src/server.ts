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
// Note: MONGODB_URI is optional because server has in-memory fallback
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

// Connect to MongoDB with Fallback to Memory Server
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
    if (mongoUri) {
          const success = await tryConnect(mongoUri);
          if (success) return;
    }

    // 2. Fallback to Memory Server (skip on Alpine Linux)
    const isAlpine = process.env.DOCKER_IMAGE_OS === 'alpine' || process.platform === 'linux';

    if (isAlpine && !mongoUri) {
          logger.error('Running on Alpine Linux without MONGODB_URI. Please configure MONGODB_URI environment variable.');
          logger.error('In-memory MongoDB is not supported on Alpine Linux.');
          process.exit(1);
    }

    try {
          logger.info('Attempting to start in-memory MongoDB server...');
          // Dynamic import to avoid issues if dev dependency is missing in prod
          const { MongoMemoryServer } = await import('mongodb-memory-server');
          const mongod = await MongoMemoryServer.create();
          mongoUri = mongod.getUri();

          logger.info(`Started in-memory MongoDB at ${mongoUri}`);

          await mongoose.connect(mongoUri);
          logger.info('Connected to in-memory MongoDB');
    } catch (error) {
          logger.error('Failed to start in-memory MongoDB', error);
          process.exit(1);
    }

    // Auto-seed if in-memory or empty
    try {
          // Import models dynamically to ensure connection is established first if needed,
          // but we have them imported at top.
          // We check if we need to seed
          const { default: User } = await import('./models/User.model');
          const userCount = await User.countDocuments();

          if (userCount === 0) {
                  logger.info('Database is empty. Seeding data...');

                  // Import seed logic (inline here to avoid circular dependencies or script issues)
                  const { default: Tenant } = await import('./models/Tenant.model');

                  // Create super admin
                  await User.create({
                            email: 'admin@tenantverse.com',
                            password: 'admin123',
                            name: 'Super Admin',
                            role: 'super_admin',
                            isEmailVerified: true,
                  });

                  // Create demo tenants
                  const tenants = [
                    { name: 'Acme Inc.', slug: 'acme', subscriptionStatus: 'active', subscriptionPlan: 'pro' },
                    {
                                name: 'Stark Industries',
                                slug: 'stark',
                                subscriptionStatus: 'active',
                                subscriptionPlan: 'enterprise',
                    },
                          ];

                  for (const tenantData of tenants) {
                            const tenantId = new mongoose.Types.ObjectId();

                            const owner = await User.create({
                                        email: `owner@${tenantData.slug}.com`,
                                        password: 'password123',
                                        name: `${tenantData.name} Owner`,
                                        role: 'owner',
                                        tenantId: tenantId,
                                        isEmailVerified: true,
                            });

                            const tenant = await Tenant.create({
                                        _id: tenantId,
                                        ...tenantData,
                                        ownerId: owner._id,
                            });

                            // no need to update owner.tenantId as it is already set

                            // Add a member
                            await User.create({
                                        email: `member@${tenantData.slug}.com`,
                                        password: 'password123',
                                        name: 'Team Member',
                                        role: 'member',
                                        tenantId: tenant._id,
                                        isEmailVerified: true,
                            });
                  }

                  logger.info('✅ Database seeded with demo data');
                  console.log('\n✅ Database seeded with demo data');
                  console.log('Super Admin: admin@tenantverse.com / admin123');
                  console.log('Tenant Owner: owner@acme.com / password123');
          }
    } catch (error) {
          logger.error('Error seeding data', error);
    }
};

connectDB().then(() => {
    app.listen(PORT, () => {
          logger.info(`Server running on port ${PORT}`, { environment: process.env.NODE_ENV });
    });
});

export default app;
