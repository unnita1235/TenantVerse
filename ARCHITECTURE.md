# TenantVerse Architecture

## System Overview

TenantVerse is a multi-tenant SaaS platform built with a modern full-stack architecture.

## Architecture Decisions

### Backend: Node.js + Express
- **Why**: Fast development, large ecosystem, TypeScript support
- **Alternative considered**: NestJS (chose Express for simplicity)

### Database: MongoDB
- **Why**: Flexible schema for multi-tenant data, easy horizontal scaling
- **Schema**: Mongoose ODM for type safety

### Authentication: JWT
- **Why**: Stateless, scalable, works well with microservices
- **Implementation**: Token stored in localStorage + cookie for middleware

### Payment: Stripe
- **Why**: Industry standard, robust webhook system, excellent documentation
- **Implementation**: Checkout sessions + webhooks for subscription management

## Database Schema

### Users Collection
```typescript
{
  email: string (unique, indexed)
  password: string (hashed with bcrypt)
  name: string
  role: 'super_admin' | 'owner' | 'admin' | 'member'
  tenantId: ObjectId (ref: Tenant, required unless super_admin)
  isEmailVerified: boolean
  createdAt: Date
  updatedAt: Date
}
```

### Tenants Collection
```typescript
{
  name: string
  slug: string (unique, indexed)
  ownerId: ObjectId (ref: User)
  subscriptionStatus: 'trial' | 'active' | 'expired' | 'cancelled'
  subscriptionPlan: 'free' | 'starter' | 'pro' | 'enterprise'
  subscriptionStartDate: Date
  subscriptionEndDate: Date
  stripeCustomerId: string
  stripeSubscriptionId: string
  createdAt: Date
  updatedAt: Date
}
```

### Subscriptions Collection
```typescript
{
  tenantId: ObjectId (ref: Tenant, unique)
  stripeSubscriptionId: string (unique)
  stripeCustomerId: string
  plan: 'starter' | 'pro' | 'enterprise'
  status: 'active' | 'canceled' | 'past_due' | 'trialing'
  currentPeriodStart: Date
  currentPeriodEnd: Date
  cancelAtPeriodEnd: boolean
  createdAt: Date
  updatedAt: Date
}
```

## API Structure

### Authentication Flow
1. User registers → Creates tenant + owner user
2. User logs in → Receives JWT token
3. Token sent in Authorization header for protected routes
4. Middleware validates token and extracts user context

### Tenant Isolation
- All queries filtered by `tenantId`
- Super admin can access all tenants
- Regular users can only access their tenant's data

### Role-Based Access Control
- **Super Admin**: Full platform access
- **Owner**: Full tenant control
- **Admin**: Can manage users, settings
- **Member**: Read-only access

## Security Features

1. **Password Hashing**: bcrypt with salt rounds
2. **JWT Tokens**: Signed with secret, expires after 7 days
3. **Input Validation**: express-validator on all endpoints
4. **CORS**: Configured for frontend origin only
5. **Tenant Isolation**: Database-level filtering
6. **Role Enforcement**: Middleware checks on protected routes

## Frontend Architecture

### Routing
- Next.js App Router
- Dynamic routes: `/t/[tenant]/*`
- Middleware for route protection

### State Management
- React hooks for local state
- API client for server communication
- Token stored in localStorage + cookies

### Component Structure
- UI components in `/components/ui`
- Page components in `/app`
- Reusable business components in `/app/t/[tenant]/components`

## Deployment Considerations

### Backend
- Environment variables for all secrets
- MongoDB connection pooling
- Error logging and monitoring
- Rate limiting (to be added)

### Frontend
- Static generation where possible
- API route proxying for CORS
- Environment-based configuration

## Scalability

### Current Limitations
- Single MongoDB instance
- No caching layer
- No CDN for static assets

### Future Improvements
- Redis for session/token caching
- MongoDB replica sets
- CDN for frontend assets
- Load balancing for API
- Database sharding by tenant

## Monitoring & Logging

### Current
- Console logging
- Error middleware

### Recommended Additions
- Structured logging (Winston/Pino)
- Error tracking (Sentry)
- Performance monitoring (New Relic)
- Analytics (PostHog/Mixpanel)

