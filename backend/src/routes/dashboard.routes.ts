import express from 'express';
import User from '../models/User.model';
import Tenant from '../models/Tenant.model';
import { authenticate, requireTenant, AuthRequest } from '../middleware/auth.middleware';
import { asyncHandler } from '../middleware/error.middleware';
import { NotFoundError, ValidationError } from '../utils/errors';
import { logger } from '../utils/logger';

const router = express.Router();

// All routes require authentication
router.use(authenticate);
router.use(requireTenant);

// @route   GET /api/dashboard/stats
// @desc    Get dashboard statistics
// @access  Private
router.get('/stats', asyncHandler(async (req: AuthRequest, res) => {
  const tenantId = req.user!.tenantId;

  if (!tenantId) {
    throw new ValidationError('Tenant ID required');
  }

  // Get tenant info
  const tenant = await Tenant.findById(tenantId);
  if (!tenant) {
    throw new NotFoundError('Tenant');
  }

  // Get user count
  const userCount = await User.countDocuments({ tenantId });

  // Calculate revenue based on subscription plan
  // Note: In a production system, this would be calculated from actual payment records
  const planRevenueMap: { [key: string]: number } = {
    pro: 79,
    starter: 29,
    enterprise: 500,
    free: 0
  };
  const revenue = planRevenueMap[tenant.subscriptionPlan] || 0;

  // Activity chart data - placeholder structure
  // In production, this would be generated from actual activity logs
  const chartData = [
    { month: 'January', desktop: 186, mobile: 80 },
    { month: 'February', desktop: 305, mobile: 200 },
    { month: 'March', desktop: 237, mobile: 120 },
    { month: 'April', desktop: 73, mobile: 190 },
    { month: 'May', desktop: 209, mobile: 130 },
    { month: 'June', desktop: 214, mobile: 140 },
  ];

  // Get recent signups (last 5 users)
  const recentUsers = await User.find({ tenantId })
    .select('-password')
    .sort({ createdAt: -1 })
    .limit(5)
    .lean();

  const recentSignups = recentUsers.map(user => ({
    name: user.name,
    email: user.email,
    date: user.createdAt
  }));

  res.json({
    success: true,
    stats: {
      totalRevenue: revenue,
      activeUsers: userCount,
      projects: 12, // Placeholder - would be calculated from actual project count
      subscription: tenant.subscriptionPlan.charAt(0).toUpperCase() + tenant.subscriptionPlan.slice(1) + ' Plan'
    },
    chartData,
    recentSignups
  });
}));

export default router;

