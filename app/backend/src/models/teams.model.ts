import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

export default class TeamsModel extends Model {
  id!: number;
  teamName!: string;
}

TeamsModel.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: {
    type: STRING(30),
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
});
