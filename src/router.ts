import express from 'express';
import {Router} from "express";
import {ProfileController} from "./controllers/ProfileController";
import {JobController} from "./controllers/JobController";
import { DashboardController } from "./controllers/DashboardController";



const router = Router();
router.get('/login', (req, res) => {res.render("login")});
router.post("/login", (req,res) =>{
    console.log(req.body);
    res.redirect("/");
})
router.get('/', DashboardController.get);
router.get('/job', JobController.showForm);
router.post('/job', JobController.create);
router.get('/job/edit/:id', JobController.get);
router.post('/job/edit/:id', JobController.update);
router.post('/job/delete/:id', JobController.delete);
router.get('/profile', ProfileController.get);
router.post('/profile', ProfileController.update);

module.exports = router;