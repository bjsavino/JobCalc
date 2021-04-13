module.exports = {
    getRemainingDays(job){
        const projectDuraction = (job["total-hours"]/job["daily-hours"]).toFixed();
        const initialDate = job["created-at"];
        const daysOnMiliseconds = 1000*60*60*24;
        const lastDate = initialDate + projectDuraction * daysOnMiliseconds
        const remainingDays = ((lastDate - Date.now())/daysOnMiliseconds).toFixed(0);
        return remainingDays;
    }
}