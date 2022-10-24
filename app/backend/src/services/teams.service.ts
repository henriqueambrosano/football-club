import TeamsModel from '../models/teams.model';

export default class TeamsService {
  constructor(private teamsModel: typeof TeamsModel) { }

  async getAll() {
    const teams = await this.teamsModel.findAll();
    return teams;
  }

  async getById(id: number) {
    const team = await this.teamsModel.findOne({ where: { id } });
    return team;
  }
}
