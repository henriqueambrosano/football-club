import { Router } from 'express';
import TeamsController from '../controllers/teams.controller';
import TeamsService from '../services/teams.service';
import TeamsModel from '../models/teams.model';

const TeamsRouter = Router();

const teamsController = new TeamsController(new TeamsService(TeamsModel));

TeamsRouter.get('/teams', (req, res) => teamsController.getAll(req, res));
TeamsRouter.get('/teams/:id', (req, res) => teamsController.getById(req, res));

export default TeamsRouter;
