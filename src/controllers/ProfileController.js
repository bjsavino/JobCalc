const Profile  = require('../models/Profile')

module.exports = {
    get(req,res) {
        const profile = Profile.get();
        return res.render("profile",{profile:profile})
    },
    update(req,res) {
        const newValues = req.body;
        const profile = Profile.get();
        Profile.CalculateHoursValue();

        const updatedProfile = {
            ...profile,
            ...newValues
        }
        Profile.update(updatedProfile);

        console.log(updatedProfile)
        //return res.redirect("/profile",{profile:Profile.data})
        return res.render("profile",{profile:updatedProfile})
    }
}