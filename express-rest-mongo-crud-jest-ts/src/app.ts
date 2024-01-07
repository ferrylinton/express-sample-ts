import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import todoRouter from './routers/todo-router';
import { NextFunction, Request, Response } from 'express';

/**
 * Creates an Express application
 */
const app = express();

// helmet helps secure Express apps by setting HTTP response headers
app.use(helmet());

// enable CORS
app.use(cors({ origin: '*' }));

// parses incoming requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// map router to express application
app.use('/api/todoes', todoRouter);

// 404 / not found handler
app.use((_req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({ message: "Not Found" })
})

// error handler
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    res.status(err.status || 500);
    return res.json({ message: err.message || 'Internal Server Error' })
})

export default app;