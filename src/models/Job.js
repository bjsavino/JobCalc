const JobUtils = require("../Utils/JobUtils")
jobData= [
    {
        id: 1,
        name: 'Pizzaria Guloso',
        'daily-hours': '1',
        'total-hours': '2',
        'project-value': 150,
        'remaining-days': 2,
        'created-at': 1617642888706
    },
    {
        id: 2,
        name: 'OneTwo Project',
        'daily-hours': '5',
        'total-hours': '1',
        'project-value': 150,
        'remaining-days': 0,
        'created-at': 1617642888706
    }
]

module.exports = {
    getAll() {
        return jobData;
    },
    get(jobId) {

        const jobSelected = jobData.find( job => job.id === jobId);
        return jobSelected;
    },
    create(newjob) {
        jobData.push(newjob);
    },
    update(jobId,jobUpdate) {

        const jobSelected = jobData.find( job => job.id === jobId);

        const updatedJob = {
            ...jobSelected,
            ...jobUpdate
        }
        jobData = jobData.map(job => {
            if (job.id === jobId)  {
                job = updatedJob
            }
            return job
        });
    },
    delete(jobId){
        const jobSelected = jobData.find( job => job.id === jobId);
        jobData = jobData.filter(job=>job.id!==jobId);
    }


}