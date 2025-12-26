import mongoose, { Document, Schema } from 'mongoose';

export interface ISubscription extends Document {
  tenantId: mongoose.Types.ObjectId;
  stripeSubscriptionId: string;
  stripeCustomerId: string;
  plan: 'starter' | 'pro' | 'enterprise';
  status: 'active' | 'canceled' | 'past_due' | 'trialing' | 'incomplete';
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const SubscriptionSchema = new Schema<ISubscription>(
  {
    tenantId: {
      type: Schema.Types.ObjectId,
      ref: 'Tenant',
      required: true,
      unique: true,
    },
    stripeSubscriptionId: {
      type: String,
      required: true,
      unique: true,
    },
    stripeCustomerId: {
      type: String,
      required: true,
    },
    plan: {
      type: String,
      enum: ['starter', 'pro', 'enterprise'],
      required: true,
    },
    status: {
      type: String,
      enum: ['active', 'canceled', 'past_due', 'trialing', 'incomplete'],
      required: true,
    },
    currentPeriodStart: {
      type: Date,
      required: true,
    },
    currentPeriodEnd: {
      type: Date,
      required: true,
    },
    cancelAtPeriodEnd: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

SubscriptionSchema.index({ tenantId: 1 });
SubscriptionSchema.index({ stripeSubscriptionId: 1 });

export default mongoose.model<ISubscription>('Subscription', SubscriptionSchema);
