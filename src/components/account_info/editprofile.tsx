import React, { useState, useEffect } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Modal,
  Input,
  UploadFile,
  Form,
  message,
  Button,
  Upload,
  Radio,
} from "antd";
import { TAccountEdit } from "../../schema/accountSchema";
import { useUpdateUserMutation } from "../../services/user";

interface EditProfileProps {
  user: TAccountEdit;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditProfile: React.FC<EditProfileProps> = ({
  isModalOpen,
  setIsModalOpen,
  user,
}) => {
  const [updateProfile, { isLoading: isAddLoading }] = useUpdateUserMutation();
  const [form] = Form.useForm();
  const [image, setImage] = useState<string | undefined>();
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: image,
    },
  ]);
  useEffect(() => {
    setImage(user.img);
    setFileList([
      {
        uid: "-1",
        name: "image.png",
        status: "done",
        url: user.img,
      },
    ]);
    form.setFieldsValue({
      id: user.id,
      img: user.img,
      name: user.name,
      email: user.email,
      phone: user.phone,
      gender: user.gender,
    });
  }, [form, user.id, user.img, user.name, user.email, user.phone, user.gender]);
  const handleImageChange = ({ fileList: newFileList }: any) => {
    if (newFileList[0].response) {
      setImage(newFileList[0].response.secure_url);
    }
    setFileList(newFileList);
  };
  const uploadButton = (
    <div>
      {isAddLoading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const onFinish = async (values: TAccountEdit) => {
    try {
      const dataUpdate = {
        id: user.id,
        img: image,
        email: values.email,
        name: values.name,
        phone: values.phone,
        gender: values.gender,
      };
      await updateProfile(dataUpdate).unwrap();
      message.success("thay đổi dữ liệu thành công");
    } catch (error: any) {
      message.error("cập nhập thất bại ");
    }
  };
  const onFinishFailed = async (values: any) => {
    console.log("Failed:", values);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Modal
        className=""
        title="Sửa thông tin người dùng"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
        >
          <Form.Item
            label={<span className="">Ảnh dại diện</span>}
            name="img"
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
              showUploadList={true}
              className="ant-upload-wrapper ant-upload-select"
              onChange={handleImageChange}
              fileList={fileList}
            >
              {uploadButton}
            </Upload>
          </Form.Item>
          <Form.Item
            label={<span className="">Email</span>}
            name="email"
            rules={[{ required: true, message: "Vui lòng nhập email!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={<span className="">Số điện thoại </span>}
            name="phone"
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại!" },
              {
                pattern: /^0[0-9]{9}$/, // Bắt đầu bằng số 0 và có đúng 10 ký tự
                message:
                  "Số điện thoại không hợp lệ! Bắt đầu bằng số 0 và có đúng 10 ký tự.",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label={<span className="">Tên người dùng</span>}
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={<span className="">Giới tính</span>}
            name="gender"
            rules={[{ required: true, message: "Vui lòng chọn giới tính!" }]}
          >
            <Radio.Group>
              <Radio value={1}>Nam</Radio>
              <Radio value={2}>Nữ</Radio>
              <Radio value={3}>giới tính khác</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 6, span: 12 }}>
            <Button type="primary" htmlType="submit">
              Cập nhật thông tin
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default EditProfile;
