import { Button, Form, Input, message, Upload } from "antd";
import { SetStateAction, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { TNews } from "../../../schema/news";
import { useAddNewsMutation } from "../../../services/news";
import dayjs from "dayjs";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { useGetUserQuery } from "../../../services/user";
import "../../../assets/scss/admin/appointments.scss";

const Addnews = () => {
  const [value, setValue] = useState("");

  const [form] = Form.useForm();

  const [addNews, { reset, isLoading: isAddLoading }] = useAddNewsMutation();

  const navigate = useNavigate();

  const [image, setImage] = useState<any | null>(null);

  const confirm = () => {
    message.success("Tạo bài đăng thành công.");
  };

  const cancel = () => {
    message.error("Tạo bài đăng không công.");
  };
  const { data: user } = useGetUserQuery();

  const handleFormSubmit = async (values: TNews) => {
    const { title, description } = values;

    const dateNews = {
      title,
      img: image,
      description,
      created_at: dayjs().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
      user_id: user?.id,
    };

    try {
      await addNews(dateNews).unwrap();
      confirm();
      reset();
      navigate("/admin/news");
    } catch (error) {
      cancel();
      console.error("Error updating user role:", error);
      reset();
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

  const uploadButton = (
    <div>
      {isAddLoading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const onFinishFailed = async (values: any) => {
    console.log("Failed:", values);
  };

  return (
    <>
      <h2 className="title-appoiment">Thêm bài đăng</h2>
      <div>
        <Form
          form={form}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={handleFormSubmit}
          onFinishFailed={onFinishFailed}
          layout="vertical"
        >
          <Form.Item
            label={
              <span className="text-base dark:text-white">Tên bài đăng</span>
            }
            name="title"
            rules={[{ required: true, message: "Vui lòng nhập tên bài đăng!" }]}
          >
            <Input className="dark:hover:border-[#00c6ab] transition-colors duration-300" />
          </Form.Item>

          <Form.Item
            label={<span className="text-base dark:text-white">Image</span>}
            name="img"
            rules={[{ required: true, message: "Vui lòng nhập image!" }]}
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
            label={<span className="text-base dark:text-white">Mô tả</span>}
            name="description"
            rules={[{ required: true, message: "Vui lòng nhập giá mô tả!" }]}
          >
            <ReactQuill
              style={{ height: 500 }}
              theme="snow"
              value={value}
              onChange={setValue}
            />
          </Form.Item>
          <Form.Item
            style={{ marginTop: 60 }}
            label={
              <span className="text-base dark:text-white">Tên người đăng</span>
            }
          >
            <span className="dark:text-white">{user?.name}</span>
          </Form.Item>
          <Form.Item>
            <Button
              htmlType="submit"
              className="text-black transition-colors duration-300 dark:text-white"
              size="large"
              style={{ float: "right" }}
            >
              {isAddLoading ? (
                <AiOutlineLoading3Quarters className="animate-spin" />
              ) : (
                "Thêm Bài đăng  "
              )}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default Addnews;
