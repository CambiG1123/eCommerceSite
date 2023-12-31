const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Tag extends Model {}

Tag.init(
  {
    id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  tag_name: {
    type: DataTypes.STRING,
  },
},
{
  sequelize,
  timestamps: false,
  modelName: 'tag',
}
);

module.exports = Tag;
