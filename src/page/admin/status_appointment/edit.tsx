import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, Input, message } from "antd";
import {
  useUpdateStatusMutation,
  useGetStatusByIdQuery,
} from "../../../services/status_appointment";
import { TStatus } from "../../../schema/status";
import { useEffect } from "react";import "../../../assets/scss/admin/appointments.scss";


const confirm = () => {
  message.success("Cập nhật trạng thái thành công.");
};

const cancel = () => {
  message.error("Cập nhật trạng thái không thành công.");
};

const EditStatus = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const status = useGetStatusByIdQuery(Number(id));
  const [form] = Form.useForm();

  const [updateStatusMutation, { reset }] = useUpdateStatusMutation();

  useEffect(() => {
    if (status.data) {
      form.setFieldsValue({
        name: status.data.name,
      });
    }
  }, [status.data, form]);

  const onFinish = async (values: { name: string }) => {
    try {
      const updatedStatus: TStatus = {
        id: Number(id),
        name: values.name,
      };
      await updateStatusMutation(updatedStatus).unwrap();
      confirm();

      reset();

      navigate("/admin/status_appointment");
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
        Cập nhật trạng thái đặt lịch
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
          initialValue={status.data ? status.data.name : ""}
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

export default EditStatus;
