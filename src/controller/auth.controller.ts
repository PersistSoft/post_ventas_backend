import {NextFunction, Request, Response, Router} from 'express';
import { User } from '../database/entities/user';
import { UserService } from '../services/users.service';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import '../auth/strategies/basic';

export class AuthController {
  public router: Router;
  private userService: UserService;

  constructor(){
    this.init();
  }

  private init() {
    this.userService =  new UserService();
    this.router = Router();
    this.routes();
  }

  /**
   * Login
   */
  public login = async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('local', function (error, user: User, info) { 
      if (error) {
        res.status(401).send(error);
      } 
      
      if (!user) {
        res.status(401).send(info);
      }

      const payload = {
        sub: user.id,
        username: user.username,
        email: user.email,
        role: user.rol || []
      }

      const token = jwt.sign(payload, 'secret', {
        expiresIn: '15m'
      });

      return res.status(200).json({ token });

    })(req, res);
  }

  public routes(){
    this.router.post('/', this.login);
  }
}
/*

import {NextFunction, Request, Response, Router} from 'express';
import { User } from '../database/entities/user';
import { UserService } from '../services/users.service';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import '../auth/strategies/basic';

export class AuthController {
  public router: Router;
  private userService: UserService;

  constructor(){
    this.init();
  }

  private init() {
    this.userService =  new UserService();
    this.router = Router();
    this.routes();
  }

  
  public login = async (req: Request, res: Response, next: NextFunction) => {
    
    passport.authenticate('local', function (error, user, info) {
      // this will execute in any case, even if a passport strategy will find an error
      // log everything to console
      console.log('error: ',error);
      console.log('user: ',user);
      console.log('info',info);

      if (error) {
        res.status(401).send(error);
      } else if (!user) {
        res.status(401).send(info);
      } else {
        next();
      }

      res.status(401).send(info);
    })(req, res);
    /*
    passport.authenticate('local', function(error: any, user:User){
      try {
        console.log('LOGIN');
        console.log('error: ',error);
        console.log('user: ',user);
        
        if(error || !user){
           
        }

        req.logIn(user, {session: false}, async function (error){
          if(error){
            next(error);
          }

          const payload = {
            sub: 1,
            username: 'bautistaj',
            email: '',
            role: ''
          }

          const token = jwt.sign(payload, 'secret', {});

          return res.status(200).json({ token });

        });
      } catch (error) {
        next(error);
      }
    })(req, res, next);
    
  }

  public routes(){
    this.router.post('/', this.login);
  }
}
*/