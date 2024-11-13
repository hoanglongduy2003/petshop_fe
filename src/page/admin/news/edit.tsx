import { Button, Form, Input, message, Upload } from "antd";
import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";
import { TNews } from "../../../schema/news";
import {
  useUpdateNewsMutation,
  useNewsByIdQuery,
} from "../../../services/news";
import dayjs from "dayjs";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { useGetUserQuery } from "../../../services/user";
import "../../../assets/scss/admin/appointments.scss";

const confirm = () => {
  message.success("Cập nhật tin tức thành công.");
};

const cancel = () => {
  message.error("Cập nhật tin tức không thành công.");
};

const EditNews = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const news = useNewsByIdQuery(Number(id));
  const [form] = Form.useForm();
  const [updateNewsMutation, { reset }] = useUpdateNewsMutation();
  const [value, setValue] = useState("");
  const { data: user } = useGetUserQuery();
  const [image, setImage] = useState<string | null>(news.data?.img || null);
  const [fileList, setFileList] = useState<any[]>([]);

  useEffect(() => {
    if (news.data) {
      form.setFieldsValue({
        title: news.data.title,
        img: news.data.img,
        description: news.data.description,
      });

      setFileList([
        {
          uid: "-1",
          name: "image.png",
          status: "done",
          url: news.data.img,
        },
      ]);
    }
  }, [news.data, form]);

  const handleImageChange = ({ fileList: newFileList }: any) => {
    if (newFileList.length > 0 && newFileList[0].response) {
      setImage(newFileList[0].response.url);
    } else {
      setImage(null);
    }
    setFileList(newFileList);
  };

  const handleFormSubmit = async (values: TNews) => {
    try {
      const dateNews: TNews = {
        id: Number(id),
        title: values.title,
        img: image ?? "",
        description: values.description,
        created_at: dayjs().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
        user_id: user?.id || 0,
      };
      if (!image && news.data && news.data.img) {
        dateNews.img = news.data.img;
      }
      await updateNewsMutation(dateNews).unwrap();

      confirm();

      reset();

      navigate("/admin/news");
    } catch (error) {
      cancel();
      console.error("Error updating user role:", error);
      reset();
    }
  };

  const onFinishFailed = async (values: any) => {
    console.log("Failed:", values);
  };

  const uploadButton = (
    <div>
      {fileList.length === 0 ? <PlusOutlined /> : <LoadingOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <>
      <h2
        className="title-appoiment"
      >
        Cập nhật tin tức
      </h2>
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
            label={<span>Tên bài đăng</span>}
            name="title"
            rules={[{ required: true, message: "Vui lòng nhập tên bài đăng!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={<span>Image</span>}
            name="img"
            rules={[{ required: true, message: "Vui lòng nhập image!" }]}
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
              showUploadList={true}
              className="ant-upload-wrapper ant-upload-select"
              fileList={fileList}
              onChange={handleImageChange}
            >
              {fileList.length > 0 ? (
                <img
                  src={fileList[0].url}
                  alt="avatar"
                  style={{ width: "100%" }}
                />
              ) : (
                uploadButton
              )}
            </Upload>
          </Form.Item>
          <Form.Item
            label={<span>Mô tả</span>}
            name="description"
            rules={[{ required: true, message: "Vui lòng nhập mô tả!" }]}
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
            label={<span>Tên người đăng</span>}
          >
            <span>{user?.name}</span>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ float: "right" }}>
              Cập nhật
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default EditNews;
