import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
  UploadFile,
  message,
} from "antd";
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";
import { TProduct } from "../../../schema/products";
import {
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "../../../services/products";
import "../../../assets/scss/admin/appointments.scss";

import { useGetAllcategoryQuery } from "../../../services/category";
import { Tcategory } from "../../../schema/category";
const EditProduct = () => {
  const { id } = useParams<{ id: string }>();
  const category = useGetAllcategoryQuery();
  const productById = useGetProductByIdQuery(Number(id));
  const [image, setImage] = useState<string | undefined>();
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: "-1",
      name: "img.png",
      status: "done",
      url: image,
    },
  ]);
  const [value, setValue] = useState("");

  const [updateProduct, { reset, isLoading: isAddLoading }] =
    useUpdateProductMutation();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  useEffect(() => {
    setFileList([
      {
        uid: "-1",
        name: "img.png",
        status: "done",
        url: productById.data?.img,
      },
    ]);
    setImage(productById.data?.img);
    form.setFieldsValue({
      id: productById.data?.id,
      name: productById.data?.name,
      price: productById.data?.price,
      img: productById.data?.img,
      description: productById.data?.description,
      quantity: productById.data?.quantity,
      category_id: productById.data?.category_id,
    });
  }, [
    form,
    productById.data?.id,
    productById.data?.name,
    productById.data?.price,
    productById.data?.img,
    productById.data?.description,
    productById.data?.quantity,
    productById.data?.category_id,
  ]);

  const handleImageChange = ({ fileList: newFileList }: any) => {
    if (newFileList[0].response) {
      setImage(newFileList[0].response.secure_url);
    }
    setFileList(newFileList);
  };

  const onFinish = async (values: TProduct) => {
    const { id, name, price, description, quantity, category_id } = values;
    const productData = {
      id,
      name,
      price,
      img: image,
      description,
      quantity,
      category_id,
    };
    try {
      await updateProduct(productData).unwrap();
      message.success("Cập Nhật sản phẩm thành công!!");
      reset();
      navigate("/admin/products");
    } catch (error) {
      message.error("Cập Nhật sản phẩm thất bại!!");
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
      <h2 className="title-appoiment">Cập nhật sản phẩm</h2>
      <Form
        form={form}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
      >
        <Form.Item
          label={<span className="">ID</span>}
          name="id"
          rules={[{ required: true, message: "Vui lòng nhập tên dịch vụ!" }]}
        >
          <Input disabled />
        </Form.Item>
        <Form.Item
          label={<span className="">Tên dịch vụ</span>}
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập tên dịch vụ!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label={<span className="">Ảnh sản phẩm</span>} name="img">
          <Upload
            name="file"
            action="https://api.cloudinary.com/v1_1/dksgvucji/image/upload"
            data={{
              upload_preset: "wh3rdke8",
              cloud_name: "dksgvucji",
            }}
            listType="picture-card"
            maxCount={1}
            fileList={fileList}
            showUploadList={true}
            className="ant-upload-wrapper ant-upload-select"
            onChange={handleImageChange}
          >
            {uploadButton}
          </Upload>
        </Form.Item>
        <Form.Item
          label={<span>Giá dịch vụ </span>}
          name="price"
          rules={[{ required: true, message: "Vui lòng nhập giá dịch vụ!" }]}
        >
          <InputNumber min={1} />
        </Form.Item>
        <Form.Item
          style={{ marginBottom: 50 }}
          label={<span>Mô tả</span>}
          name="description"
          rules={[
            { required: true, message: "Vui lòng nhập giá mô tả dịch vụ!" },
          ]}
        >
          <ReactQuill
            style={{ height: 400 }}
            theme="snow"
            value={value}
            onChange={setValue}
          />
        </Form.Item>

        <Form.Item
          label={<span className="">Số lượng</span>}
          name="quantity"
          rules={[{ required: true, message: "Vui lòng nhập tên dịch vụ!" }]}
        >
          <Input className=" inputForm" />
        </Form.Item>

        <Form.Item
          label="Category"
          name="category_id"
          rules={[
            { required: true, message: "Vui lòng chọn danh mục sản phẩm!" },
          ]}
        >
          {productById.data && productById.data?.category_id && (
            <Select defaultValue={productById.data?.category_id}>
              {category.data?.map((item: Tcategory) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          )}
        </Form.Item>
        <Form.Item>
          <Button style={{ float: "right" }} htmlType="submit" size="large">
            {isAddLoading ? (
              <AiOutlineLoading3Quarters className="animate-spin" />
            ) : (
              "Sửa Sản Phẩm"
            )}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default EditProduct;
