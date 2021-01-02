'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.createTable('otp', {
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
        allowNull : false
      },

      code : {
        type : Sequelize.STRING,
        allowNull : false
      },

      expire : {
        type : Sequelize.BIGINT,
        allowNull : true
      },

      vendor : {
        type : Sequelize.STRING,
        allowNull : true
      },

      user_id : {
        type : Sequelize.UUID,
        allowNull : true, 
        index : true
      },

      has_been_use : {
        type : Sequelize.CHAR(1),
        allowNull : false,
        defaultValue : "0"
      },

      created_at : {
        type : Sequelize.DATE,
        allowNull : false
      },

      updated_at : {
        type : Sequelize.DATE,
        allowNull : false
      },
    });
    
    await queryInterface.addConstraint('otp', {
      type: 'foreign key',
      name: 'OTP__USER_ID',
      fields: ['user_id'],
      references: {
        table: 'users',
        field: 'uuid'
      }
    });

  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.dropTable('otp');
    
  }
};
