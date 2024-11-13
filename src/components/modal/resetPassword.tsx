import { Button, Form, Input, message } from "antd";
import Modal from "antd/es/modal/Modal";
import { FC } from "react";
import "../../assets/scss/components/modalPassword.scss";
import { useUpdatePasswordMutation } from "../../services/user";
type ModalResetPasswordProps = {
  idUser: number;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ModalResetPassword: FC<ModalResetPasswordProps> = ({
  isModalOpen,
  setIsModalOpen,
  idUser,
}) => {
  const [form] = Form.useForm();
  form.resetFields();
  const [updatePassword] = useUpdatePasswordMutation();
  const onFinish = async (values: any) => {
    try {
      const dataUpdate = {
        idUser: idUser,
        newPassword: values.newPassword,
        oldPassword: values.oldPassword,
      };
      await updatePassword(dataUpdate).unwrap();
      message.success("Đổi mât khẩu thành công");
    } catch (error: any) {
      if (error?.status === 400) {
        message.error("Mật khẩu cũ không chính xác");
      } else {
        message.error("Đổi mât khẩu thất bại");
      }
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };
  return (
    <>
      <Modal
        className="modal-password"
        title={<h1 style={{ marginBottom: 20 }}>Cập nhật mật khẩu</h1>}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <div>
          <div>
            <Form
              form={form}
              name="updatePassword"
              onFinish={onFinish}
              labelCol={{ span: 9 }}
              wrapperCol={{ span: 15 }}
            >
              <Form.Item
                label="Mật khẩu cũ"
                name="oldPassword"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập mật khẩu cũ!",
                  },
                  {
                    pattern:
                      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message:
                      "Mật khẩu phải có ít nhất tám ký tự, ít nhất một chữ số và ít nhất một ký tự đặc biệt!",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                label="Mật khẩu mới"
                name="newPassword"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập mật khẩu mới!",
                  },
                  {
                    pattern:
                      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message:
                      "Mật khẩu phải có ít nhất tám ký tự, ít nhất một chữ số và ít nhất một ký tự đặc biệt!",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                label="Nhập lại mật khẩu mới"
                name="confirmPassword"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng xác nhận mật khẩu mới!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("newPassword") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject("Mật khẩu không khớp!");
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 6, span: 12 }}>
                <Button type="primary" htmlType="submit">
                  Cập nhật mật khẩu
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ModalResetPassword;
