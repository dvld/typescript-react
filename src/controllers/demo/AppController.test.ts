
// unit test for AppController.ts

// imports
import * as supertest from 'supertest';

import {} from 'jasmine';
import { SuperTest, Test } from 'supertest';
import { cerr } from 'simple-color-print';

import TestServer from '../shared/TestServer.test';
import AppController from './AppController';

describe('AppController', () => {

  const appController = new AppController();
  let agent: SuperTest<Test>;

  beforeAll(done => {

    // activate routes
    const server = new TestServer();
    server.setController(appController);

    // start supertest
    agent = supertest.agent(server.getExpressInstance());
    done();

  });

  describe('API: "/api/say-hello/:name"', () => {

    const { SUCCESS_MSG, ERROR_MSG } = appController;

    it(`should return a JSON object with the message "${SUCCESS_MSG}" and a status code of 250 if message was successful`,
      done => {

        agent.get('/api/say-hello/NikoRoberts')
          .end((err, res) => {

            if (err) { cerr(err); }

            expect(res.status).toBe(250);
            expect(res.body.response).toBe(SUCCESS_MSG);
            done();

          });
      }
    );

    it(`should return a JSON object with the message "${ERROR_MSG}" and a status code of 400 if message was unsuccessful`,
      done => {

        agent.get('/api/say-hello/userfail')
          .end((err, res) => {

            if (err) { cerr(err); }

            expect(res.status).toBe(400);
            expect(res.body.response).toBe(ERROR_MSG);
            done();

          });
      }
    );
  });
});