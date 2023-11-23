'use strict';
const {hashPassword} = require('../helper/bcrypt')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Artist)
    }

    static async getUserById(id) {
      try {
        let result = await User.findOne({
          where: {
            id: id
          }
        })
        return result
      } catch (error) {
        throw error
      }
    }

    get joinDate() {
      return this.createdAt.toISOString().split('T')[0]
    }    
  }
  User.init({
    username: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Password is required!"
        },
        notNull: {
          msg: "Password is required!"
        }
      }
    },
    role: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Email is required!"
        },
        notNull: {
          msg: "Email is required!"
        }
      }
    },
    profilePicture: DataTypes.TEXT,
    ArtistId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (opt) => {
        console.log(opt.password);
        const newPassword = hashPassword(opt.password)
        opt.password = newPassword
      }
    }
  });
  return User;
};