import connection from "../db";

export default class Status {
  static getListStatus() {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM status_appointment", (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }
  static getIdStatus(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM status_appointment WHERE id = ?",
        [id],
        (err, results) => {
          if (err) reject(err);
          resolve(results[0]);
        }
      );
    });
  }

  static addStatus(name) {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO status_appointment (name) VALUES (?)",
        [name],
        (err, results) => {
          if (err) reject(err);
          resolve(results.insertId);
        }
      );
    });
  }

  static updateStatus(id, name) {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE status_appointment SET name = ? WHERE id = ?",
        [name, id],
        (err) => {
          if (err) reject(err);
          resolve();
        }
      );
    });
  }

  static removeStatus(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "DELETE FROM status_appointment WHERE id = ?",
        [id],
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  }
}
