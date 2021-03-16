import { Response, Request, Router } from 'express';

import { AparmentService } from './../services/aparments.service';

export class AparmentsController {
  public router: Router;
  private aparmentService: AparmentService;

  constructor() {
    this.init();
  }

  private init() {
    this.router = Router();
    this.routes();
    this.aparmentService = new AparmentService();
  }

  /**
   * Get all Aparments
   */

  public aparments = async (req: Request, res: Response) => {
    let aparments = await this.aparmentService.findAll();
    res.send(aparments).json;
  };

  /**
   * Crete new Aparment
   */
  public create(req: Request, res: Response) {
    res.send('create');
  }

  /**
   * Update Aparment
   */
  public update(req: Request, res: Response) {
    res.send('update');
  }

  /**
   * Delete Aparment
   */
  public delete(req: Request, res: Response) {
    res.send('delete');
  }

  public routes() {
    this.router.get('/', this.aparments);
    this.router.post('/', this.create);
    this.router.put('/:id', this.update);
    this.router.delete('/:id', this.delete);
  }
}
