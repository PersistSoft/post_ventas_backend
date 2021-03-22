import Boom from '@hapi/boom';
import {NextFunction, Request, Response, Router} from 'express';
import { User } from '../../database/entities/user';

export const roleValidation = (role: string) => {
  return function(req: Request, res:Response, next:NextFunction){
    const user = req.user as User;
    
    if(!user || (user && !user.role)){
      next(Boom.unauthorized('Missing roles'));
    }

    if(role === user.role.name){
      next(Boom.unauthorized('Unknown role'));
    }
    
    next();
  }
}