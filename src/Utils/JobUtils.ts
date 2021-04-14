import { Job } from "../models/Job";

export function getRemainingDays(job: Job): number{
    const projectDuraction: number = (job.total_hours/job.daily_hours);
    const initialDate = job.created_at? new Date(job.created_at): new Date(Date.now());
    const daysOnMiliseconds: number = 1000*60*60*24;
    const lastDate: number = initialDate.valueOf() + projectDuraction * daysOnMiliseconds
    const remainingDays: number = Math.ceil((lastDate.valueOf() - Date.now())/daysOnMiliseconds);
    return remainingDays;
}
