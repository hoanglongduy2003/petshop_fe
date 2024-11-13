import { PlusOutlined } from "@ant-design/icons";
import { Button, Popconfirm, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TableAdmin from "../../../components/table";
import { TServices } from "../../../schema/services";
import "../../../assets/scss/admin/appointments.scss";

import {
  useServicesQuery,
  useUpdateBlockServicesMutation,
} from "../../../services/services";
import { TStatus } from "../../../schema/status";
import Search from "antd/es/input/Search";

const ServicesAdmin: React.FC = () => {
  const navigate = useNavigate();
  const [blockServices] = useUpdateBlockServicesMutation();
  const [dataServices, setDataServices] = useState<any | null>(null);
  const { data } = useServicesQuery();
  useEffect(() => {
    if (data) {
      setDataServices(data);
    }
  }, [data]);

  const [filter, setFilter] = useState({ name: "", price: "" });
  const [openReset, setOpenReset] = useState<boolean>(false);

  const handleFilterChange = (fieldName: string, value: string) => {
    setFilter({ ...filter, [fieldName]: value });
  };

  const confirmBlock = (id: number) => {
    blockServices({ id: id, is_delete: 1 });
    message.success("khóa thành công");
  };

  const confirm = (id: number) => {
    blockServices({ id: id, is_delete: 0 });
    message.success("Mở thành công.");
  };

  const cancel = () => {
    message.error("khóa không thành công.");
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
      title: "Tên",
      dataIndex: "name",
      key: "name",
      width: 150,
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      key: "img",
      width: 90,
      render: (img: string) => (
        <div>
          <img style={{ width: "100%" }} src={img} alt="img" />
        </div>
      ),
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      width: 150,
    },
    {
      title: "Thời gian làm",
      dataIndex: "time",
      key: "time",
      width: 150,
    },
    {
      title: "Thao tác",
      key: "id",
      width: 100,
      render: (services: TServices) => (
        <div>
          <Link to={`edit/${services.id}`}>
            <Button className="btn-edit" style={{ marginRight: "1rem" }}>
              Sửa
            </Button>
          </Link>
          {services.is_delete ? (
            <Popconfirm
              title="Xóa trạng thái."
              description="Bạn có muốn mở khóa không?"
              onConfirm={() => confirm(services.id)}
              onCancel={cancel}
              okText="Đồng ý"
              cancelText="Không"
            >
              <Button type="primary" ghost>
                Mở Khóa
              </Button>
            </Popconfirm>
          ) : (
            <Popconfirm
              title="Xóa trạng thái."
              description="Bạn có muốn khóa không?"
              onConfirm={() => confirmBlock(services.id)}
              onCancel={cancel}
              okText="Đồng ý"
              cancelText="Không"
            >
              <Button danger className="btn-delete">
                Khóa
              </Button>
            </Popconfirm>
          )}
        </div>
      ),
    },
  ];

  useEffect(() => {
    const filteredData = data?.filter(
      (item) =>
        item.name?.toLowerCase().includes(filter.name.trim().toLowerCase()) &&
        item.price
          ?.toString()
          .toLowerCase()
          .includes(filter.price.trim().toLowerCase())
    );
    setDataServices(filteredData);
  }, [data, filter]);

  useEffect(() => {
    if (filter.name === "" && filter.price === "") {
      setOpenReset(false);
    } else {
      setOpenReset(true);
    }
  }, [filter.name, filter.price]);

  return (
    <>
      <h2 className="title-appoiment">Quản lý dịch vụ</h2>
      <h2 style={{ margin: "0.5rem" }}>Tìm kiếm</h2>
      <div
        className="btn-table"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <div style={{ display: "flex", columnGap: 20 }}>
          <Search
            placeholder="Tìm tên dịch vụ"
            value={filter?.name}
            onChange={(e) => handleFilterChange("name", e.target.value)}
            style={{ width: 200, marginBottom: 10 }}
          />
          <Search
            placeholder="Tìm giá"
            value={filter?.price}
            onChange={(e) => handleFilterChange("price", e.target.value)}
            style={{ width: 200, marginBottom: 10 }}
          />
          <Button
            onClick={() => setFilter({ name: "", price: "" })}
            danger
            disabled={!openReset}
          >
            Cài lại
          </Button>
        </div>
      </div>
      <Button
        onClick={() => navigate("add")}
        type="text"
        block
        icon={<PlusOutlined />}
        style={{
          marginBottom: "1rem",
          fontWeight: "500",
          border: "1px solid #c3c3c3",
          width: "13%",
          float: "right",
        }}
      >
        THÊM DỊCH VỤ
      </Button>
      <TableAdmin columns={columns} data={dataServices} />
    </>
  );
};

export default ServicesAdmin;
