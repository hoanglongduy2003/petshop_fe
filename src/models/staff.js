import connection from "../db";

export default class Staff {
  static getListStaff() {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM staff", (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }
  static getIdStaff(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM staff WHERE id = ?",
        [id],
        (err, results) => {
          if (err) reject(err);
          resolve(results[0]);
        }
      );
    });
  }

  static addStaff(name) {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO staff (name) VALUES (?)",
        [name],
        (err, results) => {
          if (err) reject(err);
          resolve(results.insertId);
        }
      );
    });
  }

  static updateStaff(id, name) {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE staff SET name = ? WHERE id = ?",
        [name, id],
        (err) => {
          if (err) reject(err);
          resolve();
        }
      );
    });
  }

  static removeStaff(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "DELETE FROM staff WHERE id = ?",
        [id],
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  }
}
