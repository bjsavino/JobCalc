import { Request, Response, NextFunction } from "express"
import {Job} from "../models/Job"

module.exports = {
    ensureAuthenticated: function (req:Request, res:Response,next: NextFunction){
        if (req.isAuthenticated()) {
            return next();
        }
        req.flash('error',"Você precisa estar logado");
        res.redirect('/login');
    }, 
    ensureJobOwner: async function (req:Request, res:Response,next: NextFunction){
        if (req.isAuthenticated()) {
            const job:Job = await Job.get(Number(req.params.id))
            const user:any = {...req.user};
            if (job.owner ==user.gitHubUser) {
                console.log("params",req.params)
                return next();
            }
            else {
                req.flash('error',"Esse Job não é seu");
                res.redirect('/');        
            }
        }
        else{
            req.flash('error',"Você precisa estar logado");
            res.redirect('/login');
        }
    }
}