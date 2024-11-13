import connection from "../db";
export default class Contact {
    static getAllContact() {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM contact", (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    }

    static getAllStatusContact() {
        return new Promise((resolve, reject) => {
            connection.query(
                "SELECT contact.id, contact.phone, contact.title, contact.subject, contact.user_id, contact.status_id , status_contact.name as statusName FROM contact  JOIN status_contact on contact.status_id = status_contact.id",
                (err, results) => {
                    if (err) reject(err);
                    resolve(results);
                }
            );
        });
    }

    static getContactUser() {
        return new Promise((resolve, reject) => {
            connection.query(
                "SELECT contact.id, contact.phone, contact.title, contact.subject, contact.user_id, contact.status_id, users.name as nameUser, status_contact.name as statusName FROM contact " +
                "JOIN status_contact ON contact.status_id = status_contact.id " +
                "JOIN users ON contact.user_id = users.id " +
                "ORDER BY contact.id DESC",  // Thêm ORDER BY để sắp xếp theo ID giảm dần
                (err, results) => {
                    if (err) reject(err);
                    resolve(results);
                }
            );
        });
    }


    static getContactById(id) {
        return new Promise((resolve, reject) => {
            connection.query(
                "SELECT * FROM contact WHERE id = ?",
                [id],
                (err, results) => {
                    if (err) reject(err);
                    resolve(results[0]);
                }
            );
        });
    }
    static createContact(phone, title, subject, user_id, status_id) {
        return new Promise((resolve, reject) => {
            connection.query(
                "INSERT INTO contact (phone, title, subject, user_id , status_id) VALUES (?, ?,?, ?,?)",
                [phone, title, subject, user_id, status_id],
                (err, results) => {
                    if (err) reject(err);
                    resolve(results.insertId);
                }
            );
        });
    }
    static updateContact(id, phone, title, subject, user_id) {
        return new Promise((resolve, reject) => {
            connection.query(
                "UPDATE contact SET phone = ?,title = ?, subject = ?, user_id=? status_id=? WHERE id = ?",
                [phone, title, subject, user_id, id],
                (err) => {
                    if (err) reject(err);
                    resolve();
                }
            );
        });
    }

    static updateStatusContact(id, status_id) {
        return new Promise((resolve, reject) => {
            connection.query(
                "UPDATE contact SET status_id = ? WHERE id = ?",
                [status_id, id],
                (err, results) => {
                    if (err) reject(err);
                    resolve(results);
                }
            );
        });
    }

    static deleteContact(id) {
        return new Promise((resolve, reject) => {
            connection.query(
                "DELETE FROM contact WHERE id = ?",
                [id],
                (err, results) => {
                    if (err) reject(err);
                    resolve(results);
                }
            );
        });
    }
}
