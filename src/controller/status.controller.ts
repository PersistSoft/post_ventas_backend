import { Request, Response, Router } from 'express';
import { StatusService } from '../services/status.service';

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
    res.send(status).json;
  };

  /**
   * Crete new Status
   */
  public create(req: Request, res: Response) {
    res.send('create');
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
    this.router.get('/', this.status);
    this.router.post('/', this.create);
    this.router.put('/:id', this.update);
    this.router.delete('/:id', this.delete);
  }
}
