import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
  message,
} from "antd";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useCreateProductsMutation } from "../../../services/products";
import { TProduct } from "../../../schema/products";
import { useNavigate } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { useGetAllcategoryQuery } from "../../../services/category";
import "../../../assets/scss/admin/appointments.scss";

import { Tcategory } from "../../../schema/category";
const AddProduct = () => {
  const category = useGetAllcategoryQuery();
  const [image, setImage] = useState<any | null>(null);
  const [value, setValue] = useState("");
  const [addProducts, { reset, isLoading: isAddLoading }] =
    useCreateProductsMutation();
  const navigate = useNavigate();
  const handleImageChange = (info: any) => {
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
      setImage(info.file.response.url);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };
  const onFinish = async (values: TProduct) => {
    const { name, price, description, quantity, category_id } = values;
    const productsData = {
      name,
      price,
      img: image,
      description,
      quantity,
      category_id,
    };
    try {
      await addProducts(productsData).unwrap();
      message.success("Product added successfully");
      reset();
      navigate("/admin/products");
    } catch (error) {
      message.error("Failed to add product");
    }
  };
  const onFinishFailed = async (values: any) => {
    console.log("Failed:", values);
  };
  const uploadButton = (
    <div>
      {isAddLoading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  return (
    <>
      <h2 className="title-appoiment">Thêm sản phẩm</h2>
      <div>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
        >
          <Form.Item
            label={<span className="">Tên</span>}
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={<span className="">Ảnh sản phẩm</span>}
            name="picture-card"
            rules={[{ required: true, message: "Vui lòng chọn ảnh" }]}
          >
            <Upload
              name="file"
              action="https://api.cloudinary.com/v1_1/dksgvucji/image/upload"
              data={{
                upload_preset: "wh3rdke8",
                cloud_name: "dksgvucji",
              }}
              listType="picture-card"
              maxCount={1}
              showUploadList={false}
              className="ant-upload-wrapper ant-upload-select"
              onChange={handleImageChange}
            >
              {image ? (
                <img src={image} alt="avatar" style={{ width: "100%" }} />
              ) : (
                uploadButton
              )}
            </Upload>
          </Form.Item>
          <Form.Item
            label={<span>Giá sản phẩm</span>}
            name="price"
            rules={[{ required: true, message: "Vui lòng nhập giá!" }]}
          >
            <InputNumber min={1} />
          </Form.Item>
          <Form.Item
            label={<span>Mô tả</span>}
            name="description"
            rules={[
              { required: true, message: "Vui lòng nhập mô tả sản phẩm!" },
            ]}
          >
            <ReactQuill
              style={{ height: 500 }}
              theme="snow"
              value={value}
              onChange={setValue}
            />
          </Form.Item>

          <Form.Item
            label={<span className="">Số lượng</span>}
            name="quantity"
            rules={[
              { required: true, message: "Vui lòng nhập số lượng sản phẩm!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="category_id"
            label="Cate"
            rules={[{ required: true, message: "Vui lòng chọn category " }]}
          >
            <Select>
              {category.data?.map((item: Tcategory) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button style={{ float: "right" }} htmlType="submit" size="large">
              {isAddLoading ? (
                <AiOutlineLoading3Quarters className="animate-spin" />
              ) : (
                "Thêm sản phẩm"
              )}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default AddProduct;
