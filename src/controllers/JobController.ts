import {Job} from "../models/Job";
import {Profile} from "../models/Profile";
import {Response, Request} from 'express'

export class JobController  {
    static showForm(req: Request,res: Response){
        res.render("job")
    }
    static create(req: Request,res: Response) {
        const job = Job.getAll();
        var jobId = job[job.length-1]?.id||0;

        const profile = Profile.get();

        var projectValue = Number(profile.hour_value) * Number(req.body["total-hours"]);
        var projectDuraction = Math.floor(req.body["total-hours"]/req.body["daily-hours"]);
        
        var updatedJob: Job = {
            id: jobId+1,
            name: req.body["name"],
            daily_hours: Number(req.body["daily-hours"]),
            total_hours: Number(req.body["total-hours"]),
            project_value: projectValue,
            remaining_days: projectDuraction,
            created_at: new Date(Date.now())
        }

        Job.create(updatedJob);
        return res.redirect('/');
    }
    static get(req: Request,res:Response) {
        console.log(Number(req.params.id));
        const jobSelected = Job.get(Number(req.params.id));
        console.log(jobSelected);
        return res.render("job-edit", {job: jobSelected})
    }
    static update(req: Request, res: Response) {
        const jobId = Number(req.params.id);        
        Job.update(jobId,req.body);
        return res.redirect('/job/edit/'+jobId)
    }
    static delete(req: Request, res: Response) {
        const jobId = Number(req.params.id);
        Job.delete(jobId);
        return res.redirect('/')
    }
}