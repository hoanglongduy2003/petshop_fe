import { format } from "date-fns";
import qs from "qs";
import crypto from "crypto";
import { Buffer } from "buffer";
import connection from "../db";

export const updateAppointmentStatusPayment = (onlyID) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "UPDATE appointments SET status_payment = 2 WHERE id = ?",
      [onlyID],
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      }
    );
  });
};
export const updateOrderStatusPayment = (onlyID) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "UPDATE orders SET status_payment = 2 WHERE id = ?",
      [onlyID],
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      }
    );
  });
};
export const createPaymentUrl = (req) => {
  let date = new Date();
  let createDate = format(date, "yyyyMMddHHmmss");

  let ipAddr =
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;

  let tmnCode = "TQGRO1OR";
  let secretKey = "RW7NBDG5GKJRTQWCUWT6CIDE65KY7CM7";
  let vnpUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
  let returnUrl = "http://localhost:3000/callback";
  let orderId = format(date, "ddHHmmss");
  let amount = req.body.amount;
  let reqID;
  if (req.body.appointmentID) {
    reqID = "AP" + req.body.appointmentID;
  } else if (req.body.OrderID) {
    reqID = "OD" + req.body.OrderID;
  }
  let currCode = "VND";
  let vnp_Params = {};
  vnp_Params["vnp_Version"] = "2.1.0";
  vnp_Params["vnp_Command"] = "pay";
  vnp_Params["vnp_TmnCode"] = tmnCode;
  vnp_Params["vnp_Locale"] = "vn";
  vnp_Params["vnp_CurrCode"] = currCode;
  vnp_Params["vnp_TxnRef"] = orderId;
  vnp_Params["vnp_OrderInfo"] = reqID;
  vnp_Params["vnp_OrderType"] = "other";
  vnp_Params["vnp_Amount"] = amount * 100;
  vnp_Params["vnp_ReturnUrl"] = returnUrl;
  vnp_Params["vnp_IpAddr"] = ipAddr;
  vnp_Params["vnp_CreateDate"] = createDate;
  vnp_Params = sortObject(vnp_Params);
  let signData = qs.stringify(vnp_Params, { encode: false });
  let hmac = crypto.createHmac("sha512", secretKey);
  let signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");
  vnp_Params["vnp_SecureHash"] = signed;
  vnpUrl += "?" + qs.stringify(vnp_Params, { encode: false });

  return vnpUrl;
};
export const validateVnPayResponse = (vnp_Params) => {
  const { vnp_SecureHash, ...restParams } = vnp_Params;

  const sortedParams = sortObject(restParams);

  const secretKey = "RW7NBDG5GKJRTQWCUWT6CIDE65KY7CM7";

  const signData = qs.stringify(sortedParams, { encode: false });
  const hmac = crypto.createHmac("sha512", secretKey);
  const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");

  if (vnp_SecureHash === signed) {
    return {
      isValid: true,
      vnp_ResponseCode: restParams.vnp_ResponseCode,
      vnp_TxnRef: restParams.vnp_TxnRef,
    };
  } else {
    return { isValid: false, error: "Invalid secure hash" };
  }
};
function sortObject(obj) {
  let sorted = {};
  let str = [];
  let key;
  for (key in obj) {
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
