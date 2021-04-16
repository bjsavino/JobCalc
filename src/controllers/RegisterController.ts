import {NextFunction, Request, Response} from "express";
import {Profile} from "../models/Profile";
import bcrypt from "bcrypt";
import passport from "passport";

export class RegisterController {
    static showForm(req: Request, res: Response) {
        return res.render("register");
    }
    static async register(req: Request, res: Response, next: NextFunction)
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
            res.render("register",{errors, username, pass, repetedPass});
        }
        else 
        {
            const profile: Profile = await Profile.getByUsername(username);
            if (profile) {
                
                errors.push("Usuário existente!");
                res.render("register",{errors,username,pass,repetedPass});
            }
            else {
                await bcrypt.hash(pass, 10, async function(err, hash) {
                    await Profile.new(username,hash);
                });
                
                req.flash("success_msg","Cadastrado com sucesso")
                res.redirect("/login");
            }
        }

    }
}
