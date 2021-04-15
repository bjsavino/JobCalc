import {Job} from "../models/Job";
import {Profile} from "../models/Profile";
import {Response, Request} from 'express'

export class JobController  {
    static showForm(req: Request,res: Response){
        res.render("job")
    }
    static async create(req: Request,res: Response) {

   
        var loggedUser:any = {...req.user};
        const profile = await Profile.getByUsername(loggedUser.gitHubUser);

        var projectValue = Number(profile.hour_value) * Number(req.body["total-hours"]);
        var projectDuraction = Math.floor(req.body["total-hours"]/req.body["daily-hours"]);
        
        let newJob: Job = {
            owner: profile.gitHubUser+"",
            name: req.body["name"],
            daily_hours: Number(req.body["daily-hours"]),
            total_hours: Number(req.body["total-hours"]),
            created_at: new Date(Date.now())
        }
          //  project_value: projectValue,
         //   remaining_days: projectDuraction,
        console.log(newJob);
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