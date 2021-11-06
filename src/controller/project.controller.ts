import { NextFunction, Request, Response, Router } from 'express';
import Boom from '@hapi/boom';

import { validationHandler } from './../utils/middleware/schemaValidation';
import { ProjectDto } from '../dto/project.dto';
import { ProjectService } from './../services/projects.service';
import { ProjectSchema } from '../utils/schema/project.schema';
import { roleValidation } from '../utils/middleware/roleValidation';
import passport from 'passport';

export class ProjectController {
  public router: Router;
  private projectService: ProjectService;

  constructor() {
    this.init();
  }

  private init() {
    this.projectService = new ProjectService();
    this.router = Router();
    this.routes();
  }

  /**
   * Get all Projects
   */

  public projects = async (req: Request, res: Response) => {
    try {

      let projects = await this.projectService.findAll();
      res.send(projects).json;  

    } catch (error) {
      res.status(500).json(error);
    }
    
  };

  /**
   * Crete new Project
   */
  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      
      const project = req.body as ProjectDto;
      const projectDto = await this.projectService.create(project);
      res.status(201).send(projectDto);

    } catch (error) {
      res.status(500).json(error);
    }
  };

  /**
   * Update Project
   */
  public update(req: Request, res: Response) {
    res.send('update');
  }

  /**
   * Delete Project
   */
  public delete(req: Request, res: Response) {
    res.send('delete');
  }

  public routes() {
    this.router.get('/', this.projects);
    this.router.post('/', passport.authenticate('jwt', { session: false }), roleValidation(['Admin']), validationHandler(ProjectSchema), this.create);
    this.router.put('/:id', passport.authenticate('jwt', { session: false }), roleValidation(['Admin']), this.update);
    this.router.delete('/:id', passport.authenticate('jwt', { session: false }), roleValidation(['Admin']), this.delete);
  }
}
