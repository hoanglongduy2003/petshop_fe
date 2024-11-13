import connection from "../db";
export default class WebsiteInformation {
    static getAllWebsiteInformation() {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM website_information", (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    }
    static getWebsiteInformationById(id) {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM website_information WHERE id = ?", [id], (err, results) => {
                if (err) reject(err);
                resolve(results[0]);
            });
        });
    }
    static createWebsiteInformation(logo, email, phone, address, fb, zalo) {
        return new Promise((resolve, reject) => {
            connection.query(
                "INSERT INTO website_information ( logo, email, phone, fb, zalo) VALUES (?,?,?,?,?,?)",
                [logo, email, phone, address, fb, zalo],
                (err, results) => {
                    if (err) reject(err);
                    resolve(results.insertId);
                }
            );
        });
    }
    static updateWebsiteInformation(id, logo, email, phone, address, fb, zalo) {
        return new Promise((resolve, reject) => {
            connection.query(
                "UPDATE website_information SET logo = ?, email = ?, phone = ?, address = ?,  fb = ?, zalo = ? WHERE id = ?",
                [logo, email, phone, address, fb, zalo, id],
                (err) => {
                    if (err) reject(err);
                    resolve();
                }
            );
        });
    }
    static deleteWebsiteInformation(id) {
        return new Promise((resolve, reject) => {
            connection.query("DELETE FROM website_information WHERE id = ?", [id], (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    }
}
