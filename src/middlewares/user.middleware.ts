import { NextFunction } from 'express';

export const verifyAdmin = (req: any, res: any, next: NextFunction) => {
    if(req.user.isAdmin) {
        next();
    } else {
        res.send('Unauthorized');
    }
}

export const verifyOwnAction = (req: any, res: any, next: NextFunction) => {
    if(req.user._id.toString() === req.params.id) {
        next();
    } else {
        res.send('Unauthorized');
    }
}