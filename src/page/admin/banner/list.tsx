import { Button, Popconfirm, message, Image } from "antd";
import type { ColumnsType } from "antd/es/table";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import TableAdmin from "../../../components/table";
import { TBanner } from "../../../schema/banner";
import {
  useGetAllBannerQuery,
  useRemoveBannerMutation,
} from "../../../services/banner";import "../../../assets/scss/admin/appointments.scss";

// import { PlusOutlined } from "@ant-design/icons";

const BannerAdmin: React.FC = () => {
  // const navigate = useNavigate();
  const { data } = useGetAllBannerQuery();
  const [removeBanner] = useRemoveBannerMutation();
  const confirm = (id: number) => {
    removeBanner(id)
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

  const columns: ColumnsType<TBanner> = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      fixed: "right",
      width: 50,
      render: (text, record, index) => index + 1,
    },
    {
      title: "Ảnh",
      dataIndex: "img",
      key: "img",
      width: 150,
      render: (logo) => <Image width={100} src={logo} />,
    },
    {
      title: "Tiêu đề",
      dataIndex: "title",
      key: "title",
      width: 150,
    },
    {
      title: "Slogan",
      dataIndex: "slogan",
      key: "slogan",
      width: 150,
    },
    {
      title: "Link",
      dataIndex: "link",
      key: "link",
      width: 150,
    },
    {
      title: "Thao tác",
      key: "action",
      width: 100,
      render: (banner: TBanner) => (
        <div>
          <Link to={`edit/${banner.id}`}>
            <Button className="btn-edit" style={{ marginRight: "1rem" }}>
              Sửa
            </Button>
          </Link>
          <Popconfirm
            title="Xóa banner."
            description="Bạn có muốn xóa không?"
            onConfirm={() =>
              banner.id !== undefined ? confirm(banner.id) : undefined
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
      {/* <Button
        onClick={() => navigate("add")}
        type="primary"
        icon={<PlusOutlined />}
        style={{ marginBottom: "1rem" }}
      >
        THÊM BANNER
      </Button> */}

      <div>
        <h2
          className="title-appoiment"
        >
          Quản lý banner
        </h2>
      </div>
      <TableAdmin columns={columns} data={data} />
      <div>
        <p
          style={{ fontSize: "17px", fontWeight: "bold", fontStyle: "italic" }}
        >
          Ghi chú:
          <span
            style={{ color: "red", fontWeight: "500", marginLeft: "0.5rem" }}
          >
            Phần quản lý banner website chỉ có thể cập nhật không thể thêm và
            xóa!
          </span>
        </p>
      </div>
    </>
  );
};

export default BannerAdmin;
