
// imports
import { Controller, Get } from '@overnightjs/core';
import { Request, Response } from 'express';
import { cinfo, cerr } from 'simple-color-print';

// api
@Controller('api/say-hello')
class AppController {

  public readonly SUCCESS_MSG = 'hello';
  public readonly ERROR_MSG = 'error';

  @Get(':name')
  private sayHello(req: Request, res: Response): void {

    try {

      const name = req.params.name;

      if (name === 'userfail') {
        throw Error('User triggered failure');
      }

      cinfo('API: "GET /api/say-hello/:name" called with param: ' + name);

      res.status(250).json({response: this.SUCCESS_MSG});

    } catch (err) {

      cerr(err);

      res.status(400).json({response: this.ERROR_MSG});

    }
  }
}

export default AppController;