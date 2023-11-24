'use strict';
const { Op } = require("sequelize");
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Artist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Artist.hasOne(models.User)
      Artist.hasMany(models.Song)
    }

    static async getAllArtists(query) {
      try {
        let data;
        if(query) {
          data = await Artist.findAll({
            include: {
              model: sequelize.models.Song,
              order: [
                ['title', 'ASC']
              ]},
            where: {
              '$Songs.title$': {
                [Op.iLike]: `%${query}%`
              }
            },
            

          })
        } else {
          data = await Artist.findAll({
            include: {model:
              sequelize.models.Song,
              order: [
                ['title', 'ASC']
              ]},
            // order: [
            //   ['$Songs.title$', 'ASC']
            // ]
          })
        }
        return data
      } catch (error) {
        throw error
      }
    }

    // static async showDetail(id) {
    //   try {
    //     let data = await Artist.findOne({
    //       where: {
    //         id: 2
    //       },
    //       include: {
    //         model:sequelize.models.Song
    //       }
    //       // [
    //       //   {
    //       //     model: sequelize.models.Song,
    //       //     include: {
    //       //       model: sequelize.models.Genre
    //       //     }
    //       //   }
    //       // ]
    //     })
    //     return data
    //   } catch (error) {
    //     throw error
    //   }
    // }
  }
  Artist.init({
    name: DataTypes.STRING,
    bandPhoto: DataTypes.TEXT,
    bio: DataTypes.TEXT,
    location: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Artist',
  });
  return Artist;
};