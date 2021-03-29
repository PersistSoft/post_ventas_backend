import { NextFunction, Request, Response, Router } from 'express';
import { validationHandler } from './../utils/middleware/schemaValidation';
import Boom from '@hapi/boom';

import { ParkingSchema } from './../utils/schema/parking.schema';

import { ParkingService } from '../services/parking.service';
import { AparmentService } from '../services/aparments.service';
import { ParkingDto } from '../dto/parking.dto';
import { Aparment } from '../database/entities/aparments';

export class ParkingController {
  public router: Router;
  private parkingService: ParkingService;
  private aparmentService: AparmentService;

  constructor() {
    this.init();
  }

  private init() {
    this.parkingService = new ParkingService();
    this.aparmentService = new AparmentService();
    this.router = Router();
    this.routes();
  }

  /**
   * Get all Parkings
   */

  public parkings = async (req: Request, res: Response) => {
    let parking = await this.parkingService.findAll();
    res.send(parking).json;
  };

  /**
   * Crete new Parkings
   */
  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let parking: ParkingDto = req.body;
      console.log(parking);
      let aparment = (await this.aparmentService.findById(parking.aparment_id)) as Aparment;

      if (!parking || !aparment) {
        next(Boom.badRequest('Doest not found aparmet'));
      }

      parking = await this.parkingService.create(parking, aparment);
      res.status(201).json(parking);
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
    this.router.post('/', validationHandler(ParkingSchema), this.create);
    this.router.put('/:id', this.update);
    this.router.delete('/:id', this.delete);
  }
}
