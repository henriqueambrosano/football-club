import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import TeamsModel from '../models/teams.model';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxLCJ1c2VybmFtZSI6IkFkbWluIiwicm9sZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJwYXNzd29yZCI6IiQyYSQwOCR4aS5IeGsxY3pBTzBuWlIuLkIzOTN1MTBhRUQwUlExTjNQQUVYUTdIeHRMaktQRVpCdS5QVyJ9LCJpYXQiOjE2NjY4OTkzOTd9.jVv79LMK4qWB_XvhLcwLC3VbIsKikFXvT5KNokYnwEs'

describe('Testando Login', () => {

  let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon
      .stub(TeamsModel, "findAll")
      .resolves([
        {
          id: 1,
          teamName: 'Avaí/Kindermann',
        },
        {
          id: 2,
          teamName: 'Bahia',
        },
       ] as TeamsModel[]);

       sinon
      .stub(TeamsModel, "findOne")
      .resolves(
        {
          id: 1,
          teamName: 'Avaí/Kindermann',
        } as TeamsModel);
  })

  afterEach(sinon.restore)

  it('Verifica se é possivel listar todos os times', async () => {
    const chaiHttpResponse = await chai
      .request(app)
      .get('/teams')
      .set('authorization', token);

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.deep.equal([
      {
        id: 1,
        teamName: 'Avaí/Kindermann',
      },
      {
        id: 2,
        teamName: 'Bahia',
      },
     ])
  });

  it('Verifica se é possivel listar um time pelo id', async () => {
    const chaiHttpResponse = await chai
      .request(app)
      .get('/teams/1')
      .set('authorization', token);

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.deep.equal(
      {
        id: 1,
        teamName: 'Avaí/Kindermann',
      })
  });
})