'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcrypt'); // For hashing passwords

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // Define associations here if needed, like belongsTo, hasMany, etc.
    }

    // Instance method to validate the password
    async validatePassword(password,hashed) {
      return await bcrypt.compare(password, hashed);
    }

    // Hide password in the JSON representation of the user
    toJSON() {
      let attributes = Object.assign({}, this.get());
      delete attributes.password; 
      return attributes;
    }
  }

  User.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        return undefined; 
      }
    },
    role: {
      type: DataTypes.ENUM('admin', 'user'),
      defaultValue: 'user',
    },
    refresh_token: {
      type: DataTypes.STRING,
      allowNull: true,
      get() {
        return undefined; 
      }
    },
    subscription_plan: {
      type: DataTypes.ENUM('free', 'basic', 'pro'),
      defaultValue: 'free',
    },
    api_usage_limit: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      // Hash password before creating the user
      beforeCreate: async (user) => {
        const saltRounds = 10;
        console.log("user::",user.password);
        
        user.password = await bcrypt.hash(user.password, saltRounds);
      },
      // Optionally: hash password before updating, if password changes
      beforeUpdate: async (user) => {
        if (user.changed('password')) {
          const saltRounds = 10;
          user.password = await bcrypt.hash(user.password, saltRounds);
        }
      }
    },
    timestamps: true,  
    tableName: 'users',
  });

  return User;
};
