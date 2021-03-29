import { Response, Request, Router, NextFunction } from 'express';
import Boom from '@hapi/boom';
import { validationHandler } from './../utils/middleware/schemaValidation';

import { Aparment } from '../database/entities/aparments';
import { Building } from '../database/entities/building';
import { AparmentType } from '../database/entities/aparmentType';
import { aparmentSchema } from './../utils/schema/aparment.schema';

import { AparmentService } from './../services/aparments.service';
import { BuildingService } from './../services/building.service';
import { AparmentTypeService } from '../services/aparmentType.service';
import { ApartmentTypeDto } from '../dto/apartmentType.dto';
import { AparmentDto } from '../dto/aparment.dto';

export class AparmentsController {
  public router: Router;
  private aparmentService: AparmentService;
  private buildingService: BuildingService;
  private aparmentTypeService: AparmentTypeService;

  constructor() {
    this.init();
  }

  private init() {
    this.router = Router();
    this.routes();
    this.aparmentService = new AparmentService();
    this.buildingService = new BuildingService();
    this.aparmentTypeService = new AparmentTypeService();
  }

  /**
   * Get all Aparments
   */

  public aparments = async (req: Request, res: Response) => {
    let aparments = await this.aparmentService.findAll();
    res.send(aparments).json;
  };

  /**
   * Crete new Aparment
   */
  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let aparmentDto: AparmentDto = req.body;
      console.log(aparmentDto);
      let building = (await this.buildingService.findById(aparmentDto.building_id)) as Building;
      console.log('typeId', aparmentDto.type_id);
      let aparmentType = (await this.aparmentTypeService.findById(aparmentDto.type_id)) as AparmentType;
      console.log(aparmentType);
      if (!building || !aparmentType) {
        next(Boom.badImplementation('Does not Found building or Aparment'));
      }

      aparmentDto = await this.aparmentService.create(aparmentDto, building, aparmentType);
      res.status(201).json(aparmentDto);
    } catch (error) {
      console.log(next(Boom.badImplementation(error)));
    }
  };

  /**
   * Update Aparment
   */
  public update(req: Request, res: Response) {
    res.send('update');
  }

  /**
   * Delete Aparment
   */
  public delete(req: Request, res: Response) {
    res.send('delete');
  }

  public routes() {
    this.router.get('/', this.aparments);
    this.router.post('/', validationHandler(aparmentSchema), this.create);
    this.router.put('/:id', this.update);
    this.router.delete('/:id', this.delete);
  }
}
