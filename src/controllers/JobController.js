const Job = require("../models/Job");
const Profile = require("../models/Profile");

module.exports = {
    showForm(req,res){
        res.render("job")
    },
    create(req,res) {
        //{ name: 'asdasd', 'daily-hours': '1', 'total-hours': '1' }
        const job = Job.getAll();
        var jobId = job[job.length-1]?.id||0;

        const profile = Profile.get();

        var projectValue = Number(profile["hour-value"]) * Number(req.body["total-hours"]);
        
        var projectDuraction = Math.floor(req.body["total-hours"]/req.body["daily-hours"]);

        var updatedJob = {
            ...req.body,
            "project-value": projectValue,
            "remaining-days":Math.floor(req.body["total-hours"]/req.body["daily-hours"]),
            "created-at": Date.now(),
            id: jobId+1,
        }
        Job.create(updatedJob);
        return res.redirect('/');
    },
    get(req,res) {
        const jobSelected = Job.get(Number(req.params.id));
        return res.render("job-edit", {job: jobSelected})
    },
    update(req,res) {
        const jobId = Number(req.params.id);        
        Job.update(jobId,req.body);
        return res.redirect('/job/edit/'+jobId)
        // return res.render(__dirname + "/views/job-edit", {job: updatedJob})
    },
    delete(req,res) {
        const jobId = Number(req.params.id);
        Job.delete(jobId);
        return res.redirect('/')
    }
}