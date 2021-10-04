import { Request, Response } from 'express';
import passport from 'passport';
import { UserModel } from '../models/user.model';
import { getToken } from '../config/authentication';
import { User } from '../interfaces/user.interface';
import mongoose from 'mongoose';

export class ProductController {
    static listAllUsers(req: Request, res: Response) {
      UserModel.find({isAdmin: false}, (err: any, userList: Array<User>) => {
        if(userList) {
          res.status(200);
          res.setHeader('Content-type', 'application/json');
          res.json({success: true, data: userList});
        } else {
          res.status(500);
          res.setHeader('Content-type', 'application/json');
          res.json({success: false, message: err.message});
        }
      });
    }

    static getOneUser (req: Request, res: Response) {
      UserModel.findOne({_id: req.params.id}, (err: any, userInfo: Array<User>) => {
        if(userInfo) {
          res.status(200);
          res.setHeader('Content-type', 'application/json');
          res.json({success: true, data: userInfo});
        } else {
          res.status(500);
          res.setHeader('Content-type', 'application/json');
          res.json({success: false, message: err.message});
        }
      });
    }

    static register(req: any, res: any) {
      let newUser = new UserModel({
        username: req.body.username,
        name: req.body.name,
        last_name: req.body.last_name,
        mobile_phone: req.body.mobile_phone,
        sede: req.body.sede,
        birth_date: req.body.birth_date
      })
      UserModel.register(newUser, req.body.password,
      (err: any, user: any) => {
          if(err) {
            res.status(500);
            res.setHeader('Content-type', 'application/json');
            res.json({success: false, message: err.message});
          }
          else {
            passport.authenticate('local')(req, res, () => {
              let token = getToken({_id: req.user._id});
              res.status(200);
              res.setHeader('Content-type', 'application/json');
              res.json({success: true, token: token, message: 'You are logged in!'});
              console.log(req);
            });
          }
      })
    }

    static login(req: any, res: any) {
      let token = getToken({_id: req.user._id});
      res.status(200);
      res.setHeader('Content-type', 'application/json');
      res.json({success: true, token: token, message: 'You are logged in!'});
    }

    static async editUser(req: any, res: any) {
      UserModel.findByIdAndUpdate(req.params.id, req.body, (err: any, user: any) => {
        if(user) {
          res.status(200);
          res.setHeader('Content-type', 'application/json');
          res.json({success: true, message: 'User updated!'});
        } else {
          res.status(400);
          res.setHeader('Content-type', 'application/json');
          res.json({success: false, message: err ? err.message : 'User not found'});
        }
      });
    }
}