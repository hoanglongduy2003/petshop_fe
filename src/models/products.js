import connection from "../db";

export default class Products {
  static getAllProducts() {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT products.id, products.name,products.description,products.price, products.img ,products.quantity , products.category_id , category.name AS nameCategory FROM products JOIN category ON products.category_id = category.id ",
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  }
  static getTop8Products() {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT products.id, products.name, products.description, products.price, products.img, products.quantity, category.name AS nameCategory FROM products JOIN category ON products.category_id = category.id ORDER BY products.id DESC LIMIT 8",
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  }

  static getProductsCate(id_cate) {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM products WHERE category_id = ?",
        [id_cate],
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  }

  static getProductById(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM products WHERE id = ?",
        [id],
        (err, results) => {
          if (err) reject(err);
          resolve(results[0]);
        }
      );
    });
  }

  static addProducts(name, description, price, img, quantity, category_id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO products (name, description, price, img, quantity,category_id) VALUES (?, ?, ?, ?, ?, ?)",
        [name, description, price, img, quantity, category_id],
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
  static updateProduct(
    id,
    name,
    description,
    price,
    img,
    quantity,
    category_id
  ) {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE products SET name = ?,description = ?,price = ?,img = ?,quantity = ?,category_id = ? WHERE id = ?",
        [name, description, price, img, quantity, category_id, id],
        (err) => {
          if (err) reject(err);
          resolve();
        }
      );
    });
  }
  static updateQuantity(id, quantity) {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE products SET quantity = ? WHERE id = ?",
        [quantity, id],
        (err) => {
          if (err) reject(err);
          resolve();
        }
      );
    });
  }
  static deleteProducts(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "DELETE FROM products WHERE id = ?",
        [id],
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  }
  static searchProducts(category_id) {
    let query =
      "SELECT products.id , category.name AS category_name  FROM products JOIN category ON products.category_id = category.id WHERE ";
    const conditions = [];
    if (category_id) {
      conditions.push(`products.category_id = '${category_id}'`);
    }

    if (conditions.length === 0) {
      return Promise.reject({
        error: "At least one search parameter is required.",
      });
    }

    query += conditions.join(" AND ");

    return new Promise((resolve, reject) => {
      connection.query(query, (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }
  static searchProduct(name) {
    let query = `
        SELECT products.id, products.name, products.price, category.name AS category_name 
        FROM products 
        JOIN category ON products.category_id = category.id 
        WHERE products.name LIKE ? 
    `;

    return new Promise((resolve, reject) => {
      connection.query(query, [`%${name}%`], (err, results) => {
        if (err) {
          console.error("SQL Error:", err);
          reject(err);
        }
        resolve(results);
      });
    });
  }
}
