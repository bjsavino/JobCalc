/*let jobData: Job[] = [
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
*/
const Database = require('../db/config');

export class Job {
    name: string;
    owner: string;
    'daily_hours': number;
    'total_hours': number;
    'project_value'?: number;
    'remaining_days'?: number;
    'created_at'?: Date;

    constructor(owner:string, name:string ,daily_hours:number,total_hours:number,project_value:number,remaining_days:number,created_at:Date) {
        this.name = name;
        this.daily_hours = daily_hours;
        this.total_hours = total_hours;
        this.project_value = project_value;
        this.remaining_days = remaining_days;
        this.created_at = created_at;
        this.owner = owner;
    }
    static async getAll(owner:string): Promise<Job[]> {
        const db = await Database();

        const jobs:Job[] = await db.all(`SELECT * FROM jobs WHERE owner = "${owner}"`);
        
        await db.close();

        return jobs;
    }

    static async get(jobId: number) {
        const db = await Database();
        const jobSelected = await db.get("SELECT * FROM jobs WHERE id = ?", jobId)

        await db.close();
       // jobData.find(job => job.id === jobId);
        return jobSelected;
    }

    static async create(newJob: Job) {
        const db = await Database();

        await db.exec(`INSERT INTO jobs (
          name,
          daily_hours,
          total_hours,
          created_at,
          owner
        ) VALUES (
          "${newJob.name}",
          ${newJob.daily_hours},
          ${newJob.total_hours},
          "${newJob.created_at}",
          "${newJob.owner}"
        )`)
    
        await db.close()

    }

    static async update(jobId: number,jobUpdate: Job) {

        const db = await Database();
        console.log("jjjjjjjjjjjjjjjjjjj",jobUpdate);
        await db.run(`UPDATE jobs SET 
        name = "${jobUpdate.name}",
        daily_hours = ${Number(jobUpdate.daily_hours)},
        total_hours = ${Number(jobUpdate.total_hours)}
        WHERE id = ${jobId}
        `);
    
        await db.close()
    }

    static async delete(jobId: number){
        const db = await Database()

        await db.run(`DELETE FROM jobs WHERE id = ${jobId}`)
    
        await db.close()
    }


}