import {
  Button,
  Form,
  FormInstance,
  Input,
  Select,
  Space,
  message,
} from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { TBreedAdd } from "../../../schema/breed";
import { Tspecies } from "../../../schema/species";
import { useCreateBreedMutation } from "../../../services/breed";
import { useGetAllspeciesQuery } from "../../../services/species";
import "../../../assets/scss/admin/appointments.scss";

const SubmitButton = ({ form }: { form: FormInstance }) => {
  const [submit, setSubmit] = React.useState(false);

  const values = Form.useWatch([], form);

  React.useEffect(() => {
    form.validateFields({ validateOnly: true }).then(
      () => {
        setSubmit(true);
      },
      () => {
        setSubmit(false);
      }
    );
  }, [form, values]);

  return (
    <Button type="primary" htmlType="submit" disabled={!submit}>
      Submit
    </Button>
  );
};

const AddBreed: React.FC = () => {
  const [form] = Form.useForm();
  const species = useGetAllspeciesQuery();
  const [createBreed, { reset }] = useCreateBreedMutation();
  const navigate = useNavigate();

  const confirm = () => {
    message.success("Thêm thành công.");
  };

  const cancel = () => {
    message.error("Thêm Thất Bại,");
  };

  const handleFormSubmit = async (values: {
    name: string;
    species_id: string;
  }) => {
    try {
      const updatedBreed: TBreedAdd = {
        name: values.name,
        species_id: values.species_id,
      };
      await createBreed(updatedBreed).unwrap();
      confirm();
      reset();
      navigate("/admin/breed");
    } catch (error) {
      cancel();
      console.error("Error updating:", error);
      reset();
    }
  };

  return (
    <>
      <h2 className="title-appoiment">Thêm giống thú cưng</h2>
      <h2 style={{ marginBottom: 10 }}>Thêm giống</h2>
      <Form
        form={form}
        name="validateOnly"
        layout="vertical"
        autoComplete="off"
        onFinish={handleFormSubmit}
      >
        <Form.Item
          name="species_id"
          label="Species"
          rules={[{ required: true, message: "Vui lòng chọn giống!" }]}
        >
          <Select>
            {species.data?.map((item: Tspecies) => (
              <Select.Option key={item.id} value={item.id}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="name"
          label="Tên"
          rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
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

export default AddBreed;
