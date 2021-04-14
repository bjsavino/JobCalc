let profileData: Profile = {
    name : "Bruno",
    avatar : "https://avatars.githubusercontent.com/u/13129289?s=400&u=fb4c8747024c6e29e89fb53c54bb5b7b0d885963&v=4",
    monthly_budget : 3000,
    hours_per_day: 8,
    days_per_week:5,
    vacation_per_year : 4,
    hour_value: 75    
}

export class Profile {

    name: string;
    avatar : string;
    monthly_budget : number;
    hours_per_day: number;
    days_per_week:number;
    vacation_per_year : number;
    hour_value: number;
    
    constructor(name: string,avatar: string, monthly_budget:number, hours_per_day: number, days_per_week: number, vacation_per_year: number, hour_value: number) {
        this.name = name;
        this.avatar = avatar;
        this.monthly_budget = monthly_budget;
        this.hours_per_day = hours_per_day;
        this.days_per_week = days_per_week;
        this.vacation_per_year = vacation_per_year;
        this.hour_value = hour_value;
    }

    static get() {

        return profileData;
    }

    static update(updatedProfile: Profile){
        profileData = updatedProfile
    }
    
    static CalculateHoursValue() {
        const weeksWork = 52 - profileData.vacation_per_year;
        const totalHoursPerYear = profileData.hours_per_day * profileData.days_per_week * weeksWork;
        const hoursValue = (12 * profileData.monthly_budget) / totalHoursPerYear;
        profileData.hour_value = hoursValue; 
    }
}