import { Router } from 'express';
import MatchesController from '../controllers/matches.controller';
import MatchesService from '../services/matches.service';
import MatchesModel from '../models/matches.model';
import UserModel from '../models/user.model';
import TeamsModel from '../models/teams.model';

const MatchesRouter = Router();

const matchesController = new MatchesController(new MatchesService(
  MatchesModel,
  UserModel,
  TeamsModel,
));

MatchesRouter.get('/matches', (req, res) => matchesController.getAll(req, res));
MatchesRouter.post('/matches', (req, res) => matchesController.saveMatch(req, res));
MatchesRouter.patch('/matches/:id/finish', (req, res) => matchesController.endMatch(req, res));
MatchesRouter.patch('/matches/:id', (req, res) => matchesController.updateMatch(req, res));

export default MatchesRouter;
