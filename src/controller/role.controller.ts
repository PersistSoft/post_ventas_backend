import Boom from '@hapi/boom';
import {NextFunction, Request, Response, Router} from 'express';
import { RoleDto } from '../dto/role.dto';
import { RoleService } from '../services/role.service';
import { validationHandler} from './../utils/middleware/schemaValidation';
import { RoleSchema } from './../utils/schema/types.schema';
 
export class RoleController {
  public router: Router;
  private roleService: RoleService;

  constructor(){
    this.init();
  }

  private init() {
    this.roleService =  new RoleService();
    this.router = Router();
    this.routes();
  }

  /**
   * Get all Roles
   */

  public index = async (req: Request, res: Response) => {
    
    try {

      let roles = await this.roleService.findAll();
      res.status(200).json(roles);  

    } catch (error) {
      res.status(500).json(error);
    }
  } 

  /**
   * Crete new Role
   */
  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      
      const role = req.body as RoleDto;
      const newRole = await this.roleService.create(role);
      res.status(201).json(newRole);

    } catch (error) {
      res.status(500).json(error);
    }
  }

  /**
   * Update Role
   */
  public update(req: Request, res: Response){
    res.send('update');
  }

  /**
   * Delete Role
   */
  public delete(req: Request, res: Response){
    res.send('delete');
  } 

  public routes(){
    this.router.get('/', this.index);
    this.router.post('/', this.create);
    this.router.put('/:id', this.update);
    this.router.delete('/:id', this.delete);
  }
}