import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.model';
import Tenant from '../models/Tenant.model';
import Subscription from '../models/Subscription.model';
import { logger } from '../utils/logger';

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/tenantverse');
    logger.info('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Tenant.deleteMany({});
    await Subscription.deleteMany({});
    logger.info('Cleared existing data');

    // Create super admin
    const superAdmin = await User.create({
      email: 'admin@tenantverse.com',
      password: 'admin123',
      name: 'Super Admin',
      role: 'super_admin',
      isEmailVerified: true
    });
    logger.info('Created super admin');

    // Create demo tenants
    const tenants = [
      {
        name: 'Acme Inc.',
        slug: 'acme',
        subscriptionStatus: 'active' as const,
        subscriptionPlan: 'pro' as const
      },
      {
        name: 'Stark Industries',
        slug: 'stark',
        subscriptionStatus: 'active' as const,
        subscriptionPlan: 'enterprise' as const
      },
      {
        name: 'Wayne Enterprises',
        slug: 'wayne',
        subscriptionStatus: 'active' as const,
        subscriptionPlan: 'pro' as const
      },
      {
        name: 'Globex Corporation',
        slug: 'globex',
        subscriptionStatus: 'trial' as const,
        subscriptionPlan: 'starter' as const
      },
      {
        name: 'Cyberdyne Systems',
        slug: 'cyberdyne',
        subscriptionStatus: 'expired' as const,
        subscriptionPlan: 'free' as const
      }
    ];

    const createdTenants: any[] = [];
    for (const tenantData of tenants) {
      // Create owner
      const owner = await User.create({
        email: `owner@${tenantData.slug}.com`,
        password: 'password123',
        name: `${tenantData.name} Owner`,
        role: 'owner',
        tenantId: null as any,
        isEmailVerified: true
      });

      // Create tenant
      const tenant = await Tenant.create({
        ...tenantData,
        ownerId: owner._id
      });

      // Update owner with tenant ID
      owner.tenantId = tenant._id;
      await owner.save();

      // Create some team members
      const teamMembers = [
        { name: 'John Smith', email: `john@${tenantData.slug}.com`, role: 'admin' as const },
        { name: 'Jane Doe', email: `jane@${tenantData.slug}.com`, role: 'member' as const },
        { name: 'Michael Johnson', email: `michael@${tenantData.slug}.com`, role: 'member' as const }
      ];

      for (const member of teamMembers) {
        await User.create({
          ...member,
          password: 'password123',
          tenantId: tenant._id,
          isEmailVerified: true
        });
      }

      createdTenants.push(tenant);
      logger.info(`Created tenant: ${tenantData.name}`);
    }

    logger.info('Seed data created successfully');
    console.log('\n✅ Seed data created successfully!');
    console.log('\n📝 Demo Credentials:');
    console.log('Super Admin: admin@tenantverse.com / admin123');
    console.log('Tenant Owners: owner@[tenant-slug].com / password123');
    console.log('Team Members: [name]@[tenant-slug].com / password123');
    console.log('\nExample: owner@acme.com / password123');

    process.exit(0);
  } catch (error) {
    logger.error('Seed error', error);
    console.error('❌ Seed error:', error);
    process.exit(1);
  }
};

seedData();

