import connection from "../db";

export default class Pethouse {
  static getAllPetHouseClient() {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM pethouse WHERE is_delete <> 1", (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  static getAllPetHouse() {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM pethouse", (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  static getPethouseById(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM pethouse WHERE id = ?",
        [id],
        (err, results) => {
          if (err) reject(err);
          resolve(results[0]);
        }
      );
    });
  }
  static updateBlockPetHouse(id, is_delete) {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE pethouse SET is_delete = ? WHERE id = ?",
        [is_delete, id],
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  }
  static createPethouse(name) {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO pethouse (name) VALUES (?)",
        [name],
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results.insertId);
          }
        }
      );
    });
  }

  static updatePethouse(id, name) {
    const updateSql = "UPDATE pethouse SET name = ? WHERE id = ?";
    const values = [name, id];
    return new Promise((resolve, reject) => {
      connection.query(updateSql, values, (err) => {
        if (err) reject(err);
        resolve();
      });
    });
  }

  static deletePethouse(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "DELETE FROM pethouse WHERE id = ?",
        [id],
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  }

  static checkPethouse(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM pethouse WHERE is_delete = 1 AND id = ?",
        [id],
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  }
}
