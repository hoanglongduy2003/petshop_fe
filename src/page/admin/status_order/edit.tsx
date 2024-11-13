import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, Input, message } from "antd";
import {
  useUpdateStatusOrderMutation,
  useGetStatusOrderByIdQuery,
} from "../../../services/status_order";
import { TStatusPet } from "../../../schema/status_pet";
import { useEffect } from "react";import "../../../assets/scss/admin/appointments.scss";


const confirm = () => {
  message.success("Cập nhật trạng thái thành công.");
};

const cancel = () => {
  message.error("Cập nhật trạng thái không thành công.");
};

const EditStatusOrder = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const status_order = useGetStatusOrderByIdQuery(Number(id));
  const [form] = Form.useForm();

  const [updateStatusMutation, { reset }] = useUpdateStatusOrderMutation();

  useEffect(() => {
    if (status_order.data) {
      form.setFieldsValue({
        name: status_order.data.name,
      });
    }
  }, [status_order.data, form]);

  const onFinish = async (values: { name: string }) => {
    try {
      const updatedStatus: TStatusPet = {
        id: Number(id),
        name: values.name,
      };
      await updateStatusMutation(updatedStatus).unwrap();
      confirm();

      reset();

      navigate("/admin/status_order");
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
        Cập nhật trạng thái đặt hàng
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
          initialValue={status_order.data ? status_order.data.name : ""}
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

export default EditStatusOrder;
