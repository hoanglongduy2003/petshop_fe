import connection from "../db";

export default class SetTime {
  static getListSetTime() {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM settime", (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }
  static getIdSetTime(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM settime WHERE id = ?",
        [id],
        (err, results) => {
          if (err) reject(err);
          resolve(results[0]);
        }
      );
    });
  }

  static addSetTime(name, start_time, end_time) {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO settime (name, start_time, end_time) VALUES (?, ?, ?)",
        [name, start_time, end_time],
        (err, results) => {
          if (err) reject(err);
          resolve(results.insertId);
        }
      );
    });
  }

  static updateSetTime(id, name, start_time, end_time) {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE settime SET name = ?, start_time = ?, end_time = ? WHERE id = ?",
        [name, start_time, end_time, id],
        (err) => {
          if (err) reject(err);
          resolve();
        }
      );
    });
  }

  static removeSetTime(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "DELETE FROM settime WHERE id = ?",
        [id],
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  }
}
