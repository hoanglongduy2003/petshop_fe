import connection from "../db";

export default class ShiftWork {
  static getListShiftWork() {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM shiftwork", (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }
  static getIdShiftWork(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM shiftwork WHERE id = ?",
        [id],
        (err, results) => {
          if (err) reject(err);
          resolve(results[0]);
        }
      );
    });
  }

  static addShiftWork(name, start_time, end_time) {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO shiftwork (name, start_time, end_time) VALUES (?, ?, ?)",
        [name, start_time, end_time],
        (err, results) => {
          if (err) reject(err);
          resolve(results.insertId);
        }
      );
    });
  }

  static updateShiftWork(id, name, start_time, end_time) {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE shiftwork SET name = ?, start_time = ?, end_time = ? WHERE id = ?",
        [name, start_time, end_time, id],
        (err) => {
          if (err) reject(err);
          resolve();
        }
      );
    });
  }

  static removeShiftWork(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "DELETE FROM shiftwork WHERE id = ?",
        [id],
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  }
}
