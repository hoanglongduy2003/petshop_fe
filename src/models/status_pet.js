import connection from "../db";

export default class StatusPet {
  static getListStatusPet() {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM status_pet", (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }
  static getIdStatusPet(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM status_pet WHERE id = ?",
        [id],
        (err, results) => {
          if (err) reject(err);
          resolve(results[0]);
        }
      );
    });
  }

  static addStatusPet(name) {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO status_pet (name) VALUES (?)",
        [name],
        (err, results) => {
          if (err) reject(err);
          resolve(results.insertId);
        }
      );
    });
  }

  static updateStatusPet(id, name) {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE status_pet SET name = ? WHERE id = ?",
        [name, id],
        (err) => {
          if (err) reject(err);
          resolve();
        }
      );
    });
  }

  static removeStatusPet(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "DELETE FROM status_pet WHERE id = ?",
        [id],
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  }
}
