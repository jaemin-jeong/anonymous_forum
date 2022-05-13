const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return tb_keyword.init(sequelize, DataTypes);
}

class tb_keyword extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    idx: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    receiver: {
      type: DataTypes.STRING(10),
      allowNull: false,
      comment: "수신자명"
    },
    keyword: {
      type: DataTypes.STRING(10),
      allowNull: false,
      comment: "키워드"
    },
    create_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'tb_keyword',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idx" },
        ]
      },
    ]
  });
  }
}
