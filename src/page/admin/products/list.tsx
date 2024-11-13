import { Button, Popconfirm, message, Image, Form, Select } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TableAdmin from "../../../components/table";
import { PlusOutlined } from "@ant-design/icons";
import { TProduct } from "../../../schema/products";
import {
  useGetAllProductsQuery,
  useRemoveProductMutation,
  useSearchAddProductMutation,
} from "../../../services/products";
import "../../../assets/scss/admin/appointments.scss";

import { useGetAllcategoryQuery } from "../../../services/category";
import Search from "antd/es/input/Search";
import { Tcategory } from "../../../schema/category";
const ProductsAdmin: React.FC = () => {
  const navigate = useNavigate();
  const [removeProduct] = useRemoveProductMutation();

  const [dataProduct, setDataProduct] = useState<any | null>(null);
  const [categories, setCategories] = useState([]);
  const [filter, setFilter] = useState({ name: "", cate: "" });
  const [openReset, setOpenReset] = useState<boolean>(false);
  const { data } = useGetAllProductsQuery();
  const { data: categoryData } = useGetAllcategoryQuery<any | null>();

  const handleFilterChange = (fieldName: string, value: string) => {
    setFilter({ ...filter, [fieldName]: value });
  };

  const columns: ColumnsType<TProduct> = [
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
      title: "Tên",
      dataIndex: "name",
      key: "name",
      width: 150,
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      width: 150,
      render: (price) => (
        <div>
          {new Intl.NumberFormat("vi-VN").format(price)}
          <span> VNĐ</span>
        </div>
      ),
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      width: 150,
    },
    {
      title: "Danh mục",
      dataIndex: "nameCategory",
      key: "nameCategory",
      width: 150,
    },

    {
      title: "Thao tác",
      key: "action",
      width: 100,
      render: (product: TProduct) => (
        <div>
          <Link to={`edit/${product.id}`}>
            <Button className="btn-edit" style={{ marginRight: "1rem" }}>
              Sửa
            </Button>
          </Link>
          <Popconfirm
            title="Xóa trạng thái."
            description="Bạn có muốn xóa không?"
            onConfirm={() =>
              product.id !== undefined ? confirm(product.id) : undefined
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

  const confirm = (id: number) => {
    removeProduct(id)
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

  useEffect(() => {
    if (categoryData) {
      setCategories(categoryData);
    }
  }, [categoryData]);

  const [searchAddProduct] = useSearchAddProductMutation();

  useEffect(() => {
    if (data) {
      setDataProduct(data);
    }
  }, [data]);

  useEffect(() => {
    const filteredData = data?.filter(
      (item) =>
        item.name?.toLowerCase().includes(filter.name.trim().toLowerCase()) &&
        item.nameCategory
          ?.toLowerCase()
          .includes(filter.cate.trim().toLowerCase())
    );
    setDataProduct(filteredData);
  }, [data, filter]);

  useEffect(() => {
    if (filter.name === "" && filter.cate === "") {
      setOpenReset(false);
    } else {
      setOpenReset(true);
    }
  }, [filter.cate, filter.name]);

  const onFinish = async (values: any) => {
    const { status_id } = values;

    const productDataz = {
      status_id,
    };

    try {
      const data: any = await searchAddProduct(productDataz).unwrap();
      setDataProduct(data);
    } catch (error) {
      message.error("Không tìm thấy sản phẩm nào phù hợp");
    }
  };

  const handleCategoryChange = (fieldName: string, value: string) => {
    if (value === "all") {
      setFilter({ ...filter, [fieldName]: "" });
    } else {
      setFilter({ ...filter, [fieldName]: value });
    }
  };

  return (
    <>
      <h2 className="title-appoiment">Quản lý sản phẩm</h2>
      <h2 style={{ margin: "0.5rem" }}>Tìm kiếm</h2>
      <Form
        name="validateOnly"
        className="search-appointments"
        layout="vertical"
        autoComplete="off"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        style={{ marginTop: 10 }}
      >
        <div
          className="btn-table"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <div style={{ display: "flex", columnGap: 20 }}>
            <Search
              placeholder="Tìm kiếm tên"
              value={filter?.name}
              onChange={(e) => handleFilterChange("name", e.target.value)}
              style={{ width: 200, marginBottom: 10 }}
            />
            <Select
              style={{ width: 200, marginBottom: 10 }}
              placeholder="Chọn danh mục"
              defaultValue="all"
              value={filter.cate !== "" ? filter.cate : "Tất cả"}
              onChange={(text) => handleCategoryChange("cate", text)}
            >
              <Select.Option value="all">Tất cả</Select.Option>
              {categories?.map((category: Tcategory) => (
                <Select.Option key={category.id} value={category.name}>
                  {category.name}
                </Select.Option>
              ))}
            </Select>
            <Button
              onClick={() => setFilter({ name: "", cate: "" })}
              danger
              disabled={!openReset}
            >
              Cài lại
            </Button>
          </div>
        </div>
      </Form>
      <div></div>
      <Button
        onClick={() => navigate("add")}
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
        THÊM SẢN PHẨM
      </Button>
      <TableAdmin columns={columns} data={dataProduct} />
    </>
  );
};

export default ProductsAdmin;
