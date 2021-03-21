import passport from "passport";
import passportLocal from "passport-local";
import { UserService } from "./../../services/users.service";

const LocalStrategy = passportLocal.Strategy;

passport.use(new LocalStrategy(
  async function(username: string, password: string, done) {
    try {
      const userService = new UserService();
      const user = await userService.findByUsername(username);

      if (!user) {
        console.error(':::: Don\'t find user');
        return done(null, false); 
      }

      if(password !== user.password){
        console.error(':::: Password error');
        return done(null, false);
      }

      return done(null, user);

    } catch (error) {
      return done(error);
    }
  }
));