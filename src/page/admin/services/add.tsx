import { Button, Form, Input, InputNumber, TimePicker, Upload, message } from "antd";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useAddServicesMutation } from "../../../services/services";
import "../../../assets/scss/admin/appointments.scss";

import { TServicesRequest } from "../../../schema/services";
import { useNavigate } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import "../../../assets/scss/page/servicesAdmin.scss";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
const AddService = () => {
  const [image, setImage] = useState<any | null>(null);
  const [value, setValue] = useState("");

  const [addServices, { reset, isLoading: isAddLoading }] =
    useAddServicesMutation();
  const navigate = useNavigate();
  const handleImageChange = (info: any) => {
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
      setImage(info.file.response.url);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };
  const onFinish = async (values: TServicesRequest) => {
    const { name, price, description, time } = values;
    const servicesData = {
      name,
      price,
      time: dayjs(time).format("HH:mm:00"),
      image: image,
      description,
    };
    try {
      await addServices(servicesData).unwrap();
      message.success("Thêm dịch vụ thành công");
      reset();
      navigate("/admin/services");      
    } catch (error) {
      message.error("Thêm dịch vụ thất bại");
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
            label={<span className="">Tên dịch vụ</span>}
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập tên dịch vụ!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={<span className="">Ảnh danh mục</span>}
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
            label={
              <span className="text-base dark:text-white">Giá dịch vụ </span>
            }
            name="price"
            rules={[{ required: true, message: "Vui lòng nhập giá dịch vụ!" }]}
          >
            <InputNumber
              min={1}
              className="dark:hover:border-[#00c6ab] w-full transition-colors duration-300"
            />
          </Form.Item>
          <Form.Item
            label={
              <span className="text-base dark:text-white">Thời gian làm</span>
            }
            name="time"
            rules={[
              { required: true, message: "Vui lòng chọn thời gian làm!" },
            ]}
          >
            <TimePicker
              style={{ width: "100%" }}
              format="HH:mm"
              allowClear={false}
            />
          </Form.Item>

          <Form.Item
            label={<span className="text-base dark:text-white">Mô tả</span>}
            name="description"
            rules={[
              { required: true, message: "Vui lòng nhập giá mô tả dịch vụ!" },
            ]}
          >
            <ReactQuill
              style={{ height: 500 }}
              theme="snow"
              value={value}
              onChange={setValue}
            />
          </Form.Item>
          <Form.Item>
            <Button
              style={{ float: "right", marginTop: 40}}
              htmlType="submit"
              className="text-black transition-colors duration-300 dark:text-white"
              size="large"
            >
              {isAddLoading ? (
                <AiOutlineLoading3Quarters className="animate-spin" />
              ) : (
                "Thêm dịch vụ"
              )}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default AddService;
