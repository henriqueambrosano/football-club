import { Request, Response } from 'express';
import MatchesService from '../services/matches.service';

export default class MatchesController {
  constructor(private matchesService: MatchesService) { }

  async getAll(req: Request, res: Response) {
    try {
      const matches = await this.matchesService.getAll();
      res.status(200).json(matches);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}
