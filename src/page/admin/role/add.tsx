import React from "react";
import type { FormInstance } from "antd";
import { Button, Form, Input, Space, message } from "antd";
import { useCreateRoleMutation, useRoleQuery } from "../../../services/role";
import "../../../assets/scss/admin/appointments.scss";

import { useNavigate } from "react-router-dom";

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

const AddRoleAdmin: React.FC = () => {
  const [form] = Form.useForm();

  const [createRole] = useCreateRoleMutation();

  const navigate = useNavigate();

  const { refetch } = useRoleQuery();

  const handleFormSubmit = async (values: any) => {
    try {
      await createRole(values);
      message.success("Vai trò đã được thêm thành công.");

      refetch();

      navigate("/admin/role");
    } catch (error: any) {
      message.error("Lỗi khi thêm vai trò: " + error.message);
    }
  };

  return (
    <>
      <h2 className="title-appoiment">Thêm vai trò</h2>
      <Form
        form={form}
        name="validateOnly"
        layout="vertical"
        autoComplete="off"
        onFinish={handleFormSubmit}
      >
        <Form.Item name="name" label="Vai trò" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item>
          <Space style={{ float: "right" }}>
            <SubmitButton form={form} />
            <Button htmlType="reset">Reset</Button>
          </Space>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddRoleAdmin;
