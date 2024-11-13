import connection from "../db";

export default class StatusContact {
  static getListStatusContact() {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM status_contact", (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }
  static getIdStatusContact(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM status_contact WHERE id = ?",
        [id],
        (err, results) => {
          if (err) reject(err);
          resolve(results[0]);
        }
      );
    });
  }

  static addStatusContact(name) {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO status_contact (name) VALUES (?)",
        [name],
        (err, results) => {
          if (err) reject(err);
          resolve(results.insertId);
        }
      );
    });
  }

  static updateStatusContact(id, name) {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE status_contact SET name = ? WHERE id = ?",
        [name, id],
        (err) => {
          if (err) reject(err);
          resolve();
        }
      );
    });
  }

  static removeStatusContact(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "DELETE FROM status_contact WHERE id = ?",
        [id],
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  }
}
