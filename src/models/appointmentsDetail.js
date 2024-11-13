import connection from "../db";
export default class AppointmentsDetail {
  static createAppointmentsServices(
    appointment_id,
    service_id
  ) {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO appointmentServices (appointment_id, service_id) VALUES (?,?)",
        [
          appointment_id,
          service_id
        ],
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  }

  static removeAppointmentsServices(
    appointment_id,
  ) {
    return new Promise((resolve, reject) => {
      connection.query(
        "DELETE FROM appointmentServices WHERE appointment_id = ?",
        [
          appointment_id,
        ],  
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  }
  static removeAppointmentsPet(
    appointment_id,
  ) {
    return new Promise((resolve, reject) => {
      connection.query(
        "DELETE FROM appointmentPets WHERE appointment_id = ?",
        [
          appointment_id,
        ],  
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  }
  static createAppointmentsPet(
    appointment_id,
    pet_id
  ) {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO appointmentPets (appointment_id, pet_id) VALUES (?,?)",
        [
          appointment_id,
          pet_id
        ],
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  }
  static updateAppointments(
    id,
    day,
    pet_id,
    services_id,
    user_id,
    pethouse_id,
    time_id,
    status_id
  ) {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE appointments SET day = ?, pet_id = ?, services_id = ?, user_id=?, pethouse_id = ?, time_id = ?,status_id = ? WHERE id = ?",
        [
          day,
          pet_id,
          services_id,
          user_id,
          pethouse_id,
          time_id,
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

  static cancelHistoryAppointment(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE appointments SET is_delete = 1 WHERE id = ?",
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
}
