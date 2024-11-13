import connection from "../db";

export default class Message {
  static getListMessage() {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM message", (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }
  static getIdMessage(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM message WHERE id = ?",
        [id],
        (err, results) => {
          if (err) reject(err);
          resolve(results[0]);
        }
      );
    });
  }

  static addMessage(text) {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO message (text) VALUES ( ?)",
        [text],
        (err, results) => {
          if (err) reject(err);
          if (results && results.insertId) {
            resolve(results.insertId);
          } else {
            reject(
              new Error("Truy vấn không thành công hoặc không trả về insertId.")
            );
          }
        }
      );
    });
  }

  static updateMessage(id, text) {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE message SET text = ? WHERE id = ?",
        [text, id],
        (err) => {
          if (err) reject(err);
          resolve();
        }
      );
    });
  }

  static removeMessage(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "DELETE FROM message WHERE id = ?",
        [id],
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  }
}
