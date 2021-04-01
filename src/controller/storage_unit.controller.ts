import { NextFunction, Request, Response, Router } from 'express';
import { validationHandler } from './../utils/middleware/schemaValidation';
import Boom from '@hapi/boom';

import { StorageUnitSchema } from './../utils/schema/storageUnit.schema';

import { StorageUnitService } from '../services/storage_unit.service';
import { AparmentService } from '../services/aparments.service';
import { StorageUnitDto } from '../dto/storageUnit.dto';
import { Aparment } from '../database/entities/aparments';

export class StorageUnitController {
  public router: Router;
  private storageUnitService: StorageUnitService;
  private aparmentService: AparmentService;

  constructor() {
    this.init();
  }

  private init() {
    this.storageUnitService = new StorageUnitService();
    this.aparmentService = new AparmentService();
    this.router = Router();
    this.routes();
  }

  /**
   * Get all Storage Units
   */

  public parkings = async (req: Request, res: Response) => {
    let storage_units = await this.storageUnitService.findAll();
    res.send(storage_units).json;
  };

  /**
   * Crete new Storage
   */
  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let storage_unit: StorageUnitDto = req.body;

      let aparment = (await this.aparmentService.findById(storage_unit.aparment_id));

      if (!storage_unit || !aparment) {
        next(Boom.badRequest('Doest not found aparmet'));
      }
      
      let apt = new Aparment();
      apt.id = aparment.id;

      storage_unit = await this.storageUnitService.create(storage_unit, apt);    
      res.status(201).json(storage_unit);apt
    } catch (error) {
      next(Boom.badImplementation(error));
    }
  };

  /**
   * Update Role
   */
  public update(req: Request, res: Response) {
    res.send('update');
  }

  /**
   * Delete Parkings
   */
  public delete(req: Request, res: Response) {
    res.send('delete');
  }

  public routes() {
    this.router.get('/', this.parkings);
    this.router.post('/', validationHandler(StorageUnitSchema), this.create);
    this.router.put('/:id', this.update);
    this.router.delete('/:id', this.delete);
  }
}
