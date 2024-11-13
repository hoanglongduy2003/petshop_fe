import React from "react";
import type { FormInstance } from "antd";
import { Button, Form, Input, Space, message } from "antd";
import {
  useCreateCategoryMutation,
  useGetAllcategoryQuery,
} from "../../../services/category";
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

const AddCategory: React.FC = () => {
  const [form] = Form.useForm();

  const [createCategory] = useCreateCategoryMutation();

  const navigate = useNavigate();

  const { refetch } = useGetAllcategoryQuery();

  const handleFormSubmit = async (values: any) => {
    try {
      await createCategory(values);
      message.success("Thêm danh mục thành công");

      refetch();

      navigate("/admin/category");
    } catch (error: any) {
      message.error("Thêm danh mục thất bại : " + error.message);
    }
  };

  return (
    <>
      <h2 className="title-appoiment">Thêm danh mục</h2>
      <Form
        form={form}
        name="validateOnly"
        layout="vertical"
        autoComplete="off"
        onFinish={handleFormSubmit}
      >
        <Form.Item
          name="name"
          label="Tên danh mục"
          rules={[{ required: true }]}
        >
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

export default AddCategory;
