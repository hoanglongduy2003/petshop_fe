/* eslint-disable react-hooks/exhaustive-deps */
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Upload, UploadFile, message } from "antd";
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";
import { TBanner } from "../../../schema/banner";
import "../../../assets/scss/admin/appointments.scss";

import {
  useGetBannerByIdQuery,
  useUpdateBannerMutation,
} from "../../../services/banner";
const EditBanner = () => {
  const { id } = useParams<{ id: string }>();
  const bannerById = useGetBannerByIdQuery(Number(id));
  const [img, setImage] = useState<string | undefined>();
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: "-1",
      name: "img.png",
      status: "done",
      url: img,
    },
  ]);

  const [updateBanner, { reset, isLoading: isAddLoading }] =
    useUpdateBannerMutation();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  useEffect(() => {
    setFileList([
      {
        uid: "-1",
        name: "img.png",
        status: "done",
        url: bannerById.data?.img,
      },
    ]);
    setImage(bannerById.data?.img);
    form.setFieldsValue({
      id: bannerById.data?.id,
      img: bannerById.data?.img,
      title: bannerById.data?.title,
      slogan: bannerById.data?.slogan,
      link: bannerById.data?.link,
    });
  }, [
    form,
    bannerById.data?.id,
    bannerById.data?.img,
    bannerById.data?.title,
    bannerById.data?.slogan,
    bannerById.data?.link,
  ]);

  const handleImageChange = ({ fileList: newFileList }: any) => {
    if (newFileList[0].response) {
      setImage(newFileList[0].response.secure_url);
    }
    setFileList(newFileList);
  };

  const onFinish = async (values: TBanner) => {
    const { id, title, slogan, link } = values;
    const bannerData = {
      id,
      img: img,
      title,
      slogan,
      link,
    };
    try {
      await updateBanner(bannerData).unwrap();
      message.success("Cập nhật thành công!");
      reset();
      navigate("/admin/banner");
    } catch (error) {
      message.error("Cập nhật thất bại!");
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
      <h2 className="title-appoiment">Cập nhật banner</h2>
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

        <Form.Item label={<span className="">Ảnh banner</span>} name="img">
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
          label={<span className="">Tiêu đề</span>}
          name="title"
          rules={[{ required: true, message: "Vui lòng nhập tiêu đề banner!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={<span className="">Slogan</span>}
          name="slogan"
          rules={[{ required: true, message: "Vui lòng nhập slogan banner!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={<span className="">Link</span>}
          name="link"
          rules={[{ required: true, message: "Vui lòng nhập link banner!" }]}
        >
          <Input disabled />
        </Form.Item>

        <Form.Item>
          <Button
            style={{ float: "right" }}
            type="primary"
            htmlType="submit"
            size="large"
          >
            {isAddLoading ? (
              <AiOutlineLoading3Quarters className="animate-spin" />
            ) : (
              "Sửa Banner"
            )}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default EditBanner;
