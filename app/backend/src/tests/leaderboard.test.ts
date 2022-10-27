import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import TeamsModel from '../models/teams.model';
import MatchesModel from '../models/matches.model';

import { Response } from 'superagent';

import leaderboardMock from '../mocks/leaderboard.mock';
import allTeamsMock from '../mocks/allTeams.mock';
import allFinishedMatches from '../mocks/allFinishedMatches.mock';

chai.use(chaiHttp);

const { expect } = chai;

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxLCJ1c2VybmFtZSI6IkFkbWluIiwicm9sZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJwYXNzd29yZCI6IiQyYSQwOCR4aS5IeGsxY3pBTzBuWlIuLkIzOTN1MTBhRUQwUlExTjNQQUVYUTdIeHRMaktQRVpCdS5QVyJ9LCJpYXQiOjE2NjY4OTkzOTd9.jVv79LMK4qWB_XvhLcwLC3VbIsKikFXvT5KNokYnwEs'

describe('Testando Leaderboard', () => {

  let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon
      .stub(TeamsModel, "findAll")
      .resolves(allTeamsMock as TeamsModel[]);

      sinon
        .stub(MatchesModel, "findAll")
        .resolves(allFinishedMatches as MatchesModel[]);
  })

  afterEach(sinon.restore)

  it('Verifica se retorna o leaderboard completo', async () => {
    const chaiHttpResponse = await chai
      .request(app)
      .get('/leaderboard')
      .set('authorization', token);

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body.length).to.be.eq(16)
  });

  it('Verifia se retorna o leaderboard apenas dos times que jogam em casa', async () => {
    const chaiHttpResponse = await chai
    .request(app)
    .get('/leaderboard/home')
    .set('authorization', token);

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body.length).to.be.eq(16)
  });

  it('Verifia se retorna o leaderboard apenas dos times visitantes', async () => {
    const chaiHttpResponse = await chai
    .request(app)
    .get('/leaderboard/away')
    .set('authorization', token);

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body.length).to.be.eq(16)
  });
})
