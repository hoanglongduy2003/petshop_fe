import { useNavigate, useParams } from "react-router-dom";

import { Button, Form, Input, Select, message } from "antd";
import {
  useUpdateRoleUserMutation,
  useUserByIdQuery,
} from "../../../services/user";
import { useRoleQuery } from "../../../services/role";
import { TRole } from "../../../schema/role";
import { TRoleUser } from "../../../schema/user";import "../../../assets/scss/admin/appointments.scss";


const confirm = () => {
  message.success("Cập nhật thành công.");
};

const cancel = () => {
  message.error("Cập nhật không công.");
};

const EditStaff = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const user = useUserByIdQuery(Number(id));
  const roles = useRoleQuery();
  const [form] = Form.useForm();

  const [updateRoleUserMutation, { reset }] = useUpdateRoleUserMutation();

  const onFinish = async (values: { role_id: number }) => {
    try {
      const updatedUser: TRoleUser = {
        id: Number(id),
        role_id: values.role_id,
      };
      await updateRoleUserMutation(updatedUser).unwrap();
      confirm();
      reset();
      navigate("/admin/staff");
    } catch (error) {
      cancel();
      console.error("Error updating user role:", error);
      reset();
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <h2
        className="title-appoiment"
      >
        Cập nhật vai trò nhân viên
      </h2>
      <Form
        form={form}
        name="updateUserRoleForm"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
      >
        <Form.Item label="Tên">
          <Input disabled value={user.data?.name} />
        </Form.Item>
        <Form.Item label="Email">
          <Input disabled value={user.data?.email} />
        </Form.Item>
        <Form.Item
          label="Vai trò"
          name="role_id"
          rules={[{ required: true, message: "Vui lòng chọn vai trò" }]}
        >
          {user.data?.role_id && (
            <Select defaultValue={user.data?.role_id}>
              {roles.data?.map((item: TRole) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          )}
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

export default EditStaff;
