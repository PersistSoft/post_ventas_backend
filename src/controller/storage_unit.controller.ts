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
    try {

      let storage_units = await this.storageUnitService.findAll();
      res.send(storage_units).json;  

    } catch (error) {
      res.status(500).json(error); 
    }
  };

  /**
   * Crete new Storage
   */
  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let storage_unit: StorageUnitDto = req.body;
      
      const newStorageUnit = await this.storageUnitService.create(storage_unit);

      res.status(201).json(storage_unit);

    } catch (error) {
      res.status(500).json(error);
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
    this.router.post('/', this.create);
    this.router.put('/:id', this.update);
    this.router.delete('/:id', this.delete);
  }
}
