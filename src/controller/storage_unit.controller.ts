import { NextFunction, Request, Response, Router } from 'express';
import { StorageUnitService } from '../services/storage_unit.service';
import { AparmentService } from '../services/aparments.service';
import { StorageUnitDto } from '../dto/storageUnit.dto';

import { roleValidation } from '../utils/middleware/roleValidation';
import passport from 'passport';

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
    this.router.get('/', passport.authenticate('jwt', { session: false }), roleValidation(['Admin']), this.parkings);
    this.router.post('/', passport.authenticate('jwt', { session: false }), roleValidation(['Admin']), this.create);
    this.router.put('/:id', passport.authenticate('jwt', { session: false }), roleValidation(['Admin']), this.update);
    this.router.delete('/:id', passport.authenticate('jwt', { session: false }), roleValidation(['Admin']), this.delete);
  }
}
