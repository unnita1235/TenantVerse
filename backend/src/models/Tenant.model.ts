import mongoose, { Document, Schema } from 'mongoose';

export interface ITenant extends Document {
  name: string;
  slug: string;
  ownerId: mongoose.Types.ObjectId;
  subscriptionStatus: 'trial' | 'active' | 'expired' | 'cancelled';
  subscriptionPlan: 'free' | 'starter' | 'pro' | 'enterprise';
  subscriptionStartDate?: Date;
  subscriptionEndDate?: Date;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const TenantSchema = new Schema<ITenant>(
  {
    name: {
      type: String,
      required: [true, 'Tenant name is required'],
      trim: true
    },
    slug: {
      type: String,
      required: [true, 'Tenant slug is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens']
    },
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    subscriptionStatus: {
      type: String,
      enum: ['trial', 'active', 'expired', 'cancelled'],
      default: 'trial'
    },
    subscriptionPlan: {
      type: String,
      enum: ['free', 'starter', 'pro', 'enterprise'],
      default: 'free'
    },
    subscriptionStartDate: {
      type: Date
    },
    subscriptionEndDate: {
      type: Date
    },
    stripeCustomerId: {
      type: String
    },
    stripeSubscriptionId: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

// Index for faster queries
TenantSchema.index({ slug: 1 });
TenantSchema.index({ ownerId: 1 });

export default mongoose.model<ITenant>('Tenant', TenantSchema);

