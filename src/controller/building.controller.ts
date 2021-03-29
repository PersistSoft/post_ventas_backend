import Boom from '@hapi/boom';
import { NextFunction, Request, Response, Router } from 'express';
import { validationHandler } from './../utils/middleware/schemaValidation';

import { BuildingDto } from '../dto/building.dto';
import { BuildingSchema } from './../utils/schema/building.schema';
import { Project } from '../database/entities/project';
import { BuildingService } from '../services/building.service';
import { ProjectService } from './../services/projects.service';

export class BuildingController {
  public router: Router;
  public buildingService: BuildingService;
  public projectService: ProjectService;

  constructor() {
    this.init();
  }

  private init() {
    this.buildingService = new BuildingService();
    this.projectService = new ProjectService();
    this.router = Router();
    this.routes();
  }

  /**
   * Get all Buildings
   */

  public buildings = async (req: Request, res: Response) => {
    let buildings = await this.buildingService.findAll();
    res.send(buildings).json;
  };

  /**
   * Crete new Building
   */
  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let buildingDto: BuildingDto = req.body;

      let projectDto = (await this.projectService.findById(buildingDto.project_id)) as Project;
      if (!projectDto) {
        next(Boom.badImplementation('Does not found the project related to the building'));
      }

      buildingDto = await this.buildingService.create(buildingDto, projectDto);

      res.status(201).json(buildingDto);
    } catch (error) {
      next(Boom.badImplementation(error));
    }
  };
  /**
   * Update Building
   */
  public update(req: Request, res: Response) {
    res.send('update');
  }

  /**
   * Delete Building
   */
  public delete(req: Request, res: Response) {
    res.send('delete');
  }

  public routes() {
    this.router.get('/', this.buildings);
    this.router.post('/', validationHandler(BuildingSchema), this.create);
    this.router.put('/:id', this.update);
    this.router.delete('/:id', this.delete);
  }
}
