import connection from "../db";

export default class News {
  static getListNews() {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM news", (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }
  static getListNewsTop3() {
    return new Promise((resolve, reject) => {
      connection.query("SELECT news.*, users.name as nameUser FROM news JOIN users ON news.user_id = users.id ORDER BY news.created_at DESC LIMIT 3", (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }
  static getTop8() {
    return new Promise((resolve, reject) => {
      connection.query("SELECT news.*, users.name as nameUser FROM news JOIN users ON news.user_id = users.id ORDER BY news.created_at DESC LIMIT 8", (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }
  static getNewsUsers() {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT news.id,news.img, news.title, news.description, news.created_at, news.user_id, users.name as nameUser FROM news JOIN  users on news.user_id = users.id",
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  }

  static getNews(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM news WHERE id = ?",
        [id],
        (err, results) => {
          if (err) reject(err);
          resolve(results[0]);
        }
      );
    });
  }

  static createNews(img, title, description, created_at, user_id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO news (img,title, description, created_at, user_id) VALUES (?,?,?,?,?)",
        [img, title, description, created_at, user_id],
        (err, results) => {
          if (err) reject(err);
          resolve(results.insertId);
        }
      );
    });
  }

  static updateNews(id, img, title, description, created_at, user_id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE news SET img = ?, title = ?, description = ?, created_at=?, user_id=? WHERE id = ?",
        [img, title, description, created_at, user_id, id],
        (err) => {
          if (err) reject(err);
          resolve();
        }
      );
    });
  }
  static deleteNews(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "DELETE FROM news WHERE id = ?",
        [id],
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  }
}
