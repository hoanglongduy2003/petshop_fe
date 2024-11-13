import React, { useState } from "react";
import { Upload, Button, Form, Space, message } from "antd";
import { useAddAboutMutation, useAboutQuery } from "../../../services/about";
import ReactQuill from "react-quill";
import { useNavigate } from "react-router-dom";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { TAbout } from "../../../schema/about";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import "../../../assets/scss/admin/appointments.scss";

const AddAbout: React.FC = () => {
  const [image, setImage] = useState<any | null>(null);
  const [value, setValue] = useState("");

  const [createAbout, { isLoading: isAddLoading }] = useAddAboutMutation();

  const navigate = useNavigate();

  const { refetch } = useAboutQuery();

  const handleFormSubmit = async (values: TAbout) => {
    const { description } = values;
    const aboutData = {
      image: image,
      description,
    };

    try {
      await createAbout(aboutData).unwrap();
      message.success("About đã được thêm thành công.");

      refetch();

      navigate("/admin/about");
    } catch (error: any) {
      message.error("Lỗi khi thêm About: " + error.message);
    }
  };

  const handleImageChange = (info: any) => {
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
      setImage(info.file.response.url);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
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
      <h2 className="title-appoiment">Thêm about</h2>
      <Form
        name="validateOnly"
        layout="vertical"
        autoComplete="off"
        onFinish={handleFormSubmit}
        initialValues={{ remember: true }}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label={<span className="">Ảnh Giới thiệu</span>}
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
          name="description"
          label="Mô tả"
          rules={[{ required: true, message: "Vui lòng nhập mô tả!" }]}
        >
          <ReactQuill
            style={{ height: 500 }}
            theme="snow"
            value={value}
            onChange={setValue}
          />
        </Form.Item>

        <Form.Item>
          <Space style={{ float: "right" }}>
            <Button
              style={{ marginTop: 30 }}
              htmlType="submit"
              className="text-black transition-colors duration-300 dark:text-white"
              size="large"
            >
              {isAddLoading ? (
                <AiOutlineLoading3Quarters className="animate-spin" />
              ) : (
                "Thêm sản phẩm"
              )}
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddAbout;
