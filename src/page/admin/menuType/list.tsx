import { PlusOutlined } from "@ant-design/icons";
import { Button, Popconfirm, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import React from "react";
import { Link } from "react-router-dom";
import TableAdmin from "../../../components/table";
import { TMenuType } from "../../../schema/menuType";
import {
  useRemoveMenuTypeMutation,
  useMenuTypeQuery,
} from "../../../services/menuType";
import "../../../assets/scss/admin/appointments.scss";

const MenuTypeAdmin: React.FC = () => {
  const { data } = useMenuTypeQuery();
  const [removeMenuType] = useRemoveMenuTypeMutation();

  const confirm = (id: number) => {
    removeMenuType(id);
    message.success("Xóa thành công.");
  };

  const cancel = () => {
    message.error("Xóa không thành công.");
  };

  const columns: ColumnsType<TMenuType> = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      fixed: "right",
      width: 150,
      render: (text, record, index) => index + 1,
    },
    {
      title: "Kiểu Menu",
      dataIndex: "name",
      key: "name",
      width: 150,
    },
    {
      title: "Thao tác",
      key: "action",
      width: 100,
      render: (menutype) => (
        <div>
          <Link to={`edit/${menutype.id}`}>
            <Button className="btn-edit" style={{ marginRight: "1rem" }}>
              Sửa
            </Button>
          </Link>
          <Popconfirm
            title="Xóa trạng thái."
            description="Bạn có muốn xóa không?"
            onConfirm={() => confirm(menutype.id)}
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
  return (
    <div>
      <h2 className="title-appoiment">Quản lý kiểu menu</h2>
      <Link to="/admin/menutype/add">
        <Button
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
          THÊM KIỂU MENU
        </Button>
      </Link>
      <TableAdmin columns={columns} data={data} />
    </div>
  );
};

export default MenuTypeAdmin;
