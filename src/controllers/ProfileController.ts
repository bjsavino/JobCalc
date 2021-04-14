//const Profile  = require('../models/Profile')
import {Response, Request} from 'express'
import { Profile } from "../models/Profile"

export class ProfileController  {
    static get(req: Request, res: Response) {
        const profile = Profile.get();
        
        return res.render("profile",{profile:profile})
    }

    static update(req: Request,res: Response) {

        const profile = Profile.get();
        Profile.CalculateHoursValue();

        const updatedProfile: Profile = {
            ...profile,
            monthly_budget: Number(req.body["monthly-budget"]),
            hours_per_day: Number(req.body["hours-per-day"]),
            days_per_week: Number(req.body["days-per-week"]),
            vacation_per_year: Number(req.body["vacation-per-year"])
        }
        console.log(updatedProfile);
        Profile.update(updatedProfile);

        return res.render("profile",{profile:updatedProfile});
    }
}