import { Button, Image, Popconfirm, message } from "antd";
import Search from "antd/es/input/Search";
import type { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TableAdmin from "../../../components/table";
import { TStatus } from "../../../schema/status";
import { TUser } from "../../../schema/user";
import {
  useUpdateBlockUserMutation,
  useUserQuery,
} from "../../../services/user";import "../../../assets/scss/admin/appointments.scss";


const UserAdmin: React.FC = () => {
  const { data } = useUserQuery();
  const [listUser, setListUser] = useState<TUser[] | undefined>([]);
  const [removeProducts] = useUpdateBlockUserMutation();
  const [filter, setFilter] = useState({ name: "", email: "", phone: "" });
  const [openReset, setOpenReset] = useState<boolean>(false);

  const handleFilterChange = (fieldName: string, value: string) => {
    setFilter({ ...filter, [fieldName]: value });
  };

  const confirm = (id: number) => {
    removeProducts({ id: id, is_delete: 0 });
    message.success("Mở khóa thành công.");
  };

  const confirmBlock = (id: number) => {
    removeProducts({ id: id, is_delete: 1 });
    message.success("Khóa thành công.");
  };

  const cancel = () => {
    message.error("Hủy thành công.");
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
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 150,
    },
    {
      title: "Ảnh",
      dataIndex: "img",
      key: "img",
      width: 150,
      render: (img) => <Image width={100} src={img} />,
    },
    {
      title: "SĐT",
      dataIndex: "phone",
      key: "phone",
      width: 150,
    },
    {
      title: "Vai trò",
      dataIndex: "nameRole",
      key: "nameRole",
      width: 150,
    },
    {
      title: "Thao tác",
      key: "id",
      width: 200,
      render: (user: TUser) => (
        <div>
          <Link to={`edit/${user.id}`}>
            <Button className="btn-edit" style={{ marginRight: "1rem" }}>
              Sửa
            </Button>
          </Link>
          {user.is_delete ? (
            <Popconfirm
              title="Xóa trạng thái."
              description="Bạn có muốn mở khóa không?"
              onConfirm={() => confirm(user.id)}
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
              onConfirm={() => confirmBlock(user.id)}
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
        item.name.toLowerCase().includes(filter.name.trim().toLowerCase()) &&
        item.email.toLowerCase().includes(filter.email.trim().toLowerCase()) &&
        item.phone.toLowerCase().includes(filter.phone.trim().toLowerCase())
    );
    setListUser(filteredData);
  }, [data, filter]);

  useEffect(() => {
    if (filter.email === "" && filter.phone === "" && filter.name === "") {
      setOpenReset(false);
    } else {
      setOpenReset(true);
    }
  }, [filter.email, filter.name, filter.phone]);

  useEffect(() => {
    setListUser(data);
  }, [data]);

  return (
    <>
      <h2
        className="title-appoiment"
      >
        Quản lý người dùng
      </h2>

      <div className="btn-table">
        <h2 style={{ margin: "0.5rem" }}>Tìm kiếm</h2>
        <div style={{ display: "flex", columnGap: 20 }}>
          <Search
            placeholder="Tìm kiếm tên"
            value={filter?.name}
            onChange={(e) => handleFilterChange("name", e.target.value)}
            style={{ width: 200, marginBottom: 10 }}
          />
          <Search
            placeholder="Tìm kiếm email"
            value={filter?.email}
            onChange={(e) => handleFilterChange("email", e.target.value)}
            // onSearch={(value) => handleFilterChange("email", value)}
            style={{ width: 200, marginBottom: 10 }}
          />
          <Search
            placeholder="Tìm kiếm số điện thoại"
            value={filter?.phone}
            type="number"
            onChange={(e) => handleFilterChange("phone", e.target.value)}
            // onSearch={(value) => handleFilterChange("phone", value)}
            style={{ width: 200, marginBottom: 10 }}
          />
          <Button
            onClick={() => setFilter({ name: "", email: "", phone: "" })}
            danger
            disabled={!openReset}
          >
            Cài lại
          </Button>
        </div>
      </div>
      <TableAdmin columns={columns} data={listUser} />
    </>
  );
};

export default UserAdmin;
