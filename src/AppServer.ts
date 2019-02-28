
// imports
import * as express from 'express';
import * as bodyParser from 'body-parser';

import { Server } from '@overnightjs/core';
import { cimp, cinfo } from 'simple-color-print';

// controllers
import AppController from './controllers/AppController';

class AppServer extends Server {

  private _port = 3001;

  private readonly _SERVER_START_MSG = 'Server running on port: ';

  private readonly _DEV_MSG = 'Server is running in dev mode. Start the React dev server "npm run start:react" to develop front-end. Back-end is running on port: ';

  constructor() {
    super();

    // set middleware
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));

    // set controllers
    super.addControllers(new AppController());

    // point to front-end
    if (process.env.NODE_ENV !== 'production') {

      cinfo('Starting server in development mode');
      const msg = this._DEV_MSG + process.env.EXPRESS_PORT;
      this.app.get('*', (req, res) => res.send(msg));

    }
  }

  public start(): void {
    this.app.listen(this._port, () => {
      cimp(this._SERVER_START_MSG + this._port);
    });
  }
}

export default AppServer;