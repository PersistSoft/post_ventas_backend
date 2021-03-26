import { NextFunction, Request, Response, Router } from 'express';
import { ProjectDto } from '../dto/project.dto';
import { ProjectService } from './../services/projects.service';
import Boom from '@hapi/boom';

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
    let projects = await this.projectService.findAll();
    res.send(projects).json;
  };

  /**
   * Crete new Project
   */
  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log('req.body', req.body);
      const project = req.body as ProjectDto;
      console.log('project', project);
      const projectDto = await this.projectService.create(project);
      console.log('projectDto', projectDto);
      res.status(201).send(projectDto);
    } catch (error) {
      next(Boom.badImplementation(error));
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
    this.router.post('/', this.create);
    this.router.put('/:id', this.update);
    this.router.delete('/:id', this.delete);
  }
}
