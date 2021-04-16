import {Job} from "../models/Job";
import {Profile} from "../models/Profile";
import {Response, Request} from 'express'
import { getRemainingDays } from "../Utils/JobUtils";

export class JobController  {
    static showForm(req: Request,res: Response){
        res.render("job")
    }
    static async create(req: Request,res: Response) {

        if (Number(req.body["daily-hours"])>24) {
            return res.render("job",{error:"Um dia só tem 24 horas", jobName: req.body["name"], dailyHours: req.body["daily-hours"], totalHours: req.body["total-hours"] });
        }

        var loggedUser:any = {...req.user};
        const profile = await Profile.getByUsername(loggedUser.gitHubUser);
        
        //calculando horas comprometidas no dia
        const jobs = await Job.getAll(loggedUser.gitHubUser);
        let  workingHours = 0;
        jobs.map(job=>{
            const remaining = getRemainingDays(job);
            if (remaining>0) workingHours+=job.daily_hours;
        })
        const availableHours = profile.hours_per_day - workingHours;

        if (req.body["daily-hours"]>availableHours) {
            const textQtyHour = availableHours>1?"horas disponíveis": "hora disponível";
            return res.render("job",{error:`Você tem apenas ${availableHours} ${textQtyHour}`, jobName: req.body["name"], dailyHours: req.body["daily-hours"], totalHours: req.body["total-hours"] });
        }

        let newJob: Job = {
            owner: profile.gitHubUser+"",
            name: req.body["name"],
            daily_hours: Number(req.body["daily-hours"]),
            total_hours: Number(req.body["total-hours"]),
            created_at: new Date(Date.now())
        }

        await Job.create(newJob);
        return res.redirect('/');
    }
    static async get(req: Request,res:Response) {
        const jobSelected = await Job.get(Number(req.params.id));
        return res.render("job-edit", {job: jobSelected})
    }
    static async update(req: Request, res: Response) {
        const jobId = Number(req.params.id);
        var loggedUser:any = {...req.user};
        let updatedJob: Job = {
            owner: loggedUser.gitHubUser,
            name: req.body["name"],
            daily_hours: Number(req.body["daily-hours"]),
            total_hours: Number(req.body["total-hours"])        
        }

        await Job.update(jobId,updatedJob);
        
        return res.redirect('/job/edit/'+jobId)
    }
    static async delete(req: Request, res: Response) {
        const jobId = Number(req.params.id);
        await Job.delete(jobId);
        return res.redirect('/')
    }
}