import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import UserModel from '../models/user.model';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxLCJ1c2VybmFtZSI6IkFkbWluIiwicm9sZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJwYXNzd29yZCI6IiQyYSQwOCR4aS5IeGsxY3pBTzBuWlIuLkIzOTN1MTBhRUQwUlExTjNQQUVYUTdIeHRMaktQRVpCdS5QVyJ9LCJpYXQiOjE2NjY4OTkzOTd9.jVv79LMK4qWB_XvhLcwLC3VbIsKikFXvT5KNokYnwEs'

describe('Testando Login', () => {

  let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon
      .stub(UserModel, "findOne")
      .resolves({
        email: 'admin@admin.com',
        password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
        role: 'admin'
      } as UserModel);
  })

  afterEach(sinon.restore)

  it('verifica se é ao acessar o banco com dados corretos é retornado o token do usuário', async () => {
    const chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({
        email: 'admin@admin.com',
        password: 'secret_admin',
      });

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.haveOwnProperty('token')
  });

  it('verifica se retorna um erro ao tentar acessar a rota login sem email e/ou senha preenchidos', async () => {
    const chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({
        email: '',
        password: 'secret_admin',
      });

    expect(chaiHttpResponse.status).to.be.equal(400);
    expect(chaiHttpResponse.body.message).to.be.eq('All fields must be filled')
  });

  it('verifica se retorna um erro ao tentar acessar a rota login com email e/ou senha incorretos', async () => {
    sinon.restore()
    sinon
      .stub(UserModel, "findOne")
      .resolves(null);

    const chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({
        email: 'admin@admin.com',
        password: 'secret_admin',
      });

    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body.message).to.be.eq('Incorrect email or password')
  });

  it('verifica se ao acessar a rota validate, é retornado o role do usuário', async () => {
    const chaiHttpResponse = await chai
      .request(app)
      .get('/login/validate')
      .set('authorization', token);


    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.haveOwnProperty('role')
  });

  it('verifica se ao tentar logar sem um token, é retornado uma mensagem de erro', async () => {
    const chaiHttpResponse = await chai
      .request(app)
      .get('/login/validate')
      .set('authorization', '');

    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body.message).to.be.eq('Ivalid token')
  });
});
