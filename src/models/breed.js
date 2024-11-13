import connection from "./../db";

export default class Breed {
  static getAllBreeds() {
    return new Promise((resolve, reject) => {
      connection.query("SELECT breed.id , breed.name , breed.species_id , species.name AS speciesName FROM breed JOIN species ON breed.species_id = species.id ", (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  static getBreedsSpecies(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT breed.id, breed.name, breed.species_id FROM breed JOIN species ON breed.species_id = species.id WHERE breed.species_id = ?",
        [id],
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  }

  static getBreedById(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM breed WHERE id = ?",
        [id],
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            if (results && Array.isArray(results) && results.length > 0) {
              resolve(results[0]);
            } else {
              reject(
                new Error("Không tìm thấy kết quả hoặc lỗi trong truy vấn")
              );
            }
          }
        }
      );
    });
  }

  static addBreed(name, species_id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO breed ( name, species_id) VALUES (?, ?)",
        [name, species_id],
        (err, results) => {
          if (err) {
            console.error("Error inserting breed:", err);
            reject(err);
          } else {
            resolve(results.insertId);
          }
        }
      );
    });
  }
  static updateBreed(id, name, species_id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE breed SET name = ?,species_id = ? WHERE id = ?",
        [name, species_id, id],
        (err) => {
          if (err) reject(err);
          resolve();
        }
      );
    });
  }
  static deleteBreed(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "DELETE FROM breed WHERE id = ?",
        [id],
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  }
}
