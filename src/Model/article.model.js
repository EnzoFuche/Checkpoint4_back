const { connection } = require("../../db-connection");

class Article {
  static deleteOneById(id) {
    const sql = "DELETE FROM article WHERE id=?";
    return connection.promise().query(sql, [id]);
  }

  static createOne(article) {
    const sql = "INSERT INTO article SET ?";
    return connection.promise().query(sql, [character]);
  }

  static updateOne(article) {
    const sql = "UPDATE article SET ? WHERE id=?";
    return connection.promise().query(sql, [character, id]);
  }

  static findManyArticle() {
    const sql = "SELECT * FROM article article";
    return connection.promise().query(sql);
  }

  static findOneById(article) {
    const sql = "SELECT * FROM article WHERE id=?";
    return connection.promise().query(sql, [id]);
  }
}

module.exports = Article;
