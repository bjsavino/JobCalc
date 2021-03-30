const express = require('express');
const router = express.Router();

const profile = {
    name : "Bruno",
    avatar : "https://avatars.githubusercontent.com/u/13129289?s=400&u=fb4c8747024c6e29e89fb53c54bb5b7b0d885963&v=4",
    "monthly-budget" : 3000,
    "hours-per-day": 8,
    "days-per-week":5,
    "vacation-per-year" : 4,
}


router.get('/', (req, res) => res.render(__dirname + "/views/index"))
router.get('/job', (req, res) =>  res.render(__dirname + "/views/job"))
router.get('/job/edit', (req, res) =>  res.render(__dirname + "/views/job-edit"))
router.get('/profile', (req, res) =>  res.render(__dirname + "/views/profile",{profile:profile}))

module.exports = router;
