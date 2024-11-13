import React from "react";
import type { FormInstance } from "antd";
import { Button, Form, Input, Space, message } from "antd";
import { useCreateStaffMutation, useStaffQuery } from "../../../services/staff";
import { useNavigate } from "react-router-dom";
import "../../../assets/scss/admin/appointments.scss";

const SubmitButton = ({ form }: { form: FormInstance }) => {
  const [submittable, setSubmittable] = React.useState(false);

  const values = Form.useWatch([], form);

  React.useEffect(() => {
    form.validateFields({ validateOnly: true }).then(
      () => {
        setSubmittable(true);
      },
      () => {
        setSubmittable(false);
      }
    );
  }, [form, values]);

  return (
    <Button type="primary" htmlType="submit" disabled={!submittable}>
      Submit
    </Button>
  );
};

const Add: React.FC = () => {
  const [form] = Form.useForm();

  const [createStaff] = useCreateStaffMutation();

  const navigate = useNavigate();

  const { refetch } = useStaffQuery();

  const handleFormSubmit = async (values: any) => {
    try {
      await createStaff(values);
      message.success("Nhân viên đã được thêm thành công.");
      refetch();
      navigate("/admin/staff");
    } catch (error: any) {
      message.error("Lỗi khi thêm nhân viên: " + error.message);
    }
  };

  return (
    <Form
      form={form}
      name="validateOnly"
      layout="vertical"
      autoComplete="off"
      onFinish={handleFormSubmit}
    >
      <Form.Item name="name" label="Tên nhân viên" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item>
        <Space>
          <SubmitButton form={form} />
          <Button htmlType="reset">Reset</Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default Add;
