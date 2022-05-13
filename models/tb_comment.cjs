const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return tb_comment.init(sequelize, DataTypes);
}

class tb_comment extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    idx: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    post_idx: {
      type: DataTypes.BIGINT,
      allowNull: false,
      comment: "게시글 고유키",
      references: {
        model: 'tb_post',
        key: 'idx'
      }
    },
    parent_idx: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0,
      comment: "상위 댓글 고유키"
    },
    comment: {
      type: DataTypes.STRING(100),
      allowNull: false,
      comment: "댓글 내용"
    },
    writer: {
      type: DataTypes.STRING(10),
      allowNull: false,
      comment: "작성자"
    },
    create_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "작성 시간"
    }
  }, {
    sequelize,
    tableName: 'tb_comment',
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
      {
        name: "tb_comment_post_idx_IDX",
        using: "BTREE",
        fields: [
          { name: "post_idx" },
          { name: "parent_idx" },
        ]
      },
    ]
  });
  }
}
