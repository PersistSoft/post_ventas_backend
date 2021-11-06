import Boom from '@hapi/boom';
import { NextFunction, Request, Response, Router } from 'express';
import { WarrantyTypeDto } from '../dto/warrantyType.dto';
import { WarrantyTypeService } from './../services/warrantyType.service';
import { validationHandler } from './../utils/middleware/schemaValidation';
import { WarrantyTypeSchema } from './../utils/schema/types.schema';
import { roleValidation } from '../utils/middleware/roleValidation';
import passport from 'passport';

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

    try {

      let warrantiesTypes = await this.warrantyTypeService.findAll();
      res.status(200).json(warrantiesTypes);  

    } catch (error) {
      res.status(500).json(error);
    }
    
  };

  /**
   * Crete new Users
   */
  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      
      let warrantyType = req.body as WarrantyTypeDto;
      let newWarrantyType = await this.warrantyTypeService.create(warrantyType);
      res.status(201).json(newWarrantyType);

    } catch (error) {
      res.status(500).json(error);
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
    this.router.get('/', this.warrantiesTypes);
    this.router.post('/', passport.authenticate('jwt', { session: false }), roleValidation(['Admin']), validationHandler(WarrantyTypeSchema), this.create);
    this.router.put('/:id', passport.authenticate('jwt', { session: false }), roleValidation(['Admin']), this.update);
    this.router.delete('/:id', passport.authenticate('jwt', { session: false }), roleValidation(['Admin']), this.delete);
  }
}
