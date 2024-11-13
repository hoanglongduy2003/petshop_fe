import connection from "../db";
export default class Footer {
    static getAllFooter() {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM footer", (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    }
    static getFooterById(id) {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM footer WHERE id = ?", [id], (err, results) => {
                if (err) reject(err);
                resolve(results[0]);
            });
        });
    }
    static createFooter(slogan, content_left, content_right, license) {
        return new Promise((resolve, reject) => {
            connection.query(
                "INSERT INTO footer ( slogan, content_left, content_right, license) VALUES ( ?, ?, ?, ?)",
                [slogan, content_left, content_right, license],
                (err, results) => {
                    if (err) reject(err);
                    resolve(results.insertId);
                }
            );
        });
    }
    static updateFooter(id, slogan, content_left, content_right, license) {
        return new Promise((resolve, reject) => {
            connection.query(
                "UPDATE footer SET slogan = ?, content_left = ?, content_right = ?, license = ? WHERE id = ?",
                [slogan, content_left, content_right, license, id],
                (err) => {
                    if (err) reject(err);
                    resolve();
                }
            );
        });
    }
    static deleteFooter(id) {
        return new Promise((resolve, reject) => {
            connection.query("DELETE FROM footer WHERE id = ?", [id], (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    }
}
