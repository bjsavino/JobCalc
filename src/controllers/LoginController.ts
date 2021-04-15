import {NextFunction, Request, Response} from "express";
import bcrypt from "bcrypt";
import {Profile} from "../models/Profile";
import passport from "passport";

export class LoginController {
    static showForm(req: Request, res: Response) {
        return res.render("login");
    }
    static async login(req: Request, res: Response, next:NextFunction)
    {  
           passport.authenticate('local', {
            successRedirect:'/',
            failureRedirect:'/login',
            failureFlash:true
            })(req,res,next);
    }
    static logout(req:Request, res:Response){
        req.logout();
        res.redirect("/login");
    }
      
    
}
