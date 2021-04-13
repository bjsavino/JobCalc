profileData = {
    name : "Bruno",
    avatar : "https://avatars.githubusercontent.com/u/13129289?s=400&u=fb4c8747024c6e29e89fb53c54bb5b7b0d885963&v=4",
    "monthly-budget" : 3000,
    "hours-per-day": 8,
    "days-per-week":5,
    "vacation-per-year" : 4,
    "hour-value": 75    
}

module.exports = {
    get() {
        return profileData;updatedProfile
    },
    update(updatedProfile){
        profileData = updatedProfile
    },
    CalculateHoursValue() {
        const weeksWork = 52 - profileData["vacation-per-year"];
        const totalHoursPerYear = profileData["hours-per-day"] * profileData["days-per-week"] * weeksWork;
        const hoursValue = (12 * profileData["monthly-budget"]) / totalHoursPerYear;
        profileData["hour-value"] = hoursValue; 
    }
}