'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.createTable('users', {
      
      id : {
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true,
        allowNull : false
      },

      uuid : {
        type : Sequelize.UUID,
        unique : true,
        allowNull : false
      },

      scope : {
        type : Sequelize.STRING,
        allowNull : true,
      },

      name : {
        type : Sequelize.STRING,
        allowNull : false
      },

      email : {
        type : Sequelize.STRING,
        allowNull : false
      },
      password : {
        type : Sequelize.STRING,
        allowNull : true
      },

      phone : {
        type : Sequelize.STRING,
        allowNull : true
      },

      address : {
        type : Sequelize.TEXT,
        allowNull : true
      },

      status : {
        type : Sequelize.CHAR(1),
        allowNull : false,
        defaultValue : "0"
      },

      token : {
        type : Sequelize.STRING,
        allowNull : false
      },

      lat : {
        type : Sequelize.STRING,
        allowNull : true
      },

      lng : {
        type : Sequelize.STRING,
        allowNull : true
      },

      fcm : {
        type : Sequelize.STRING,
        allowNull : true
      },

      last_login : {
        type : Sequelize.DATE,
        allowNull : true
      },

      created_at : {
        type : Sequelize.DATE,
        allowNull : false,
        defaultValue : Sequelize.NOW
      },

      updated_at : {
        type : Sequelize.DATE,
        allowNull : false,
      }
      
    });

    await queryInterface.addConstraint('users', {
      type: 'unique',
      fields: ['uuid'],
      name: 'UNIQUE_USERS_UUID'
    });
  
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  }
};
