import { Request, Response, Router } from 'express';
import { UserService } from '../services/users.service';
import passport from 'passport';
import '../auth/strategies/jwt';
import { roleValidation } from '../utils/middleware/roleValidation';

export class UserController {
  public router: Router;
  public userService: UserService;

  constructor() {
    this.init();
  }

  private init() {
    this.userService = new UserService();
    this.router = Router();
    this.routes();
  }

  /**
   * Get all Users
   */

  public users = async (req: Request, res: Response) => {
    let users = await this.userService.findAll();
    res.send(users).json;
  };

  /**
   * Crete new Users
   */
  public create(req: Request, res: Response) {
    res.send('create');
  }

  /**
   * Update Users
   */
  public update(req: Request, res: Response) {
    res.send('update');
  }

  /**
   * Delete Users
   */
  public delete(req: Request, res: Response) {
    res.send('delete');
  }

  public routes() {
    //this.router.get('/', passport.authenticate('jwt', { session: false }), roleValidation(['Admin']), this.users);
    this.router.get('/', this.users);
    this.router.post('/', this.create);
    this.router.put('/:id', this.update);
    this.router.delete('/:id', this.delete);
  }
}
