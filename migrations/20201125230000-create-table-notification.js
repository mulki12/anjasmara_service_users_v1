'use strict';

module.exports = {
    up : async (queryInterface, Sequelize) => {
        await queryInterface.createTable('notifications', {

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

            title : {
                type : Sequelize.STRING,
                allowNull : false
            },

            message : {
                type : Sequelize.STRING,
                allowNull : false
            },

            is_read : {
                type : Sequelize.CHAR(1),
                allowNull : false,
                defaultValue : "0"
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
        await queryInterface.dropTable('notifications');
    }
}
