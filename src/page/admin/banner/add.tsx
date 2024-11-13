import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Upload, message } from "antd";
import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import { TBanner } from "../../../schema/banner";
import { useCreateBannerMutation } from "../../../services/banner";

const AddBanner = () => {
  const [img, setImage] = useState<any | null>(null);
  const [addBanner, { reset, isLoading: isAddLoading }] =
    useCreateBannerMutation();
  const navigate = useNavigate();
  const handleImageChange = (info: any) => {
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
      setImage(info.file.response.url);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };
  const onFinish = async (values: TBanner) => {
    const { title, slogan, link } = values;
    const bannerData = {
      img: img,
      title,
      slogan,
      link,
    };
    try {
      await addBanner(bannerData).unwrap();
      message.success("Banner added successfully");
      reset();
      navigate("/admin/banner");
    } catch (error) {
      message.error("Failed to add Banner");
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
      <h2 style={{marginBottom: 10}}>Thêm banner</h2>
      <div>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
        >
          <Form.Item
            label={<span className="">Ảnh banner</span>}
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
              {img ? (
                <img src={img} alt="avatar" style={{ width: "100%" }} />
              ) : (
                uploadButton
              )}
            </Upload>
          </Form.Item>

          <Form.Item
            label={<span className="">Tiêu đề</span>}
            name="title"
            rules={[{ required: true, message: "Vui lòng nhập tiêu đề!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label={<span className="">Slogan</span>}
            name="slogan"
            rules={[{ required: true, message: "Vui lòng nhập slogan!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label={<span className="">Link</span>}
            name="link"
            rules={[{ required: true, message: "Vui lòng nhập link!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button
              style={{ marginTop: 30 }}
              htmlType="submit"
              className="text-black transition-colors duration-300 dark:text-white"
              size="large"
            >
              {isAddLoading ? (
                <AiOutlineLoading3Quarters className="animate-spin" />
              ) : (
                "Thêm banner"
              )}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default AddBanner;
