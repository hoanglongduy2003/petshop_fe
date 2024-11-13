import {
  createPaymentUrl,
  updateAppointmentStatusPayment,
  updateOrderStatusPayment,
} from "./../models/vnpayModel";
import Appointments from "../models/appointments";
import qs from "qs";
import crypto from "crypto";
import { Buffer } from "buffer";
import nodemailer from "nodemailer";
export const createPayment = async (req, res) => {
  try {
    const paymentUrl = createPaymentUrl(req);
    res.json({ paymentUrl });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const handleVnPayCallback = async (req, res) => {
  try {
    const { vnp_ResponseCode, vnp_TxnRef, vnp_OrderInfo } = req.body;
    if (vnp_ResponseCode == "00") {
      const reqID = vnp_OrderInfo;
      let onlyID;

      if (reqID.startsWith("AP")) {
        onlyID = reqID.substr(2);
        await updateAppointmentStatusPayment(onlyID);

        const userEmails = await Appointments.getUserEmail(onlyID);
        const email = userEmails[0].user_email;
        const transporter = nodemailer.createTransport({
          service: "Gmail",
          auth: {
            user: "luongkhuettt123@gmail.com",
            pass: "Hanoi123",
          },
        });
        const mailOptions = {
          from: email,
          to: email,
          subject: "Thanh Toán Thành Công",
          html: ` <div style="
          text-align: center;
          background-color: white;
          border: 5px solid #5ebdc2;
          width: 390px;
          padding: 30px 25px;
        ">
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
        </div>
          <p>Chào <span style="font-weight: 600">${email}</span></p>
          <p>
            Cảm ơn bạn đã thanh toán lịch hẹn ${onlyID} chăm sóc thú cưng thành công tại
            <span style="font-weight: 600">Website Đặt lịch chăm sóc thú cưng PetCare</span>
          </p>
          <p>Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!</p>
          <p style="width: 100%;height: 1px; background-color: #00575C;"></p>
          <div style="text-align: center;">
            <p>Nếu bạn có bất kỳ câu hỏi nào, xin liên hệ với chúng tôi</p>
            <p>Trân trọng,</p>
            <p style="font-weight: 600;">Ban quản trị Website Đặt lịch chăm sóc thú cưng PetCare</p>
          </div>
        </div>`,
        };

        await transporter.sendMail(mailOptions);

        console.log("Appointment status updated success");
      } else if (reqID.startsWith("OD")) {
        onlyID = reqID.substr(2);
        await updateOrderStatusPayment(onlyID);

        const userEmails = await Appointments.getUserEmail(onlyID);
        const email = userEmails[0].user_email;
        const transporter = nodemailer.createTransport({
          service: "Gmail",
          auth: {
            user: "luongkhuettt123@gmail.com",
            pass: "Hanoi123",
          },
        });
        const mailOptions = {
          from: email,
          to: email,
          subject: "Thanh Toán Thành Công",
          html: ` <div style="
          text-align: center;
          background-color: white;
          border: 5px solid #5ebdc2;
          width: 390px;
          padding: 30px 25px;
        ">
        <div style="display: flex; align-items: center; justify-content: center">
        <img
          style="width: 100%"
          src="https://res.cloudinary.com/dszse8bzk/image/upload/v1703001954/cctk43pofdqlvcgxkmqa.jpg"
          alt=""
        />
      </div>
      <h1 style="color: #5ebdc2; text-align: center">Shop thú cưng -PetCare</h1>
      <div style="text-align: center">EMAIL:PETCARE.FPT@GMAIL.COM</div>
      <div style="text-align: center">SỐ ĐIỆN THOẠI:0987654321</div>
      <div style="text-align: center">
        ĐỊA CHỈ: 2 P. Phạm Văn Bạch, Dịch Vọng, Cầu Giấy, Hà Nội, Việt Nam
      </div>
          <p>Chào <span style="font-weight: 600">${email},</span></p>
          <p>
          Cảm ơn bạn đã thanh toán đơn hàng ${onlyID}thành công tại
            <span style="font-weight: 600">Website Chăm Sóc Thú Cưng PetCare</span>
          </p>
          <p>Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!</p>
          <p style="width: 100%;height: 1px; background-color: #00575C;"></p>
          <div style="text-align: center;">
            <p>Nếu bạn có bất kỳ câu hỏi nào, xin liên hệ với chúng tôi tại</p>
            <p>Trân trọng,</p>
            <p style="font-weight: 600;">Ban quản trị Website Chăm Sóc Thú Cưng PetCare</p>
          </div>
        </div>`,
        };

        await transporter.sendMail(mailOptions);
        console.log("Order status updated success");
      }
    }
    res.status(200).json({
      vnp_ResponseCode: vnp_ResponseCode,
      vnp_TxnRef: vnp_TxnRef,
      vnp_OrderInfo: vnp_OrderInfo,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Lỗi ");
  }
};

export const handleVnPayReturnURL = async (req, res) => {
  try {
    const vnp_Params = req.query;

    const secureHash = vnp_Params["vnp_SecureHash"];

    delete vnp_Params["vnp_SecureHash"];
    delete vnp_Params["vnp_SecureHashType"];

    const sortedParams = sortObject(vnp_Params);

    const secretKey = "RW7NBDG5GKJRTQWCUWT6CIDE65KY7CM7";

    const signData = qs.stringify(sortedParams, { encode: false });
    const hmac = crypto.createHmac("sha512", secretKey);
    const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");

    if (secureHash === signed) {
      const responseCode = vnp_Params["vnp_ResponseCode"] || "N/A";
      res.json({ success: responseCode === "00", responseCode });
    } else {
      res.status(400).json({ success: false, error: "Chữ Ký Không Hợp Lệ !" });
    }
  } catch (err) {
    console.error("Error", err);
    res.status(500).send("Lỗi ");
  }
};

function sortObject(obj) {
  let sorted = {};
  let str = [];
  let key;
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      str.push(encodeURIComponent(key));
    }
  }
  str.sort();
  for (key = 0; key < str.length; key++) {
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
  }
  return sorted;
}
