import Boom from '@hapi/boom';
import { NextFunction, Request, Response, Router } from 'express';
import { BuildingDto } from '../dto/building.dto';
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
    try {
      let buildings = await this.buildingService.findAll();
      res.send(buildings).json;
    } catch (error) {
      res.status(500).json(error);
    }
  };

  /**
   * Crete new Building
   */
  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let buildingDto: BuildingDto = req.body;
      const newBuildingDto = await this.buildingService.create(buildingDto);
      res.status(201).json(newBuildingDto);
    } catch (error) {
      res.status(500).json(error);
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
    this.router.post('/', this.create);
    this.router.put('/:id', this.update);
    this.router.delete('/:id', this.delete);
  }
}
