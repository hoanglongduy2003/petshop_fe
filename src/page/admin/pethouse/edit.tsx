import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, Input, InputNumber, message } from "antd";
import {
  useUpdatePetHouseMutation,
  usePetHouseByIdQuery,
} from "../../../services/pethouse";
import { TpetHouse } from "../../../schema/pethouse";
import { useEffect } from "react";
import "../../../assets/scss/admin/appointments.scss";

const confirm = () => {
  message.success("Cập nhật trạng thái thành công.");
};

const cancel = () => {
  message.error("Cập nhật trạng thái không thành công.");
};

const EditPetHouse = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const pethouse = usePetHouseByIdQuery(Number(id));
  const [form] = Form.useForm();

  const [updatePetHouseMutation, { reset }] = useUpdatePetHouseMutation();

  useEffect(() => {
    if (pethouse.data) {
      form.setFieldsValue({
        id: pethouse.data.id,
        name: pethouse.data.name,
      });
    }
  }, [pethouse.data, form]);

  const onFinish = async (values: { id: number; name: string }) => {
    try {
      const updatedPetHouse: TpetHouse = {
        id: Number(id),
        name: values.name,
      };
      await updatePetHouseMutation(updatedPetHouse).unwrap();
      confirm();

      reset();

      navigate("/admin/pethouse");
    } catch (error) {
      console.log(error);
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
      <h2 className="title-appoiment">Cập nhật phòng</h2>
      <Form
        style={{ marginTop: 20 }}
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
      >
        <Form.Item
          label="Trạng thái"
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập phòng" }]}
          initialValue={pethouse.data ? pethouse.data.name : ""}
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

export default EditPetHouse;
