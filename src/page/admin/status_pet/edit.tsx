import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, Input, message } from "antd";
import {
  useUpdateStatuspetMutation,
  useGetStatusPetByIdQuery,
} from "../../../services/status_pet";
import { TStatusPet } from "../../../schema/status_pet";
import { useEffect } from "react";
import "../../../assets/scss/admin/appointments.scss";

const confirm = () => {
  message.success("Cập nhật trạng thái thành công.");
};

const cancel = () => {
  message.error("Cập nhật trạng thái không thành công.");
};

const EditStatusPet = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const status_pet = useGetStatusPetByIdQuery(Number(id));
  const [form] = Form.useForm();

  const [updateStatusMutation, { reset }] = useUpdateStatuspetMutation();

  useEffect(() => {
    if (status_pet.data) {
      form.setFieldsValue({
        name: status_pet.data.name,
      });
    }
  }, [status_pet.data, form]);

  const onFinish = async (values: { name: string }) => {
    try {
      const updatedStatus: TStatusPet = {
        id: Number(id),
        name: values.name,
      };
      await updateStatusMutation(updatedStatus).unwrap();
      confirm();

      reset();

      navigate("/admin/status_pet");
    } catch (error) {
      cancel();
      console.error("Error updating stauts:", error);
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
        Cập nhập trạng thái thú cưng
      </h2>
      <Form
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
      >
        <Form.Item
          label="Trạng thái"
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập trạng thái" }]}
          initialValue={status_pet.data ? status_pet.data.name : ""}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ float: "right" }}>
            Cập nhật
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default EditStatusPet;
