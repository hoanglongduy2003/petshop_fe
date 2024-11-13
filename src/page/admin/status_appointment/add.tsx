import React from "react";
import type { FormInstance } from "antd";
import { Button, Form, Input, Space, message } from "antd";
import {
  useCreateStatusMutation,
  useStatusQuery,
} from "../../../services/status_appointment";
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

const AddStatusAdmin: React.FC = () => {
  const [form] = Form.useForm();

  const [createStatus] = useCreateStatusMutation();

  const navigate = useNavigate();

  const { refetch } = useStatusQuery();

  const handleFormSubmit = async (values: any) => {
    try {
      await createStatus(values);
      message.success("Trạng thái đã được thêm thành công.");

      refetch();

      navigate("/admin/status_appointment");
    } catch (error: any) {
      message.error("Lỗi khi thêm trạng thái: " + error.message);
    }
  };

  return (
    <>
      <h2 className="title-appoiment">Thêm trạng thái xác nhận</h2>
      <Form
        form={form}
        name="validateOnly"
        layout="vertical"
        autoComplete="off"
        onFinish={handleFormSubmit}
      >
        <Form.Item name="name" label="Trạng thái" rules={[{ required: true }]}>
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

export default AddStatusAdmin;
