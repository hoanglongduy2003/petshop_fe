import React from "react";
import type { FormInstance } from "antd";
import { Button, Form, Input, Space, message } from "antd";
import {
  useCreateMenuTypeMutation,
  useMenuTypeQuery,
} from "../../../services/menuType";
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

const AddMenuTypeAdmin: React.FC = () => {
  const [form] = Form.useForm();

  const [createMenuType] = useCreateMenuTypeMutation();

  const navigate = useNavigate();

  const { refetch } = useMenuTypeQuery();

  const handleFormSubmit = async (values: any) => {
    try {
      await createMenuType(values);
      message.success("Kiểu menu đã được thêm thành công.");

      refetch();

      navigate("/admin/menutype");
    } catch (error: any) {
      message.error("Lỗi khi thêm kiểu menu: " + error.message);
    }
  };

  return (
    <>
      <h2 className="title-appoiment">Thêm kiểu menu</h2>
      <Form
        form={form}
        name="validateOnly"
        layout="vertical"
        autoComplete="off"
        onFinish={handleFormSubmit}
      >
        <Form.Item name="name" label="Kiểu Menu" rules={[{ required: true }]}>
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

export default AddMenuTypeAdmin;
