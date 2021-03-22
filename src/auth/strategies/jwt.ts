import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UserService } from './../../services/users.service';

passport.use( new Strategy({
  secretOrKey: 'secret',
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
},
 async function (tokenPayload, done){
   try {
    let userService = new UserService();
    const user = await userService.findByUsername(tokenPayload.username);
    
    if(!user){
      return done('Error', false);
    }
    
    return done(null, { ...user, role: tokenPayload.role });
    
   } catch (error) {
     return done(error);
   }
 }
));