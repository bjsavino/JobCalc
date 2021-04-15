import {Request, Response} from "express";
import {Profile} from "../models/Profile";
import bcrypt from "bcrypt";


export class RegisterController {
    static showForm(req: Request, res: Response) {
        return res.render("register");
    }
    static async register(req: Request, res: Response)
    {   
        let errors = [];
       
        const {username, pass, repetedPass} = req.body;

        if (!username || !pass || !repetedPass) {
            errors.push({msg: "Preencha todos os campos"});
        }

        if (pass !== repetedPass) {
            errors.push({msg: "As senhas não conferem"});
        }

        if (errors.length > 0) {
            console.log("err=====", errors);
            res.render("register",{errors, username, pass, repetedPass});
        }
        else 
        {
            console.log("username", username);
            const profile: Profile = await Profile.getByUsername(username);
            if (profile) {
                console.log("profile---",profile.name);
                
                errors.push("Usuário existente!");
                console.log("errors--",errors);
                res.render("register",{errors,username,pass,repetedPass});
            }
            else {
                await bcrypt.hash(pass, 10, async function(err, hash) {
                    await Profile.new(username,hash);
                    console.log("newuser",username, hash);
                });
                
                req.flash('success_msg',"Cadastrado com Sucesso!")
                res.redirect("/login");
            }
        }

    }
}
