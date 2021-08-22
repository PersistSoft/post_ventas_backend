import { Response, Request, Router, NextFunction } from 'express';
import multer from 'multer';
import { PSFile } from '../database/entities/file';
import { FileService } from '../services/file.service';
import fs from 'fs';
import { roleValidation } from '../utils/middleware/roleValidation';
import passport from 'passport';

const upload = multer({ dest: '/tmp' })

export class FileController {
  private fileService: FileService;
  public router: Router;

  constructor(){
    this.fileService = new FileService();
    this.router = Router();
    this.routes();
  }

  /**
   * Create new file
   */
   public create = async (req: Request, res: Response, next: NextFunction) => {
    try {

      const file = req['file'] as File;
      const newFile = await this.fileService.create(file);
      res.status(201).json(newFile);
      
    } catch (error) {
      res.status(500).json(error);
    }
  };

  /**
   * Get file attachment
   */
  public downloadAttachFile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        
      const fileId = req.params['id'];
      const file = await this.fileService.findById(parseInt(fileId)) as PSFile;

      res.setHeader('Content-disposition', 'attachment; filename=' + file.name);
      res.setHeader('Content-type', file.mimetype);
        
      res.write(file.byte,'binary');
      res.end(null, 'binary');

    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  };

  /**
   * Get file inline
   */
   public downloadInlineFile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        
      const fileId = req.params['id'];
      const file = await this.fileService.findById(parseInt(fileId)) as PSFile;

      res.setHeader('Content-disposition', 'inline; filename=' + file.name);
      res.setHeader('Content-type', file.mimetype);
        
      res.write(file.byte,'binary');
      res.end(null, 'binary');

    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  };

  /**
  * Get file inline
  */
  public signDocument = async (req: Request, res: Response, next: NextFunction) => {
    try {
        
      const newFile = await this.fileService.createSignature(req.query['signature'] as string);
      res.status(201).json(newFile);

    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  };

  public massiveLoading = async (req: Request, res: Response, next: NextFunction) => {
    try {
        
      const file = req['file'] as File;
      const logs = await this.fileService.massiveLoading(file);
      res.status(201).json(logs);

    } catch (error) {
      res.status(500).json(error);
    }
  }

  public routes() {
    this.router.post('/', upload.single('file'), this.create);
    this.router.get('/downloadAttach/:id', this.downloadAttachFile);
    this.router.get('/downloadInline/:id', this.downloadInlineFile);
    this.router.post('/signDocument', this.signDocument);
    this.router.post('/massiveLoading', passport.authenticate('jwt', { session: false }), roleValidation(['Admin']), upload.single('file'), this.massiveLoading);
  }
}