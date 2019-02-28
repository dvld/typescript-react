import { Server } from '@overnightjs/core';
import { cimp } from 'simple-color-print';

class AppServer extends Server {

  private _port = 3001;
  private readonly _SERVER_START_MSG = 'Server running on port: ';

  constructor() {
    super();
  }

  public start(): void {
    this.app.listen(this._port, () => {
      cimp(this._SERVER_START_MSG + this._port);
    });
  }
}

export default AppServer;