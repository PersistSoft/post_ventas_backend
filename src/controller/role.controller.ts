import {Request, Response, Router} from 'express';
import { RoleService } from '../services/role.service';

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
    let roles = await this.roleService.findAll();
    res.send(roles).json;
  } 

  /**
   * Crete new Role
   */
  public create(req: Request, res: Response){
    res.send('create');
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