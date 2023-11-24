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

    get joinDate() {
      return this.createdAt.toISOString().split('T')[0]
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

    // static async editUserPost(username, email, role, profilePicture, id) {
    //   try {
    //     const {filename} = req.file
    //     await User.update({
    //       username, email, role, profilePicture
    //     },
    //     {
    //       where: {
    //         id: id
    //       }
    //     })
    //   } catch (error) {
    //     throw error
    //   }
    // }

    
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
        },
        isValid(value) {
          if (this.password.length < 8) {
            throw new Error('Password must be at least 8 characters');
          }
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
        },
        
      },
      unique: true
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