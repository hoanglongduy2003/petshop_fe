import { CloseOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import React, { FC } from "react";
import "../../../assets/scss/page/appointment.scss";
import { TUser } from "../../../schema/user";
import { useRegisterUserMutation } from "../../../services/auth";

type TModalAddPet = {
  openAddUser: boolean;
  setOpenAddUser: React.Dispatch<React.SetStateAction<boolean>>;
  setUser: React.Dispatch<React.SetStateAction<TUser | undefined>>;
};

const ModalAddUser: FC<TModalAddPet> = ({
  openAddUser,
  setOpenAddUser,
  setUser,
}) => {
  const [form] = Form.useForm();
  const [registerForm, { isLoading }] = useRegisterUserMutation();

  const onFinish = async (values: any) => {
    const response = await registerForm(values);
    if ("error" in response) {
      message.error("Email đã tồn tại");
    } else {
      message.success("Đăng ký thành công");
      setUser({
        id: response.data.id,
        name: values.name,
        password: values.password,
        phone: values.phone,
        address: values.address,
        img: "",
        role_id: 0,
        nameRole: "",
        gender: 0,
        is_delete: false,
        email: values.email,
      });
      setOpenAddUser(false);
    }
  };

  const onFinishFailed = async (values: any) => {
    console.log("Failed:", values);
  };

  return (
    <>
      {openAddUser && (
        <>
          <div
            className="modal-1"
            style={{
              position: "fixed",
              top: 60,
              left: "15%",
              zIndex: 100,
              width: "70%",
              background: "white",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignContent: "center",
              }}
            >
              <div
                style={{
                  fontSize: 24,
                  fontWeight: 500,
                  color: "#00575C",
                  marginBottom: 10,
                }}
              >
                Thêm mới người dùng
              </div>
              <div>
                <p
                  onClick={() => setOpenAddUser(false)}
                  style={{ cursor: "pointer" }}
                >
                  <CloseOutlined className="icon-close" />
                </p>
              </div>
            </div>
            <Form
              className="form-1"
              form={form}
              name="validateOnly"
              layout="vertical"
              autoComplete="off"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                name="email"
                label="Email"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="name"
                label="Tên tài khoản"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="password"
                label="Mật khẩu"
                rules={[{ required: true }]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                name="phone"
                label="Số điện thoại"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="address"
                label="Địa chỉ"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Button
                disabled={isLoading}
                loading={isLoading}
                type="primary"
                htmlType="submit"
              >
                Đăng ký
              </Button>
            </Form>
          </div>
          <div className="background" />
        </>
      )}
    </>
  );
};
export default ModalAddUser;
