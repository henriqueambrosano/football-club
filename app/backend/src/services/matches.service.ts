import TeamsModel from '../models/teams.model';
import MatchesModel from '../models/matches.model';

export default class MatchesService {
  constructor(private matchesModel: typeof MatchesModel) { }

  async getAll(): Promise <MatchesModel[]> {
    const matches = await this.matchesModel.findAll({
      include: [
        { model: TeamsModel, as: 'teamHome', attributes: ['teamName'] },
        { model: TeamsModel, as: 'teamAway', attributes: ['teamName'] },
      ] });
    return matches;
  }
}
