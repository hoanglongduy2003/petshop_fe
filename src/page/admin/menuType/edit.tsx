import { useNavigate, useParams } from "react-router-dom";

import { Button, Form, Input, message } from "antd";
import { TMenuType } from "../../../schema/menuType";
import {
  useMenuTypeByIdQuery,
  useUpdateMenuTypeMutation,
} from "../../../services/menuType";
import { useEffect } from "react";
import "../../../assets/scss/admin/appointments.scss";

const confirm = () => {
  message.success("Cập nhật thành công.");
};

const cancel = () => {
  message.error("Cập nhật không công.");
};

const EditMenuType = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const menutype = useMenuTypeByIdQuery(Number(id));
  const [form] = Form.useForm();

  const [updateMenuTypeMutation, { reset }] = useUpdateMenuTypeMutation();

  useEffect(() => {
    form.setFieldsValue({
      id: menutype.data?.id,
      name: menutype.data?.name,
    });
  }, [form, menutype.data?.id, menutype.data?.name]);

  const onFinish = async (values: TMenuType) => {
    try {
      await updateMenuTypeMutation(values).unwrap();
      confirm();
      reset();
      navigate("/admin/menutype");
    } catch (error) {
      cancel();
      console.error("Lỗi cập nhật kiểu menu:", error);
      reset();
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <h2 className="title-appoiment">Cập nhật kiểu menu</h2>
      <Form
        form={form}
        name="updateMenuTypeForm"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
      >
        <Form.Item name="id" label="ID">
          <Input disabled />
        </Form.Item>
        <Form.Item
          name="name"
          label="Kiểu menu"
          rules={[{ required: true, message: "Vui lòng nhập tên kiểu menu!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ float: "right" }}>
            Cập nhật
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default EditMenuType;
