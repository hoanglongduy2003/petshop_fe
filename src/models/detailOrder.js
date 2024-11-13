import connection from "../db";
export default class DetailOrder {
  static createDetailOrder(orderId, productId, quantity, price) {
    return new Promise((resolve, reject) => {
      connection.beginTransaction((err) => {
        if (err) {
          reject(err);
          return;
        }
        connection.query(
          "INSERT INTO detailOrder (orderId,productId,quantity,price) VALUES (?,?,?,?)",
          [orderId, productId, quantity, price],
          (err, results) => {
            if (err) {
              console.error("Lỗi", err);
              connection.rollback(() => {
                reject(err);
              });
              return;
            }
            resolve(results.insertIds);
          }
        );
      });
    });
  }
}
