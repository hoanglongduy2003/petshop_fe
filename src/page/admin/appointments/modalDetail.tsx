import { CloseOutlined } from "@ant-design/icons";
import { FC, useRef, useState } from "react";
import "../../../assets/scss/page/orderPay.scss";
import { TAppointment } from "../../../schema/appointments";
import dayjs from "dayjs";
import { Tag } from "antd";
import { useReactToPrint } from "react-to-print";
import { useGetAllWebsiteInformationQuery } from "../../../services/websiteInformation";

type TDetailAppointment = {
  openDetail: boolean;
  setOpenDetail: React.Dispatch<React.SetStateAction<boolean>>;
  dataDetail?: TAppointment;
};

const DetailAppointment: FC<TDetailAppointment> = ({
  openDetail,
  setOpenDetail,
  dataDetail,
}) => {
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
    <>
      <div ref={componentRef}>
        {openDetail && (
          <div className="detailAppointment">
            <div
              className="detailAppointment_modal"
              style={{
                overflow: "auto",
              }}
            >
              <div
                style={{
                  float: "right",
                }}
              >
                <div
                  className="detailAppointment_modal_close"
                  onClick={() => setOpenDetail(false)}
                >
                  <CloseOutlined />
                </div>
              </div>
              <div
                className="infor-desc"
                style={{
                  display: "none",
                }}
              >
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
                  {inforPetCare &&
                    inforPetCare.length > 0 &&
                    inforPetCare[0].email}
                </p>
                <p>
                  Số điện thoại:{" 0"}
                  {inforPetCare &&
                    inforPetCare.length > 0 &&
                    inforPetCare[0].phone}
                </p>
                <p>
                  Địa chỉ:{" "}
                  {inforPetCare &&
                    inforPetCare.length > 0 &&
                    inforPetCare[0].address}
                </p>
              </div>
              <h3>chi tiết</h3>

              <table className="table">
                <tr className="table_vertical">
                  <td className="text-left">Email</td>
                  <td className="text-left">{dataDetail?.user_email}</td>
                </tr>
                <tr className="table_vertical">
                  <td className="text-left">Tên chủ nhân</td>
                  <td className="text-left">{dataDetail?.user_name}</td>
                </tr>
                <tr className="table_vertical">
                  <td className="text-left">Ngày đặt</td>
                  <td className="text-left">
                    {dayjs(dataDetail?.start_time).format("DD-MM-YYYY")}
                  </td>
                </tr>
                <tr className="table_vertical">
                  <td className="text-left">Thời gian thực hiện</td>
                  <td className="text-left">
                    <div>
                      {dayjs(dataDetail?.start_time).format("HH:mm")} -
                      {dayjs(dataDetail?.end_time).format("HH:mm")}
                    </div>
                  </td>
                </tr>
                <tr className="table_vertical">
                  <td className="text-left">Tên thú cưng</td>
                  <td className="text-left">
                    {Array.isArray(dataDetail?.pets) &&
                      dataDetail?.pets.map((pet, serviceIndex) => (
                        <span key={serviceIndex}>
                          {pet.name}
                          {serviceIndex < dataDetail?.pets.length - 1
                            ? ", "
                            : ""}
                        </span>
                      ))}
                  </td>
                </tr>
                <tr className="table_vertical">
                  <td className="text-left">Dịch vụ đã làm</td>
                  <td className="text-left">
                    {Array.isArray(dataDetail?.services) &&
                      dataDetail?.services.map((service, serviceIndex) => (
                        <span key={serviceIndex}>
                          {service.name}
                          {serviceIndex < dataDetail?.services.length - 1
                            ? ", "
                            : ""}
                        </span>
                      ))}
                  </td>
                </tr>
                <tr className="table_vertical">
                  <td className="text-left">Phòng</td>
                  <td className="text-left">{dataDetail?.pethouse_name}</td>
                </tr>
                <tr className="table_vertical">
                  <td className="text-left">Tổng số tiền</td>
                  <td className="text-left">
                    {new Intl.NumberFormat("vi-VN").format(
                      dataDetail?.total || 0
                    )}{" "}
                    VNĐ
                  </td>
                </tr>
                <tr className="table_vertical">
                  <td className="text-left">Thanh toán</td>
                  <td className="text-left">
                    <Tag
                      color={dataDetail?.statusPaymentId === 1 ? "red" : "cyan"}
                    >
                      {dataDetail?.statusPaymentName}
                    </Tag>
                  </td>
                </tr>
                <tr className="table_vertical">
                  <td className="text-left">Trạng thái</td>
                  <td className="text-left">
                    <Tag
                      color={
                        dataDetail?.status_id === 1
                          ? "blue"
                          : dataDetail?.status_id === 2
                          ? "cyan"
                          : dataDetail?.status_id === 3
                          ? "orange"
                          : dataDetail?.status_id === 4
                          ? "green"
                          : dataDetail?.status_id === 5
                          ? "red"
                          : ""
                      }
                    >
                      {dataDetail?.status_name}
                    </Tag>
                  </td>
                </tr>
              </table>
              <button className="btn-print" onClick={handlePrint}>
                In
              </button>
            </div>
            <div className="background" />
          </div>
        )}
      </div>
    </>
  );
};

export default DetailAppointment;
