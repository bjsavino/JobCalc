let jobData: Job[] = [
    {
        id: 1,
        name: 'Pizzaria Guloso',
        'daily_hours': 1,
        'total_hours': 2,
        'project_value': 150,
        'remaining_days': 2,
        'created_at': new Date(1617642888706)
    },
    {
        id: 2,
        name: 'OneTwo Project',
        'daily_hours': 5,
        'total_hours': 1,
        'project_value': 150,
        'remaining_days': 0,
        'created_at': new Date(1617642888706)
    }
]

export class Job {
    id: number;
    name: string;
    'daily_hours': number;
    'total_hours': number;
    'project_value': number;
    'remaining_days': number;
    'created_at': Date;

    constructor(id:number, name:string ,daily_hours:number,total_hours:number,project_value:number,remaining_days:number,created_at:Date) {
        this.id = id;
        this.name = name;
        this.daily_hours = daily_hours;
        this.total_hours = total_hours;
        this.project_value = project_value;
        this.remaining_days = remaining_days;
        this.created_at = created_at;
    }
    static getAll(): Job[] {
        return jobData;
    }

    static get(jobId: number) {

        const jobSelected = jobData.find(job => job.id === jobId);
        return jobSelected;
    }

    static create(newjob: Job) {
        jobData.push(newjob);
    }

    static update(jobId: number,jobUpdate: Job) {

        const jobSelected = jobData.find( job => job.id === jobId);

        const updatedJob = {
            ...jobSelected,
            ...jobUpdate
        }
        jobData = jobData.map(job => {
            if (job.id === jobId)  {
                job = updatedJob
            }
            return job;
        });
    }

    static delete(jobId: number){
        const jobSelected = jobData.find( job => job.id === jobId);
        jobData = jobData.filter(job=>job.id!==jobId);
    }


}