import connection from "../db";

export default class StatusContact {
  static getAllStatusPayment() {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM status_payment", (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }
}
