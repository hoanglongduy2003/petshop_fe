import React, { useState, useEffect, useRef } from "react";
import dayjs from "dayjs";
import { useListPaymentAppointmentQuery } from "../../../services/appointments";
import "../../../assets/scss/page/printInvoice.scss";
import { useGetInvoicesQuery } from "../../../services/invoice";
import { TInvoice } from "../../../schema/invoice";
import { useGetAllWebsiteInformationQuery } from "../../../services/websiteInformation";
import { useReactToPrint } from "react-to-print";
interface PrintInvoiceProps {
  invoiceData: number;
}
const PrintInvoice: React.FC<PrintInvoiceProps> = ({ invoiceData }) => {
  const numberId = Number(invoiceData);
  const { data: listPaymentAppointment } =
    useListPaymentAppointmentQuery(numberId);
  const { data: listInvoice } = useGetInvoicesQuery(numberId);
  const componentRef = useRef<HTMLDivElement | null>(null);
  const [printButtonVisible, setPrintButtonVisible] = useState(true);
  const handlePrint = useReactToPrint({
    content: () => {
      try {
        if (componentRef.current) {
          setPrintButtonVisible(false);
          return componentRef.current;
        }
        return null;
      } catch (error) {
        console.error("Error in handlePrint:", error);
        return null;
      }
    },

    onAfterPrint: () => {
      setPrintButtonVisible(true);
    },
  });
  const { data: inforPetCare } = useGetAllWebsiteInformationQuery();
  return (
    <div>
      <section ref={componentRef}>
        <div className="infor-desc">
          <img
            src={
              inforPetCare &&
              inforPetCare.length > 0 &&
              typeof inforPetCare[0]?.logo === "string"
                ? inforPetCare[0]?.logo
                : undefined
            }
            alt="Ảnh logo"
          />
          <h2>Shop thú cưng - PetCare</h2>
          <p>
            Email:
            {inforPetCare && inforPetCare.length > 0 && inforPetCare[0].email}
          </p>
          <p>
            Số điện thoại:
            {inforPetCare && inforPetCare.length > 0 && inforPetCare[0].phone}
          </p>
          <p>
            Địa chỉ:
            {inforPetCare && inforPetCare.length > 0 && inforPetCare[0].zalo}
          </p>
        </div>
        <div className="invoice-container">
          {listInvoice && listInvoice.length > 0 ? (
            <div className="cancelledAppointment">
              <div className="table-scroll">
                <h3 style={{ textAlign: "center" }}>Chi Tiết Hóa Đơn</h3>
                <table>
                  <thead>
                    <tr>
                      <th style={{ textAlign: "center" }}>STT</th>
                      <th>Tên người đặt</th>
                      <th>Ngày Tạo</th>
                      <th>Số Tiền</th>
                      <th>Phương Thức Thanh Toán</th>
                      <th>mã Lịch Hẹn</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listInvoice.map((invoice, index) => (
                      <tr key={invoice.id}>
                        <td style={{ textAlign: "center" }}>{index + 1}</td>
                        <td>{invoice.nameInvoice}</td>
                        <td>
                          {dayjs(invoice.date).format("HH:mm DD-MM-YYYY")}
                        </td>
                        <td>{invoice.amount}</td>
                        <td>{invoice.paymentMethod}</td>
                        <td>{invoice.appointments_id}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : null}
          {listPaymentAppointment && listPaymentAppointment.length > 0 ? (
            <div className="cancelledAppointment">
              <div className="table-scroll">
                <h3 style={{ textAlign: "center" }}>Dịch Vụ Sử Dụng</h3>
                <table>
                  <thead>
                    <tr>
                      <th style={{ textAlign: "center" }}>STT</th>
                      <th>Dịch vụ</th>
                      <th>Tên thú cưng</th>
                      <th>Ngày-giờ đặt</th>
                      <th>Phòng</th>
                      <th>Tổng tiền</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listPaymentAppointment &&
                      listPaymentAppointment.map((item, index) => {
                        return (
                          <tr key={item.id}>
                            <td style={{ textAlign: "center" }}>{index + 1}</td>
                            <td>
                              {item.services &&
                                Array.isArray(item.services) &&
                                item.services.map((service, serviceIndex) => (
                                  <span key={serviceIndex}>
                                    {service.name}
                                    {serviceIndex < item.services.length - 1
                                      ? ", "
                                      : ""}
                                  </span>
                                ))}
                            </td>
                            <td>
                              {item.pets &&
                                Array.isArray(item.pets) &&
                                item.pets.map((pet, serviceIndex) => (
                                  <span key={serviceIndex}>
                                    {pet.name}
                                    {serviceIndex < item.pets.length - 1
                                      ? ", "
                                      : ""}
                                  </span>
                                ))}
                            </td>
                            <td>
                              {dayjs(item.start_time).format(
                                "HH:mm DD-MM-YYYY"
                              )}
                            </td>
                            <td>{item.pethouse_name}</td>
                            <td>{item.total}</td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          ) : null}

          <div className="button-container">
            <button className="btn-print" onClick={handlePrint}>
              In
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrintInvoice;
