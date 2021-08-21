import { NextFunction, Request, Response, Router } from 'express';
import { WarrantyService } from './../services/warranty.service';
import { WarrantyDto } from '../dto/warranty.dto';

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
    try {
      let warranties = await this.warrantyService.findAll();
      res.status(200).json(warranties);
    } catch (error) {
      res.status(500).json(error);
    }
  };

  /**
   * Crete new Warranty
   */
  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let warranty = req.body as WarrantyDto;
      let warrantyOutput = await this.warrantyService.create(warranty);
      res.status(200).jsonp(warrantyOutput);
    } catch (error) {
      res.status(500).json(error);
    }
  };

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
