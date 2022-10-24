import TeamsModel from '../models/teams.model';
import MatchesModel from '../models/matches.model';
import IMatch from '../interfaces/IMatch';
import UserModel from '../models/user.model';
import TokenAuth from '../auth/tokenAuth';

export default class MatchesService {
  constructor(
    private matchesModel: typeof MatchesModel,
    private userModel: typeof UserModel,
    private teamsModel: typeof TeamsModel,
  ) { }

  async getAll(): Promise <MatchesModel[]> {
    const matches = await this.matchesModel.findAll({
      include: [
        { model: TeamsModel, as: 'teamHome', attributes: ['teamName'] },
        { model: TeamsModel, as: 'teamAway', attributes: ['teamName'] },
      ] });
    return matches;
  }

  async getByQuery(params: boolean) {
    const matches = await this.matchesModel.findAll({
      where: { inProgress: params },
      include: [
        { model: TeamsModel, as: 'teamHome', attributes: ['teamName'] },
        { model: TeamsModel, as: 'teamAway', attributes: ['teamName'] },
      ] });
    return matches;
  }

  async findTeamById(id: number) {
    const match = await this.teamsModel.findOne({ where: { id } });
    return match;
  }

  async createMatch(match: IMatch, authorization: string | undefined) {
    if (!authorization) throw new Error();
    const { data } = TokenAuth.decrypt(authorization);
    const user = await this.userModel.findOne({ where: { password: data.password } });
    if (!user) throw new Error();
    const newMatch = await this.matchesModel.create({ ...match, inProgress: true });
    return newMatch;
  }
}
