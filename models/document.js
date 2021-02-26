'use strict';
module.exports = (sequelize, DataTypes) => {
  var Document = sequelize.define('Document', {
      subject: { 
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
        notEmpty: true,
        } 
    },
       description: { 
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
        notEmpty: true,
        } 
    },
      EmployeeId : {
        type: DataTypes.INTEGER
      },
      TypeId: {
        type: DataTypes.INTEGER
      },
      ApplicationId: {
        type: DataTypes.INTEGER
      },
      CategoryId: {
        type: DataTypes.INTEGER
      },
      Status: {
        type: DataTypes.STRING
      }
    
  });

 
  Document.associate = function (models) {
    
    models.Document.belongsTo(models.Employee, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
    models.Document.belongsTo(models.Type, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });

    models.Document.belongsTo(models.Application, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });

    models.Document.belongsTo(models.Category,{ 
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });

    models.Document.hasMany(models.Comment);
    
   };
  
  return Document;
};