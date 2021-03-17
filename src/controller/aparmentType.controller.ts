import { Response, Request, Router } from 'express';

import { AparmentTypeService } from './../services/aparmentType.service';

export class AparmentTypeController {
  public router: Router;
  private aparmentTypeService: AparmentTypeService;

  constructor() {
    this.init();
  }

  private init() {
    this.router = Router();
    this.routes();
    this.aparmentTypeService = new AparmentTypeService();
  }

  /**
   * Get all aparmentsType
   */

  public aparmentsType = async (req: Request, res: Response) => {
    let aparmentsType = await this.aparmentTypeService.findAll();
    res.send(aparmentsType).json;
  };

  /**
   * Crete new aparmentsType
   */
  public create(req: Request, res: Response) {
    res.send('create');
  }

  /**
   * Update aparmentsType
   */
  public update(req: Request, res: Response) {
    res.send('update');
  }

  /**
   * Delete aparmentsType
   */
  public delete(req: Request, res: Response) {
    res.send('delete');
  }

  public routes() {
    this.router.get('/', this.aparmentsType);
    this.router.post('/', this.create);
    this.router.put('/:id', this.update);
    this.router.delete('/:id', this.delete);
  }
}
