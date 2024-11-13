/* eslint-disable react-hooks/exhaustive-deps */
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Upload, UploadFile, message } from "antd";
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";
import { TWebsiteInformation } from "../../../schema/websiteInformation";
import {
  useGetWebsiteInformationByIdQuery,
  useUpdateWebsiteInformationMutation,
} from "../../../services/websiteInformation";
import "../../../assets/scss/admin/appointments.scss";

const EditWebsiteInformationAdmin = () => {
  const { id } = useParams<{ id: string }>();
  const websiteInformationById = useGetWebsiteInformationByIdQuery(Number(id));
  const [logo, setLogo] = useState<string | undefined>();

  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: "-1",
      name: "logo.png",
      status: "done",
      url: logo,
    },
  ]);

  const [updateWebsiteInformation, { reset, isLoading: isAddLoading }] =
    useUpdateWebsiteInformationMutation();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  useEffect(() => {
    setFileList([
      {
        uid: "-1",
        name: "logo.png",
        status: "done",
        url: websiteInformationById.data?.logo,
      },
    ]);

    setLogo(websiteInformationById.data?.logo);

    form.setFieldsValue({
      id: websiteInformationById.data?.id,
      logo: websiteInformationById.data?.logo,
      email: websiteInformationById.data?.email,
      phone: websiteInformationById.data?.phone,
      address: websiteInformationById.data?.address,
      fb: websiteInformationById.data?.fb,
      zalo: websiteInformationById.data?.zalo,
    });
  }, [
    form,
    websiteInformationById.data?.id,
    websiteInformationById.data?.logo,
    websiteInformationById.data?.email,
    websiteInformationById.data?.phone,
    websiteInformationById.data?.address,
    websiteInformationById.data?.fb,
    websiteInformationById.data?.zalo,
  ]);

  const handleImageChange = ({ fileList: newFileList }: any) => {
    if (newFileList[0].response) {
      setLogo(newFileList[0].response.secure_url);
    }
    setFileList(newFileList);
  };

  const onFinish = async (values: TWebsiteInformation) => {
    const { id, email, phone, address, fb, zalo } = values;
    const websiteInformationData = {
      id,
      logo: logo,
      email,
      phone,
      address,
      fb,
      zalo,
    };
    try {
      await updateWebsiteInformation(websiteInformationData).unwrap();
      message.success("Cập nhật thông tin PetCare thành công!");
      reset();
      navigate("/admin/websiteinformation");
    } catch (error) {
      message.error("Failed to update website information");
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
      <h2 className="title-appoiment">Cập nhật thông tin website</h2>
      <Form
        form={form}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
      >
        <Form.Item
          label={<span className="">Id</span>}
          name="id"
          rules={[{ required: true, message: "Vui lòng nhập!" }]}
        >
          <Input disabled />
        </Form.Item>

        <Form.Item label={<span className="">Logo Pet Care</span>} name="logo">
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
          label={<span className="">Email</span>}
          name="email"
          rules={[{ required: true, message: "Vui lòng nhập tiêu đề email!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={<span className="">Phone</span>}
          name="phone"
          rules={[{ required: true, message: "Vui lòng nhập số điện thoại!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={<span className="">Địa chỉ</span>}
          name="address"
          rules={[{ required: true, message: "Vui lòng nhập địa chỉ!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={<span className="">Link Facebook</span>}
          name="fb"
          rules={[{ required: true, message: "Vui lòng nhập link facebook!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={<span className="">Link Zalo</span>}
          name="zalo"
          rules={[{ required: true, message: "Vui lòng nhập link zalo!" }]}
        >
          <Input />
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
              "Sửa WebsiteInformation"
            )}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default EditWebsiteInformationAdmin;
