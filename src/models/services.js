import connection from "../db";

export default class Services {
  static getAllServicesCLient() {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM services WHERE is_delete <> 1",
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  }
  static getAllServices() {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM services", (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }
  static getTop1Services() {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM services ORDER BY id LIMIT 1;",
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  }
  static getTop4Services() {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM services ORDER BY id LIMIT 4;",
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  }
  static getNameServicesById(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT name FROM services WHERE id = ?",
        [id],
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  }
  static getServicesById(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM services WHERE id = ?",
        [id],
        (err, results) => {
          if (err) reject(err);
          resolve(results[0]);
        }
      );
    });
  }

  static createServices(name, description, price, image, time) {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO services (name, description,image,price, time) VALUES (?, ?,?,?, ?)",
        [name, description, price, image, time],
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

  static updateServices(id, name, image, description, price, time) {
    const updateSql =
      "UPDATE services SET name = ?,image = ?, description = ?, price = ?, time =?  WHERE id = ?";
    const values = [name, image, description, price, time, id];
    return new Promise((resolve, reject) => {
      connection.query(updateSql, values, (err) => {
        if (err) reject(err);
        resolve();
      });
    });
  }

  static updateBlockService(id, is_delete) {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE services SET is_delete = ? WHERE id = ?",
        [is_delete, id],
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  }

  static checkServices(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM services WHERE is_delete = 1 AND id = ?",
        [id],
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  }
}
