import connection from "../db";

export default class deliveryAddress {
  static getAllDeliveryAddress(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM delivery_address WHERE user_Id = ? AND is_delete <> 1",
        [id],
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  }
  static createDeliveryAddress(name, phone, address, city, district, ward, user_id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO delivery_address (name, phone, address, city, district, ward, user_id, is_delete) VALUES (?,?,?,?,?,?,?,0)",
        [name, phone, address, city, district, ward,  user_id],
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  }
  static updateDeliveryAddress(id, name, phone, address, city, district, ward){
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE delivery_address SET name = ?, phone = ?, address = ?, city = ?, district = ?, ward = ? WHERE id = ?",
        [name, phone, address, city, district, ward, id],
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  }
  static deleteDeliveryAddress(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "DELETE FROM delivery_address WHERE id = ?",
        [id],
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  }
}
