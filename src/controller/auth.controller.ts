import {NextFunction, Request, Response, Router} from 'express';
import { User } from '../database/entities/user';
import { UserService } from '../services/users.service';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import '../auth/strategies/basic';
import { UserDto } from '../dto/user.dto';
import Boom from '@hapi/boom';
import { SignUpSchema } from './../utils/schema/signUp.schema';
import { validationHandler } from './../utils/middleware/schemaValidation';

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
   * Sign Up user
   * @param req 
   * @param res 
   * @param next 
   */
  public signUp = async(req: Request, res: Response, next: NextFunction) => {
    try {
      const userDto = req.body as UserDto;
      const user = await this.userService.save(userDto);
    
      return res.status(200).json(user);
    } catch (error) {
      next(Boom.badRequest(error));
    }
  }

  /**
   * Login 
   * @param req 
   * @param res 
   * @param next 
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
        role: user.role.name
      }

      const token = jwt.sign(payload, 'secret', {
        expiresIn: '15m'
      });

      return res.status(200).json({ token });

    })(req, res);
  }

  public routes(){
    this.router.post('/login', this.login);
    this.router.post('/signUp', validationHandler(SignUpSchema), this.signUp);
  }
}