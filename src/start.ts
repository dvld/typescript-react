
// start the server for development, production, or testing

import server from './server';

// start the server or run tests
if (process.argv[2] !== 'test') {

  let server = new server();
  server.start();

} else {

}