import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Select,
  Upload,
  message,
  Button,
  InputNumber,
  UploadFile,
} from "antd";
import { useGetPetByIdQuery, useUpdatePetsMutation } from "../../services/pets";
import { TBreed } from "../../schema/breed";
import { Tspecies } from "../../schema/species";
import { useGetAllspeciesQuery } from "../../services/species";
import { useBreedQuery } from "../../services/breed";
import { useParams } from "react-router-dom";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import { useGetUserQuery } from "../../services/user";
import { PetsRequest, TStatusPet } from "../../schema/pets";
import { useGetAllstatusPetQuery } from "../../services/status_pet";

const EditPetPage = () => {
  const [img, setImage] = useState<string | undefined>();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [form] = Form.useForm();
  const { id } = useParams<{ id: string }>();
  const pet = useGetPetByIdQuery(Number(id));
  const [speciesId, setSpeciesId] = useState<number | undefined>(
    pet.data?.species_id
  );
  const { data: species } = useGetAllspeciesQuery();
  const { data: breed } = useBreedQuery(Number(speciesId));
  const { data: user } = useGetUserQuery();
  const { data: status_id } = useGetAllstatusPetQuery();

  const [updatePets, { isLoading: isUpdateLoading }] = useUpdatePetsMutation();

  useEffect(() => {
    if (pet && pet.data) {
      setFileList([
        {
          uid: "-1",
          name: "image.png",
          status: "done",
          url: pet.data?.img,
        },
      ]);
      setImage(pet.data?.img);

      form.setFieldsValue({
        id: pet.data?.id,
        name: pet.data?.name,
        age: pet.data?.age,
        img: pet.data?.img,
        gender: pet.data?.gender,
        species_id: pet.data?.species_id,
        breed_id: pet.data?.breed_id,
        status_id: pet.data?.status_id,
        health_condition: pet.data?.health_condition,
      });
      if (pet.data.species_id) {
        setSpeciesId(pet.data.species_id);
      }
    }
  }, [
    form,
    pet.data?.id,
    pet.data?.name,
    pet.data?.age,
    pet.data?.img,
    pet.data?.gender,
    pet.data?.species_id,
    pet.data?.breed_id,
    pet.data?.status_id,
    pet.data?.health_condition,
    pet,
  ]);

  const handleImageChange = ({ fileList: newFileList }: any) => {
    if (newFileList.length > 0) {
      if (newFileList[0].response) {
        setImage(newFileList[0].response.secure_url);
      }
    }

    setFileList(newFileList);
  };

  const onFinish = async (values: PetsRequest) => {
    const { name, age, gender } = values;

    const petData = {
      id: values.id,
      img: img,
      name,
      age,
      gender,
      user_id: user?.id,
      species_id: speciesId,
      breed_id: values.breed_id,
      status_id: values.status_id,
      health_condition: values.health_condition,
    };

    try {
      await updatePets(petData).unwrap();
      message.success("Update pet successfully");
      form.resetFields();
    } catch (error) {
      message.error("Failed to update pet");
    }
  };
  const onChangeSpecies = (value: number) => {
    setSpeciesId(value);
    form.resetFields(["breed_id"]);
  };
  const onFinishFailed = async (values: any) => {
    console.log("Failed:", values);
  };
  const uploadButton = (
    <div>
      {isUpdateLoading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <>
      <h1>Cập nhật Thú cưng</h1>
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
            name="id"
            rules={[{ required: true, message: "!" }]}
          ></Form.Item>
          <Form.Item
            name="name"
            label="Tên Thú cưng"
            rules={[{ required: true, message: "Vui lòng nhập tên thú cưng!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={<span className="">Ảnh thú cưng</span>}
            name="img"
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
              fileList={fileList}
            >
              {uploadButton}
            </Upload>
          </Form.Item>
          <Form.Item
            name="age"
            label="Tuổi"
            rules={[
              { required: true, message: "Vui lòng nhập tuổi thú cưng!" },
            ]}
          >
            <InputNumber min={0} />
          </Form.Item>
          <Form.Item
            name="gender"
            label="Giới tính"
            rules={[{ required: true, message: "Vui lòng chọn giới tính!" }]}
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
            rules={[{ required: true, message: "Vui lòng chọn giống loài!" }]}
          >
            <Select onChange={onChangeSpecies} value={speciesId}>
              {species?.map((item: Tspecies) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="breed_id"
            label="Giống"
            rules={[{ required: true, message: "Vui lòng chọn giống!" }]}
          >
            <Select>
              {breed?.map((item: TBreed) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="status_id"
            label="thể trạng"
            rules={[{ required: true, message: "Vui lòng chọn thể trạng!" }]}
          >
            <Select>
              {status_id?.map((item: TStatusPet) => (
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
      </div>
    </>
  );
};

export default EditPetPage;
