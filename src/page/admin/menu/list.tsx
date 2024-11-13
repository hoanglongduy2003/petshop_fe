import { Button, Popconfirm, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import React from "react";
import { Link } from "react-router-dom";
import TableAdmin from "../../../components/table";
import { useMenuQuery, useRemoveMenuMutation } from "../../../services/menu";
import "../../../assets/scss/admin/appointments.scss";

import { TMenu } from "../../../schema/menu";
import { PlusOutlined } from "@ant-design/icons";
const MenuAdmin: React.FC = () => {
  const [removeMenu] = useRemoveMenuMutation();
  const confirm = (id: number) => {
    removeMenu(id)
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

  const columns: ColumnsType<TMenu> = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      fixed: "right",
      width: 50,
      render: (text, record, index) => index + 1,
    },
    {
      title: "Tên menu",
      dataIndex: "name",
      key: "name",
      width: 150,
    },
    {
      title: "Liên kết",
      dataIndex: "link",
      key: "link",
      width: 150,
    },
    {
      title: "Kiểu menu",
      dataIndex: "nameMenuType",
      key: "nameMenuType",
      width: 150,
    },
    {
      title: "Thao tác",
      key: "action",
      width: 150,
      render: (data: TMenu) => (
        <div>
          <Link to={`edit/${data.id}`}>
            <Button className="btn-edit" style={{ marginRight: "1rem" }}>
              Sửa
            </Button>
          </Link>
          <Popconfirm
            title="Xóa Menu."
            description="Bạn có muốn xóa không?"
            onConfirm={() =>
              data.id !== undefined ? confirm(data.id) : undefined
            }
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

  const { data } = useMenuQuery();

  return (
    <div>
      <h2 className="title-appoiment">Quản lý menu</h2>

      <Link to="/admin/menu/add">
        <Button
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
          THÊM MENU
        </Button>
      </Link>
      <TableAdmin columns={columns} data={data} />
    </div>
  );
};

export default MenuAdmin;
