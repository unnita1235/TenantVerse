# TenantVerse - Property Management SaaS

[![Status: Production Ready](https://img.shields.io/badge/status-production%20ready-success?style=flat-square)](https://github.com/unnita1235/TenantVerse)
[![Frontend: Live](https://img.shields.io/badge/frontend-live-blue?style=flat-square&logo=vercel)](https://tenant-verse-one.vercel.app)
[![Backend: Live](https://img.shields.io/badge/backend-live-success?style=flat-square&logo=render)](https://tenantverse.onrender.com/api/health)
[![TypeScript](https://img.shields.io/badge/typescript-5.3.3-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/license-MIT-green?style=flat-square)](LICENSE)
[![Node.js](https://img.shields.io/badge/node-18+-green?style=flat-square&logo=node.js)](https://nodejs.org/)

A full-stack property management platform built with modern web technologies. This project demonstrates real-world development with Next.js 15, Express.js, and MongoDB, including authentication, payment processing, and containerization.

**Live Demo:** [tenant-verse-one.vercel.app](https://tenant-verse-one.vercel.app)

---

## 📋 Table of Contents

- [What This Is](#what-this-is)
- - [Tech Stack](#tech-stack)
  - - [Core Features](#core-features)
    - - [Project Structure](#project-structure)
      - - [Getting Started](#getting-started)
        - - [Deployment](#deployment)
          - - [API Documentation](#api-documentation)
            - - [Database Schema](#database-schema)
              - - [What's NOT Here](#whats-not-here)
                - - [Contributing](#contributing)
                  - - [License](#license)
                   
                    - ---

                    ## What This Is

                    TenantVerse is a **functional property management application** designed for landlords and property managers. It's a real-world full-stack project showcasing:

                    - ✅ Production-grade code structure and best practices
                    - - ✅ Complete authentication system (JWT with refresh tokens)
                      - - ✅ Database integration with MongoDB Atlas
                        - - ✅ Containerized deployment with Docker
                          - - ✅ Automated CI/CD pipeline with GitHub Actions
                            - - ✅ Responsive UI with TypeScript and Tailwind CSS
                              - - ✅ RESTful API with comprehensive error handling
                                - - ✅ Payment integration with Stripe (basic implementation)
                                 
                                  - **Honest Assessment:** This is a learning/portfolio project built with production standards, not a battle-tested SaaS running at enterprise scale. It's suitable for demonstrating development skills and understanding full-stack architecture.
                                 
                                  - ---

                                  ## 🛠 Tech Stack

                                  ### Frontend
                                  - **Framework:** Next.js 15 (React 19)
                                  - - **Language:** TypeScript 5.3.3
                                    - - **Styling:** Tailwind CSS + PostCSS
                                      - - **State Management:** React Context API
                                        - - **HTTP Client:** Fetch API
                                          - - **Deployment:** Vercel
                                           
                                            - ### Backend
                                            - - **Runtime:** Node.js 18+
                                              - - **Framework:** Express.js
                                                - - **Language:** TypeScript
                                                  - - **Database:** MongoDB Atlas (Free tier)
                                                    - - **Authentication:** JWT (jsonwebtoken)
                                                      - - **Email:** Nodemailer (Gmail SMTP)
                                                        - - **Deployment:** Render.com
                                                         
                                                          - ### DevOps & Tools
                                                          - - **Containerization:** Docker & Docker Compose
                                                            - - **CI/CD:** GitHub Actions
                                                              - - **Code Quality:** ESLint, Prettier
                                                                - - **Package Manager:** npm
                                                                 
                                                                  - ---

                                                                  ## ✨ Core Features

                                                                  ### 1. Property Management
                                                                  - Create, read, update, delete properties
                                                                  - - Categorize by type (apartment, house, commercial)
                                                                    - - Track property details and maintenance history
                                                                      - - Photo/document storage support
                                                                       
                                                                        - ### 2. Tenant Management
                                                                        - - Add and manage tenants
                                                                          - - Track lease agreements and dates
                                                                            - - Record contact information
                                                                              - - Link tenants to specific properties
                                                                               
                                                                                - ### 3. Payment Processing
                                                                                - - Record rent payments
                                                                                  - - Payment status tracking
                                                                                    - - Payment history per tenant
                                                                                      - - Basic Stripe integration for demonstration
                                                                                       
                                                                                        - ### 4. Communication
                                                                                        - - In-app messaging between landlords and tenants
                                                                                          - - Email notifications via Nodemailer
                                                                                            - - Message history and search
                                                                                             
                                                                                              - ### 5. Authentication & Security
                                                                                              - - User registration and login with JWT
                                                                                                - - Password hashing with bcryptjs
                                                                                                  - - Refresh token mechanism
                                                                                                    - - Protected API endpoints
                                                                                                      - - Role-based access control (Admin/User)
                                                                                                       
                                                                                                        - ### 6. Responsive Design
                                                                                                        - - Mobile-first approach
                                                                                                          - - Works on desktop, tablet, and mobile
                                                                                                            - - Dark mode support
                                                                                                              - - Accessible UI components
                                                                                                               
                                                                                                                - ---
                                                                                                                
                                                                                                                ## 📁 Project Structure
                                                                                                                
                                                                                                                ```
                                                                                                                TenantVerse/
                                                                                                                ├── frontend/                 # Next.js 15 application
                                                                                                                │   ├── app/                 # App router structure
                                                                                                                │   │   ├── (auth)/         # Authentication pages
                                                                                                                │   │   ├── dashboard/      # Main dashboard
                                                                                                                │   │   ├── properties/     # Property management
                                                                                                                │   │   ├── tenants/        # Tenant management
                                                                                                                │   │   ├── messages/       # Messaging system
                                                                                                                │   │   └── settings/       # User settings
                                                                                                                │   ├── components/         # Reusable React components
                                                                                                                │   ├── lib/               # Utility functions
                                                                                                                │   ├── styles/            # Global CSS
                                                                                                                │   └── public/            # Static assets
                                                                                                                │
                                                                                                                ├── backend/                 # Express.js API
                                                                                                                │   ├── src/
                                                                                                                │   │   ├── controllers/   # Route handlers
                                                                                                                │   │   ├── models/       # Mongoose schemas
                                                                                                                │   │   ├── routes/       # API endpoints
                                                                                                                │   │   ├── middleware/   # Authentication, validation
                                                                                                                │   │   ├── utils/        # Helper functions
                                                                                                                │   │   └── server.ts     # Express app setup
                                                                                                                │   └── Dockerfile        # Container configuration
                                                                                                                │
                                                                                                                ├── docker-compose.yml      # Local development setup
                                                                                                                ├── Dockerfile             # Backend containerization
                                                                                                                ├── .env.example           # Environment variables template
                                                                                                                └── README.md              # This file
                                                                                                                ```
                                                                                                                
                                                                                                                ---
                                                                                                                
                                                                                                                ## 🚀 Getting Started
                                                                                                                
                                                                                                                ### Prerequisites
                                                                                                                - Node.js 18 or higher
                                                                                                                - - npm or yarn
                                                                                                                  - - MongoDB Atlas account (free tier available)
                                                                                                                    - - Git
                                                                                                                     
                                                                                                                      - ### 1. Clone the Repository
                                                                                                                     
                                                                                                                      - ```bash
                                                                                                                        git clone https://github.com/unnita1235/TenantVerse.git
                                                                                                                        cd TenantVerse
                                                                                                                        ```
                                                                                                                        
                                                                                                                        ### 2. Frontend Setup
                                                                                                                        
                                                                                                                        ```bash
                                                                                                                        cd frontend
                                                                                                                        npm install
                                                                                                                        ```
                                                                                                                        
                                                                                                                        Create `.env.local`:
                                                                                                                        ```
                                                                                                                        NEXT_PUBLIC_API_URL=http://localhost:5000/api
                                                                                                                        NEXT_PUBLIC_APP_NAME=TenantVerse
                                                                                                                        ```
                                                                                                                        
                                                                                                                        Run development server:
                                                                                                                        ```bash
                                                                                                                        npm run dev
                                                                                                                        ```
                                                                                                                        
                                                                                                                        Frontend runs on `http://localhost:3000`
                                                                                                                        
                                                                                                                        ### 3. Backend Setup
                                                                                                                        
                                                                                                                        ```bash
                                                                                                                        cd backend
                                                                                                                        npm install
                                                                                                                        ```
                                                                                                                        
                                                                                                                        Create `.env`:
                                                                                                                        ```
                                                                                                                        PORT=5000
                                                                                                                        MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/tenantverse
                                                                                                                        JWT_SECRET=your_secret_key_here
                                                                                                                        JWT_REFRESH_SECRET=your_refresh_secret_here
                                                                                                                        NODE_ENV=development
                                                                                                                        EMAIL_USER=your-email@gmail.com
                                                                                                                        EMAIL_PASSWORD=your-app-password
                                                                                                                        STRIPE_SECRET_KEY=your_stripe_key
                                                                                                                        ```
                                                                                                                        
                                                                                                                        Run the server:
                                                                                                                        ```bash
                                                                                                                        npm run dev
                                                                                                                        ```
                                                                                                                        
                                                                                                                        Backend runs on `http://localhost:5000`
                                                                                                                        
                                                                                                                        ### 4. Using Docker Compose (Optional)
                                                                                                                        
                                                                                                                        ```bash
                                                                                                                        docker-compose up
                                                                                                                        ```
                                                                                                                        
                                                                                                                        This starts both frontend and backend with all dependencies.
                                                                                                                        
                                                                                                                        ---
                                                                                                                        
                                                                                                                        ## 🌐 Deployment
                                                                                                                        
                                                                                                                        ### Frontend Deployment (Vercel)
                                                                                                                        
                                                                                                                        1. Push code to GitHub
                                                                                                                        2. 2. Connect repository to Vercel
                                                                                                                           3. 3. Set environment variables
                                                                                                                              4. 4. Deploy
                                                                                                                                
                                                                                                                                 5. **Live URL:** [tenant-verse-one.vercel.app](https://tenant-verse-one.vercel.app)
                                                                                                                                
                                                                                                                                 6. ### Backend Deployment (Render.com)
                                                                                                                                
                                                                                                                                 7. 1. Create new Web Service on Render
                                                                                                                                    2. 2. Connect GitHub repository
                                                                                                                                       3. 3. Set build command: `npm install && npm run build`
                                                                                                                                          4. 4. Set start command: `npm start`
                                                                                                                                             5. 5. Add environment variables in dashboard
                                                                                                                                                6. 6. Deploy
                                                                                                                                                  
                                                                                                                                                   7. **Live API:** [tenantverse.onrender.com/api/health](https://tenantverse.onrender.com/api/health)
                                                                                                                                                  
                                                                                                                                                   8. #### Database (MongoDB Atlas)
                                                                                                                                                  
                                                                                                                                                   9. - Create free tier cluster on MongoDB Atlas
                                                                                                                                                      - - Create database user with read/write permissions
                                                                                                                                                        - - Use connection string in `MONGODB_URI`
                                                                                                                                                         
                                                                                                                                                          - ---
                                                                                                                                                          
                                                                                                                                                          ## 📚 API Documentation
                                                                                                                                                          
                                                                                                                                                          ### Base URL
                                                                                                                                                          - **Production:** `https://tenantverse.onrender.com/api`
                                                                                                                                                          - - **Local:** `http://localhost:5000/api`
                                                                                                                                                           
                                                                                                                                                            - ### Authentication Endpoints
                                                                                                                                                            - - `POST /auth/register` - User registration
                                                                                                                                                              - - `POST /auth/login` - User login
                                                                                                                                                                - - `POST /auth/refresh` - Refresh access token
                                                                                                                                                                  - - `POST /auth/logout` - User logout
                                                                                                                                                                   
                                                                                                                                                                    - ### Property Endpoints
                                                                                                                                                                    - - `GET /properties` - List all properties
                                                                                                                                                                      - - `POST /properties` - Create property
                                                                                                                                                                        - - `GET /properties/:id` - Get property details
                                                                                                                                                                          - - `PUT /properties/:id` - Update property
                                                                                                                                                                            - - `DELETE /properties/:id` - Delete property
                                                                                                                                                                             
                                                                                                                                                                              - ### Tenant Endpoints
                                                                                                                                                                              - - `GET /tenants` - List all tenants
                                                                                                                                                                                - - `POST /tenants` - Add tenant
                                                                                                                                                                                  - - `GET /tenants/:id` - Get tenant details
                                                                                                                                                                                    - - `PUT /tenants/:id` - Update tenant
                                                                                                                                                                                      - - `DELETE /tenants/:id` - Delete tenant
                                                                                                                                                                                       
                                                                                                                                                                                        - ### Payment Endpoints
                                                                                                                                                                                        - - `GET /payments` - List payments
                                                                                                                                                                                          - - `POST /payments` - Record payment
                                                                                                                                                                                            - - `GET /payments/:id` - Payment details
                                                                                                                                                                                             
                                                                                                                                                                                              - ### Message Endpoints
                                                                                                                                                                                              - - `GET /messages` - Get messages
                                                                                                                                                                                                - - `POST /messages` - Send message
                                                                                                                                                                                                  - - `GET /conversations/:id` - Get conversation
                                                                                                                                                                                                   
                                                                                                                                                                                                    - Full API documentation available in `DEPLOYMENT.md`
                                                                                                                                                                                                   
                                                                                                                                                                                                    - ---
                                                                                                                                                                                                    
                                                                                                                                                                                                    ## 🗄 Database Schema
                                                                                                                                                                                                    
                                                                                                                                                                                                    ### Collections
                                                                                                                                                                                                    
                                                                                                                                                                                                    **Users**
                                                                                                                                                                                                    ```
                                                                                                                                                                                                    {
                                                                                                                                                                                                      _id: ObjectId
                                                                                                                                                                                                      name: String
                                                                                                                                                                                                      email: String (unique)
                                                                                                                                                                                                      password: String (hashed)
                                                                                                                                                                                                      phone: String
                                                                                                                                                                                                      role: Enum [admin, user]
                                                                                                                                                                                                      createdAt: Date
                                                                                                                                                                                                    }
                                                                                                                                                                                                    ```
                                                                                                                                                                                                    
                                                                                                                                                                                                    **Properties**
                                                                                                                                                                                                    ```
                                                                                                                                                                                                    {
                                                                                                                                                                                                      _id: ObjectId
                                                                                                                                                                                                      owner: ObjectId (ref: User)
                                                                                                                                                                                                      address: String
                                                                                                                                                                                                      type: Enum [apartment, house, commercial]
                                                                                                                                                                                                      bedrooms: Number
                                                                                                                                                                                                      bathrooms: Number
                                                                                                                                                                                                      rentAmount: Number
                                                                                                                                                                                                      description: String
                                                                                                                                                                                                      photos: [String]
                                                                                                                                                                                                      createdAt: Date
                                                                                                                                                                                                    }
                                                                                                                                                                                                    ```
                                                                                                                                                                                                    
                                                                                                                                                                                                    **Tenants**
                                                                                                                                                                                                    ```
                                                                                                                                                                                                    {
                                                                                                                                                                                                      _id: ObjectId
                                                                                                                                                                                                      owner: ObjectId (ref: User)
                                                                                                                                                                                                      property: ObjectId (ref: Property)
                                                                                                                                                                                                      name: String
                                                                                                                                                                                                      email: String
                                                                                                                                                                                                      phone: String
                                                                                                                                                                                                      leaseStart: Date
                                                                                                                                                                                                      leaseEnd: Date
                                                                                                                                                                                                      status: Enum [active, inactive]
                                                                                                                                                                                                      createdAt: Date
                                                                                                                                                                                                    }
                                                                                                                                                                                                    ```
                                                                                                                                                                                                    
                                                                                                                                                                                                    **Payments**
                                                                                                                                                                                                    ```
                                                                                                                                                                                                    {
                                                                                                                                                                                                      _id: ObjectId
                                                                                                                                                                                                      tenant: ObjectId (ref: Tenant)
                                                                                                                                                                                                      property: ObjectId (ref: Property)
                                                                                                                                                                                                      amount: Number
                                                                                                                                                                                                      month: String
                                                                                                                                                                                                      status: Enum [pending, paid]
                                                                                                                                                                                                      paidOn: Date
                                                                                                                                                                                                      createdAt: Date
                                                                                                                                                                                                    }
                                                                                                                                                                                                    ```
                                                                                                                                                                                                    
                                                                                                                                                                                                    **Messages**
                                                                                                                                                                                                    ```
                                                                                                                                                                                                    {
                                                                                                                                                                                                      _id: ObjectId
                                                                                                                                                                                                      sender: ObjectId (ref: User)
                                                                                                                                                                                                      recipient: ObjectId (ref: User)
                                                                                                                                                                                                      subject: String
                                                                                                                                                                                                      content: String
                                                                                                                                                                                                      read: Boolean
                                                                                                                                                                                                      createdAt: Date
                                                                                                                                                                                                    }
                                                                                                                                                                                                    ```
                                                                                                                                                                                                    
                                                                                                                                                                                                    ---
                                                                                                                                                                                                    
                                                                                                                                                                                                    ## ⚠️ What's NOT Here
                                                                                                                                                                                                    
                                                                                                                                                                                                    ### Features We Didn't Build
                                                                                                                                                                                                    - **Automated Rent Reminders:** No cron job scheduled emails
                                                                                                                                                                                                    - - **Advanced Analytics:** No data visualization or reporting
                                                                                                                                                                                                      - - **Maintenance Ticketing System:** No work order tracking
                                                                                                                                                                                                        - - **Document Management:** No PDF generation or archiving
                                                                                                                                                                                                          - - **Video Calls:** No integration with video conferencing
                                                                                                                                                                                                            - - **SMS Notifications:** Only email, no SMS gateway
                                                                                                                                                                                                              - - **Advanced Permissions:** Basic role system only
                                                                                                                                                                                                                - - **File Upload Storage:** Photos stored as URLs, not S3/cloud storage
                                                                                                                                                                                                                  - - **Payment Gateway Integration:** Stripe integration is basic demo only
                                                                                                                                                                                                                    - - **Multi-tenant SaaS:** Single-user per instance deployment
                                                                                                                                                                                                                      - - **Real-time Updates:** No WebSocket/Socket.io implementation
                                                                                                                                                                                                                        - - **Geolocation Features:** No maps or location-based search
                                                                                                                                                                                                                         
                                                                                                                                                                                                                          - ### Why
                                                                                                                                                                                                                          - This is a portfolio project optimized for learning and demonstrating core full-stack development skills. Production features require additional infrastructure, compliance considerations, and complex state management.
                                                                                                                                                                                                                         
                                                                                                                                                                                                                          - ---
                                                                                                                                                                                                                          
                                                                                                                                                                                                                          ## 🔧 Environment Variables
                                                                                                                                                                                                                          
                                                                                                                                                                                                                          ### Frontend (.env.local)
                                                                                                                                                                                                                          ```
                                                                                                                                                                                                                          NEXT_PUBLIC_API_URL=http://localhost:5000/api
                                                                                                                                                                                                                          NEXT_PUBLIC_APP_NAME=TenantVerse
                                                                                                                                                                                                                          ```
                                                                                                                                                                                                                          
                                                                                                                                                                                                                          ### Backend (.env)
                                                                                                                                                                                                                          ```
                                                                                                                                                                                                                          PORT=5000
                                                                                                                                                                                                                          MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
                                                                                                                                                                                                                          JWT_SECRET=your_secret_key
                                                                                                                                                                                                                          JWT_REFRESH_SECRET=your_refresh_secret
                                                                                                                                                                                                                          NODE_ENV=development
                                                                                                                                                                                                                          EMAIL_USER=your-email@gmail.com
                                                                                                                                                                                                                          EMAIL_PASSWORD=app-password
                                                                                                                                                                                                                          STRIPE_SECRET_KEY=sk_test_xxxx
                                                                                                                                                                                                                          STRIPE_PUBLIC_KEY=pk_test_xxxx
                                                                                                                                                                                                                          ```
                                                                                                                                                                                                                          
                                                                                                                                                                                                                          ---
                                                                                                                                                                                                                          
                                                                                                                                                                                                                          ## 📦 Docker Deployment
                                                                                                                                                                                                                          
                                                                                                                                                                                                                          ### Build Docker Image
                                                                                                                                                                                                                          ```bash
                                                                                                                                                                                                                          docker build -t tenantverse-backend .
                                                                                                                                                                                                                          ```
                                                                                                                                                                                                                          
                                                                                                                                                                                                                          ### Run Docker Container
                                                                                                                                                                                                                          ```bash
                                                                                                                                                                                                                          docker run -p 5000:5000 \
                                                                                                                                                                                                                            -e MONGODB_URI=your_uri \
                                                                                                                                                                                                                            -e JWT_SECRET=your_secret \
                                                                                                                                                                                                                            tenantverse-backend
                                                                                                                                                                                                                          ```
                                                                                                                                                                                                                          
                                                                                                                                                                                                                          ### Docker Compose (Development)
                                                                                                                                                                                                                          ```bash
                                                                                                                                                                                                                          docker-compose up
                                                                                                                                                                                                                          ```
                                                                                                                                                                                                                          
                                                                                                                                                                                                                          ---
                                                                                                                                                                                                                          
                                                                                                                                                                                                                          ## 🤝 Contributing
                                                                                                                                                                                                                          
                                                                                                                                                                                                                          Contributions are welcome! To contribute:
                                                                                                                                                                                                                          
                                                                                                                                                                                                                          1. Fork the repository
                                                                                                                                                                                                                          2. 2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
                                                                                                                                                                                                                             3. 3. Commit changes (`git commit -m 'Add AmazingFeature'`)
                                                                                                                                                                                                                                4. 4. Push to branch (`git push origin feature/AmazingFeature`)
                                                                                                                                                                                                                                   5. 5. Open a Pull Request
                                                                                                                                                                                                                                     
                                                                                                                                                                                                                                      6. ### Code Guidelines
                                                                                                                                                                                                                                      7. - Follow ESLint configuration
                                                                                                                                                                                                                                         - - Use TypeScript for all new code
                                                                                                                                                                                                                                           - - Write meaningful commit messages
                                                                                                                                                                                                                                             - - Test your changes locally
                                                                                                                                                                                                                                               - - Update documentation as needed
                                                                                                                                                                                                                                                
                                                                                                                                                                                                                                                 - ---
                                                                                                                                                                                                                                                 
                                                                                                                                                                                                                                                 ## 📄 License
                                                                                                                                                                                                                                                 
                                                                                                                                                                                                                                                 This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
                                                                                                                                                                                                                                                 
                                                                                                                                                                                                                                                 ---
                                                                                                                                                                                                                                                 
                                                                                                                                                                                                                                                 ## 🙏 Acknowledgments
                                                                                                                                                                                                                                                 
                                                                                                                                                                                                                                                 - Next.js and Vercel team
                                                                                                                                                                                                                                                 - - Express.js community
                                                                                                                                                                                                                                                   - - MongoDB documentation
                                                                                                                                                                                                                                                     - - TypeScript contributors
                                                                                                                                                                                                                                                       - - Open-source community
                                                                                                                                                                                                                                                        
                                                                                                                                                                                                                                                         - ---
                                                                                                                                                                                                                                                         
                                                                                                                                                                                                                                                         ## 📞 Contact & Support
                                                                                                                                                                                                                                                         
                                                                                                                                                                                                                                                         - **GitHub Issues:** [Report bugs or request features](https://github.com/unnita1235/TenantVerse/issues)
                                                                                                                                                                                                                                                         - - **Email:** unnita1235@gmail.com
                                                                                                                                                                                                                                                           - - **Live Demo:** [tenant-verse-one.vercel.app](https://tenant-verse-one.vercel.app)
                                                                                                                                                                                                                                                            
                                                                                                                                                                                                                                                             - ---
                                                                                                                                                                                                                                                             
                                                                                                                                                                                                                                                             **Last Updated:** January 7, 2026
                                                                                                                                                                                                                                                             
                                                                                                                                                                                                                                                             **Current Status:**
                                                                                                                                                                                                                                                             - ✅ Frontend: Live on Vercel
                                                                                                                                                                                                                                                             - - ✅ Backend: Live on Render.com
                                                                                                                                                                                                                                                               - - ✅ Database: Connected to MongoDB Atlas
                                                                                                                                                                                                                                                                 - - ✅ Authentication: Fully functional
                                                                                                                                                                                                                                                                   - - ✅ Deployment: Automated via GitHub Actions
                                                                                                                                                                                                                                                                     - 
