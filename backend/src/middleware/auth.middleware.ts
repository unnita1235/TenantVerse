import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.model";
import { AuthenticationError, NotFoundError } from "../utils/errors";
import { logger } from "../utils/logger";

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
    tenantId?: string;
  };
}

export const authenticate = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
      throw new AuthenticationError("No token provided");
    }

    if (!process.env.JWT_SECRET) {
      logger.error("JWT_SECRET not configured");
      throw new Error("Server configuration error");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as { id: string };

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      throw new NotFoundError("User");
    }

    req.user = {
      id: user._id.toString(),
      email: user.email,
      role: user.role,
      tenantId: user.tenantId?.toString(),
    };

    next();
  } catch (error: any) {
    if (
      error instanceof AuthenticationError ||
      error instanceof NotFoundError
    ) {
      res
        .status(error.statusCode)
        .json({ success: false, message: error.message });
      return;
    }

    logger.error("Authentication error", error);
    res.status(401).json({ success: false, message: "Invalid token" });
  }
};

export const requireRole = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res
        .status(401)
        .json({ success: false, message: "Authentication required" });
      return;
    }

    if (!roles.includes(req.user.role)) {
      res
        .status(403)
        .json({ success: false, message: "Insufficient permissions" });
      return;
    }

    next();
  };
};

export const requireTenant = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): void => {
  if (!req.user) {
    res
      .status(401)
      .json({ success: false, message: "Authentication required" });
    return;
  }

  if (req.user.role === "super_admin") {
    next();
    return;
  }

  if (!req.user.tenantId) {
    res.status(403).json({ success: false, message: "Tenant access required" });
    return;
  }

  next();
};
