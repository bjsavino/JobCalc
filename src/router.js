const express = require('express');
const router = express.Router();
const ProfileController = require("./controllers/ProfileController");
const JobController = require("./controllers/JobController");
const DashboardController = require("./controllers/DashboardController");
const Profile = require("./models/Profile");
const Job = require("./models/Job");


router.get('/', DashboardController.get);
router.get('/job', JobController.showForm);
router.post('/job', JobController.create);
router.get('/job/edit/:id', JobController.get);
router.post('/job/edit/:id', JobController.update);
router.post('/job/delete/:id', JobController.delete)
router.get('/profile', ProfileController.get)
router.post('/profile', ProfileController.update)

module.exports = router;
