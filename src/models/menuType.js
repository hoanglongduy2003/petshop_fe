import connection from "../db";
export default class MenuType {
    static getAllMenuType() {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM menuType", (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    }
    static getMenuTypeById(id) {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM menuType WHERE id = ?", [id], (err, results) => {
                if (err) reject(err);
                resolve(results[0]);
            });
        });
    }
    static createMenuType(name) {
        return new Promise((resolve, reject) => {
            connection.query(
                "INSERT INTO menuType (name) VALUES (?)",
                [name],
                (err, results) => {
                    if (err) reject(err);
                    resolve(results.insertId);
                }
            );
        });
    }
    static updateMenuType(id, name) {
        return new Promise((resolve, reject) => {
            connection.query(
                "UPDATE menuType SET name = ? WHERE id = ?",
                [name, id],
                (err) => {
                    if (err) reject(err);
                    resolve();
                }
            );
        });
    }
    static deleteMenuType(id) {
        return new Promise((resolve, reject) => {
            connection.query("DELETE FROM menuType WHERE id = ?", [id], (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    }
}
