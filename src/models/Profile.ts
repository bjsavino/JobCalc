const Database = require('../db/config');

export class Profile {
    id?:number
    name: string;
    avatar : string;
    monthly_budget : number;
    hours_per_day: number;
    days_per_week:number;
    vacation_per_year : number;
    hour_value: number;
    gitHubUser?: string;
    pass?: string;
    
    constructor(name: string,avatar: string, monthly_budget:number, hours_per_day: number, days_per_week: number, vacation_per_year: number, hour_value: number, gitHubUser:string, pass:string, id:number) {
        this.name = name;
        this.avatar = avatar;
        this.monthly_budget = monthly_budget;
        this.hours_per_day = hours_per_day;
        this.days_per_week = days_per_week;
        this.vacation_per_year = vacation_per_year;
        this.hour_value = hour_value;
        this.gitHubUser = gitHubUser;
        this.pass = pass;
        this.id = id;
    }

    static async get() {
        const db = await Database();

        const profile: Profile = await db.get("SELECT * FROM profile");

        await db.close();

        return profile;
    }
    static async getByUsername(username:string) {
        const db = await Database();

        const profile: Profile = await db.get(`SELECT * FROM profile WHERE gitHubUser="${username.toLowerCase()}"`);

        await db.close();

        return profile;
    }

    static async update(updatedProfile: Profile){

        const db = await Database()
        console.log("githubuser=====",updatedProfile)
        await db.run(`UPDATE profile SET
            name = "${updatedProfile.name}",
            avatar = "${updatedProfile.avatar}",
            monthly_budget = ${updatedProfile.monthly_budget},
            days_per_week = ${updatedProfile.days_per_week},
            hours_per_day = ${updatedProfile.hours_per_day},
            vacation_per_year = ${updatedProfile.vacation_per_year},
            hour_value = ${updatedProfile.hour_value}
            WHERE gitHubUser = "${(updatedProfile.gitHubUser+"").toLowerCase()}"
            `);

        await db.close()

    }

    static async new(username:string, pass: string) {
        const db = await Database();

        await db.run(`INSERT INTO profile (
            name,
            avatar, 
            gitHubUser,
            pass,
            hour_value
        ) VALUES (
            "${username}",
            "https://avatars.githubusercontent.com/${username.toLowerCase()}",
            "${username.toLowerCase()}",
            "${pass}",
            0
        );`);

        await db.close();
    }
    
    static GetCalculatedHoursValue(vacation_per_year:number, hours_per_day:number, days_per_week:number, monthly_budget:number): number {
        const weeksWork = 52 - vacation_per_year;
        const totalHoursPerYear = hours_per_day * days_per_week * weeksWork;
        const hoursValue = (12 * monthly_budget) / totalHoursPerYear;
        return hoursValue;
    }
}