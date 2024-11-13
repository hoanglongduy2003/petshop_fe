import connection from "../db";
export default class paymentMethods {
  static getAllPaymentMethods() {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM paymentMethods", (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }
  static getStatusPaymentNameById(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT name FROM paymentMethods WHERE id = ?",
        [id],
        (err, results) => {
          if (err) reject(err);
          resolve(results[0].name);
        }
      );
    });
  }
}
