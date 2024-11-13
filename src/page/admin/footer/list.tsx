import { Button, Popconfirm, message, Image } from "antd";
import type { ColumnsType } from "antd/es/table";
import React from "react";
import { Link } from "react-router-dom";
import TableAdmin from "../../../components/table";
import { TFooter } from "../../../schema/footer";
import {
  useGetAllFooterQuery,
  useRemoveFooterMutation,
} from "../../../services/footer";
import "../../../assets/scss/admin/appointments.scss";

const FooterAdmin: React.FC = () => {
  const { data } = useGetAllFooterQuery();
  const [removeFooter] = useRemoveFooterMutation();
  const confirm = (id: number) => {
    removeFooter(id)
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

  const renderContentColumn = (content: string) => {
    const truncatedContent =
      content.length > 200 ? `${content.substring(0, 200)}...` : content;

    return truncatedContent;
  };

  const columns: ColumnsType<TFooter> = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      fixed: "right",
      width: 50,
      render: (text, record, index) => index + 1,
    },
    {
      title: "Slogan",
      dataIndex: "slogan",
      key: "slogan",
      width: 150,
    },
    {
      title: "Nội dung trái",
      dataIndex: "content_left",
      key: "content_left",
      width: 150,
      render: (content_left) => (
        <div
          dangerouslySetInnerHTML={{
            __html: renderContentColumn(content_left) || "",
          }}
        ></div>
      ),
    },

    {
      title: "Nội dung phải",
      dataIndex: "content_right",
      key: "content_right",
      width: 150,
      render: (content_right) => (
        <div
          dangerouslySetInnerHTML={{
            __html: renderContentColumn(content_right) || "",
          }}
        ></div>
      ),
    },
    {
      title: "Bản quyền",
      dataIndex: "license",
      key: "license",
      width: 150,
    },
    {
      title: "Thao tác",
      key: "action",
      width: 100,
      render: (footer: TFooter) => (
        <div>
          <Link to={`edit/${footer.id}`}>
            <Button
              className="btn-edit"
              style={{
                marginRight: "1rem",
              }}
            >
              Sửa
            </Button>
          </Link>
          <Popconfirm
            title="Xóa Footer."
            description="Bạn có muốn xóa không?"
            onConfirm={() =>
              footer.id !== undefined ? confirm(footer.id) : undefined
            }
            onCancel={cancel}
            okText="Đồng ý"
            cancelText="Không"
          >
            <Button danger className="btn-delete" disabled>
              Xóa
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <>
      <div>
        <h2 className="title-appoiment">Quản lý footer</h2>
      </div>
      <TableAdmin columns={columns} data={data} />
      <div>
        <p
          style={{ fontSize: "16px", fontWeight: "bold", fontStyle: "italic" }}
        >
          Ghi chú:
          <span
            style={{ color: "red", fontWeight: "500", marginLeft: "0.5rem" }}
          >
            Phần quản lý Footer website chỉ có thể cập nhật không thể thêm và
            xóa!
          </span>
        </p>
      </div>
    </>
  );
};

export default FooterAdmin;
