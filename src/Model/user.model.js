const argon2 = require("argon2");
const { connection } = require("../../db-connection");

class User {
  static async emailAlreadyExists(email) {
    const sql = "SELECT * FROM user WHERE email=?";
    const [results] = await connection.promise().query(sql, [email]);
    return results.length > 0;
  }

  static validatePassword(password) {
    return password.length >= 8;
  }

  static async hashPassword(password) {
    const hashedPassword = await argon2.hash(password);
    return hashedPassword;
  }

  static async verifyPassword(password, hashedPassword) {
    console.log(password, hashedPassword);
    const valid = await argon2.verify(hashedPassword, password);
    return valid;
  }

  static findMany() {
    const sql = "SELECT * FROM user";
    return connection.promise().query(sql);
  }

  static findOneById(id) {
    const sql = "SELECT * FROM user WHERE id=?";
    return connection.promise().query(sql, [id]);
  }

  static findOneByEmail(email) {
    console.log(email);
    const sql = "SELECT * FROM user WHERE email=?";
    return connection.promise().query(sql, [email]);
  }

  static createOne(user) {
    const sql = "INSERT INTO user SET ?";
    return connection.promise().query(sql, [user]);
  }

  static async hashed_Password(password) {
    const hash = await argon2.hash(password);
    return hash;
  }

  static deleteOneById(id) {
    const sql = "DELETE FROM user WHERE id=?";
    return connection.promise().query(sql, [id]);
  }
}

module.exports = User;
