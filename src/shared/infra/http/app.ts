import express, { Request, Response, NextFunction } from 'express';
import "express-async-errors";
import '../../container';
import { setupSwagger } from './swagger';
import { router } from '../routes';


const app = express();
app.use(express.json());
setupSwagger(app);
app.use(router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

export { app };
