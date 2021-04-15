import express from 'express';
import {Router} from "express";
import {ProfileController} from "./controllers/ProfileController";
import {JobController} from "./controllers/JobController";
import { DashboardController } from "./controllers/DashboardController";
import { RegisterController } from './controllers/RegisterController';
import { LoginController } from './controllers/LoginController';
const {ensureAuthenticated, ensureJobOwner} = require('./Utils/auth');

const router = Router();
router.get('/login', LoginController.showForm);
router.post("/login", LoginController.login);
router.get("/logout", LoginController.logout);

router.get("/register", RegisterController.showForm)
router.post("/register", RegisterController.register)

router.get('/',ensureAuthenticated, DashboardController.get);
router.get('/job', ensureAuthenticated,JobController.showForm);
router.post('/job', ensureAuthenticated,JobController.create);
router.get('/job/edit/:id', ensureAuthenticated,ensureJobOwner,JobController.get);
router.post('/job/edit/:id', ensureAuthenticated, ensureJobOwner,JobController.update);
router.post('/job/delete/:id', ensureAuthenticated, ensureJobOwner,JobController.delete);
router.get('/profile', ensureAuthenticated,ProfileController.get);
router.post('/profile', ensureAuthenticated,ProfileController.update);

module.exports = router;