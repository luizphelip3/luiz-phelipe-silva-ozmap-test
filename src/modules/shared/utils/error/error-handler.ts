import { NextFunction, Request, Response } from 'express';

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (Array.isArray(err)) {
    const formattedErrors = err.map((error) => ({
      name: error.name || 'InternalError',
      message: error.message || 'Internal Server Error',
      details: error.details || null,
    }));
    res.status(400).json({ errors: formattedErrors });
  } else {
    res.status(err.statusCode || 500).json({
      name: err.name || 'InternalError',
      message: err.message || 'Internal Server Error',
      details: err.details || null,
    });
  }
}
