import React from "react";
import type { FormInstance } from "antd";
import { Button, Form, Input, InputNumber, Space, message } from "antd";
import {
  useCreatePetHouseMutation,
  useGetAllpetHouseQuery,
} from "../../../services/pethouse";
import { useNavigate } from "react-router-dom";
import "../../../assets/scss/admin/appointments.scss";

import { TpetHouse } from "../../../schema/pethouse";

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

const AddPetHouse: React.FC = () => {
  const [form] = Form.useForm();
  const [createPethouse] = useCreatePetHouseMutation();
  const navigate = useNavigate();
  const { refetch } = useGetAllpetHouseQuery();

  const handleFormSubmit = async (values: {
    name: string;
    price: number;
    status_id: number;
  }) => {
    try {
      const updatedPethouse: TpetHouse = {
        name: values.name,
        status_id: values.status_id,
      };
      await createPethouse(updatedPethouse).unwrap();
      message.success("Thêm phòng thành công");
      refetch();
      navigate("/admin/pethouse");
    } catch (error) {
      message.error("Thêm phòng thất bại : " + error);
    }
  };

  return (
    <>
      <h2 className="title-appoiment">Thêm phòng</h2>

      <Form
        form={form}
        name="validateOnly"
        layout="vertical"
        autoComplete="off"
        onFinish={handleFormSubmit}
      >
        <Form.Item name="name" label="Tên phòng" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item>
          <Space style={{ float: "right" }}>
            <Button type="primary" htmlType="submit">
              Thêm phòng
            </Button>
            <Button htmlType="reset">Cài lại</Button>
          </Space>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddPetHouse;
