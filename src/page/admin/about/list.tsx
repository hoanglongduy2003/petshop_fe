import { Button, Popconfirm, message, Image } from "antd";
import type { ColumnsType } from "antd/es/table";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import TableAdmin from "../../../components/table";
import { TAbout } from "../../../schema/about";
import { useAboutQuery, useRemoveAboutMutation } from "../../../services/about";
import { PlusOutlined } from "@ant-design/icons";import "../../../assets/scss/admin/appointments.scss";


const AboutAdmin: React.FC = () => {
  const { data } = useAboutQuery();

  const [removeAbout] = useRemoveAboutMutation();
  const createMarkup = (description: any) => {
    return { __html: description };
  };
  const confirm = (id: number) => {
    removeAbout(id)
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

  const columns: ColumnsType<TAbout> = [
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
      dataIndex: "image",
      key: "image",
      width: 50,
      render: (image) => <Image width={100} src={image} />,
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      width: 400,
      render: (description) => (
        <div
          style={{
            display: "-webkit-box",
            overflow: "hidden",
            textOverflow: "ellipsis",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
          }}
          dangerouslySetInnerHTML={createMarkup(description)}
        />
      ),
    },
    {
      title: "Thao tác",
      key: "action",
      width: 150,
      render: (about: TAbout) => (
        <div>
          <Link to={`edit/${about.id}`}>
            <Button className="btn-edit" style={{ marginRight: "1rem" }}>
              Sửa
            </Button>
          </Link>
          <Popconfirm
            title="Xóa about."
            description="Bạn có muốn xóa không?"
            onConfirm={() =>
              about.id !== undefined ? confirm(about.id) : undefined
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

  return (
    <div>
      <h2
        className="title-appoiment"
      >
        Quản lý about
      </h2>
      <Link to="/admin/about/add">
        <Button
          type="text"
          block
          icon={<PlusOutlined />}
          style={{
            marginBottom: "1rem",
            fontWeight: "500",
            border: "1px solid #c3c3c3",
            width: "13%", 
            float: "right"
          }}
        >
          THÊM ABOUT
        </Button>
      </Link>
      <TableAdmin columns={columns} data={data} />
    </div>
  );
};

export default AboutAdmin;
