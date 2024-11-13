import React from "react";
import type { FormInstance } from "antd";
import { Button, Form, Input, Space, message } from "antd";
import {
  useCreateStatusContactMutation,
  useGetAllstatusContactQuery,
} from "../../../services/status_contact";
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

const AddStatusContactAdmin: React.FC = () => {
  const [form] = Form.useForm();

  const [createStatusContact] = useCreateStatusContactMutation();

  const navigate = useNavigate();

  const { refetch } = useGetAllstatusContactQuery();

  const handleFormSubmit = async (values: any) => {
    try {
      await createStatusContact(values);
      message.success("Trạng thái đã được thêm thành công.");

      refetch();

      navigate("/admin/status_contact");
    } catch (error: any) {
      message.error("Lỗi khi thêm trạng thái: " + error.message);
    }
  };

  return (
    <>
      <h2 className="title-appoiment">Thêm trạng thái liên hệ</h2>
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

export default AddStatusContactAdmin;
