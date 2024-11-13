import { Button, Popconfirm, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TableAdmin from "../../../components/table";
import { TContact } from "../../../schema/contact";
import {
  useContactQuery,
  useRemoveContactMutation,
} from "../../../services/contact";
import Search from "antd/es/input/Search";
import "../../../assets/scss/admin/appointments.scss";

const ContactAdmin: React.FC = () => {
  const [filter, setFilter] = useState({ name: "", nameUser: "" });
  const [listContact, setListContact] = useState<TContact[] | undefined>([]);
  const [openReset, setOpenReset] = useState<boolean>(false);
  const { data } = useContactQuery();
  const [removeContact] = useRemoveContactMutation();

  const confirm = (id: number) => {
    removeContact(id);
    message.success("Xóa thành công.");
  };

  const cancel = () => {
    message.error("Xóa không thành công.");
  };

  const columns: ColumnsType<TContact> = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      fixed: "right",
      width: 150,
      render: (text, record, index) => index + 1,
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
      width: 150,
    },
    {
      title: "Tiêu đề",
      dataIndex: "title",
      key: "title",
      width: 150,
    },
    {
      title: "Nội dung",
      dataIndex: "subject",
      key: "subject",
      width: 150,
    },
    {
      title: "Người dùng",
      dataIndex: "nameUser",
      key: "nameUser",
      width: 150,
    },
    {
      title: "Trạng thái",
      dataIndex: "statusName",
      key: "statusName",
      width: 150,
    },
    {
      title: "Thao tác",
      key: "action",
      width: 150,
      render: (contact: TContact) => (
        <div>
          <Link to={`edit/${contact.id}`}>
            <Button
              className="btn-edit"
              style={{ marginRight: "1rem" }}
              disabled={contact.status_id === 1 || contact.status_id === 7}
            >
              Sửa
            </Button>
          </Link>
          <Popconfirm
            title="Xóa trạng thái."
            description="Bạn có muốn xóa không?"
            onConfirm={() =>
              confirm(contact?.id !== undefined ? contact.id : 0)
            }
            onCancel={cancel}
            okText="Đồng ý"
            cancelText="Không"
          >
            <Button
              danger
              className="btn-delete"
              disabled={contact?.status_id === 1 || contact.status_id === 7}
            >
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
    const filteredData = data?.filter(
      (item) =>
        item.title?.toLowerCase().includes(filter.name.trim().toLowerCase()) &&
        item.nameUser
          ?.toLowerCase()
          .includes(filter.nameUser.trim().toLowerCase())
    );
    setListContact(filteredData);
  }, [data, filter]);

  useEffect(() => {
    if (filter.nameUser === "" && filter.name === "") {
      setOpenReset(false);
    } else {
      setOpenReset(true);
    }
  }, [filter.nameUser, filter.name]);

  return (
    <>
      <h2 className="title-appoiment">
        Quản lý thông tin liên hệ từ khách hàng
      </h2>
      <h2 style={{ margin: "0.5rem" }}>Tìm kiếm</h2>
      <div className="btn-table">
        <div style={{ display: "flex", columnGap: 20 }}>
          <Search
            placeholder="Tìm kiếm tiêu đề"
            value={filter?.name}
            onChange={(e) => handleFilterChange("name", e.target.value)}
            style={{ width: 200, marginBottom: 10 }}
          />
          <Search
            placeholder="Tìm kiếm tên"
            value={filter?.nameUser}
            onChange={(e) => handleFilterChange("nameUser", e.target.value)}
            style={{ width: 200, marginBottom: 10 }}
          />
          <Button
            onClick={() => setFilter({ name: "", nameUser: "" })}
            danger
            disabled={!openReset}
          >
            Cài lại
          </Button>
        </div>
      </div>
      <TableAdmin columns={columns} data={listContact} />
    </>
  );
};

export default ContactAdmin;
