const Sequelize=require('sequelize');
const sequelize=require('../util/database');
const user = require('./signup');

const UserGroup = sequelize.define('user_group', {
    groupName:{
        type:Sequelize.STRING,
        allowNull:false
      },
      name:{
        type:Sequelize.STRING,
        allowNull:false
      },
      
  signupId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'user',
      key: 'id'
    }
  }
});


module.exports = UserGroup;