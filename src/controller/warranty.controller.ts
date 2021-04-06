import { NextFunction, Request, Response, Router } from 'express';
import { WarrantyService } from './../services/warranty.service';
import { WarrantySchema } from './../utils/schema/warranty.schema';
import { validationHandler } from './../utils/middleware/schemaValidation';
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
    let warranties = await this.warrantyService.findAll();
    res.status(200).json(warranties);
  };

  /**
   * Crete new Users
   */
  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      
      let warranty = req.body as WarrantyDto;
      let warrantyOutput = await this.warrantyService.create(warranty);
      res.status(200).jsonp(warrantyOutput);  

    } catch (error) {
      next(error);
    }
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
    this.router.post('/', validationHandler(WarrantySchema), this.create);
    this.router.put('/:id', this.update);
    this.router.delete('/:id', this.delete);
  }
}
