
// start the server for development, production, or testing

import AppServer from './AppServer';

// start the server or run tests
if (process.argv[2] !== 'test') {

  let server = new AppServer();
  server.start();

} else {

}