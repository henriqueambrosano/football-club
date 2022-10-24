import { Router } from 'express';
import MatchesController from '../controllers/matches.controller';
import MatchesService from '../services/matches.service';
import MatchesModel from '../models/matches.model';

const MatchesRouter = Router();

const matchesController = new MatchesController(new MatchesService(MatchesModel));

MatchesRouter.get('/matches', (req, res) => matchesController.getAll(req, res));

export default MatchesRouter;
