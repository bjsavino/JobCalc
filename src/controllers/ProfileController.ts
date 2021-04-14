//const Profile  = require('../models/Profile')
import {Response, Request} from 'express'
import { Profile } from "../models/Profile"

export class ProfileController  {

    static async get(req: Request, res: Response) {
        const profile = await Profile.get();
        return res.render("profile",{profile:profile})
    }

    static async update(req: Request,res: Response) {

        const hourValue = Profile.GetCalculatedHoursValue(
            Number(req.body["vacation-per-year"]),
            Number(req.body["hours-per-day"]),
            Number(req.body["days-per-week"]),
            Number(req.body["monthly-budget"])
        );
    
        const updatedProfile: Profile = {
            name: req.body["name"],
            avatar: req.body["avatar"],
            monthly_budget: Number(req.body["monthly-budget"]),
            hours_per_day: Number(req.body["hours-per-day"]),
            days_per_week: Number(req.body["days-per-week"]),
            vacation_per_year: Number(req.body["vacation-per-year"]),
            hour_value: hourValue
        }
        Profile.update(updatedProfile);

        return res.render("profile",{profile:updatedProfile});
    }
}