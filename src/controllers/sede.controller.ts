import { Request, Response } from 'express';
import { SedeModel } from '../models/sede.model';
import { Sede } from '../interfaces/sede.interface';

export class SedeController {
    static getAllSedes(req: Request, res: Response) {
        SedeModel.find((err: any, sedeList: Array<Sede>) => {
            if(sedeList) {
              res.status(200);
              res.setHeader('Content-type', 'application/json');
              res.json({success: true, data: sedeList});
            } else {
              res.status(500);
              res.setHeader('Content-type', 'application/json');
              res.json({success: false, message: err.message});
            }
        });
    }
}