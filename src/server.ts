import 'reflect-metadata';
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';

import { IndexController } from './controller/index.controller';
import { RoleController } from './controller/role.controller';
import { UserController } from './controller/user.controller';
import { ProjectController } from './controller/project.controller';
import { BuildingController } from './controller/building.controller';
import { AparmentsController } from './controller/aparments.controller';
import { ParkingController } from './controller/parking.controller';
import { StorageUnitController } from './controller/storage_unit.controller';

import { createConnection } from 'typeorm';
import compression from 'compression';
import cors from 'cors';

class Server {
  private roleController: RoleController;
  private indexController: IndexController;
  private userController: UserController;
  private projectController: ProjectController;
  private buildingController: BuildingController;
  private aparmentsController: AparmentsController;
  private parkingController: ParkingController;
  private storageUnitController: StorageUnitController;

  private apiPrefix = 'api';

  private app: express.Application;

  constructor() {
    this.app = express();
    this.configuration();
    this.routes();
  }

  /**
   * Method to configure the server
   */
  public configuration() {
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
  public async routes() {
    await createConnection('postventa');
    this.indexController = new IndexController();
    this.roleController = new RoleController();
    this.userController = new UserController();
    this.projectController = new ProjectController();
    this.buildingController = new BuildingController();
    this.aparmentsController = new AparmentsController();
    this.parkingController = new ParkingController();
    this.storageUnitController = new StorageUnitController();

    this.app.use(this.indexController.router);
    this.app.use(`/${this.apiPrefix}/roles`, this.roleController.router);
    this.app.use(`/${this.apiPrefix}/users`, this.userController.router);
    this.app.use(`/${this.apiPrefix}/projects`, this.projectController.router);
    this.app.use(`/${this.apiPrefix}/buildings`, this.buildingController.router);
    this.app.use(`/${this.apiPrefix}/aparments`, this.aparmentsController.router);
    this.app.use(`/${this.apiPrefix}/parking`, this.parkingController.router);
    this.app.use(`/${this.apiPrefix}/storage`, this.storageUnitController.router);
  }

  /**
   * Used to start the server
   */
  public start() {
    this.app.listen(this.app.get('port'), () => {
      console.log(`Server is listening ${this.app.get('port')} port.`);
    });
  }
}

const server = new Server();
server.start();
