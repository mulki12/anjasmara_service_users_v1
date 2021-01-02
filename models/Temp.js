
module.exports = (sequelize, DataTypes) => {
    const Temp = sequelize.define('Temp', {
      
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

        field : {
            type : DataTypes.STRING,
            allowNull : false
        },

        data : {
            type : DataTypes.TEXT,
            allowNull : false
        },

        isUpdate : {
            field : 'is_update',
            type : DataTypes.CHAR(1),
            allowNull : false,
            defaultValue : "0"
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
        tableName : 'temporary',
        timestamps : true
    });

    return Temp;
}