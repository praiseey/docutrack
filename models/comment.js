'use strict';
module.exports = (sequelize, DataTypes) => {
  var Comment = sequelize.define('Comment', {
    comment_title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    comment_body: { 
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
        notEmpty: true,
        } 
    },
    DocumentId : {
        type: DataTypes.INTEGER
      }
    
  });


  Comment.associate = function (models) {
    
    models.Comment.belongsTo(models.Document, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
    
   };
   


  return Comment;
};