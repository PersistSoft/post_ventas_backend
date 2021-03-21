import passport from "passport";
import passportLocal from "passport-local";
import { UserService } from "./../../services/users.service";
import bcrypt from 'bcryptjs';

const LocalStrategy = passportLocal.Strategy;

passport.use(new LocalStrategy(
  async function(username: string, password: string, done) {
    try {
      const userService = new UserService();
      const user = await userService.findByUsername(username);

      if (!user) {
        return done(null, false); 
      }

      const verified = bcrypt.compareSync(password, user.password);
      
      if(!verified){
        return done(null, false);
      }

      return done(null, user);

    } catch (error) {
      return done(error);
    }
  }
));