import Boom from '@hapi/boom';
import { NextFunction, Request, Response, Router } from 'express';
import { StatusDto } from '../dto/status.dto';
import { StatusService } from '../services/status.service';
import { validationHandler} from './../utils/middleware/schemaValidation';
import { StatusSchema } from './../utils/schema/types.schema';
import { roleValidation } from '../utils/middleware/roleValidation';
import passport from 'passport';

export class StatusController {
  public router: Router;
  private statusService: StatusService;

  constructor() {
    this.init();
  }

  private init() {
    this.statusService = new StatusService();
    this.router = Router();
    this.routes();
  }

  /**
   * Get all Status
   */

  public status = async (req: Request, res: Response) => {
    try {

      let status = await this.statusService.findAll();
      res.status(200).json(status);  

    } catch (error) {
      res.status(500).json(error);
    }
    
  };

  /**
   * Crete new Status
   */
  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {

      let status = req.body as StatusDto;
      let newStatus = await this.statusService.create(status);
      res.status(201).json(newStatus);

    } catch (error) {
      res.status(500).json(error);
    }
  }

  /**
   * Update Status
   */
  public update(req: Request, res: Response) {
    res.send('update');
  }

  /**
   * Delete Status
   */
  public delete(req: Request, res: Response) {
    res.send('delete');
  }

  public routes() {
    this.router.get('/', passport.authenticate('jwt', { session: false }), roleValidation(['Admin']), this.status);
    this.router.post('/', passport.authenticate('jwt', { session: false }), roleValidation(['Admin']), validationHandler(StatusSchema), this.create);
    this.router.put('/:id', passport.authenticate('jwt', { session: false }), roleValidation(['Admin']), this.update);
    this.router.delete('/:id', passport.authenticate('jwt', { session: false }), roleValidation(['Admin']), this.delete);
  }
}
