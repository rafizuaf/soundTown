'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Song extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Song.belongsToMany(models.Genre, {
        through: "GenreSongs",
        foreignKey: "SongId"
      })
      Song.belongsTo(models.Artist)
    }

    static async getAllSongGenre() {
      try {
        let result = await Song.findAll({
          include: sequelize.models.Genre,
          
        })
        return result
      } catch (error) {
        throw error
      }
    }

  }
  Song.init({
    title: DataTypes.STRING,
    lyric: DataTypes.TEXT,
    like: DataTypes.INTEGER,
    videoUrl: DataTypes.TEXT,
    genre: DataTypes.STRING,
    ArtistId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Song',
  });
  return Song;
};