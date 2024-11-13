import { PlusOutlined } from "@ant-design/icons";
import { Button, Popconfirm, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TableAdmin from "../../../components/table";
import { TStatus } from "../../../schema/status";
import {
  useRemoveStatusAppointmentMutation,
  useStatusQuery,
} from "../../../services/status_appointment";
import Search from "antd/es/input/Search";
import "../../../assets/scss/admin/appointments.scss";

const StatusAdmin: React.FC = () => {
  const navigator = useNavigate();
  const [filter, setFilter] = useState({ name: "" });
  const [listStatusAppointment, setListStatusAppointment] = useState<
    TStatus[] | undefined
  >([]);
  const [openReset, setOpenReset] = useState<boolean>(false);
  const { data } = useStatusQuery();
  const [removeStatusAppointment] = useRemoveStatusAppointmentMutation();

  const confirm = (id: number) => {
    removeStatusAppointment(id)
      .then((response: any) => {
        if (response.error) {
          message.error("Bạn không thể xóa vì có liên quan khóa ngoại");
        } else {
          message.success("Xóa thành công.");
        }
      })
      .catch((error: any) => {
        message.error("Có lỗi xảy ra khi xóa.");
      });
  };

  const cancel = () => {
    message.error("Xóa không thành công.");
  };

  const columns: ColumnsType<TStatus> = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      fixed: "right",
      width: 50,
      render: (text, record, index) => index + 1,
    },
    {
      title: "Trạng thái",
      dataIndex: "name",
      key: "name",
      width: 150,
    },
    {
      title: "Thao tác",
      dataIndex: "id",
      key: "action",
      width: 100,
      render: (id: number) => (
        <div>
          <Link to={`edit/${id}`}>
            <Button className="btn-edit" style={{ marginRight: "1rem" }}>
              Sửa
            </Button>
          </Link>
          <Popconfirm
            title="Xóa trạng thái."
            description="Bạn có muốn xóa không?"
            onConfirm={() => confirm(id)}
            onCancel={cancel}
            okText="Đồng ý"
            cancelText="Không"
          >
            <Button danger className="btn-delete">
              Xóa
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const handleFilterChange = (fieldName: string, value: string) => {
    setFilter({ ...filter, [fieldName]: value });
  };

  useEffect(() => {
    const filteredData = data?.filter((item) =>
      item.name?.toLowerCase().includes(filter.name.trim().toLowerCase())
    );
    setListStatusAppointment(filteredData);
  }, [data, filter]);

  useEffect(() => {
    if (filter.name === "") {
      setOpenReset(false);
    } else {
      setOpenReset(true);
    }
  }, [filter.name]);

  return (
    <div>
      <h2 className="title-appoiment">Quản lý trạng thái xác nhận đặt lịch</h2>
      <h2 style={{ margin: "0.5rem" }}>Tìm kiếm</h2>
      <div className="btn-table">
        <div style={{ display: "flex", columnGap: 20 }}>
          <Search
            placeholder="Tìm kiếm Trạng thái"
            value={filter?.name}
            onChange={(e) => handleFilterChange("name", e.target.value)}
            style={{ width: 200, marginBottom: 10 }}
          />
          <Button
            onClick={() => setFilter({ name: "" })}
            danger
            disabled={!openReset}
          >
            Cài lại
          </Button>
        </div>
      </div>
      <Button
        onClick={() => navigator("add")}
        type="text"
        block
        icon={<PlusOutlined />}
        style={{
          marginBottom: "1rem",
          fontWeight: "500",
          border: "1px solid #c3c3c3",
          width: "15%",
          float: "right",
        }}
      >
        THÊM TRẠNG THÁI
      </Button>
      <TableAdmin columns={columns} data={listStatusAppointment} />
    </div>
  );
};

export default StatusAdmin;
