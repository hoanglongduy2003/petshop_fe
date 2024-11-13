import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  DatePicker,
  DatePickerProps,
  Input,
  Popconfirm,
  Select,
  Tag,
  message,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import React, { Children, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import "../../../assets/scss/admin/appointments.scss";
import TableAdmin from "../../../components/table";
import {
  TAppointment,
  TAppointmentSchemaRes,
} from "../../../schema/appointments";
import { TpetHouse } from "../../../schema/pethouse";
import { TStatusPet } from "../../../schema/pets";
import {
  useGetAllappointmentDataQuery,
  useSearchAddAppointmentMutation,
  useUpdatePaymentAppointmentMutation,
  useUpdateStatusAppointmentMutation,
} from "../../../services/appointments";
import { useGetAllpetHouseQuery } from "../../../services/pethouse";
import { useGetAllStatusPaymentQuery } from "../../../services/statusPayment";
import { useStatusQuery } from "../../../services/status_appointment";
import DetailAppointment from "./modalDetail";

const AppointmentsAdmin: React.FC = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState({
    name: "",
    house: "",
    start_time: "",
    pay: "",
    status: "",
  });
  const [dataAppoiment, setDataAppoiment] = useState<TAppointment[]>();
  const [openReset, setOpenReset] = useState<boolean>(false);
  const [openDetail, setOpenDetail] = useState<boolean>(false);
  const [dataDetail, setDataDetail] = useState<TAppointment>();
  const { data } = useGetAllappointmentDataQuery();
  const { data: petHouse } = useGetAllpetHouseQuery();
  const { data: petStatus } = useStatusQuery();
  const { data: dataPay } = useGetAllStatusPaymentQuery();

  const optionsPetHouse = petHouse?.map((item: TpetHouse) => ({
    value: item.id,
    label: item.name,
    disabled: item.status_id === 1,
  }));

  const optionsStatus = petStatus?.map((item: TpetHouse) => ({
    value: item.id,
    label: item.name,
    disabled: item.status_id === 1,
  }));

  const optionsPay = dataPay?.map((item: TStatusPet) => ({
    value: item.id,
    label: item.name,
  }));

  const exportToExcel = () => {
    const flattenData = dataAppoiment?.map((item: any) => ({
      Id: item.id,
      "Email người đặt": item.user_email,
      "Tên người đặt": item.user_name,
      "Thú cưng":
        item.pets && item.pets.length > 0
          ? item.pets.map((pet: { name: string }) => pet.name).join(", ")
          : "",
      "Dịch vụ":
        item.services && item.services.length > 0
          ? item.services
              .map((service: { name: string }) => service.name)
              .join(", ")
          : "",
      "Ngày đặt": dayjs(item.day).format("DD-MM-YYYY HH:mm"),
      "Ngày làm": dayjs(item.start_time).format("DD-MM-YYYY HH:mm"),
      Phòng: item.pethouse_name,
      "Thành tiền": item.total,
      "Trạng thái": item.status_name,
      "Trạng thái thanh toán": item.statusPaymentName,
    }));
    const ws = XLSX.utils.json_to_sheet(flattenData || []);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, `lịch đặt.xlsx`);
  };

  const columns: ColumnsType<TAppointmentSchemaRes> = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      fixed: "right",
      width: 20,
      render: (text, record, index) => index + 1,
    },
    {
      title: "Người đặt",
      dataIndex: "user_name",
      key: "user_name",
      width: 50,
    },
    {
      title: "Ngày đặt",
      dataIndex: "start_time",
      key: "day",
      render: (text) => <div>{dayjs(text).format("DD-MM-YYYY")}</div>,
      width: 100,
    },
    {
      title: "Thời gian Ca",
      key: "time",
      width: 110,
      render: (data) => (
        <>
          {data.start_time && data.end_time ? (
            <div>
              {dayjs(data.start_time).format("HH:mm")} -
              {dayjs(data.end_time).format("HH:mm")}
            </div>
          ) : (
            <div>null</div>
          )}
        </>
      ),
    },
    {
      title: "Tên thú cưng",
      dataIndex: "pets",
      key: "pets",
      width: 100,
      render: (pets) => (
        <div>
          {pets &&
            Array.isArray(pets) &&
            pets.map((pet, serviceIndex) => (
              <span key={serviceIndex}>
                {pet.name}
                {serviceIndex < pets.length - 1 ? ", " : ""}
              </span>
            ))}
        </div>
      ),
    },
    {
      title: "Giá tiền",
      key: "total",
      width: 100,
      render: (data) => (
        <p>{new Intl.NumberFormat("vi-VN").format(data.total)} VNĐ</p>
      ),
    },
    {
      title: "Thanh toán",
      key: "statusPaymentName",
      width: 150,
      render: (data) => (
        <Tag color={data.statusPaymentId === 1 ? "red" : "green"}>
          {data.statusPaymentName}
        </Tag>
      ),
    },
    {
      title: "Trạng thái",
      key: "status_name",
      width: 100,
      render: (data) => (
        <Tag
          color={
            data.status_id === 1
              ? "blue"
              : data.status_id === 2
              ? "cyan"
              : data.status_id === 3
              ? "orange"
              : data.status_id === 4
              ? "green"
              : data.status_id === 5
              ? "red"
              : ""
          }
        >
          {data.status_name}
        </Tag>
      ),
    },
    {
      key: "action",
      width: 200,
      render: (data) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              alignItems: "stretch",
              flexDirection: "column",
              rowGap: 10,
            }}
          >
            {(data.status_id === 1 ||
              data.status_id === 2 ||
              data.status_id === 3 ||
              (data.status_id === 4 && data.statusPaymentId === 1)) && (
              <>
                <ButtonSuccess data={data} />
                <ButtonCancel data={data} />
              </>
            )}
          </div>
          <Button
            type="link"
            onClick={() => {
              setOpenDetail(true);
              setDataDetail(data);
            }}
          >
            Chi tiết
          </Button>
        </div>
      ),
    },
  ];

  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    if (date) {
      handleFilterChange("start_time", dayjs(date).format("DD/MM/YYYY"));
    } else {
      handleFilterChange("start_time", "");
    }
  };

  const handleFilterChange = (fieldName: string, value: string) => {
    setFilter({ ...filter, [fieldName]: value });
  };

  useEffect(() => {
    const filteredData = data?.filter(
      (item) =>
        item.user_name
          ?.toLowerCase()
          .includes(filter.name.trim().toLowerCase()) &&
        item.pethouse_id?.toString().toLowerCase().includes(filter.house) &&
        dayjs(item.start_time)
          .format("DD/MM/YYYY")
          .toLowerCase()
          .includes(filter.start_time.trim().toLowerCase()) &&
        item.statusPaymentId?.toString().toLowerCase().includes(filter.pay) &&
        item.status_id?.toString().toLowerCase().includes(filter.status)
    );
    setDataAppoiment(filteredData);
  }, [
    data,
    filter.name,
    filter.house,
    filter.start_time,
    filter.status,
    filter.pay,
  ]);

  useEffect(() => {
    if (
      filter.name === "" &&
      filter.house === "" &&
      filter.start_time === "" &&
      filter.pay === "" &&
      filter.status === ""
    ) {
      setOpenReset(false);
    } else {
      setOpenReset(true);
    }
  }, [filter.name, filter.house, filter.start_time, filter.status, filter.pay]);

  useEffect(() => {
    if (!dataAppoiment) {
      setDataAppoiment(data);
    }
  }, [data, dataAppoiment]);

  return (
    <>
      <h2 className="title-appoiment">
        Quản lý thông tin đặt lịch chăm sóc thú cưng
      </h2>
      <h2 style={{ margin: "0.5rem" }}>Tìm kiếm</h2>
      <div style={{ display: "flex", columnGap: 20, alignItems: "flex-end" }}>
        <div>
          <Input
            value={filter?.name}
            placeholder="Tên người đặt"
            onChange={(e) => handleFilterChange("name", e.target.value)}
            style={{ width: 200 }}
          />
        </div>
        <div>
          <Select
            options={optionsPetHouse}
            placeholder="Tên phòng"
            onChange={(value) => handleFilterChange("house", value)}
            value={filter.house || null}
            style={{ width: 200 }}
          />
        </div>
        <div>
          <DatePicker
            style={{ width: 200 }}
            format="YYYY-MM-DD"
            placeholder="Ngày đặt"
            onChange={onChange}
          />
        </div>
        <div>
          <Select
            options={optionsPay}
            onChange={(value) => handleFilterChange("pay", value)}
            value={filter.pay || null}
            style={{ width: 200 }}
            placeholder="Trạng thái thanh toán"
          />
        </div>
        <div>
          <Select
            options={optionsStatus}
            onChange={(value) => handleFilterChange("status", value)}
            value={filter.status || null}
            style={{ width: 200 }}
            placeholder="Trạng thái xác nhận"
          />
        </div>
        <Button
          onClick={() =>
            setFilter({
              name: "",
              house: "",
              start_time: "",
              pay: "",
              status: "",
            })
          }
          danger
          disabled={!openReset}
        >
          Cài lại
        </Button>
      </div>
      <div className="btn-option">
        <Button
          type="text"
          block
          icon={<PlusOutlined />}
          style={{
            margin: "1rem 1rem 1rem 0",
            fontWeight: "500",
            border: "1px solid #c3c3c3",
            width: "13%",
          }}
          onClick={() => navigate("/admin/appointment/add")}
        >
          Thêm lịch đặt
        </Button>
        <Button
          style={{ margin: "1rem 0", color: "white", background: "#7a7a7a" }}
          className="btn"
          onClick={() => exportToExcel()}
        >
          Xuất Excel
        </Button>
      </div>
      <TableAdmin columns={columns} data={dataAppoiment} />
      <DetailAppointment
        openDetail={openDetail}
        setOpenDetail={setOpenDetail}
        dataDetail={dataDetail}
      />
    </>
  );
};

export default AppointmentsAdmin;

const ButtonSuccess = ({ data }: { data: any }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [updateStatusAppointment] = useUpdateStatusAppointmentMutation();
  const [updatePaymentAppointment] = useUpdatePaymentAppointmentMutation();

  const redirectToAppointment = async (id: number, status_id: number) => {
    if (status_id === 1 || status_id === 2 || status_id === 3) {
      setLoading(true);
      const res = await updateStatusAppointment({
        id: id,
        status_id: status_id + 1,
      });
      if ("data" in res) {
        message.success("Sửa trạng thái thành công");
        setLoading(false);
      } else {
        message.error("Sửa trạng thái không thành công");
        setLoading(false);
      }
    } else if (status_id === 4) {
      const res = await updatePaymentAppointment({
        id: id,
        status_payment: 2,
      });
      if ("data" in res) {
        message.success("Sửa trạng thái thanh toán thành công");
        setLoading(false);
      } else {
        message.error("Sửa trạng thái thanh toán không thành công");
        setLoading(false);
      }
    }
  };

  return (
    <Button
      type="primary"
      onClick={() => redirectToAppointment(data.id, data.status_id)}
      className="btn-edit"
      loading={loading}
    >
      {data.status_id === 1
        ? "Xác nhận"
        : data.status_id === 2
        ? "Thực hiện"
        : data.status_id === 3
        ? "Hoàn thành"
        : data.status_id === 4 && data.statusPaymentId === 1
        ? "Thanh toán"
        : ""}
    </Button>
  );
};

const ButtonCancel = ({ data }: { data: any }) => {
  const [loadingCancel, setLoadingCancel] = useState<boolean>(false);

  const [updateStatusAppointment] = useUpdateStatusAppointmentMutation();

  const confirm = async (id: number) => {
    setLoadingCancel(true);
    const res = await updateStatusAppointment({ id: id, status_id: 5 });
    if ("data" in res) {
      message.success("Hủy lịch đặt thành công");
      setLoadingCancel(false);
    } else {
      message.error("Hủy lịch đặt không thành công");
      setLoadingCancel(false);
    }
  };

  return (
    <Popconfirm
      onConfirm={() => confirm(data.id)}
      title="Hủy lịch"
      description="Bạn có chắc chắn hủy lịch này không?"
    >
      <Button
        danger
        loading={loadingCancel}
        className="btn-delete"
        disabled={data.status_id === 4 || data.status_id === 5}
      >
        Hủy
      </Button>
    </Popconfirm>
  );
};
