import express, { Request, Response, NextFunction } from 'express';
import "express-async-errors"; 
import '../../container';       

import { setupSwagger } from './swagger'; 
import { router } from '../routes';   
import { AppError } from "../../../shared/error/AppError";     

const app = express();

app.use(express.json());

setupSwagger(app);

app.use(router);

app.use(
    (err: Error, response: Response) => {
      if (err instanceof AppError) {
        return response.status(Number(err.statusCode)).json({
          message: err.message,
        });
      }
  
      return response.status(500).json({
        status: "error",
        message: `internal error - ${err.message}`,
      });
    }
  );

export { app };
