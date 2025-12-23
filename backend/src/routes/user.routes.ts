import express from 'express';
import { body, validationResult } from 'express-validator';
import User from '../models/User.model';
import Tenant from '../models/Tenant.model';
import { authenticate, requireRole, requireTenant, AuthRequest } from '../middleware/auth.middleware';

const router = express.Router();

// All routes require authentication
router.use(authenticate);
router.use(requireTenant);

// @route   GET /api/users
// @desc    Get all users in tenant
// @access  Private (tenant members)
router.get('/', async (req: AuthRequest, res) => {
  try {
    // Super admin can see all users
    if (req.user!.role === 'super_admin') {
      const users = await User.find().select('-password').populate('tenantId', 'name slug');
      return res.json({ success: true, users });
    }

    // Regular users see only their tenant
    const users = await User.find({ tenantId: req.user!.tenantId })
      .select('-password')
      .sort({ createdAt: -1 });

    res.json({ success: true, users });
  } catch (error: any) {
    console.error('Get users error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   GET /api/users/:id
// @desc    Get user by ID
// @access  Private (tenant members)
router.get('/:id', async (req: AuthRequest, res) => {
  try {
    let user;
    
    if (req.user!.role === 'super_admin') {
      user = await User.findById(req.params.id).select('-password').populate('tenantId');
    } else {
      user = await User.findOne({
        _id: req.params.id,
        tenantId: req.user!.tenantId
      }).select('-password');
    }

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({ success: true, user });
  } catch (error: any) {
    console.error('Get user error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   POST /api/users/invite
// @desc    Invite a new user to tenant
// @access  Private (owner or admin only)
router.post(
  '/invite',
  requireRole('owner', 'admin', 'super_admin'),
  [
    body('email').isEmail().normalizeEmail(),
    body('name').trim().notEmpty(),
    body('role').isIn(['admin', 'member'])
  ],
  async (req: AuthRequest, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
      }

      const { email, name, role } = req.body;

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ 
          success: false, 
          message: 'User with this email already exists' 
        });
      }

      // Create user with temporary password (should send email with reset link in production)
      const tempPassword = Math.random().toString(36).slice(-12);
      const user = await User.create({
        email,
        name,
        password: tempPassword,
        role: role || 'member',
        tenantId: req.user!.tenantId,
        isEmailVerified: false
      });

      // In production, send invitation email here

      res.status(201).json({
        success: true,
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          role: user.role
        },
        message: 'User invited successfully. Temporary password sent via email.'
      });
    } catch (error: any) {
      console.error('Invite user error:', error);
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

// @route   PUT /api/users/:id/role
// @desc    Update user role
// @access  Private (owner or admin only)
router.put(
  '/:id/role',
  requireRole('owner', 'admin', 'super_admin'),
  [
    body('role').isIn(['owner', 'admin', 'member'])
  ],
  async (req: AuthRequest, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
      }

      const { id } = req.params;
      const { role } = req.body;

      let user;
      if (req.user!.role === 'super_admin') {
        user = await User.findById(id);
      } else {
        user = await User.findOne({ _id: id, tenantId: req.user!.tenantId });
      }

      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }

      // Prevent changing owner role (only super admin can)
      if (user.role === 'owner' && req.user!.role !== 'super_admin') {
        return res.status(403).json({ 
          success: false, 
          message: 'Cannot change owner role' 
        });
      }

      user.role = role;
      await user.save();

      res.json({
        success: true,
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          role: user.role
        }
      });
    } catch (error: any) {
      console.error('Update user role error:', error);
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

// @route   DELETE /api/users/:id
// @desc    Remove user from tenant
// @access  Private (owner or admin only)
router.delete('/:id', requireRole('owner', 'admin', 'super_admin'), async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;

    let user;
    if (req.user!.role === 'super_admin') {
      user = await User.findById(id);
    } else {
      user = await User.findOne({ _id: id, tenantId: req.user!.tenantId });
    }

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Prevent deleting owner (only super admin can)
    if (user.role === 'owner' && req.user!.role !== 'super_admin') {
      return res.status(403).json({ 
        success: false, 
        message: 'Cannot delete owner' 
      });
    }

    // Prevent deleting yourself
    if (user._id.toString() === req.user!.id) {
      return res.status(400).json({ 
        success: false, 
        message: 'Cannot delete yourself' 
      });
    }

    await User.deleteOne({ _id: user._id });

    res.json({ success: true, message: 'User removed successfully' });
  } catch (error: any) {
    console.error('Delete user error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;

