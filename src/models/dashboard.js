import connection from "../db";

export default class Dashboard {
  static getDashboard(year, month) {
    return new Promise((resolve, reject) => {
      connection.query(
        `
        SELECT total, DATE_FORMAT(time, '%d-%m-%Y') AS activity_date
        FROM duantotnghiep.orders
        WHERE status_payment = 2
        AND status_id = 4;
        `,
        [year, month],
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  }

  static getSCheduleStatusAppointment() {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT status_id,status_appointment.name, COUNT(*) as status_count FROM appointments JOIN status_appointment ON appointments.status_id = status_appointment.id GROUP BY status_id",
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  }
  static getSCheduleStatusOrder() {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT status_id,status_order.name, COUNT(*) as status_count FROM orders JOIN status_order ON orders.status_id = status_order.id GROUP BY status_id",
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  }
  static getMonthlyRevenue(year, month) {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT 
            DATE_FORMAT(time, '%m-%Y') AS activity_date,
            COUNT(id) AS total_orders,
            SUM(total) AS total_revenue
        FROM 
            orders
        WHERE 
            status_payment = 2 
            AND status_id = 4
        GROUP BY 
            activity_date
        ORDER BY 
            STR_TO_DATE(activity_date, '%m-%Y') ASC;
    `,
        [year, month, year, month],
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  }

  static getRevenueToday() {
    return new Promise((resolve, reject) => {
      connection.query(
        `
        SELECT
            DATE_FORMAT(time, '%d-%m-%Y') AS activity_date,
            SUM(total) AS total_orders,
            SUM(total) AS total_revenue
        FROM
            orders
        WHERE
            status_payment = 2
            AND status_id = 4
            AND DATE(time) = CURDATE()
        GROUP BY
            activity_date
        ORDER BY
            activity_date DESC;
        `,
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        }
      );
    });
  }

  static getRevenueThisMonth() {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT
            DATE_FORMAT(time, '%m-%Y') AS activity_month,
            COUNT(id) AS total_orders,
            SUM(total) AS total_revenue
        FROM
            orders
        WHERE
            status_payment = 2
            AND status_id = 4
            AND MONTH(time) = MONTH(CURDATE())
            AND YEAR(time) = YEAR(CURDATE())
        GROUP BY
            DATE_FORMAT(time, '%m-%Y')
        ORDER BY
            activity_month DESC;
    `,
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  }
  static countUserDay() {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT COUNT(*) AS count FROM users WHERE DATE(create_at) = CURRENT_DATE;
        `,
        [],
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  }

  static getRevenueAppointmentsToDay() {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT DATE(start_time) AS activity_date, SUM(total) AS total_appointments FROM appointments WHERE status_payment = 2 AND status_id = 4 AND DATE(start_time) = CURDATE() GROUP BY DATE(start_time);
    `,
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  }
  static getRevenueAppointmentsThisMonth() {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT
        DATE_FORMAT(start_time, '%Y-%m') AS activity_month,
        SUM(total) AS total_appointments
      FROM
        appointments
      WHERE
        status_payment = 2 AND status_id = 4
      GROUP BY
        DATE_FORMAT(start_time, '%Y-%m');
      
    `,
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  }
}
