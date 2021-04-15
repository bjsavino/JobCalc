import {Profile} from "../models/Profile";
import {getRemainingDays} from "../Utils/JobUtils"
import {Request,Response} from "express";
import {Job} from "../models/Job"

export class DashboardController  {
    static async get(req: Request,res: Response) {       
        const StatusBar = {
            totalProjects: 0,
            openProjects: 0,
            finishedProjects: 0
        }
        var loggedUser:any = {...req.user};
        const profile = await Profile.getByUsername(loggedUser.gitHubUser);
        let freeHours = profile.hours_per_day;
        const jobs = await Job.getAll(loggedUser.gitHubUser);
        StatusBar.totalProjects = jobs.length;

        const updatedJobs =jobs.map(job=> {
            const remaining = getRemainingDays(job);
            const status = (remaining<=0)?"done":"progress"
            
            if (remaining<=0) {
                StatusBar.finishedProjects++;
            }
            else {
                StatusBar.openProjects++;
                freeHours-=job.daily_hours;
            }

            return {
                ...job,
                remaining_days: remaining,
                status: status,
                project_value: job.total_hours * profile.hour_value
            }
        })       
        return res.render("index",{jobs:updatedJobs, profile: profile, statusBar: StatusBar, freeHours});  
    }
};