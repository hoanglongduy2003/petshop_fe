import dayjs from "dayjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import Appointments from "../models/appointments";
import AppointmentsDetail from "../models/appointmentsDetail";
import PaymentMethods from "../models/paymentMethods";
import Pet from "../models/pet";
import Pethouse from "../models/pethouse";
import Services from "../models/services";
import Status from "../models/status_appointment";
import User from "../models/user";
import { updateAppointmentStatusPaymentSchema, updateAppointmentStatusSchema } from "../schemas/appointments";

export const list = async (req, res) => {
  try {
    const appointments = await Appointments.getAllAppointments();
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const listAppointmentData = async (req, res) => {
  try {
    const appointments = await Appointments.getAppointmentsData();
    const uniqueData = appointments.reduce((result, record) => {
      if (record && record.id !== undefined) {
        if (Array.isArray(result) && result.length > 0) {
          const existingRecordIndex = result.findIndex(
            (r) => r.id === record.id
          );
          if (existingRecordIndex === -1) {
            result.push({
              id: record.id,
              day: record.day,
              services: [{ id: record.serviceId, name: record.serviceName }],
              pets: [{ id: record.petId, name: record.petName }],
              total: record.total,
              start_time: record.start_time,
              end_time: record.end_time,
              user_email: record.user_email,
              user_name: record.user_name,
              pethouse_name: record.pethouse_name,
              pethouse_id: record.pethouse_id,
              status_name: record.status_name,
              status_id: record.status_id,
              statusPaymentId: record.statusPaymentId,
              statusPaymentName: record.statusPaymentName,
            });
          } else {
            const existingPetIndex = result[existingRecordIndex].pets.findIndex(
              (pet) => pet.id === record.petId
            );
            if (existingPetIndex === -1) {
              result[existingRecordIndex].pets.push({
                id: record.petId,
                name: record.petName,
              });
            }
            const existingServicesIndex = result[
              existingRecordIndex
            ].services.findIndex(
              (services) => services.id === record.serviceId
            );
            if (existingServicesIndex === -1) {
              result[existingRecordIndex].services.push({
                id: record.serviceId,
                name: record.serviceName,
              });
            }
          }
        } else {
          result.push({
            id: record.id,
            day: record.day,
            services: [{ id: record.serviceId, name: record.serviceName }],
            pets: [{ id: record.petId, name: record.petName }],
            total: record.total,
            start_time: record.start_time,
            end_time: record.end_time,
            user_email: record.user_email,
            user_name: record.user_name,
            pethouse_name: record.pethouse_name,
            pethouse_id: record.pethouse_id,
            status_id: record.status_id,
            status_name: record.status_name,
            statusPaymentId: record.statusPaymentId,
            statusPaymentName: record.statusPaymentName,
          });
        }
      }
      return result;
    }, []);

    res.json(uniqueData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const show = async (req, res) => {
  try {
    const appointmentsItem = await Appointments.getAppointmentsById(
      req.params.id
    );
    if (!appointmentsItem) {
      res.status(404).json({ error: "Không tìm thấy mục lịch hẹn" });
    } else {
      res.json(appointmentsItem);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const create = async (req, res) => {
  try {
    const {
      day,
      pet,
      services,
      user_id,
      pethouse_id,
      start_time,
      end_time,
      total,
      paymentMethods_id,
    } = req.body;
    const check = [];

    for (const item of services) {
      const data = await Services.checkServices(item);
      if (data[0]) {
        check.push(data[0]);
      }
    }
    const petHouse = await Pethouse.checkPethouse(pethouse_id);
    if (petHouse.length > 0) {
      res.status(400).json({
        message: `Phòng ${petHouse[0].name} hiện tại cửa hàng tạm đóng`,
      });
    } else if (check.length > 0) {
      const names = check.map((service) => service.name);
      const namesString = names.join(", ");
      res
        .status(400)
        .json({ message: `Dịch vụ ${namesString} hiện tại cửa hàng tạm khóa` });
    } else {
      const petNamesArray = [];
      const ServicesArray = [];
      const appointmentsId = await Appointments.createAppointments(
        day,
        user_id,
        pethouse_id,
        start_time,
        end_time,
        total,
        paymentMethods_id
      );
      for (const item of services) {
        await AppointmentsDetail.createAppointmentsServices(
          appointmentsId,
          item
        );

        const servicesDetails = await Services.getNameServicesById(item);
        if (servicesDetails && servicesDetails.length > 0) {
          const servicesName = servicesDetails[0].name;
          ServicesArray.push(servicesName);
        }
      }
      for (const item of pet) {
        await AppointmentsDetail.createAppointmentsPet(appointmentsId, item);
        const servicesDetails = await Services.getNameServicesById(item);
        if (servicesDetails && servicesDetails.length > 0) {
          const servicesName = servicesDetails[0].name;
          ServicesArray.push(servicesName);
        }
      }
      for (const item of pet) {
        await AppointmentsDetail.createAppointmentsPet(appointmentsId, item);
        const petDetails = await Pet.getNamePet(item);
        if (petDetails && petDetails.length > 0) {
          const petName = petDetails[0].name;
          petNamesArray.push(petName);
        }
      }
      const servicesNamesString =
        ServicesArray.length > 0
          ? ServicesArray.join(", ")
          : "No pet name available";
      const petNamesString =
        petNamesArray.length > 0
          ? petNamesArray.join(", ")
          : "No pet name available";
      const nameMethods = await PaymentMethods.getStatusPaymentNameById(
        paymentMethods_id
      );

      const { email, name } = await User.getUser(user_id);
      const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: "petcare.fpt@gmail.com",
          pass: "ikhpbmeyqskpupcz",
        },
      });
      const formattedTotal = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(total);

      const mailOptions = {
        from: "petcare.fpt@gmail.com",
        to: email,
        subject: "Thông tin đặt lịch chăm sóc thú cưng PetCare",
        html: `   <div
        style="
          text-align: center;
          background-color: white;
          border: 5px solid #5ebdc2;
          width: 390px;
          padding: 30px 25px;
        "
      >
        <div style="display: flex; align-items: center; justify-content: center">
          <img
            style="width: 100%"
            src="https://res.cloudinary.com/dszse8bzk/image/upload/v1703001954/cctk43pofdqlvcgxkmqa.jpg"
            alt=""
          />
        </div>
  
        <h1 style="color: #00575c; text-align: center">Shop thú cưng - PetCare</h1>
        <div style="text-align: center">Email:petcare.fpt@gmail.com</div>
        <div style="text-align: center">SĐT:0988824760</div>
        <div style="text-align: center">
          ĐỊA CHỈ: SỐ 9, ĐƯỜNG TRỊNH VĂN BÔ, NAM TỪ LIÊM, HN
        </div>
        <div style="margin-top: 30px; font-family: Arial, sans-serif">
          <table style="width: 100%; border-collapse: collapse">
            <tr>
              <td style="font-weight: 600; padding: 10px; text-align: center">
                Chào ${name}
              </td>
            </tr>
            <tr style="background-color: #ffffff">
              <td
                style="
                  padding: 10px;
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                "
              >
                <span style="font-weight: 600">Tên người đặt:</span>
                <span style="display: inline-block; padding-left: 10px"
                  >${name}</span
                >
              </td>
            </tr>
            <tr style="background-color: #f2f2f2">
              <td
                style="
                  padding: 10px;
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                "
              >
                <span style="font-weight: 600">Dịch vụ: </span>
                <span style="display: inline-block; padding-left: 10px"
                  >${servicesNamesString}</span
                >
              </td>
            </tr>
            <tr style="background-color: #ffffff">
              <td
                style="
                  padding: 10px;
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                "
              >
                <span style="font-weight: 600">Pet: </span>
                <span style="display: inline-block; padding-left: 10px"
                  >${petNamesString}</span
                >
              </td>
            </tr>
  
            <tr style="background-color: #f2f2f2">
              <td
                style="
                  padding: 10px;
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                "
              >
                <span style="font-weight: 600">Thời gian bắt đầu lịch: </span>
                <span style="display: inline-block; padding-left: 10px"
                  >${dayjs(start_time).format("HH:mm DD-MM-YYYY ")}</span
                >
              </td>
            </tr>
            <tr style="background-color: #ffffff">
              <td
                style="
                  padding: 10px;
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                "
              >
                <span style="font-weight: 600">Thời gian kết thúc lịch: </span>
                <span style="display: inline-block; padding-left: 10px"
                  >${dayjs(end_time).format("HH:mm DD-MM-YYYY ")}</span
                >
              </td>
            </tr>
            <tr style="background-color: #ffffff">
              <td
                style="
                  padding: 10px;
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                "
              >
                <span style="font-weight: 600">Phương thức thanh toán: </span>
                <span style="display: inline-block; padding-left: 10px"
                  >${nameMethods}</span
                >
              </td>
            </tr>
            <tr style="background-color: #ffffff">
            <td
              style="
                padding: 10px;
                display: flex;
                justify-content: space-between;
                align-items: center;
              "
            >
              <span style="font-weight: 600">Trạng thái: </span>
              <span style="display: inline-block; padding-left: 10px"
                >Đang chờ xử lý</span
              >
            </td>
          </tr>
          <tr style="background-color: #f2f2f2">
              <td
                style="
                  padding: 10px;
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                "
              >
                <span style="font-weight: 600">Tổng tiền: </span>
                <span>${formattedTotal}</span>
              </td>
            </tr>
          </table>
          <div style="margin: 15px 0">
          <div>Cảm ơn bạn đặt lịch chăm sóc thú cưng ở cửa hàng chúng tôi</div>
        </div>
      </div>`,
      };

      await transporter.sendMail(mailOptions);
      res.json({ id: appointmentsId, message: "Gửi thành công rồi !" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createAdmin = async (req, res) => {
  try {
    const {
      day,
      pet,
      services,
      user_id,
      pethouse_id,
      start_time,
      end_time,
      total,
      status_id,
      status_payment,
      paymentMethods_id,
    } = req.body;
    const check = [];

    for (const item of services) {
      const data = await Services.checkServices(item);
      if (data[0]) {
        check.push(data[0]);
      }
    }
    const petHouse = await Pethouse.checkPethouse(pethouse_id);
    if (petHouse.length > 0) {
      res.status(400).json({
        message: `Phòng ${petHouse[0].name} hiện tại cửa hàng tạm đóng`,
      });
    } else if (check.length > 0) {
      const names = check.map((service) => service.name);
      const namesString = names.join(", ");
      res
        .status(400)
        .json({ message: `Dịch vụ ${namesString} hiện tại cửa hàng tạm khóa` });
    } else {
      const petNamesArray = [];
      const ServicesArray = [];
      const appointmentsId = await Appointments.createAppointmentsAdmin(
        day,
        user_id,
        pethouse_id,
        start_time,
        end_time,
        total,
        status_id,
        status_payment,
        paymentMethods_id
      );
      for (const item of services) {
        await AppointmentsDetail.createAppointmentsServices(
          appointmentsId,
          item
        );

        const servicesDetails = await Services.getNameServicesById(item);
        if (servicesDetails && servicesDetails.length > 0) {
          const servicesName = servicesDetails[0].name;
          ServicesArray.push(servicesName);
        }
      }
      for (const item of pet) {
        await AppointmentsDetail.createAppointmentsPet(appointmentsId, item);
        const servicesDetails = await Services.getNameServicesById(item);
        if (servicesDetails && servicesDetails.length > 0) {
          const servicesName = servicesDetails[0].name;
          ServicesArray.push(servicesName);
        }
      }
      for (const item of pet) {
        await AppointmentsDetail.createAppointmentsPet(appointmentsId, item);
        const petDetails = await Pet.getNamePet(item);
        if (petDetails && petDetails.length > 0) {
          const petName = petDetails[0].name;
          petNamesArray.push(petName);
        }
      }
      const servicesNamesString =
        ServicesArray.length > 0
          ? ServicesArray.join(", ")
          : "No pet name available";
      const petNamesString =
        petNamesArray.length > 0
          ? petNamesArray.join(", ")
          : "No pet name available";
      const { email, name } = await User.getUser(user_id);
      const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: "petcare.fpt@gmail.com",
          pass: "ikhpbmeyqskpupcz",
        },
      });
      const nameMethods = await PaymentMethods.getStatusPaymentNameById(
        paymentMethods_id
      );
      const setStatus = await Status.getIdStatus(status_id);
      const formattedTotal = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(total);

      const mailOptions = {
        from: "petcare.fpt@gmail.com",
        to: email,
        subject: "Thông tin đặt lịch chăm sóc",
        html: `   <div
        style="
          text-align: center;
          background-color: white;
          border: 5px solid #5ebdc2;
          width: 390px;
          padding: 30px 25px;
        "
      >
        <div style="display: flex; align-items: center; justify-content: center">
          <img
            style="width: 100%"
            src="https://res.cloudinary.com/dszse8bzk/image/upload/v1703001954/cctk43pofdqlvcgxkmqa.jpg"
            alt=""
          />
        </div>
  
        <h1 style="color: #00575c; text-align: center">Shop thú cưng - PetCare</h1>
        <div style="text-align: center">Email:petcare.fpt@gmail.com</div>
        <div style="text-align: center">SĐT:0988824760</div>
        <div style="text-align: center">
          ĐỊA CHỈ: SỐ 9, ĐƯỜNG TRỊNH VĂN BÔ, NAM TỪ LIÊM, HN
        </div>
        <div style="margin-top: 30px; font-family: Arial, sans-serif">
          <table style="width: 100%; border-collapse: collapse">
            <tr>
              <td style="font-weight: 600; padding: 10px; text-align: center">
                Chào ${name}
              </td>
            </tr>
            <tr style="background-color: #ffffff">
              <td
                style="
                  padding: 10px;
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                "
              >
                <span style="font-weight: 600">Tên người đặt:</span>
                <span style="display: inline-block; padding-left: 10px"
                  >${name}</span
                >
              </td>
            </tr>
            <tr style="background-color: #f2f2f2">
              <td
                style="
                  padding: 10px;
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                "
              >
                <span style="font-weight: 600">Dịch vụ: </span>
                <span style="display: inline-block; padding-left: 10px"
                  >${servicesNamesString}</span
                >
              </td>
            </tr>
            <tr style="background-color: #ffffff">
              <td
                style="
                  padding: 10px;
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                "
              >
                <span style="font-weight: 600">Pet: </span>
                <span style="display: inline-block; padding-left: 10px"
                  >${petNamesString}</span
                >
              </td>
            </tr>
  
            <tr style="background-color: #f2f2f2">
              <td
                style="
                  padding: 10px;
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                "
              >
                <span style="font-weight: 600">Thời gian bắt đầu lịch: </span>
                <span style="display: inline-block; padding-left: 10px"
                  >${dayjs(start_time).format("HH:mm DD-MM-YYYY")}</span
                >
              </td>
            </tr>
            <tr style="background-color: #ffffff">
              <td
                style="
                  padding: 10px;
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                "
              >
                <span style="font-weight: 600">Thời gian kết thúc lịch: </span>
                <span style="display: inline-block; padding-left: 10px"
                  >${dayjs(end_time).format("HH:mm DD-MM-YYYY")}</span
                >
              </td>
            </tr>
            <tr style="background-color: #ffffff">
              <td
                style="
                  padding: 10px;
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                "
              >
                <span style="font-weight: 600">Phương thức thanh toán: </span>
                <span style="display: inline-block; padding-left: 10px"
                  >${nameMethods}</span
                >
              </td>
            </tr>
            <tr style="background-color: #ffffff">
            <td
              style="
                padding: 10px;
                display: flex;
                justify-content: space-between;
                align-items: center;
              "
            >
              <span style="font-weight: 600">Trạng thái: </span>
              <span style="display: inline-block; padding-left: 10px"
                >${setStatus.name}</span
              >
            </td>
          </tr>
            <tr style="background-color: #f2f2f2">
            <td
              style="
                padding: 10px;
                display: flex;
                justify-content: space-between;
                align-items: center;
              "
            >
              <span style="font-weight: 600">Tổng tiền: </span>
              <span>${formattedTotal}</span>
            </td>
          </tr>
          </table>
          <div style="margin: 15px 0">
          <div>Cảm ơn bạn đặt lịch chăm sóc thú cưng ở cửa hàng chúng tôi</div>
        </div>
      </div>`,
      };

      await transporter.sendMail(mailOptions);
      res.json({ id: appointmentsId, message: "Gửi thành công rồi !" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const update = async (req, res) => {
  const id = Number(req.params.id);
  try {
    const { pet, services, pethouse_id, start_time, end_time, total } =
      req.body;
    const check = [];

    for (const item of services) {
      const data = await Services.checkServices(item);
      if (data[0]) {
        check.push(data[0]);
      }
    }
    const petHouse = await Pethouse.checkPethouse(pethouse_id);
    if (petHouse.length > 0) {
      res.status(400).json({
        message: `Phòng ${petHouse[0].name} hiện tại cửa hàng tạm đóng`,
      });
    } else if (check.length > 0) {
      const names = check.map((service) => service.name);
      const namesString = names.join(", ");
      res
        .status(400)
        .json({ message: `Dịch vụ ${namesString} hiện tại cửa hàng tạm khóa` });
    } else {
      await AppointmentsDetail.removeAppointmentsPet(id);
      await AppointmentsDetail.removeAppointmentsServices(id);

      for (const item of services) {
        await AppointmentsDetail.createAppointmentsServices(id, item);
      }

      for (const item of pet) {
        await AppointmentsDetail.createAppointmentsPet(id, item);
      }
      await Appointments.updateAppointments(
        id,
        pethouse_id,
        start_time,
        total,
        end_time
      );

      res.json({ message: "Cập nhật lịch hẹn thành công" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateAdmin = async (req, res) => {
  const id = Number(req.params.id);
  try {
    const {
      pet,
      services,
      pethouse_id,
      start_time,
      end_time,
      total,
      animalCondition,
      status_payment,
      status_id,
    } = req.body;
    const check = [];

    for (const item of services) {
      const data = await Services.checkServices(item);
      if (data[0]) {
        check.push(data[0]);
      }
    }
    const petHouse = await Pethouse.checkPethouse(pethouse_id);
    if (petHouse.length > 0) {
      res.status(400).json({
        message: `Phòng ${petHouse[0].name} hiện tại cửa hàng tạm đóng`,
      });
    } else if (check.length > 0) {
      const names = check.map((service) => service.name);
      const namesString = names.join(", ");
      res
        .status(400)
        .json({ message: `Dịch vụ ${namesString} hiện tại cửa hàng tạm khóa` });
    } else {
      await AppointmentsDetail.removeAppointmentsPet(id);
      await AppointmentsDetail.removeAppointmentsServices(id);

      for (const item of services) {
        await AppointmentsDetail.createAppointmentsServices(id, item);
      }

      for (const item of pet) {
        await AppointmentsDetail.createAppointmentsPet(id, item);
      }
      await Appointments.updateAppointmentsAdmin(
        id,
        pethouse_id,
        start_time,
        total,
        end_time,
        animalCondition,
        status_payment,
        status_id
      );
      res.json({ message: "Cập nhật lịch hẹn thành công" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateAppointmentStatus = async (req, res) => {
  try {
    const { status_id } = req.body;
    const { error } = updateAppointmentStatusSchema.validate(req.body);
    if (error) {
      const errors = error.details.map((errorItem) => errorItem.message);
      return res.status(400).json({
        message: errors,
      });
    }
    await Appointments.updateAppointmentStatus(req.params.id, status_id);
    const appointment = await Appointments.getAppointmentsById(req.params.id);
    const petNamesArray = [];
    const servicesArray = [];
    const uniqueData = appointment.reduce((result, record) => {
      if (record && record.id !== undefined) {
        if (Array.isArray(result) && result.length > 0) {
          const existingRecordIndex = result.findIndex(
            (r) => r.id === record.id
          );
          if (existingRecordIndex === -1) {
            petNamesArray.push(record.serviceName);
            servicesArray.push( record.petName);
            result.push({
              id: record.id,
              day: record.day,
              services: [{ id: record.serviceId, name: record.serviceName }],
              pets: [{ id: record.petId, name: record.petName }],
              total: record.total,
              start_time: record.start_time,
              end_time: record.end_time,
              user_email: record.user_email,
              user_name: record.user_name,
              pethouse_name: record.pethouse_name,
              pethouse_id: record.pethouse_id,
              status_name: record.status_name,
              status_id: record.status_id,
              statusPaymentId: record.statusPaymentId,
              statusPaymentName: record.statusPaymentName,
              paymentMethodsName: record.paymentMethodsName,
            });
          } else {
            const existingPetIndex = result[existingRecordIndex].pets.findIndex(
              (pet) => pet.id === record.petId
            );
            if (existingPetIndex === -1) {
              petNamesArray.push(record.serviceName);
              result[existingRecordIndex].pets.push({
                id: record.petId,
                name: record.petName,
              });
            }
            const existingServicesIndex = result[
              existingRecordIndex
            ].services.findIndex(
              (services) => services.id === record.serviceId
            );
            if (existingServicesIndex === -1) {
              servicesArray.push(record.petName);
              result[existingRecordIndex].services.push({
                id: record.serviceId,
                name: record.serviceName,
              });
            }
          }
        } else {
          result.push({
            id: record.id,
            day: record.day,
            services: [{ id: record.serviceId, name: record.serviceName }],
            pets: [{ id: record.petId, name: record.petName }],
            total: record.total,
            start_time: record.start_time,
            end_time: record.end_time,
            user_email: record.user_email,
            user_name: record.user_name,
            pethouse_name: record.pethouse_name,
            pethouse_id: record.pethouse_id,
            status_id: record.status_id,
            status_name: record.status_name,
            statusPaymentId: record.statusPaymentId,
            statusPaymentName: record.statusPaymentName,
            paymentMethodsName: record.paymentMethodsName,
          });
        }
      }
      return result;
    }, []);
    const servicesNamesString =
    servicesArray.length > 0
        ? servicesArray.join(", ")
        : "No pet name available";
    const petNamesString =
    petNamesArray.length > 0
        ? petNamesArray.join(", ")
        : "No pet name available";
    if (uniqueData[0].user_name && uniqueData[0].user_email) {
      const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: "petcare.fpt@gmail.com",
          pass: "ikhpbmeyqskpupcz",
        },
      });

      const mailOptions = {
        from: "petcare.fpt@gmail.com",
        to: uniqueData[0].user_email,
        subject: "Xác nhận đặt lịch thành công",
        html: `<div
        style="
          text-align: center;
          background-color: white;
          border: 5px solid #5ebdc2;
          width: 390px;
          padding: 30px 25px;
        "
      >
        <div style="display: flex; align-items: center; justify-content: center">
          <img
            style="width: 100%"
            src="https://res.cloudinary.com/dszse8bzk/image/upload/v1703001954/cctk43pofdqlvcgxkmqa.jpg"
            alt=""
          />
        </div>
  
        <h1 style="color: #00575c; text-align: center">Shop thú cưng -PetCare</h1>
        <div style="text-align: center">Email:petcare.fpt@gmail.com</div>
        <div style="text-align: center">SĐT:0988824760</div>
        <div style="text-align: center">
          ĐỊA CHỈ: SỐ 9, ĐƯỜNG TRỊNH VĂN BÔ, NAM TỪ LIÊM, HN
        </div>
        <div style="margin-top: 30px; font-family: Arial, sans-serif">
          <table style="width: 100%; border-collapse: collapse">
            <tr>
              <td style="font-weight: 600; padding: 10px; text-align: center">
                Chào ${uniqueData[0].user_email}
              </td>
            </tr>
            <tr>
              <td style="font-weight: 600; padding: 10px; text-align: center">
                trạng thái lịch đặt ${uniqueData[0].status_name}
              </td>
            </tr>
            <tr style="background-color: #ffffff">
            <td
              style="
                padding: 10px;
                display: flex;
                justify-content: space-between;
                align-items: center;
              "
            >
              <span style="font-weight: 600">Tên Thú cưng:</span>
              <span style="display: inline-block; padding-left: 10px"
                >${petNamesString}</span
              >
            </td>
          </tr>
          <tr style="background-color: #f2f2f2">
          <td
            style="
              padding: 10px;
              display: flex;
              justify-content: space-between;
              align-items: center;
            "
          >
            <span style="font-weight: 600">Thời gian bắt đầu lịch: </span>
            <span style="display: inline-block; padding-left: 10px"
              >${dayjs(uniqueData[0].start_time).format("HH:mm DD-MM-YYYY")}</span
            >
          </td>
        </tr>
        <tr style="background-color: #ffffff">
        <td
          style="
            padding: 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;
          "
        >
          <span style="font-weight: 600">Thời gian kết thúc lịch: </span>
          <span style="display: inline-block; padding-left: 10px"
            >>${dayjs(uniqueData[0].end_time).format("HH:mm DD-MM-YYYY")}</span
          >
        </td>
      </tr>
      <tr style="background-color: #f2f2f2">
              <td
                style="
                  padding: 10px;
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                "
              >
                <span style="font-weight: 600">Dịch vụ: </span>
                <span style="display: inline-block; padding-left: 10px"
                  >${servicesNamesString}</span
                >
              </td>
            </tr>
            <tr style="background-color: #ffffff">
            <td
              style="
                padding: 10px;
                display: flex;
                justify-content: space-between;
                align-items: center;
              "
            >
              <span style="font-weight: 600">Tổng tiền: </span>
              <span>${uniqueData[0].total}</span>
            </td>
          </tr>
          <tr style="background-color: #f2f2f2">
          <td
            style="
              padding: 10px;
              display: flex;
              justify-content: space-between;
              align-items: center;
            "
          >
            <span style="font-weight: 600">Tên phòng: </span>
            <span>${uniqueData[0].pethouse_name}</span>
          </td>
        </tr>
        <tr style="background-color: #ffffff">
        <td
          style="
            padding: 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;
          "
        >
          <span style="font-weight: 600">Trạng thái thanh toán: </span>
          <span>${uniqueData[0].statusPaymentName}</span>
        </td>
      </tr>
          </table>
          <div style="margin: 15px 0">
          <div>Cảm ơn bạn đặt lịch chăm sóc thú cưng ở cửa hàng chúng tôi</div>
        </div>
      </div>`,
      };

      await transporter.sendMail(mailOptions);
    }

    res.json({ message: "Cập nhật lịch hẹn thành công" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateAppointmentPayment = async (req, res) => {
  try {
    const { status_payment } = req.body;
    const { error } = updateAppointmentStatusPaymentSchema.validate(req.body);
    if (error) {
      const errors = error.details.map((errorItem) => errorItem.message);
      return res.status(400).json({
        message: errors,
      });
    }
    await Appointments.updateAppointmentPayment(req.params.id, status_payment);
    const appointment = await Appointments.getAppointmentsById(req.params.id);
    if (appointment.user_name && appointment.user_email) {
      const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: "petcare.fpt@gmail.com",
          pass: "ikhpbmeyqskpupcz",
        },
      });

      const mailOptions = {
        from: "hainv21123@gmail.com",
        to: appointment.user_email,
        subject: "Xác nhận đặt lịch thành công",
        html: `<div style="font-family: sans-serif; margin: 0 40px;">
          <img
            style="width: 200px"
            src="https://res.cloudinary.com/dksgvucji/image/upload/v1698334367/samples/logo2_bmcqc2.png"
            alt=""
          />
          <p>Chào <span style="font-weight: 600">${appointment.user_name},</span></p>
          <p>
            Chúc mừng bạn đã đặt lịch thành công tại
            <span style="font-weight: 600">Website Đặt lịch chăm sóc thú cưng PetCare</span>
          </p>
          <p>Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!</p>
          <p style="width: 100%;height: 1px; background-color: #00575C;"></p>
          <div style="text-align: right;">
            <p>Nếu bạn có bất kỳ câu hỏi nào, xin liên hệ với chúng tôi tại</p>
            <p>Trân trọng,</p>
            <p style="font-weight: 600;">Ban quản trị Website Đặt lịch chăm sóc thú cưng PetCare</p>
          </div>
        </div>`,
      };

      await transporter.sendMail(mailOptions);
    }

    res.json({ message: "Cập nhật lịch hẹn thành công" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAppointmentUser = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      throw new Error("Bạn chưa đăng nhập");
    }
    const decoded = jwt.verify(token, "duantotnghiep");
    const user = await User.getUser(decoded.id);
    if (!user) {
      res.status(404).json({ error: "" });
    } else {
      try {
        const appointments = await Appointments.getAppointmentUser(user?.id);
        res.json(appointments);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    }
  } catch (error) {
    return res.status(401).json({
      message: "Token không hợp lệ",
    });
  }
};

export const getAppointmentUserStatus = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      throw new Error("Bạn chưa đăng nhập");
    }
    const decoded = jwt.verify(token, "duantotnghiep");
    const user = await User.getUser(decoded.id);
    if (!user) {
      res.status(404).json({ error: "" });
    } else {
      try {
        const appointments = await Appointments.getAppointmentUserStatus(
          user.id,
          req.params.status_id
        );
        const uniqueData = appointments.reduce((result, record) => {
          if (record && record.id !== undefined) {
            if (Array.isArray(result) && result.length > 0) {
              const existingRecordIndex = result.findIndex(
                (r) => r.id === record.id
              );
              if (existingRecordIndex === -1) {
                result.push({
                  id: record.id,
                  day: record.day,
                  services: [
                    { id: record.serviceId, name: record.serviceName },
                  ],
                  pets: [{ id: record.petId, name: record.petName }],
                  total: record.total,
                  start_time: record.start_time,
                  end_time: record.end_time,
                  user_email: record.user_email,
                  user_name: record.user_name,
                  pethouse_name: record.pethouse_name,
                  pethouse_id: record.pethouse_id,
                  status_name: record.status_name,
                  status_id: record.status_id,
                  statusPaymentId: record.statusPaymentId,
                  statusPaymentName: record.statusPaymentName,
                  paymentMethods_id: record.paymentMethodsId,
                });
              } else {
                const existingPetIndex = result[
                  existingRecordIndex
                ].pets.findIndex((pet) => pet.id === record.petId);
                if (existingPetIndex === -1) {
                  result[existingRecordIndex].pets.push({
                    id: record.petId,
                    name: record.petName,
                  });
                }
                const existingServicesIndex = result[
                  existingRecordIndex
                ].services.findIndex(
                  (services) => services.id === record.serviceId
                );
                if (existingServicesIndex === -1) {
                  result[existingRecordIndex].services.push({
                    id: record.serviceId,
                    name: record.serviceName,
                  });
                }
              }
            } else {
              result.push({
                id: record.id,
                day: record.day,
                services: [{ id: record.serviceId, name: record.serviceName }],
                pets: [{ id: record.petId, name: record.petName }],
                total: record.total,
                start_time: record.start_time,
                end_time: record.end_time,
                user_email: record.user_email,
                user_name: record.user_name,
                pethouse_name: record.pethouse_name,
                pethouse_id: record.pethouse_id,
                status_name: record.status_name,
                status_id: record.status_id,
                statusPaymentId: record.statusPaymentId,
                statusPaymentName: record.statusPaymentName,
                paymentMethods_id: record.paymentMethodsId,
              });
            }
          }
          return result;
        }, []);

        res.json(uniqueData);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    }
  } catch (error) {
    return res.status(401).json({
      message: "Token không hợp lệ",
    });
  }
};
export const getPrintData = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      throw new Error("Bạn chưa đăng nhập");
    }
    const decoded = jwt.verify(token, "duantotnghiep");
    const user = await User.getUser(decoded.id);
    if (!user) {
      res.status(404).json({ error: "" });
    } else {
      try {
        const appointment = await Appointments.getPrintDataById(req.params.id);

        if (!appointment) {
          return res.status(404).json({ error: "Không tìm thấy Data print" });
        }

        const printData = appointment.reduce((result, record) => {
          if (record && record.id !== undefined) {
            if (Array.isArray(result) && result.length > 0) {
              const existingRecordIndex = result.findIndex(
                (r) => r.id === record.id
              );
              if (existingRecordIndex === -1) {
                result.push({
                  id: record.id,
                  day: record.day,
                  services: [
                    { id: record.serviceId, name: record.serviceName },
                  ],
                  pets: [{ id: record.petId, name: record.petName }],
                  total: record.total,
                  start_time: record.start_time,
                  end_time: record.end_time,
                  user_email: record.user_email,
                  user_name: record.user_name,
                  pethouse_name: record.pethouse_name,
                  pethouse_id: record.pethouse_id,
                  status_name: record.status_name,
                  status_id: record.status_id,
                  statusPaymentId: record.statusPaymentId,
                  statusPaymentName: record.statusPaymentName,
                });
              } else {
                const existingPetIndex = result[
                  existingRecordIndex
                ].pets.findIndex((pet) => pet.id === record.petId);
                if (existingPetIndex === -1) {
                  result[existingRecordIndex].pets.push({
                    id: record.petId,
                    name: record.petName,
                  });
                }
                const existingServicesIndex = result[
                  existingRecordIndex
                ].services.findIndex(
                  (services) => services.id === record.serviceId
                );
                if (existingServicesIndex === -1) {
                  result[existingRecordIndex].services.push({
                    id: record.serviceId,
                    name: record.serviceName,
                  });
                }
              }
            } else {
              result.push({
                id: record.id,
                day: record.day,
                services: [{ id: record.serviceId, name: record.serviceName }],
                pets: [{ id: record.petId, name: record.petName }],
                total: record.total,
                start_time: record.start_time,
                end_time: record.end_time,
                user_email: record.user_email,
                user_name: record.user_name,
                pethouse_name: record.pethouse_name,
                pethouse_id: record.pethouse_id,
                status_name: record.status_name,
                status_id: record.status_id,
                statusPaymentId: record.statusPaymentId,
                statusPaymentName: record.statusPaymentName,
              });
            }
          }
          return result;
        }, []);

        res.json(printData);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    }
  } catch (error) {
    return res.status(401).json({
      message: "Token không hợp lệ",
    });
  }
};
export const cancelHistoryAppointment = async (req, res) => {
  try {
    const { id } = req.body;
    await Appointments.cancelHistoryAppointment(id);
    res.json({ message: "Hủy đặt hàng thành công" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAppointmentTime = async (req, res) => {
  try {
    const { pethouse_id } = req.body;
    const appointmentsTime = await Appointments.getAppointmentTime(pethouse_id);
    if (!appointmentsTime) {
      res.status(404).json({ error: "Không tìm thấy mục lịch hẹn" });
    } else {
      res.json(appointmentsTime);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateStatusCancelAppointment = async () => {
  try {
    const currentTime = new Date();
    const { updatedAppointmentIds } = await Appointments.updateStatusCancel(
      currentTime
    );
    for (const appointmentId of updatedAppointmentIds) {
      const appointmentDetails = await Appointments.getAppointmentDetails(
        appointmentId
      );

      if (appointmentDetails) {
        const userEmails = await Appointments.getUserEmail(appointmentId);
        const appointment = await Appointments.getAppointmentsById(
          appointmentId
        );
        const uniqueData = appointment.reduce((result, record) => {
          if (record && record.id !== undefined) {
            if (Array.isArray(result) && result.length > 0) {
              const existingRecordIndex = result.findIndex(
                (r) => r.id === record.id
              );
              if (existingRecordIndex === -1) {
                result.push({
                  id: record.id,
                  day: record.day,
                  services: [
                    { id: record.serviceId, name: record.serviceName },
                  ],
                  pets: [{ id: record.petId, name: record.petName }],
                  total: record.total,
                  start_time: record.start_time,
                  end_time: record.end_time,
                  user_email: record.user_email,
                  user_name: record.user_name,
                  pethouse_name: record.pethouse_name,
                  pethouse_id: record.pethouse_id,
                  status_name: record.status_name,
                  status_id: record.status_id,
                  statusPaymentId: record.statusPaymentId,
                  statusPaymentName: record.statusPaymentName,
                  paymentMethodsName: record.paymentMethodsName,
                });
              } else {
                const existingPetIndex = result[
                  existingRecordIndex
                ].pets.findIndex((pet) => pet.id === record.petId);
                if (existingPetIndex === -1) {
                  result[existingRecordIndex].pets.push({
                    id: record.petId,
                    name: record.petName,
                  });
                }
                const existingServicesIndex = result[
                  existingRecordIndex
                ].services.findIndex(
                  (services) => services.id === record.serviceId
                );
                if (existingServicesIndex === -1) {
                  result[existingRecordIndex].services.push({
                    id: record.serviceId,
                    name: record.serviceName,
                  });
                }
              }
            } else {
              result.push({
                id: record.id,
                day: record.day,
                services: [{ id: record.serviceId, name: record.serviceName }],
                pets: [{ id: record.petId, name: record.petName }],
                total: record.total,
                start_time: record.start_time,
                end_time: record.end_time,
                user_email: record.user_email,
                user_name: record.user_name,
                pethouse_name: record.pethouse_name,
                pethouse_id: record.pethouse_id,
                status_id: record.status_id,
                status_name: record.status_name,
                statusPaymentId: record.statusPaymentId,
                statusPaymentName: record.statusPaymentName,
                paymentMethodsName: record.paymentMethodsName,
              });
            }
          }
          return result;
        }, []);
        const servicesNamesString =
          uniqueData[0].services.length > 0
            ? uniqueData[0].services.join(", ")
            : "No pet name available";
        const petNamesString =
          uniqueData[0].services.length > 0
            ? uniqueData[0].services.join(", ")
            : "No pet name available";
        if (userEmails.length > 0) {
          const email = userEmails[0].user_email;
          const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
              user: "petcare.fpt@gmail.com",
              pass: "ikhpbmeyqskpupcz",
            },
          });
          const mailOptions = {
            from: email,
            to: email,
            subject: "Lịch Hẹn Của Bạn Đã Bị Hủy",
            html: `<div
            style="
              text-align: center;
              background-color: white;
              border: 5px solid #5ebdc2;
              width: 390px;
              padding: 30px 25px;
            "
          >
            <div style="display: flex; align-items: center; justify-content: center">
              <img
                style="width: 100%"
                src="https://res.cloudinary.com/dszse8bzk/image/upload/v1703001954/cctk43pofdqlvcgxkmqa.jpg"
                alt=""
              />
            </div>
      
            <h1 style="color: #5ebdc2; text-align: center">Shop thú cưng -PetCare</h1>
            <div style="text-align: center">EMAIL:PETCARE.FPT@GMAIL.COM</div>
            <div style="text-align: center">SỐ ĐIỆN THOẠI:0988824760</div>
            <div style="text-align: center">
              ĐỊA CHỈ: SỐ 9, ĐƯỜNG TRỊNH VĂN BÔ, NAM TỪ LIÊM, HN
            </div>
            <div style="margin-top: 30px; font-family: Arial, sans-serif">
              <table style="width: 100%; border-collapse: collapse">
                <tr>
                  <td style="font-weight: 600; padding: 10px; text-align: center">
                    Chào ${uniqueData[0].user_email}
                  </td>
                </tr>
                <tr>
                  <td style="font-weight: 600; padding: 10px; text-align: center">
                    trạng thái lịch đặt ${uniqueData[0].status_name}
                  </td>
                </tr>
                <tr style="background-color: #ffffff">
                <td
                  style="
                    padding: 10px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                  "
                >
                  <span style="font-weight: 600">Tên Thú cưng:</span>
                  <span style="display: inline-block; padding-left: 10px"
                    >${petNamesString}</span
                  >
                </td>
              </tr>
              <tr style="background-color: #f2f2f2">
              <td
                style="
                  padding: 10px;
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                "
              >
                <span style="font-weight: 600">Thời gian bắt đầu lịch: </span>
                <span style="display: inline-block; padding-left: 10px"
                  >${dayjs(uniqueData[0].start_time).format("HH:mm DD-MM-YYYY")}</span
                >
              </td>
            </tr>
            <tr style="background-color: #ffffff">
            <td
              style="
                padding: 10px;
                display: flex;
                justify-content: space-between;
                align-items: center;
              "
            >
              <span style="font-weight: 600">Thời gian kết thúc lịch: </span>
              <span style="display: inline-block; padding-left: 10px"
                >>${dayjs(uniqueData[0].end_time).format("HH:mm DD-MM-YYYY")}</span
              >
            </td>
          </tr>
          <tr style="background-color: #f2f2f2">
                  <td
                    style="
                      padding: 10px;
                      display: flex;
                      justify-content: space-between;
                      align-items: center;
                    "
                  >
                    <span style="font-weight: 600">Dịch vụ: </span>
                    <span style="display: inline-block; padding-left: 10px"
                      >${servicesNamesString}</span
                    >
                  </td>
                </tr>
                <tr style="background-color: #ffffff">
                <td
                  style="
                    padding: 10px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                  "
                >
                  <span style="font-weight: 600">Tổng tiền: </span>
                  <span>${uniqueData[0].total}</span>
                </td>
              </tr>
              <tr style="background-color: #f2f2f2">
              <td
                style="
                  padding: 10px;
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                "
              >
                <span style="font-weight: 600">Tên phòng: </span>
                <span>${uniqueData[0].pethouse_name}</span>
              </td>
            </tr>
            <tr style="background-color: #ffffff">
            <td
              style="
                padding: 10px;
                display: flex;
                justify-content: space-between;
                align-items: center;
              "
            >
              <span style="font-weight: 600">Trạng thái thanh toán: </span>
              <span>${uniqueData[0].statusPaymentName}</span>
            </td>
          </tr>
              </table>
              <div style="margin: 15px 0">
              <div>Cảm ơn bạn đặt lịch chăm sóc thú cưng ở cửa hàng chúng tôi</div>
            </div>
          </div>`,
          };

          await transporter.sendMail(mailOptions);
        } else {
          console.log("Không tìm thấy email cho appointmentId:", appointmentId);
        }
      } else {
        console.log(
          "Không tìm thấy chi tiết lịch hẹn cho appointmentId:",
          appointmentId
        );
      }
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

export const searchAppointmentsAdmin = async (req, res) => {
  try {
    const { nameUser, pethouse_id, start_time, status_id } = req.body;
    const appointments = await Appointments.searchAppointments(
      nameUser,
      pethouse_id,
      start_time,
      status_id
    );
    if (appointments.length === 0) {
      return res.status(400).json({
        message: "Không có lịch nào phù hợp",
      });
    }

    const uniqueData = appointments.reduce((result, record) => {
      if (record && record.id !== undefined) {
        if (Array.isArray(result) && result.length > 0) {
          const existingRecordIndex = result.findIndex(
            (r) => r.id === record.id
          );
          if (existingRecordIndex === -1) {
            result.push({
              id: record.id,
              day: record.day,
              services: [{ id: record.serviceId, name: record.serviceName }],
              pets: [{ id: record.petId, name: record.petName }],
              total: record.total,
              start_time: record.start_time,
              end_time: record.end_time,
              user_email: record.user_email,
              user_name: record.user_name,
              pethouse_name: record.pethouse_name,
              pethouse_id: record.pethouse_id,
              status_name: record.status_name,
            });
          } else {
            const existingPetIndex = result[existingRecordIndex].pets.findIndex(
              (pet) => pet.id === record.petId
            );
            if (existingPetIndex === -1) {
              result[existingRecordIndex].pets.push({
                id: record.petId,
                name: record.petName,
              });
            }
            const existingServicesIndex = result[
              existingRecordIndex
            ].services.findIndex(
              (services) => services.id === record.serviceId
            );
            if (existingServicesIndex === -1) {
              result[existingRecordIndex].services.push({
                id: record.serviceId,
                name: record.serviceName,
              });
            }
          }
        } else {
          result.push({
            id: record.id,
            day: record.day,
            services: [{ id: record.serviceId, name: record.serviceName }],
            pets: [{ id: record.petId, name: record.petName }],
            total: record.total,
            start_time: record.start_time,
            end_time: record.end_time,
            user_email: record.user_email,
            user_name: record.user_name,
            pethouse_name: record.pethouse_name,
            pethouse_id: record.pethouse_id,
            status_name: record.status_name,
          });
        }
      }
      return result;
    }, []);
    return res.status(200).json({
      uniqueData,
      message: "search thành công",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const status_payment = async (req, res) => {
  try {
    const statusPayment = await Appointments.getStatusPaymentById(
      req.params.id
    );

    if (!statusPayment) {
      res.status(404).json({ error: "Không tìm thấy mục lịch hẹn" });
    } else {
      res.json({ status_payment: statusPayment });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const checkPetHouse = async (req, res) => {
  try {
    const { start_time, end_time } = req.body;
    const petHouse = await Appointments.checkPetHouse(start_time, end_time);

    if (!petHouse) {
      res.status(404).json({ error: "Không có phòng nào trống" });
    } else {
      res.json({ petHouse });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const listPaymentAppointment = async (req, res) => {
  try {
    const listPaymentAppointment = await Appointments.getAppointmentDetails(
      req.params.id
    );
    if (!listPaymentAppointment) {
      res.status(404).json({ error: "Không tìm thấy" });
    } else {
      res.json(listPaymentAppointment);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
