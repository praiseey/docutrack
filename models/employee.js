const Sequelize = require('sequelize');
'use strict';
module.exports = (sequelize, DataTypes) => {
  var Employee = sequelize.define('Employee', {
    first_name: { 
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
        notEmpty: true,
        } 
    },
    last_name: { 
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
        notEmpty: true,
        } 
    },
    username: { 
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
        notEmpty: true,
        } 
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        }
    },
 
    role: { 
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
      notEmpty: true,
      } 
  },
  department: {
    type: DataTypes.STRING,
      allowNull: false,
      validate: {
      notEmpty: true,
      }  
  },

    phone:{
      type: DataTypes.BIGINT,
      allowNull: false,
      validate: {
          isNumeric : true
      }
    },
    
     
  });

 
  Employee.associate = function(models) {
    models.Employee.hasMany(models.Document);

  };

  return Employee;
};