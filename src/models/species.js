import connection from "../db";

export default class Species {
  static getListSpecies() {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM species", (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }
  static getIdSpecies(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM species WHERE id = ?",
        [id],
        (err, results) => {
          if (err) reject(err);
          resolve(results[0]);
        }
      );
    });
  }

  static addSpecies(name) {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO species (name) VALUES (?)",
        [name],
        (err, results) => {
          if (err) reject(err);
          resolve(results.insertId);
        }
      );
    });
  }

  static updateSpecies(id, name) {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE species SET name = ? WHERE id = ?",
        [name, id],
        (err) => {
          if (err) reject(err);
          resolve();
        }
      );
    });
  }
  static removeSpecies(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT id FROM breed WHERE species_id = ?",
        [id],
        (err, breedResults) => {
          if (err) reject(err);
          const breedIds = breedResults.map((row) => row.id);
          if (breedIds.length > 0) {
            connection.query(
              "DELETE FROM breed WHERE id IN (?)",
              [breedIds],
              (err) => {
                if (err) reject(err);
                connection.query(
                  "DELETE FROM species WHERE id = ?",
                  [id],
                  (err, results) => {
                    if (err) reject(err);
                    resolve(results);
                  }
                );
              }
            );
          } else {
            connection.query(
              "DELETE FROM species WHERE id = ?",
              [id],
              (err, results) => {
                if (err) reject(err);
                resolve(results);
              }
            );
          }
        }
      );
    });
  }
}
