import Boom from '@hapi/boom';
import { Response, Request, Router, NextFunction } from 'express';
import { AparmentTypeService } from './../services/aparmentType.service';
import { ApartmentTypeSchema } from './../utils/schema/types.schema';
import { validationHandler } from './../utils/middleware/schemaValidation';
import { ApartmentTypeDto } from '../dto/apartmentType.dto';

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
    res.status(200).json(aparmentsType);
  };

  /**
   * Crete new aparmentsType
   */
  public create = async (req: Request, res: Response, next: NextFunction) => {

    try {

      let apartmentTypeDto = req.body as ApartmentTypeDto;
      apartmentTypeDto = await this.aparmentTypeService.create(apartmentTypeDto);
      res.status(201).json(apartmentTypeDto);      
      
    } catch (error) {
      next(Boom.badImplementation(error));
    }
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
    this.router.post('/', validationHandler(ApartmentTypeSchema), this.create);
    this.router.put('/:id', this.update);
    this.router.delete('/:id', this.delete);
  }
}
