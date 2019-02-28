
// start the server for development, production, or testing

// imports
import { cinfo, cerr } from 'simple-color-print';
import AppServer from './AppServer';

// start the server or run tests
if (process.argv[2] !== 'test') {

  let server = new AppServer();
  server.start();

} else {

  const Jasmine = require('jasmine');
  const jasmine = new Jasmine();

  jasmine.loadConfig({
    "spec_dir": "src",
    "spec_files": [
      "./controllers/**/*.test.ts"
    ],
    "stopSpecOnExpectationFailure": false,
    "random": true
  });

  jasmine.onComplete((passed: boolean) => {

    if (passed) {

      cinfo('All tests have passed');

    } else {

      cerr('At least one test has failed');

    }
  });

  let testPath = process.argv[3];

  if (testPath) {

    testPath = `./src/${testPath}.test.ts`;
    jasmine.execute([testPath]);

  } else {

    jasmine.execute();

  }
}