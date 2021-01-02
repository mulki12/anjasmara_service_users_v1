'use strict';

module.exports = {

    up : async (queryInterface, Sequelize) => {
        await queryInterface.createTable('logs', {

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

            data : {
                type : Sequelize.STRING,
                allowNull : false
            },

            user_id : {
                type : Sequelize.UUID,
                allowNull : true, 
                index : true
            },
  
            created_at : {
                type : Sequelize.DATE,
                allowNull : false
            },
          
            updated_at : {
                type : Sequelize.DATE,
                allowNull : false
            }

        })
    },

    down : async (queryInterface, Sequelize) => {    
        await queryInterface.dropTable('logs');
    }

}