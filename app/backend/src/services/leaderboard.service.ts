import TeamsModel from '../models/teams.model';
import MatchesModel from '../models/matches.model';
import generateLeaderboard,
{ generateHomeLeaderboard,
  generateAwayLeaderboard }
  from '../helpers/leaderboard.helper';

export default class LeaderboardService {
  constructor(
    private matchesModel: typeof MatchesModel,
    private teamsModel: typeof TeamsModel,
  ) { }

  async getAll() {
    const teams = await this.teamsModel.findAll();
    const matches = await this.matchesModel.findAll({ where: { inProgress: 0 } });
    const leaderboard = generateLeaderboard(matches, teams);

    return leaderboard;
  }

  async getHome() {
    const teams = await this.teamsModel.findAll();
    const matches = await this.matchesModel.findAll({ where: { inProgress: 0 } });
    const leaderboard = generateHomeLeaderboard(matches, teams);
    return leaderboard;
  }

  async getAway() {
    const teams = await this.teamsModel.findAll();
    const matches = await this.matchesModel.findAll({ where: { inProgress: 0 } });
    const leaderboard = generateAwayLeaderboard(matches, teams);
    return leaderboard;
  }
}
