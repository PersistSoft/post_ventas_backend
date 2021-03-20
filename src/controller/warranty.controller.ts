import { Request, Response, Router } from 'express';
import { WarrantyService } from './../services/warranty.service';

export class WarrantyController {
  private warrantyService: WarrantyService;
  public router: Router;

  constructor() {
    this.init();
  }

  init() {
    this.warrantyService = new WarrantyService();
    this.router = Router();
    this.routes();
  }

  /**
   * Get all Warranties
   */

  public warranties = async (req: Request, res: Response) => {
    let warranties = await this.warrantyService.findAll();
    res.send(warranties).json;
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
    this.router.get('/', this.warranties);
    this.router.post('/', this.create);
    this.router.put('/:id', this.update);
    this.router.delete('/:id', this.delete);
  }
}
