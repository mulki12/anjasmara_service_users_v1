
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
          id : {
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true,
            allowNull : false
          },
          uuid : {
            type : DataTypes.STRING,
            unique : true,
            allowNull : false
          },
          scope : {
            type : DataTypes.STRING,
            allowNull : true,
          },
          name : {
            type : DataTypes.STRING,
            allowNull : false
          },
          email : {
            type : DataTypes.STRING,
            allowNull : false
          },
          password : {
            type : DataTypes.STRING,
            allowNull : true
          },
          phone : {
            type : DataTypes.STRING,
            allowNull : true
          },
          address : {
            type : DataTypes.TEXT,
            allowNull : true
          },
          status : {
            type : DataTypes.CHAR(1),
            allowNull : false,
            defaultValue : "0"
          },
          token : {
            type : DataTypes.STRING,
            allowNull : false
          },
          lat : {
            type : DataTypes.STRING,
            allowNull : true
          },
          lng : {
            type : DataTypes.STRING,
            allowNull : true
          },
          fcm : {
            type : DataTypes.STRING,
            allowNull : true
          },
          lastLogin : {
            field : 'last_login',
            type : DataTypes.DATE,
            allowNull : true
          },
          createdAt : {
            field : 'created_at',
            type : DataTypes.DATE,
            allowNull : false,
            defaultValue : DataTypes.NOW
          },
          updatedAt : {
            field : 'updated_at',
            type : DataTypes.DATE,
            allowNull : false,
          }
    },{
        tableName : 'users',
        timestamps : true
    });

    return User;
}