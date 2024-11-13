import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Upload,
  message,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { FC, useState } from "react";
import "../../assets/scss/page/appointment.scss";
import { Tspecies } from "../../schema/species";
import { useBreedQuery } from "../../services/breed";
import { useCreatePetsMutation } from "../../services/pets";
import { useGetAllspeciesQuery } from "../../services/species";
import { TBreed } from "../../schema/breed";
type TModalAddPet = {
  idUser: number;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ModalAddPetCLient: FC<TModalAddPet> = ({
  isModalOpen,
  setIsModalOpen,
  idUser,
}) => {
  const [openBreed, setOpenBreed] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [createSPets] = useCreatePetsMutation();
  const [idSpecies, setIdSpecies] = useState<number>(0);
  const [form] = Form.useForm();
  const { data: species } = useGetAllspeciesQuery();
  const { data: breed } = useBreedQuery(idSpecies);

  const onFinish = async (values: any) => {
    try {
      const petNew = {
        img: values.img.file.response.secure_url,
        name: values.name,
        age: values.age,
        gender: values.gender,
        user_id: idUser,
        species_id: values.species_id,
        breed_id: values.breed_id,
        health_condition: values.health_condition,
      };
      await createSPets(petNew).unwrap();
      message.success("Thêm thú cưng thành công");
      setIsModalOpen(false);
    } catch (error) {
      message.error("Đổi mât khẩu thất bại");
      setIsModalOpen(false);
    }
  };

  const onFinishFailed = async (values: any) => {
    console.log("Failed:", values);
  };

  const onChangeSpecies = (value: number) => {
    setIdSpecies(value);
    setOpenBreed(true);
    form.resetFields(["breed_id"]);
  };

  const handleImageChange = (info: any) => {
    if (info.file.status === "uploading") {
      setLoading(true);
    } else if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
      setLoading(false);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
      setLoading(false);
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Tải ảnh</div>
    </div>
  );
  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };
  return (
    <>
      <Modal
        className="modal-password"
        title={<h1 style={{ marginBottom: 20 }}>Cập nhật mật khẩu</h1>}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          name="validateOnly"
          layout="vertical"
          autoComplete="off"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name="name"
            label="Tên Thú cưng"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="img"
            style={{ height: "130px" }}
            label="Ảnh"
            rules={[{ required: true }]}
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
            >
              {uploadButton}
            </Upload>
          </Form.Item>
          <Form.Item name="age" label="Tuổi" rules={[{ required: true }]}>
            <InputNumber min={0} />
          </Form.Item>

          <Form.Item
            name="gender"
            label="Giới tính"
            rules={[{ required: true }]}
          >
            <Select>
              <Select.Option key={1} value={"Đực"}>
                Đực
              </Select.Option>
              <Select.Option key={2} value={"Cái"}>
                Cái
              </Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="species_id"
            label="Giống loài"
            rules={[{ required: true }]}
          >
            <Select onChange={onChangeSpecies}>
              {species?.map((item: Tspecies) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="breed_id" label="Giống" rules={[{ required: true }]}>
            <Select disabled={!openBreed}>
              {breed?.map((item: TBreed) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="health_condition" label="Tình trạng sức khỏe">
            <TextArea rows={4} />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form>
      </Modal>
    </>
  );
};
export default ModalAddPetCLient;
