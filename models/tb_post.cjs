const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return tb_post.init(sequelize, DataTypes);
}

class tb_post extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    idx: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(40),
      allowNull: false,
      comment: "제목"
    },
    content: {
      type: DataTypes.STRING(500),
      allowNull: false,
      comment: "내용"
    },
    writer: {
      type: DataTypes.STRING(10),
      allowNull: false,
      comment: "작성자 이름"
    },
    pw: {
      type: DataTypes.STRING(100),
      allowNull: false,
      comment: "비밀번호"
    },
    salt: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    create_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "작성 시간"
    },
    up_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "수정시간"
    }
  }, {
    sequelize,
    tableName: 'tb_post',
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
