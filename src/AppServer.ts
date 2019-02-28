
// imports
import * as path from 'path';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as controllers from './controllers';

import { Server } from '@overnightjs/core';
import { cimp, cinfo } from 'simple-color-print';

class AppServer extends Server {

  private _port = 3001;

  private readonly _SERVER_START_MSG = 'Server running on port: ';

  private readonly _DEV_MSG = 'Server is running in dev mode. Start the React dev server "npm run start:react" to develop front-end. Back-end is running on port: ';

  constructor() {
    super();

    // set middleware
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.setupControllers();

    // point to front-end
    if (process.env.NODE_ENV !== 'production') {

      this._serveFrontEndDev();

    } else {

      this._serveFrontEndProd();

    }
  }

  private setupControllers(): void {

    const ctlrInstances = [];

    for (const name in controllers) {

      if (controllers.hasOwnProperty(name)) {

        let Controller = (controllers as any)[name];
        ctlrInstances.push(new Controller());

      }
    }

    super.addControllers(ctlrInstances);

  }

  private _serveFrontEndDev(): void {

    cinfo('Starting server in development mode');

    const msg = this._DEV_MSG + this._port;

    this.app.get('*', (req, res) => res.send(msg));

  }

  private _serveFrontEndProd(): void {

    cinfo('Starting server in production mode');

    this._port = 3002;

    const dir = path.join(__dirname, 'public/react/react-app/');

    // set static directory
    this.app.set('views', dir);
    this.app.use(express.static(dir));

    // serve front-end content
    this.app.get('*', (req, res) => {
      res.sendFile('index.html', {root: dir});

    });
  }

  public start(): void {
    this.app.listen(this._port, () => {
      cimp(this._SERVER_START_MSG + this._port);
    });
  }
}

export default AppServer;