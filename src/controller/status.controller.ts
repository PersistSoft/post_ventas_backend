import Boom from '@hapi/boom';
import { NextFunction, Request, Response, Router } from 'express';
import { StatusDto } from '../dto/status.dto';
import { StatusService } from '../services/status.service';
import { validationHandler} from './../utils/middleware/schemaValidation';
import { StatusSchema } from './../utils/schema/types.schema';

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
    let status = await this.statusService.findAll();
    res.status(200).json(status);
  };

  /**
   * Crete new Status
   */
  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {

      let status = req.body as StatusDto;
      status = await this.statusService.create(status);
      res.status(201).json(status);

    } catch (error) {
      next(Boom.badImplementation(error))
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
    this.router.get('/', validationHandler(StatusSchema), this.status);
    this.router.post('/', this.create);
    this.router.put('/:id', this.update);
    this.router.delete('/:id', this.delete);
  }
}
