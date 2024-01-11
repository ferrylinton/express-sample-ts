import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import helloRouter from './routers/hello-router';


const app = express();
app.use(helmet());
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// map router to express application
app.use('/api', helloRouter);

// 404 / not found handler
app.use((_req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({ message: "Not Found" })
})

// error handler
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    res.status(err.status || 500);
    return res.json({ message: err.message })
})

export default app;