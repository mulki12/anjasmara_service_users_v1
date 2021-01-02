
module.exports = (sequelize, DataTypes) => {
    const Token = sequelize.define('Token', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },

      iat : {
        type: DataTypes.BIGINT,
        allowNull: false
      },

      exp : {
        type: DataTypes.BIGINT,
        allowNull: false
      },

      userId: {
        field : 'user_id',
        type: DataTypes.UUID,
        allowNull: false,
        index: true
      },

      revoked: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue: 0
      },

      createdAt: {
        field : 'created_at',
        type: DataTypes.DATE,
        allowNull: false
      },

      updatedAt: {
        field : 'updated_at',
        type: DataTypes.DATE,
        allowNull: false
      }
    },{
        tableName : 'refresh_tokens',
        timestamps : true
    });

    return Token;
}