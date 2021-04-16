import { Request, Response, NextFunction } from "express"
import {Job} from "../models/Job"

module.exports = {
    ensureAuthenticated: function (req:Request, res:Response,next: NextFunction){
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect('/login');
    }, 
    ensureJobOwner: async function (req:Request, res:Response,next: NextFunction){
 
        const job:Job = await Job.get(Number(req.params.id))
        const user:any = {...req.user};
        if (job.owner ==user.gitHubUser.toLowerCase()) {
            return next();
        }
        else {
            req.flash('error',"Esse Job não é seu");
            res.redirect('/');        
        }
      
    }
}