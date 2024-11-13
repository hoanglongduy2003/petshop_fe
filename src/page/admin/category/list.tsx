import { Button, Popconfirm, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TableAdmin from "../../../components/table";
import { Tcategory } from "../../../schema/category";
import {
  useGetAllcategoryQuery,
  useRemoveCategoryMutation,
} from "../../../services/category";
import { PlusOutlined } from "@ant-design/icons";
import Search from "antd/es/input/Search";
import "../../../assets/scss/admin/appointments.scss";

const CategoryAdmin: React.FC = () => {
  const [removePetHouse] = useRemoveCategoryMutation();
  const [dataCategory, setDataCategory] = useState<any | null>(null);
  const { data } = useGetAllcategoryQuery();
  useEffect(() => {
    if (data) {
      setDataCategory(data);
    }
  }, [data]);

  const [filter, setFilter] = useState({ name: "" });
  const [openReset, setOpenReset] = useState<boolean>(false);

  const handleFilterChange = (fieldName: string, value: string) => {
    setFilter({ ...filter, [fieldName]: value });
  };
  const confirm = (id: number) => {
    removePetHouse(id)
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

  const columns: ColumnsType<Tcategory> = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      fixed: "right",
      width: 150,
      render: (text, record, index) => index + 1,
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
      width: 150,
    },
    {
      title: "Thao tác",
      key: "action",
      width: 100,
      render: (cate: Tcategory) => (
        <div>
          <Link to={`edit/${cate.id}`}>
            <Button className="btn-edit" style={{ marginRight: "1rem" }}>
              Sửa
            </Button>
          </Link>
          <Popconfirm
            title="Xóa trạng thái."
            description="Bạn có muốn xóa không?"
            onConfirm={() =>
              cate.id !== undefined ? confirm(cate.id) : undefined
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
      item.name?.toLowerCase().includes(filter.name.trim().toLowerCase())
    );
    setDataCategory(filteredData);
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
      <h2 className="title-appoiment">Quản lý danh mục</h2>

      <h2 style={{ margin: "0.5rem" }}>Tìm kiếm</h2>
      <div
        className="btn-table"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <div style={{ display: "flex", columnGap: 20 }}>
          <Search
            placeholder="Tìm tên danh mục"
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
      <Link to="/admin/category/add">
        <Button
          icon={<PlusOutlined />}
          type="text"
          block
          style={{
            marginBottom: "1rem",
            fontWeight: "500",
            border: "1px solid #c3c3c3",
            width: "13%",
            float: "right",
          }}
        >
          THÊM DANH MỤC
        </Button>
      </Link>
      <TableAdmin columns={columns} data={dataCategory} />
    </>
  );
};

export default CategoryAdmin;
