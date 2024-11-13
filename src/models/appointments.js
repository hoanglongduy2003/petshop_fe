import connection from "../db";

export default class Appointments {
  static getAllAppointments() {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM appointments", (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }
  static getAppointmentsById(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT appointments.id, appointmentServices.service_id AS serviceId,status_payment.id AS statusPaymentId, status_payment.name AS statusPaymentName,users.name AS user_name, services.name AS serviceName, appointmentPets.pet_id AS petId, pets.name AS petName, appointments.day, appointments.total, appointments.start_time, appointments.end_time, users.email AS user_email, pethouse.name AS pethouse_name, pethouse.id AS pethouse_id, status_appointment.name AS status_name,status_appointment.id AS status_id, appointments.paymentMethods_id AS paymentMethodsId, paymentMethods.name AS paymentMethodsName  FROM appointments JOIN users ON appointments.user_id = users.id JOIN pethouse ON appointments.pethouse_id = pethouse.id JOIN status_appointment ON appointments.status_id = status_appointment.id JOIN appointmentServices ON appointments.id = appointmentServices.appointment_id JOIN services ON appointmentServices.service_id = services.id JOIN appointmentPets ON appointments.id = appointmentPets.appointment_id JOIN status_payment ON appointments.status_payment = status_payment.id JOIN pets ON appointmentPets.pet_id = pets.id JOIN paymentMethods ON paymentMethods.id = appointments.paymentMethods_id WHERE appointments.id = ?",
        [id],
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  }
  static checkPetHouse(start_time, end_time) {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT ph.id, ph.name
        FROM pethouse ph
        WHERE ph.id NOT IN (
          SELECT DISTINCT a.pethouse_id
          FROM appointments a
          WHERE (
            (? >= a.start_time AND ? < a.end_time)
            OR (? > a.start_time AND ? <= a.end_time)
            OR (a.start_time >= ? AND a.start_time < ?)
            OR (a.end_time > ? AND a.end_time <= ?)
          ) AND a.status_id <> 5
        ) AND ph.is_delete = 0 ;`,
        [
          start_time,
          start_time,
          end_time,
          end_time,
          start_time,
          end_time,
          start_time,
          end_time,
        ],
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  }

  static getStatusPaymentById(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT status_payment FROM appointments WHERE id = ?",
        [id],
        (err, results) => {
          if (err) reject(err);
          resolve(results[0]?.status_payment);
        }
      );
    });
  }
  static getAppointmentsData() {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT appointments.id, appointmentServices.service_id AS serviceId,status_payment.id AS statusPaymentId, status_payment.name AS statusPaymentName,users.name AS user_name, services.name AS serviceName, appointmentPets.pet_id AS petId, pets.name AS petName, appointments.day, appointments.total, appointments.start_time, appointments.end_time, users.email AS user_email, pethouse.name AS pethouse_name, pethouse.id AS pethouse_id, status_appointment.name AS status_name,status_appointment.id AS status_id FROM appointments JOIN users ON appointments.user_id = users.id JOIN pethouse ON appointments.pethouse_id = pethouse.id JOIN status_appointment ON appointments.status_id = status_appointment.id JOIN appointmentServices ON appointments.id = appointmentServices.appointment_id JOIN services ON appointmentServices.service_id = services.id JOIN appointmentPets ON appointments.id = appointmentPets.appointment_id JOIN status_payment ON appointments.status_payment = status_payment.id JOIN pets ON appointmentPets.pet_id = pets.id ORDER BY appointments.day DESC",
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  }

  static getAppointmentUser(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT appointments.id, appointmentServices.service_id AS serviceId,status_payment.id AS statusPaymentId, status_payment.name AS statusPaymentName,users.name AS user_name, services.name AS serviceName, appointmentPets.pet_id AS petId, pets.name AS petName, appointments.day, appointments.total, appointments.start_time, appointments.end_time, users.email AS user_email, pethouse.name AS pethouse_name, pethouse.id AS pethouse_id, status_appointment.name AS status_name,status_appointment.id AS status_id FROM appointments JOIN users ON appointments.user_id = users.id JOIN pethouse ON appointments.pethouse_id = pethouse.id JOIN status_appointment ON appointments.status_id = status_appointment.id JOIN appointmentServices ON appointments.id = appointmentServices.appointment_id JOIN services ON appointmentServices.service_id = services.id JOIN appointmentPets ON appointments.id = appointmentPets.appointment_id JOIN status_payment ON appointments.status_payment = status_payment.id JOIN pets ON appointmentPets.pet_id = pets.id WHERE appointments.user_id = ?  GROUP BY appointments.id ORDER BY appointments.day DESC",
        [id],
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  }

  static getAppointmentUserStatus(id, status_id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT appointments.id, appointmentServices.service_id AS serviceId,status_payment.id AS statusPaymentId, status_payment.name AS statusPaymentName,users.name AS user_name, services.name AS serviceName, appointmentPets.pet_id AS petId, pets.name AS petName, appointments.day, appointments.total, appointments.start_time, appointments.end_time, users.email AS user_email, pethouse.name AS pethouse_name, pethouse.id AS pethouse_id, status_appointment.name AS status_name,status_appointment.id AS status_id, appointments.paymentMethods_id AS paymentMethodsId, paymentMethods.name AS paymentMethodsName  FROM appointments JOIN users ON appointments.user_id = users.id JOIN pethouse ON appointments.pethouse_id = pethouse.id JOIN status_appointment ON appointments.status_id = status_appointment.id JOIN appointmentServices ON appointments.id = appointmentServices.appointment_id JOIN services ON appointmentServices.service_id = services.id JOIN appointmentPets ON appointments.id = appointmentPets.appointment_id JOIN status_payment ON appointments.status_payment = status_payment.id JOIN pets ON appointmentPets.pet_id = pets.id JOIN paymentMethods ON paymentMethods.id = appointments.paymentMethods_id WHERE appointments.user_id = ? AND appointments.status_id = ? ORDER BY appointments.day DESC",
        [id, status_id],
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  }
  static getPrintDataById(appointmentId) {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT appointments.id, appointmentServices.service_id AS serviceId, status_payment.id AS statusPaymentId, status_payment.name AS statusPaymentName, users.name AS user_name, services.name AS serviceName, appointmentPets.pet_id AS petId, pets.name AS petName, appointments.day, appointments.total, appointments.start_time, appointments.end_time, users.email AS user_email, pethouse.name AS pethouse_name, pethouse.id AS pethouse_id, status_appointment.name AS status_name, status_appointment.id AS status_id FROM appointments JOIN users ON appointments.user_id = users.id JOIN pethouse ON appointments.pethouse_id = pethouse.id JOIN status_appointment ON appointments.status_id = status_appointment.id JOIN appointmentServices ON appointments.id = appointmentServices.appointment_id JOIN services ON appointmentServices.service_id = services.id JOIN appointmentPets ON appointments.id = appointmentPets.appointment_id JOIN status_payment ON appointments.status_payment = status_payment.id JOIN pets ON appointmentPets.pet_id = pets.id WHERE appointments.id = ? ",
        [appointmentId],
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  }
  static createAppointments(
    day,
    user_id,
    pethouse_id,
    start_time,
    end_time,
    total,
    paymentMethods_id
  ) {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO appointments (day, user_id, pethouse_id, start_time, end_time, total,status_id,status_payment, paymentMethods_id) VALUES (?,?,?,?,?,?,1,1,?)",
        [
          day,
          user_id,
          pethouse_id,
          start_time,
          end_time,
          total,
          paymentMethods_id,
        ],
        (err, results) => {
          if (err) reject(err);
          resolve(results?.insertId);
        }
      );
    });
  }

  static createAppointmentsAdmin(
    day,
    user_id,
    pethouse_id,
    start_time,
    end_time,
    total,
    status_id,
    status_payment,
    paymentMethods_id
  ) {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO appointments (day, user_id, pethouse_id, start_time, end_time, total,status_id,status_payment,paymentMethods_id) VALUES (?,?,?,?,?,?,?,?,?)",
        [
          day,
          user_id,
          pethouse_id,
          start_time,
          end_time,
          total,
          status_id,
          status_payment,
          paymentMethods_id
        ],
        (err, results) => {
          if (err) reject(err);
          resolve(results.insertId);
        }
      );
    });
  }
  static updateAppointments(id, pethouse_id, start_time, total, end_time) {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE appointments SET pethouse_id = ?, start_time = ?,end_time = ?,total = ? WHERE id = ?",
        [pethouse_id, start_time, end_time, total, id],
        (err) => {
          if (err) reject(err);
          resolve();
        }
      );
    });
  }

  static updateAppointmentsAdmin(
    id,
    pethouse_id,
    start_time,
    total,
    end_time,
    animalCondition,
    status_payment,
    status_id
  ) {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE appointments SET pethouse_id = ?, start_time = ?,end_time = ?,total = ?, animalCondition = ?, status_payment = ?, status_id = ?  WHERE id = ?",
        [
          pethouse_id,
          start_time,
          end_time,
          total,
          animalCondition,
          status_payment,
          status_id,
          id,
        ],
        (err) => {
          if (err) reject(err);
          resolve();
        }
      );
    });
  }
  static updateAppointmentStatus(id, status_id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE appointments SET status_id = ? WHERE id = ?",
        [status_id, id],
        (err) => {
          if (err) reject(err);
          resolve();
        }
      );
    });
  }

  static updateAppointmentPayment(id, status_payment) {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE appointments SET status_payment = ? WHERE id = ?",
        [status_payment, id],
        (err) => {
          if (err) reject(err);
          resolve();
        }
      );
    });
  }

  static cancelHistoryAppointment(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE appointments SET status_id = 5 WHERE id = ?",
        [id],
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  }

  static getAppointmentTime(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT DISTINCT appointments.id, appointments.start_time, appointments.end_time FROM appointments JOIN pethouse ON appointments.pethouse_id = pethouse.id WHERE appointments.start_time >= CURRENT_DATE AND pethouse.id = ?",
        [id],
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  }

  static updateStatusCancel(currentTime) {
    return new Promise((resolve, reject) => {
      const sqlSelectUpdatedAppointments =
        "SELECT id FROM appointments WHERE (status_id = 1 AND start_time <= ?) OR (status_id = 2 AND ADDTIME(start_time, '00:30:00') <= ?)";
      const sqlUpdateStatus1 =
        "UPDATE appointments SET status_id = 5 WHERE status_id = 1 AND start_time <= ?";
      const sqlUpdateStatus2 =
        "UPDATE appointments SET status_id = 5 WHERE status_id = 2 AND ADDTIME(start_time, '00:30:00') <= ?";

      connection.beginTransaction((err) => {
        if (err) {
          reject(err);
          return;
        }
        let updatedAppointmentIds = [];

        connection.query(
          sqlSelectUpdatedAppointments,
          [currentTime, currentTime],
          (errSelect, resultsSelect) => {
            if (errSelect) {
              connection.rollback(() => {
                reject(errSelect);
              });
            } else {
              updatedAppointmentIds = resultsSelect.map((result) => result.id);

              connection.query(
                sqlUpdateStatus1,
                [currentTime],
                (err1, results1) => {
                  if (err1) {
                    connection.rollback(() => {
                      reject(err1);
                    });
                  } else {
                    connection.query(
                      sqlUpdateStatus2,
                      [currentTime],
                      (err2, results2) => {
                        if (err2) {
                          connection.rollback(() => {
                            reject(err2);
                          });
                        } else {
                          connection.commit((err3) => {
                            if (err3) {
                              connection.rollback(() => {
                                reject(err3);
                              });
                            } else {
                              resolve({
                                results1,
                                results2,
                                updatedAppointmentIds,
                              });
                            }
                          });
                        }
                      }
                    );
                  }
                }
              );
            }
          }
        );
      });
    });
  }

  static getUserEmail(appointmentId) {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT users.email AS user_email " +
          "FROM appointments " +
          "JOIN users ON appointments.user_id = users.id " +
          "WHERE appointments.id = ?",
        [appointmentId],
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  }
  static searchAppointments(nameUser, pethouse_id, start_time, status_id) {
    let query =
      "SELECT appointments.id, appointmentServices.service_id AS serviceId, services.name AS serviceName, appointmentPets.pet_id AS petId, pets.name AS petName, appointments.day, appointments.total, appointments.start_time, appointments.end_time, users.email AS user_email, users.name AS user_name, pethouse.name AS pethouse_name, pethouse.id AS pethouse_id, status_appointment.name AS status_name FROM appointments JOIN users ON appointments.user_id = users.id JOIN pethouse ON appointments.pethouse_id = pethouse.id JOIN status_appointment ON appointments.status_id = status_appointment.id JOIN appointmentServices ON appointments.id = appointmentServices.appointment_id JOIN services ON appointmentServices.service_id = services.id JOIN appointmentPets ON appointments.id = appointmentPets.appointment_id JOIN pets ON appointmentPets.pet_id = pets.id WHERE ";
    const conditions = [];

    if (nameUser) {
      conditions.push(`users.name LIKE '%${nameUser}%'`);
    }
    if (pethouse_id) {
      conditions.push(`appointments.pethouse_id = '${pethouse_id}'`);
    }
    if (start_time) {
      conditions.push(`DATE(appointments.start_time) = '${start_time}'`);
    }
    if (status_id) {
      conditions.push(`appointments.status_id = '${status_id}'`);
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
  static getAppointmentDetails(appointmentId) {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM appointments WHERE id = ?",
        [appointmentId],
        (err, results) => {
          if (err) reject(err);
          resolve(results[0]);
        }
      );
    });
  }
}
