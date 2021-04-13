const Profile = require("../models/Profile")
const Job = require("../models/Job");
const JobUtils = require("../Utils/JobUtils")

module.exports = {
    get(req,res) {       
        const StatusBar = {
            totalProjects: 0,
            openProjects: 0,
            finishedProjects: 0
        }

        const profile = Profile.get();
        let freeHours = profile["hours-per-day"];
        // console.log(profile);
        const jobs = Job.getAll();
        StatusBar.totalProjects = jobs.length;
        const updatedJobs =jobs.map(job=> {
            const remaining = JobUtils.getRemainingDays(job)
            const status = (remaining<=0)?"done":"progress"

            if (remaining<=0) {
                StatusBar.finishedProjects++;
            }
            else {
                StatusBar.openProjects++;
                freeHours-=job["daily-hours"];
            }

            return {
                ...job,
                'remaining-days': remaining,
                status: status,
        'project-value': job['total-hours'] * profile['hour-value']
            }
        })       
        return res.render("index",{jobs:updatedJobs, profile: profile, statusBar: StatusBar, freeHours});  
    }
};