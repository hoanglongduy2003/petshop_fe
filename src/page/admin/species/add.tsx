import React from "react";
import type { FormInstance } from "antd";
import { Button, Form, Input, Space, message } from "antd";
import {
  useCreateSpeciesMutation,
  useGetAllspeciesQuery,
} from "../../../services/species";
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

const AddSpecies: React.FC = () => {
  const [form] = Form.useForm();

  const [createSPecies] = useCreateSpeciesMutation();

  const navigate = useNavigate();

  const { refetch } = useGetAllspeciesQuery();

  const handleFormSubmit = async (values: any) => {
    try {
      await createSPecies(values);
      message.success("Thêm loại thành công");

      refetch();

      navigate("/admin/species");
    } catch (error: any) {
      message.error("Thêm loại thất bại : " + error.message);
    }
  };

  return (
    <>
      <h2 className="title-appoiment">Thêm loại thú cưng</h2>
      <Form
        form={form}
        name="validateOnly"
        layout="vertical"
        autoComplete="off"
        onFinish={handleFormSubmit}
      >
        <Form.Item name="name" label="Tên Loại" rules={[{ required: true }]}>
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

export default AddSpecies;
