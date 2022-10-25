import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboard.service';

const SERVER_ERROR = 'Internal server Error';

export default class LeaderboardController {
  constructor(private leaderBoardService: LeaderboardService) { }

  async getAll(req: Request, res: Response) {
    try {
      const leaderboard = await this.leaderBoardService.getAll();
      res.status(200).json(leaderboard);
    } catch (error) {
      res.status(500).json({ message: SERVER_ERROR });
    }
  }

  async getHome(req: Request, res: Response) {
    try {
      const leaderboard = await this.leaderBoardService.getHome();
      res.status(200).json(leaderboard);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: SERVER_ERROR });
    }
  }

  async getAway(req: Request, res: Response) {
    try {
      const leaderboard = await this.leaderBoardService.getAway();
      res.status(200).json(leaderboard);
    } catch (error) {
      res.status(500).json({ message: SERVER_ERROR });
    }
  }
}
