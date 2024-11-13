import { Button, Popconfirm, message, Image } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TableAdmin from "../../../components/table";
import { TContact } from "../../../schema/contact";
import { useNewsQuery, useRemoveNewsMutation } from "../../../services/news";
import { TNews } from "../../../schema/news";
import { PlusOutlined } from "@ant-design/icons";
import Search from "antd/es/input/Search";
import dayjs from "dayjs";
import "../../../assets/scss/admin/appointments.scss";

const NewsAdmin: React.FC = () => {
  const [removeNews] = useRemoveNewsMutation();

  const { data } = useNewsQuery();
  const [filter, setFilter] = useState({ name: "" });
  const [listNews, setListNews] = useState<TNews[] | undefined>([]);
  const [openReset, setOpenReset] = useState<boolean>(false);

  const handleFilterChange = (fieldName: string, value: string) => {
    setFilter({ ...filter, [fieldName]: value });
  };
  const confirm = (id: number) => {
    removeNews(id)
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

  const columns: ColumnsType<TContact> = [
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
      width: 130,
      render: (img) => <Image width={100} src={img} />,
    },
    {
      title: "Tiêu đề",
      dataIndex: "title",
      key: "title",
      width: 150,
      render: (title) => (
        <div
          style={{
            display: "-webkit-box",
            overflow: "hidden",
            textOverflow: "ellipsis",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
          }}
        >
          {title}
        </div>
      ),
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      width: 100,
      render: (description) => (
        <div
          style={{
            display: "-webkit-box",
            overflow: "hidden",
            textOverflow: "ellipsis",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
          }}
        >
          {description}
        </div>
      ),
    },
    {
      title: "Thời gian tạo",
      dataIndex: "created_at",
      key: "created_at",
      width: 150,
      render: (created_at) => (
        <div>{dayjs(created_at).format("DD-MM-YYYY (HH:mm:ss)")}</div>
      ),
    },
    {
      title: "Người dùng",
      dataIndex: "nameUser",
      key: "nameUser",
      width: 150,
    },
    {
      title: "Thao tác",
      key: "action",
      width: 150,
      render: (data: TNews) => (
        <div>
          <Link to={`edit/${data.id}`}>
            <Button className="btn-edit" style={{ marginRight: "1rem" }}>
              Sửa
            </Button>
          </Link>
          <Popconfirm
            title="Xóa trạng thái."
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
  useEffect(() => {
    const filteredData = data?.filter((item) =>
      item.nameUser?.toLowerCase().includes(filter.name.trim().toLowerCase())
    );
    setListNews(filteredData);
  }, [data, filter]);

  useEffect(() => {
    if (filter.name === "") {
      setOpenReset(false);
    } else {
      setOpenReset(true);
    }
  }, [filter.name]);
  return (
    <>
      <h2 className="title-appoiment">Quản lý menu</h2>
      <div className="btn-table">
        <h2 style={{ margin: "0.5rem" }}>Tìm kiếm</h2>
        <div style={{ display: "flex", columnGap: 20 }}>
          <Search
            placeholder="Tìm kiếm Trạng Thái "
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
      <Link to="/admin/news/add">
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
          THÊM TIN TỨC
        </Button>
      </Link>
      <TableAdmin columns={columns} data={listNews} />
    </>
  );
};

export default NewsAdmin;
