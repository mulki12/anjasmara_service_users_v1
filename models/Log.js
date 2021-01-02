
module.exports = (sequelize, DataTypes) => {
    const Log = sequelize.define('Log', {
          
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true,
            allowNull : false
        },

        uuid : {
            type : DataTypes.UUID,
            unique : true,
            allowNull : false
        },

        scope : {
            type : DataTypes.STRING,
            allowNull : false
        },

        data : {
            type : DataTypes.STRING,
            allowNull : false
        },

        userId : {
            field : 'user_id',
            type : DataTypes.UUID,
            allowNull : true, 
            index : true
        },

        createdAt : {
            field : 'created_at',
            type : DataTypes.DATE,
            allowNull : false
        },
      
        updatedAt : {
            field : 'updated_at',
            type : DataTypes.DATE,
            allowNull : false
        }

    },{
        tableName : 'logs',
        timestamps : true
    });

    return Log;
}