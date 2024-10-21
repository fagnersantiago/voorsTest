import { Request, Response, NextFunction } from 'express';
import { AppError } from '../../error/AppError';

const errorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
 
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }

  // Se o erro não é do tipo AppError, retorna um erro genérico
  return res.status(500).json({
    message: 'Internal Server Error',
  });
};

export { errorHandler }