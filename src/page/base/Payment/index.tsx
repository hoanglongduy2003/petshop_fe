import React, { useEffect, useState, useRef } from "react";
import "../../../assets/scss/page/paymentPage.scss";
import { useParams, useNavigate, Link } from "react-router-dom";
import logo from "../../../assets/image/logo.png";
import { message, List, Typography, Spin } from "antd";

import axios from "axios";
import {
  useCreateInvoiceMutation,
  useGetInvoicesQuery,
} from "../../../services/invoice";
import { useGetUserQuery } from "../../../services/user";
const API_URL = "http://localhost:8080/api";

const PaymentPage = () => {
  const { id, total } = useParams();
  const navigate = useNavigate();
  const [addInvoice] = useCreateInvoiceMutation();
  const idRef = useRef(id);
  const totalRef = useRef(total);
  useEffect(() => {
    idRef.current = id;
    totalRef.current = total;
  }, [id, total]);
  const [isLoading, setIsLoading] = useState(true);
  const [appointmentList, setAppointmentData] = useState<any | null>(null);
  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(loadingTimeout);
  }, []);
  useEffect(() => {
    const fetchAppointmentDetails = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/appointmentListPayment/${id}`
        );
        setAppointmentData(response.data);
      } catch (error) {
        console.error("Error fetching appointment details", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAppointmentDetails();
  }, [id]);
  const { data: user } = useGetUserQuery();
  const { data } = useGetInvoicesQuery(Number(id));
  const handlePayment = () => {
    axios
      .get(`${API_URL}/appointment/${id}/status_payment`)
      .then((appointmentResponse) => {
        const appointmentData = appointmentResponse.data;
        if (appointmentData.status_payment === 2) {
          message.warning("Đơn hàng đã được thanh toán");
          return;
        }
        axios
          .post(`${API_URL}/create-payment`, {
            appointmentID: id,
            amount: total,
          })
          .then((response) => {
            localStorage.setItem("paymentInfo", JSON.stringify({ id, total }));
            window.location.href = response.data.paymentUrl;
          })
          .catch((error) => {
            console.error("Error", error);
          });
      })
      .catch((error) => {
        console.error("Error", error);
      });
  };

  const handlePaymentCash = async () => {
    const amount = totalRef.current
      ? parseInt(totalRef.current, 10)
      : undefined;
    const appointmentId = idRef.current
      ? parseInt(idRef.current, 10)
      : undefined;

    const statusPaymentResponse = await axios.get(
      `${API_URL}/appointment/${appointmentId}/status_payment`
    );
    const appointmentData = statusPaymentResponse.data;

    if (appointmentData.status_payment === 2) {
      message.warning("Đơn hàng đã được thanh toán");
      return;
    }
    try {
      const existingInvoice =
        data &&
        data.length > 0 &&
        data.find((invoice) => {
          return (
            invoice.appointments_id === appointmentId &&
            invoice.paymentMethod === "CASH"
          );
        });

      if (existingInvoice) {
        message.warning("hóa đơn đã tồn tại ");
        navigate(`/account/confirmed-appointment`);
      } else {
        const response = await addInvoice({
          user_id: user?.id,
          paymentMethod: "CASH",
          amount: amount,
          appointments_id: appointmentId,
        });
        navigate(`/pay-cash`);
      }
    } catch (error) {
      console.error("Error creating or navigating to the invoice", error);
    }
  };
  if (!user) {
    return (
      <div className="login-now">
        <p>Bạn chưa đăng nhập.</p>
        <img src={logo} alt="logo" />
        <Link to="/SignIn">Đăng nhập ngay</Link>
      </div>
    );
  }
  return (
    <div className="container">
      <div className="icing">
        <h2>
          <img className="logo" src={logo} alt="logo" width={130} />
        </h2>
        <ul className="order">
          <List
            itemLayout="vertical"
            size="large"
            dataSource={appointmentList ? [appointmentList] : []}
            renderItem={(item) => (
              <List.Item key={item.id}>
                {appointmentList ? (
                  <div>
                    <Typography.Title level={4}>
                      Mã đơn hàng: {item.id}
                    </Typography.Title>
                    <Typography.Paragraph>
                      Số Tiền:{" "}
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(item.total)}
                    </Typography.Paragraph>
                    <Typography.Paragraph>
                      Ngày Đặt: {item.day}
                    </Typography.Paragraph>
                    <Typography.Paragraph>
                      Nhà Cung Cấp: The PetCare Shop
                    </Typography.Paragraph>
                  </div>
                ) : (
                  <Spin size="large" />
                )}
              </List.Item>
            )}
          />
        </ul>
      </div>
      <br />
      <div className="dough">
        <h2>Vui lòng chọn phương thức thanh toán</h2>
        <br />
        <br />
        <div>
          <div className="buttons" onClick={handlePaymentCash}>
            <button className="order-button flex">
              Thanh Toán Bằng Tiền Mặt{" "}
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1vztU8IzuRgDR1QVXxz5LVwtjwOm2YW2h9w&usqp=CAU"
                alt="VNPAY"
                width={50}
                className="payment-image"
              />
            </button>
          </div>
          <br />
          <div className="buttons" onClick={handlePayment}>
            <button className="order-button flex">
              Thanh Toán Online VNPAY{" "}
              <img
                src="https://sandbox.vnpayment.vn/paymentv2/images/icons/mics/64x64-vi-vnpay.svg"
                alt="VNPAY"
                width={50}
                className="payment-image"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PaymentPage;
