import connection from "./../db";

export default class PrintInvoice {
  static getIDInvoice(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT Invoice.id, users.name AS nameInvoice, Invoice.date,Invoice.amount,Invoice.paymentMethod,Invoice.appointments_id FROM Invoice JOIN users ON Invoice.user_id = users.id WHERE Invoice.appointments_id = ?",
        [id],
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  }

  static addInvoice(user_id, amount, paymentMethod, appointments_id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO Invoice (user_id, date, amount, paymentMethod, appointments_id ) VALUES (?,  NOW(), ?, ?, ?)",
        [user_id, amount, paymentMethod, appointments_id],
        (err, results) => {
          if (err) {
            console.error("Error inserting :", err);
            reject(err);
          } else {
            resolve(results.insertId);
          }
        }
      );
    });
  }
}
