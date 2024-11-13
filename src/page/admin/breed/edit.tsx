import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, Input, Select, message } from "antd";
import {
  useUpdateBreedMutation,
  useGetBreedByIdQuery,
} from "../../../services/breed";
import { TBreed } from "../../../schema/breed";
import { useGetAllspeciesQuery } from "../../../services/species";
import { Tspecies } from "../../../schema/species";
import { useEffect } from "react";import "../../../assets/scss/admin/appointments.scss";


const confirm = () => {
  message.success("Cập nhật breed thành công.");
};

const cancel = () => {
  message.error("Cập nhật breed không thành công.");
};

const EditBreed = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const breed = useGetBreedByIdQuery(Number(id));
  const species = useGetAllspeciesQuery();
  const [form] = Form.useForm();

  const [UpdateBreedMutation, { reset }] = useUpdateBreedMutation();
  useEffect(() => {
    if (breed.data) {
      form.setFieldsValue({
        name: breed.data.name,
      });
    }
  }, [breed.data, form]);
  const onFinish = async (values: { name: string; species_id: string }) => {
    try {
      const updatedBreed: TBreed = {
        id: Number(id),
        name: values.name,
        species_id: values.species_id || breed.data?.species_id,
      };

      await UpdateBreedMutation(updatedBreed).unwrap();
      confirm();
      reset();
      navigate("/admin/breed");
    } catch (error) {
      cancel();
      console.error("Error updating breed:", error);
      reset();
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <h2
        className="title-appoiment"
      >
        Cập nhật giống thú cưng
      </h2>
      <Form
        form={form}
        name="updateUserRoleForm"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập tên" }]}
          initialValue={breed.data ? breed.data.name : ""}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Species" name="species_id">
          {breed.data && breed.data?.species_id && (
            <Select defaultValue={breed.data?.species_id}>
              {species.data?.map((item: Tspecies) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          )}
        </Form.Item>
        <Form.Item>
          <Button style={{ float: "right" }} type="primary" htmlType="submit">
            Cập nhật
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default EditBreed;
