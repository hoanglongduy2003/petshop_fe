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
import { TMenuAdd } from "../../../schema/menu";
import { TMenuType } from "../../../schema/menuType";
import { useAddMenuMutation } from "../../../services/menu";
import { useMenuTypeQuery } from "../../../services/menuType";
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

const AddMenuAdmin: React.FC = () => {
  const [form] = Form.useForm();
  const menuType = useMenuTypeQuery();
  const [createMenu, { reset }] = useAddMenuMutation();
  const navigate = useNavigate();

  const confirm = () => {
    message.success("Thêm thành công.");
  };

  const cancel = () => {
    message.error("Thêm Thất Bại,");
  };

  const handleFormSubmit = async (values: {
    name: string;
    link: string;
    menuType_id: number;
  }) => {
    try {
      const updatedMenu: TMenuAdd = {
        name: values.name,
        link: values.link,
        menuType_id: values.menuType_id,
      };
      await createMenu(updatedMenu).unwrap();
      confirm();
      reset();
      navigate("/admin/menu");
    } catch (error) {
      cancel();
      console.error("Error updating:", error);
      reset();
    }
  };

  return (
    <>
      <h2 className="title-appoiment">Thêm Menu</h2>
      <Form
        form={form}
        name="validateOnly"
        layout="vertical"
        autoComplete="off"
        onFinish={handleFormSubmit}
      >
        <Form.Item
          name="name"
          label="Tên Menu"
          rules={[{ required: true, message: "Vui lòng nhập tên Menu!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="link"
          label="Liên kết"
          rules={[{ required: true, message: "Vui lòng nhập đường liên kết!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          rules={[{ required: true, message: "Vui lòng chọn kiểu menu!" }]}
          name="menuType_id"
          label="Kiểu Menu"
        >
          <Select>
            {menuType.data?.map((item: TMenuType) => (
              <Select.Option key={item.id} value={item.id}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
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

export default AddMenuAdmin;
