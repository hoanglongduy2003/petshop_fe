import connection from "../db";

export default class Pet {
  static getAllPet() {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT pets.id, pets.img, pets.name, pets.age, pets.gender, pets.user_id, users.name AS nameUser, pets.species_id, species.name AS nameSpecies, pets.breed_id, breed.name AS nameBreed FROM pets JOIN users ON pets.user_id = users.id JOIN species ON pets.species_id = species.id JOIN breed ON pets.breed_id = breed.id",
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  }
  static getAllUserPet(user_id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT pets.id, pets.name, pets.age, pets.img, pets.gender, pets.user_id, users.name AS nameUser, pets.species_id, species.name AS nameSpecies, pets.breed_id, breed.name AS nameBreed FROM pets JOIN users ON pets.user_id = users.id JOIN species ON pets.species_id = species.id JOIN breed ON pets.breed_id = breed.id WHERE user_id = ?",
        [user_id],
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  }

  static getNamePet(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT name FROM pets WHERE id = ?",
        [id],
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  }
  static getPetById(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM pets WHERE id = ?",
        [id],
        (err, results) => {
          if (err) reject(err);
          resolve(results[0]);
        }
      );
    });
  }

  static getUserPet(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT pets.id, pets.img, pets.name, pets.age, pets.gender, pets.user_id, users.name AS nameUser, pets.species_id, species.name AS nameSpecies, pets.breed_id, breed.name AS nameBreed FROM pets JOIN users ON pets.user_id = users.id JOIN species ON pets.species_id = species.id JOIN breed ON pets.breed_id = breed.id  WHERE pets.id = ?",
        [id],
        (err, results) => {
          if (err) reject(err);
          resolve(results[0]);
        }
      );
    });
  }

  static addPet(
    img,
    name,
    age,
    gender,
    user_id,
    species_id,
    breed_id,
    health_condition
  ) {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO pets (img, name, age, gender, user_id, species_id, breed_id,status_id ,health_condition,id_delete ) VALUES (?, ?, ?, ?, ?, ?, ?,2, ?, 0)",
        [
          img,
          name,
          age,
          gender,
          user_id,
          species_id,
          breed_id,
          health_condition,
        ],
        (err, results) => {
          if (err) {
            console.error("Error inserting pet:", err);
            reject(err);
          } else {
            resolve(results);
          }
        }
      );
    });
  }
  static updatePet(
    id,
    img,
    name,
    age,
    gender,
    user_id,
    species_id,
    breed_id,
    status_id,
    health_condition
  ) {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE pets SET img = ?,name = ?,age = ?,gender = ?,user_id = ?,species_id = ?,breed_id = ?,status_id = ?,health_condition = ? WHERE id = ?",
        [
          img,
          name,
          age,
          gender,
          user_id,
          species_id,
          breed_id,
          status_id,
          health_condition,
          id,
        ],
        (err) => {
          if (err) reject(err);
          resolve();
        }
      );
    });
  }
  static deletePet(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "DELETE FROM pets WHERE id = ?",
        [id],
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  }
}
