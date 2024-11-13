import connection from "../db";

export default class About {
  static getListAbout() {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM about", (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }
  static getIdAbout(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM about WHERE id = ?",
        [id],
        (err, results) => {
          if (err) reject(err);
          resolve(results[0]);
        }
      );
    });
  }

  static addAbout(image, description) {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO about (image, description) VALUES (?, ?)",
        [image, description],
        (err, results) => {
          if (err) reject(err);
          if (results && results.insertId) {
            resolve(results.insertId);
          } else {
            reject(new Error('Truy vấn không thành công hoặc không trả về insertId.'));
          }

        }
      );
    });
  }

  static updateAbout(id, image, description) {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE about SET image = ?, description = ? WHERE id = ?",
        [image, description, id],
        (err) => {
          if (err) reject(err);
          resolve();
        }
      );
    });
  }

  static removeAbout(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "DELETE FROM about WHERE id = ?",
        [id],
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  }
}
