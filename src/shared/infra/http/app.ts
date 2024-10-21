import "express-async-errors";
import express, { Request, Response, NextFunction } from 'express';
import '../../container';
import { setupSwagger } from './swagger';
import { router } from '../routes';


const app = express(); 

app.use(express.json());

setupSwagger(app);

app.use(router);


export { app };
