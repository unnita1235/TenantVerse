import express from "express";
import Tenant from "../models/Tenant.model";
import User from "../models/User.model";
import {
  authenticate,
  requireRole,
  AuthRequest,
} from "../middleware/auth.middleware";

const router = express.Router();

// All routes require super admin
router.use(authenticate);
router.use(requireRole("super_admin"));

// @route   GET /api/admin/tenants
// @desc    Get all tenants
// @access  Private (super admin only)
router.get("/tenants", async (req, res) => {
  try {
    const tenants = await Tenant.find()
      .populate("ownerId", "name email")
      .sort({ createdAt: -1 });

    const tenantsWithStats = await Promise.all(
      tenants.map(async (tenant) => {
        const userCount = await User.countDocuments({ tenantId: tenant._id });
        const revenue =
          tenant.subscriptionPlan === "pro"
            ? 79
            : tenant.subscriptionPlan === "starter"
              ? 29
              : 0;

        return {
          id: tenant._id,
          name: tenant.name,
          slug: tenant.slug,
          status: tenant.subscriptionStatus,
          plan: tenant.subscriptionPlan,
          revenue,
          joined: tenant.createdAt,
          owner: tenant.ownerId,
        };
      }),
    );

    const totalRevenue = tenantsWithStats.reduce(
      (acc, t) => acc + t.revenue,
      0,
    );
    const activeTenants = tenantsWithStats.filter(
      (t) => t.status === "active" || t.status === "trial",
    ).length;
    const trialTenants = tenantsWithStats.filter(
      (t) => t.status === "trial",
    ).length;

    res.json({
      success: true,
      summary: {
        totalRevenue,
        activeTenants,
        trialTenants,
        totalTenants: tenants.length,
      },
      tenants: tenantsWithStats,
    });
  } catch (error: any) {
    console.error("Get tenants error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   PUT /api/admin/tenants/:id/status
// @desc    Update tenant status
// @access  Private (super admin only)
router.put("/tenants/:id/status", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["trial", "active", "expired", "cancelled"].includes(status)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid status" });
    }

    const tenant = await Tenant.findById(id);
    if (!tenant) {
      return res
        .status(404)
        .json({ success: false, message: "Tenant not found" });
    }

    tenant.subscriptionStatus = status as any;
    await tenant.save();

    res.json({ success: true, tenant });
  } catch (error: any) {
    console.error("Update tenant status error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
