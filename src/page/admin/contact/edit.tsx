import { useNavigate, useParams } from "react-router-dom";

import { Button, Form, Input, Select, message } from "antd";
import {
  useUpdateStatusContactMutation,
  useContactByIdQuery,
} from "../../../services/contact";
import { useGetAllstatusContactQuery } from "../../../services/status_contact";
import { TStatusContact } from "../../../schema/status_contact";
import { TStaContact } from "../../../schema/contact";
import "../../../assets/scss/admin/appointments.scss";

const confirm = () => {
  message.success("Cập nhật thành công.");
};

const cancel = () => {
  message.error("Cập nhật không thành công.");
};

const EditContact = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const contact = useContactByIdQuery(Number(id));
  const status = useGetAllstatusContactQuery();
  const [form] = Form.useForm();

  const [updateStatusContactMutation, { reset }] =
    useUpdateStatusContactMutation();

  const onFinish = async (values: { status_id: number }) => {
    try {
      const updatedcontact: TStaContact = {
        id: Number(id),
        status_id: values.status_id,
      };
      await updateStatusContactMutation(updatedcontact).unwrap();
      confirm();
      reset();
      navigate("/admin/contact");
    } catch (error) {
      cancel();
      console.error("Update trạng thái contact thất bại", error);
      reset();
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <h2 className="title-appoiment">Cập nhập Trạng Thái Liên Hệ</h2>
      <Form
        form={form}
        name="updateUserRoleForm"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
      >
        <Form.Item label="id">
          <Input disabled value={contact.data?.id} />
        </Form.Item>

        <Form.Item label="Số điện thoại">
          <Input disabled value={contact.data?.phone} />
        </Form.Item>

        <Form.Item label="tiltle">
          <Input disabled value={contact.data?.title} />
        </Form.Item>

        <Form.Item label="subject">
          <Input disabled value={contact.data?.subject} />
        </Form.Item>

        <Form.Item label="user_id">
          <Input disabled value={contact.data?.user_id} />
        </Form.Item>

        <Form.Item
          label="Trạng thái"
          name="status_id"
          rules={[{ required: true, message: "Vui lòng chọn trạng thái" }]}
        >
          {contact.data?.id && (
            <Select defaultValue={contact.data?.status_id}>
              {status.data?.map((item: TStatusContact) => (
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

export default EditContact;
