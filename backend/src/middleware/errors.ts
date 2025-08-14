import { type Request, type Response, type NextFunction } from "express";
import logger from "../utils/logger.ts";

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Not Found: ${req.originalUrl}`);
  res.status(404);
  logger.error(`404 - ${req.method} ${req.originalUrl}`);
  next(error);
};

// Handle Method Not Allowed
export const methodNotAllowed = (req: Request, res: Response) => {
  const message = `Method ${req.method} not allowed on ${req.originalUrl}`;
  res.status(405);
  logger.error(`405 - ${req.method} ${req.originalUrl}`);
  res.json({
    message,
    stack: process.env.NODE_ENV === "production" ? null : undefined,
  });
};

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);

  logger.error(
    `${statusCode} - ${err.message} - ${req.method} ${req.originalUrl}`
  );

  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};
