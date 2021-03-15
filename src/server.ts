import 'reflect-metadata';
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import {IndexController} from './controller/index.controller';
import { RoleController} from './controller/role.controller';

import { createConnection } from 'typeorm';
import compression from 'compression';
import cors from 'cors';

class Server {
  private roleController: RoleController;
  private indexController: IndexController

  private apiPrefix = 'api';
  private rolePrefix = 'roles';

  private app: express.Application;

  constructor(){
    this.app = express();
    this.configuration();
    this.routes();
  }

  /**
   * Method to configure the server
   */
  public configuration(){
    this.app.set('port', process.env.PORT || 3001);
    this.app.use(morgan('dev'));
    this.app.use(express.json());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(cors());
  }

  /**
   * Method to configure the routes
   */
  public async routes(){
    await createConnection("postventa");
    this.roleController = new RoleController();
    this.indexController = new IndexController();

    this.app.use(this.indexController.router);
    this.app.use(`/${this.apiPrefix}/${this.rolePrefix}`,this.roleController.router);

  } 

  /**
   * Used to start the server
   */
  public start(){
    this.app.listen(this.app.get('port'), () => {
      console.log(`Server is listening ${this.app.get('port')} port.`);
    });
  }
}

const server = new Server();
server.start();