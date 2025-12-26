import express, { Response } from 'express';
import { body, validationResult } from 'express-validator';
import Tenant from '../models/Tenant.model';
import {
  authenticate,
  requireRole,
  requireTenant,
  AuthRequest,
} from '../middleware/auth.middleware';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// @route   GET /api/tenants/:slug
// @desc    Get tenant by slug
// @access  Private (tenant members or super admin)
router.get('/:slug', requireTenant, async (req: AuthRequest, res) => {
  try {
    const { slug } = req.params;

    // Super admin can access any tenant
    if (req.user!.role === 'super_admin') {
      const tenant = await Tenant.findOne({ slug }).populate('ownerId', 'name email');
      if (!tenant) {
        return res.status(404).json({ success: false, message: 'Tenant not found' });
      }
      return res.json({ success: true, tenant });
    }

    // Regular users can only access their own tenant
    const tenant = await Tenant.findOne({
      slug,
      _id: req.user!.tenantId,
    }).populate('ownerId', 'name email');

    if (!tenant) {
      return res.status(404).json({ success: false, message: 'Tenant not found' });
    }

    res.json({ success: true, tenant });
  } catch (error: any) {
    console.error('Get tenant error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   PUT /api/tenants/:slug
// @desc    Update tenant
// @access  Private (owner or admin only)
router.put(
  '/:slug',
  requireTenant,
  requireRole('owner', 'admin', 'super_admin'),
  [body('name').optional().trim().notEmpty()],
  async (req: AuthRequest, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
      }

      const { slug } = req.params;
      const { name } = req.body;

      let tenant;
      if (req.user!.role === 'super_admin') {
        tenant = await Tenant.findOne({ slug });
      } else {
        tenant = await Tenant.findOne({ slug, _id: req.user!.tenantId });
      }

      if (!tenant) {
        return res.status(404).json({ success: false, message: 'Tenant not found' });
      }

      if (name) {
        tenant.name = name;
      }

      await tenant.save();

      res.json({ success: true, tenant });
    } catch (error: any) {
      console.error('Update tenant error:', error);
      res.status(500).json({ success: false, message: error.message });
    }
  },
);

// @route   DELETE /api/tenants/:slug
// @desc    Delete tenant
// @access  Private (owner or super admin only)
router.delete(
  '/:slug',
  authenticate,
  requireRole('owner', 'super_admin'),
  async (req: AuthRequest, res) => {
    try {
      const { slug } = req.params;

      let tenant;
      if (req.user!.role === 'super_admin') {
        tenant = await Tenant.findOne({ slug });
      } else {
        tenant = await Tenant.findOne({ slug, ownerId: req.user!.id });
      }

      if (!tenant) {
        return res.status(404).json({ success: false, message: 'Tenant not found' });
      }

      await Tenant.deleteOne({ _id: tenant._id });

      res.json({ success: true, message: 'Tenant deleted successfully' });
    } catch (error: any) {
      console.error('Delete tenant error:', error);
      res.status(500).json({ success: false, message: error.message });
    }
  },
);

export default router;
