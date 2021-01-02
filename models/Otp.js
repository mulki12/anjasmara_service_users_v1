
module.exports = (sequelize, DataTypes) => {
    const Otp = sequelize.define('Otp', {
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
    
          code : {
            type : DataTypes.STRING,
            allowNull : false
          },

          expire : {
            type : DataTypes.BIGINT,
            allowNull : true
          },
    
          vendor : {
            type : DataTypes.STRING,
            allowNull : true
          },
    
          userId : {
            field : 'user_id',
            type : DataTypes.UUID,
            allowNull : true, 
            index : true
          },
    
          hasBeenUse : {
            field : 'has_been_use',
            type : DataTypes.CHAR(1),
            allowNull : false,
            default : "0"
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
        tableName : 'otp',
        timestamps : true
    });

    return Otp;
}