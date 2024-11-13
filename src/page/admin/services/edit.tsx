import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  InputNumber,
  TimePicker,
  Upload,
  UploadFile,
  message,
} from "antd";
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";
import "../../../assets/scss/page/servicesAdmin.scss";
import { TServicesRequest } from "../../../schema/services";
import "../../../assets/scss/admin/appointments.scss";

import {
  useServicesByIdQuery,
  useUpdateServicesMutation,
} from "../../../services/services";
import dayjs from "dayjs";
const EditService = () => {
  const [image, setImage] = useState<string | undefined>();
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: image,
    },
  ]);
  const [value, setValue] = useState("");
  const { id } = useParams<{ id: string }>();
  const servicesById = useServicesByIdQuery(Number(id));
  const [updateServices, { reset, isLoading: isAddLoading }] =
    useUpdateServicesMutation();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  useEffect(() => {
    setFileList([
      {
        uid: "-1",
        name: "image.png",
        status: "done",
        url: servicesById.data?.image,
      },
    ]);
    setImage(servicesById.data?.image);
    form.setFieldsValue({
      id: servicesById.data?.id,
      name: servicesById.data?.name,
      price: servicesById.data?.price,
      time: dayjs(servicesById.data?.time, "HH:mm:ss"),
      image: servicesById.data?.image,
      description: servicesById.data?.description,
    });
  }, [
    form,
    servicesById.data?.id,
    servicesById.data?.name,
    servicesById.data?.price,
    servicesById.data?.image,
    servicesById.data?.description,
    servicesById.data?.time,
  ]);

  const handleImageChange = ({ fileList: newFileList }: any) => {
    if (newFileList[0].response) {
      setImage(newFileList[0].response.secure_url);
    }
    setFileList(newFileList);
  };

  const onFinish = async (values: TServicesRequest) => {
    const { id, name, price, time, description } = values;
    const servicesData = {
      id,
      name,
      price,
      time: dayjs(time).format("HH:mm:00"),
      image: image,
      description,
    };
    try {
      await updateServices(servicesData).unwrap();
      message.success(" Update services successfully");
      reset();
      navigate("/admin/services");
    } catch (error) {
      message.error("Failed to update product");
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
      <div>
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
          <Form.Item label={<span className="">Ảnh dịch vụ</span>} name="img">
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
              style={{ float: "right", marginTop: 40 }}
              htmlType="submit"
              className="text-black transition-colors duration-300 dark:text-white"
              size="large"
            >
              {isAddLoading ? (
                <AiOutlineLoading3Quarters className="animate-spin" />
              ) : (
                "Câp nhập dịch vụ"
              )}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default EditService;
