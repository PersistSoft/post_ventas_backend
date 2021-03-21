import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

//const passport = require('passport');
//const { Strategy, ExtractJwt } = require('passport-jwt');

passport.use( new Strategy({
  secretOrKey: 'campos',
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
},
 async function (tokenPayload, cb){
   //TODO user service 
   try {
    //TODO
    //find user 
    //return callBack('Unauthorized', false);

    return cb({name: 'camposb', role: 'Admin'});
    
   } catch (error) {
     return cb(error);
   }
 }
 ));