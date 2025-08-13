import jwt, { type JwtPayload } from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { type Request, type Response, type NextFunction } from "express";
import User from "../models/userModel.ts";

// Extend Express Request type to include user
interface AuthRequest extends Request {
  user?: any; // You can replace `any` with your User type/interface
}

// Protect route middleware
const protect = asyncHandler(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    let token: string | undefined;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        console.log("Token found");
        token = req.headers.authorization.split(" ")[1];

        const decoded = jwt.verify(
          token as string,
          process.env.JWT_SECRET as string
        ) as JwtPayload & { id: string };

        console.log(`Decoded token: ${JSON.stringify(decoded)}`);

        req.user = await User.findById(decoded.id).select("-password");
        next();
      } catch (error) {
        console.error(`Error: ${error}`);
        res.status(401);
        throw new Error("Not authorized, token failed");
      }
    } else {
      res.status(401);
      throw new Error("Not authorized, no token found");
    }
  }
);

// Admin-only middleware
const adminOnly = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("You are not authorized to access this data");
  }
};

// Merchants-only middleware
const merchantsOnly = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.user && req.user.userType === "merchant") {
    next();
  } else {
    res.status(401);
    throw new Error(
      "You are not authorized to access this data, only merchants"
    );
  }
};

export { adminOnly, merchantsOnly, protect };
