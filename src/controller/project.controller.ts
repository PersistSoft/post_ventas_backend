import { Request, Response, Router } from 'express';
import { ProjectService } from './../services/projects.service';

export class ProjectController {
  private projectService: ProjectService;
  public router: Router;

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
  public create(req: Request, res: Response) {
    res.send('create');
  }

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
  }
}
