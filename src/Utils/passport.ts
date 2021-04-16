import passportLocal from "passport-local";
import passport from "passport";
import bcrypt from "bcrypt";
import {Profile} from '../models/Profile';

// Load User model
//const User = require('../models/User');
const LocalStrategy = passportLocal.Strategy;

module.exports = function(passport: passport.Authenticator ) {
  passport.use(
      new LocalStrategy({ usernameField: 'username', passwordField: 'pass'}, async (username: string, password:string, done) => {
          // Match user
      const profile = await Profile.getByUsername(username);

      if (!profile || typeof profile == 'undefined') {
        return done(null, false, { message: 'Usuário não registrado' });
      }

      const hash = profile.pass + "";
      bcrypt.compare(password, hash, function(err, isMatch) {
          // result == true
          if (isMatch) {
              return done(null,profile)
          }
          else {
              return done(null,false,{message: "Senha Incorreta"})
          }
      });
    })
  );
  passport.serializeUser(function(user:any, done)  {
    done(null, user.gitHubUser.toLowerCase());
  });

  passport.deserializeUser(async function(username:string, done) {
      const profile = await Profile.getByUsername(username)
      if (typeof profile !== 'undefined') {
          done(null, profile)
      }
  });
};
