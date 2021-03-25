import Boom from '@hapi/boom';
import { NextFunction, Request, Response, Router } from 'express';
import { WarrantyTypeDto } from '../dto/warrantyType.dto';
import { WarrantyTypeService } from './../services/warrantyType.service';
import { validationHandler } from './../utils/middleware/schemaValidation';
import { WarrantyTypeSchema } from './../utils/schema/types.schema';

export class WarrantyTypeController {
  private warrantyTypeService: WarrantyTypeService;
  public router: Router;

  constructor() {
    this.init();
  }

  init() {
    this.warrantyTypeService = new WarrantyTypeService();
    this.router = Router();
    this.routes();
  }

  /**
   * Get all WarrantiesTypes
   */

  public warrantiesTypes = async (req: Request, res: Response) => {
    let warrantiesTypes = await this.warrantyTypeService.findAll();
    res.status(200).json(warrantiesTypes);
  };

  /**
   * Crete new Users
   */
  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      
      let warrantyType = req.body as WarrantyTypeDto;
      warrantyType = await this.warrantyTypeService.create(warrantyType);
      res.status(201).json(warrantyType);

    } catch (error) {
      next(Boom.badImplementation(error)); 
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
    this.router.get('/', validationHandler(WarrantyTypeSchema), this.warrantiesTypes);
    this.router.post('/', this.create);
    this.router.put('/:id', this.update);
    this.router.delete('/:id', this.delete);
  }
}
