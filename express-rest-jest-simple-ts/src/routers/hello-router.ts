import express, { NextFunction, Request, Response } from 'express';
import { getMessage } from '../services/hello-service';


const router = express.Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const message = getMessage(req.query.name as string)
        res.status(200).json({message});
    } catch (error) {
        next(error);
    }
});



export default router;