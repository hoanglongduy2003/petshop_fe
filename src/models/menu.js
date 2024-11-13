import connection from "../db";
export default class Profile {
    static getAllMenu() {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM menu", (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    }
    static getMenuById(id) {
        return new Promise((resolve, reject) => {
            connection.query(
                "SELECT * FROM menu WHERE id = ?",
                [id],
                (err, results) => {
                    if (err) reject(err);
                    resolve(results[0]);
                }
            );
        });
    }

    static getMenuMenuType() {
        return new Promise((resolve, reject) => {
            connection.query(
                "SELECT menu.id,menu.name,menu.link, menu.menuType_id, menuType.name as nameMenuType FROM menu JOIN  menuType on menu.menuType_id = menuType.id",
                (err, results) => {
                    if (err) reject(err);
                    resolve(results);
                }
            );
        });
    }

    static createMenu(name, link, menuType_id) {
        return new Promise((resolve, reject) => {
            connection.query(
                "INSERT INTO menu (name, link, menuType_id) VALUES (?,?,?)",
                [name, link, menuType_id],
                (err, results) => {
                    if (err) reject(err);
                    resolve(results.insertId);
                }
            );
        });
    }
    static updateMenu(id, name, link, menuType_id) {
        return new Promise((resolve, reject) => {
            connection.query(
                "UPDATE menu SET  name = ?, link = ?, menuType_id = ? WHERE id = ?",
                [name, link, menuType_id, id],
                (err) => {
                    if (err) reject(err);
                    resolve();
                }
            );
        });
    }
    static deleteMenu(id) {
        return new Promise((resolve, reject) => {
            connection.query(
                "DELETE FROM menu WHERE id = ?",
                [id],
                (err, results) => {
                    if (err) reject(err);
                    resolve(results);
                }
            );
        });
    }
}
