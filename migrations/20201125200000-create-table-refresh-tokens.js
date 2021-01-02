'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('refresh_tokens', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },

      iat : {
        type: Sequelize.BIGINT,
        allowNull: false
      },

      exp : {
        type: Sequelize.BIGINT,
        allowNull: false
      },

      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        index: true
      },

      revoked: {
        type: Sequelize.INTEGER(1),
        allowNull: false,
        defaultValue: 0
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },

      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });

    await queryInterface.addConstraint('refresh_tokens', {
      type: 'foreign key',
      name: 'REFRESH_TOKENS__USER_ID',
      fields: ['user_id'],
      references: {
        table: 'users',
        field: 'uuid'
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('refresh_tokens');
  }
};
