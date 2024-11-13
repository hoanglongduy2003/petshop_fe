import { useNavigate, useParams } from "react-router-dom";
import "../../../assets/scss/admin/appointments.scss";

import { Button, Form, Input, message } from "antd";
import { TRole } from "../../../schema/role";
import {
  useRoleByIdQuery,
  useUpdateRoleMutation,
} from "../../../services/role";
import { useEffect } from "react";

const confirm = () => {
  message.success("Cập nhật thành công.");
};

const cancel = () => {
  message.error("Cập nhật không công.");
};

const EditRole = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const role = useRoleByIdQuery(Number(id));
  const [form] = Form.useForm();

  const [updateRoleMutation, { reset }] = useUpdateRoleMutation();

  useEffect(() => {
    form.setFieldsValue({
      id: role.data?.id,
      name: role.data?.name,
    });
  }, [form, role.data?.id, role.data?.name]);

  const onFinish = async (values: TRole) => {
    try {
      await updateRoleMutation(values).unwrap();
      confirm();
      reset();
      navigate("/admin/role");
    } catch (error) {
      cancel();
      console.error("Lỗi cập nhật vai trò:", error);
      reset();
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <h2 className="title-appoiment">Cập nhật vai trò</h2>
      <Form
        form={form}
        name="updateRoleForm"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
      >
        <Form.Item name="id" label="ID">
          <Input disabled />
        </Form.Item>
        <Form.Item
          name="name"
          label="Trạng thái"
          rules={[{ required: true, message: "Vui lòng nhập tên vài trò!" }]}
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

export default EditRole;
