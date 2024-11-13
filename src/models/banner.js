import connection from "../db";
export default class Banner {
    static getAllBanner() {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM banner", (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    }
    static getBannerById(id) {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM banner WHERE id = ?", [id], (err, results) => {
                if (err) reject(err);
                resolve(results[0]);
            });
        });
    }
    static createBanner(img, title, slogan, link) {
        return new Promise((resolve, reject) => {
            connection.query(
                "INSERT INTO banner (img, title, slogan, link) VALUES (?,?,?,?)",
                [img, title, slogan, link],
                (err, results) => {
                    if (err) reject(err);
                    resolve(results.insertId);
                }
            );
        });
    }
    static updateBanner(id, img, title, slogan, link) {
        return new Promise((resolve, reject) => {
            connection.query(
                "UPDATE banner SET img = ?, title = ?, slogan = ?, link = ? WHERE id = ?",
                [img, title, slogan, link, id],
                (err) => {
                    if (err) reject(err);
                    resolve();
                }
            );
        });
    }
    static deleteBanner(id) {
        return new Promise((resolve, reject) => {
            connection.query("DELETE FROM banner WHERE id = ?", [id], (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    }
}
