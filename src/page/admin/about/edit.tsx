import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, message, Upload } from "antd";
import {
  useUpdateAboutMutation,
  useGetAboutByIdQuery,
} from "../../../services/about";
import { TAbout } from "../../../schema/about";
import { useEffect, useState } from "react";
import "../../../assets/scss/admin/appointments.scss";

import ReactQuill from "react-quill";

const confirm = () => {
  message.success("Cập nhật trạng thái thành công.");
};

const cancel = () => {
  message.error("Cập nhật trạng thái không thành công.");
};

const EditAbout = () => {
  const [value, setValue] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const about = useGetAboutByIdQuery(Number(id));
  const [form] = Form.useForm();

  const [updateAboutMutation, { reset }] = useUpdateAboutMutation();

  useEffect(() => {
    if (about.data) {
      form.setFieldsValue({
        image: about.data.image,
        description: about.data.description,
      });

      // Kiểm tra nếu about.data.image là undefined thì gán null cho image
      setImage(about.data.image || null);
    }
  }, [about.data, form]);

  const handleImageChange = (info: any) => {
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
      setImage(info.file.response.secure_url);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const onFinish = async (values: { image: string; description: string }) => {
    try {
      const updatedAbout: TAbout = {
        id: Number(id),
        image: image || values.image,
        description: values.description,
      };
      await updateAboutMutation(updatedAbout).unwrap();
      confirm();

      reset();

      navigate("/admin/about");
    } catch (error) {
      cancel();
      console.error("Error updating About:", error);
      reset();
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const uploadButton = (
    <div>
      {image ? (
        <img src={image} alt="avatar" style={{ width: "100%" }} />
      ) : null}
    </div>
  );

  return (
    <>
      <h2 className="title-appoiment">Cập nhật about</h2>
      <div>
        <Form
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
        >
          <Form.Item
            label="Image"
            name="image"
            rules={[{ required: true, message: "Vui lòng nhập About" }]}
            initialValue={about.data ? about.data.image : ""}
          >
            <Upload
              name="file"
              action="https://api.cloudinary.com/v1_1/dksgvucji/image/upload"
              data={{
                upload_preset: "wh3rdke8",
                cloud_name: "dksgvucji",
              }}
              listType="picture-card"
              showUploadList={false}
              onChange={handleImageChange}
            >
              {uploadButton}
            </Upload>
          </Form.Item>

          <Form.Item
            label={<span>Mô tả</span>}
            name="description"
            rules={[{ required: true, message: "Vui lòng nhập giá mô tả!" }]}
            initialValue={about.data ? about.data.description : ""}
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
              type="primary"
              htmlType="submit"
              style={{ float: "right", marginTop: "2rem" }}
            >
              Cập nhật
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default EditAbout;
