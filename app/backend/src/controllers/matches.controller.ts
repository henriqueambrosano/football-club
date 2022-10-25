import { Request, Response } from 'express';
import MatchesService from '../services/matches.service';

const SERVER_ERROR = 'Internal server Error';

export default class MatchesController {
  constructor(private matchesService: MatchesService) { }

  async getAll(req: Request, res: Response) {
    try {
      const { inProgress } = req.query;
      let matches;
      if (inProgress) {
        const isInProgress = inProgress === 'true';
        matches = await this.matchesService.getByQuery(isInProgress);
      } else {
        matches = await this.matchesService.getAll();
      }
      res.status(200).json(matches);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: SERVER_ERROR });
    }
  }

  async saveMatch(req: Request, res: Response) {
    try {
      const { homeTeam, awayTeam } = req.body;
      const { authorization } = req.headers;
      if (homeTeam === awayTeam) {
        return res.status(422)
          .json({ message: 'It is not possible to create a match with two equal teams' });
      }
      const validateHome = await this.matchesService.findTeamById(homeTeam);
      const validateAway = await this.matchesService.findTeamById(awayTeam);
      console.log(validateAway);
      if (!validateHome || !validateAway) {
        return res.status(404).json({ message: 'There is no team with such id!' });
      }
      const newMatch = await this.matchesService.createMatch(req.body, authorization);
      res.status(201).json(newMatch);
    } catch (error) {
      res.status(401).json({ message: 'Token must be a valid token' });
    }
  }

  async endMatch(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await this.matchesService.endMatch(+id);
      res.status(200).json({ message: 'Finished' });
    } catch (error) {
      res.status(500).json({ message: SERVER_ERROR });
    }
  }

  async updateMatch(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { homeTeamGoals, awayTeamGoals } = req.body;
      await this.matchesService.updateMatch(+id, homeTeamGoals, awayTeamGoals);
      res.status(200).json({ message: 'Match updated!' });
    } catch (error) {
      res.status(500).json({ message: SERVER_ERROR });
    }
  }
}
