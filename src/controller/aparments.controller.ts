import { Response, Request, Router, NextFunction } from 'express';
import { roleValidation } from '../utils/middleware/roleValidation';
import passport from 'passport';

import { AparmentService } from './../services/aparments.service';
import { AparmentDto } from '../dto/aparment.dto';

export class AparmentsController {
  public router: Router;
  private aparmentService: AparmentService;

  constructor() {
    this.init();
  }

  private init() {
    this.router = Router();
    this.routes();
    this.aparmentService = new AparmentService();
  }

  /**
   * Get all Aparments
   */

  public aparments = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let aparments = await this.aparmentService.findAll();
      res.status(200).json(aparments);
    } catch (error) {
      res.status(500).json(error);
    }
  };

  /**
   * Get Aparments By Building Id
   */

  public aparmentsByBuildingId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let idBuil: number = parseInt(req.params.idBuilding);
      let aparments = await this.aparmentService.findByBuildingId(idBuil);
      res.status(200).json(aparments);
    } catch (error) {
      res.status(500).json(error);
    }
  };

  /**
   * Crete new Aparment
   */
  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let aparmentDto: AparmentDto = req.body;

      const newAparmentDto = await this.aparmentService.create(aparmentDto);
      res.status(201).json(aparmentDto);
    } catch (error) {
      res.status(500).json(error);
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

  /**
   * Validate apartment
   * @param req 
   * @param res 
   * @param next 
   */
  public validateApartment = async (req: Request, res: Response, next: NextFunction) => {
    try {

      let request = req.body;
      const appartment = await this.aparmentService.validateAppartment(request);

      if(appartment){
        res.json(appartment);
      }

      res.status(401).json({
        message: 'Not found'
      });

    } catch (error) {
      res.status(500).json(error);
    }
  };

  public configurate = async (req: Request, res: Response, next: NextFunction) => {
    try {

     await this.aparmentService.configureAppartment();
     res.status(201).json({
       message: 'The appartments ware configurated'
     });

    } catch (error) {
      res.status(500).json(error);
    }
  };

  public routes() {
    this.router.get('/', passport.authenticate('jwt', { session: false }), roleValidation(['Admin']), this.aparments);
    this.router.get('/:idBuilding', this.aparmentsByBuildingId);
    this.router.post('/', passport.authenticate('jwt', { session: false }), roleValidation(['Admin']), this.create);
    this.router.put('/:id', passport.authenticate('jwt', { session: false }), roleValidation(['Admin']), this.update);
    this.router.delete('/:id', passport.authenticate('jwt', { session: false }), roleValidation(['Admin']), this.delete);
    this.router.post('/validate', passport.authenticate('jwt', { session: false }), roleValidation(['Admin']), this.validateApartment);
    this.router.post('/configurate', passport.authenticate('jwt', { session: false }), roleValidation(['Admin']), this.configurate);  }
}
