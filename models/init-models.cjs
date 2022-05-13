const DataTypes = require("sequelize").DataTypes;
const _tb_comment = require("./tb_comment.cjs");
const _tb_keyword = require("./tb_keyword.cjs");
const _tb_post = require("./tb_post.cjs");

function initModels(sequelize) {
  const tb_comment = _tb_comment(sequelize, DataTypes);
  const tb_keyword = _tb_keyword(sequelize, DataTypes);
  const tb_post = _tb_post(sequelize, DataTypes);

  tb_comment.belongsTo(tb_post, { as: "post_idx_tb_post", foreignKey: "post_idx"});
  tb_post.hasMany(tb_comment, { as: "tb_comments", foreignKey: "post_idx"});

  return {
    tb_comment,
    tb_keyword,
    tb_post,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
