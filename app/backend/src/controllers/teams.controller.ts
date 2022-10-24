import { Request, Response } from 'express';
import TeamsService from '../services/teams.service';

export default class TeamsController {
  constructor(private teamsService: TeamsService) { }

  async getAll(req: Request, res: Response) {
    try {
      const allTeams = await this.teamsService.getAll();
      res.status(200).json(allTeams);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const team = await this.teamsService.getById(+id);
      res.status(200).json(team);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}
