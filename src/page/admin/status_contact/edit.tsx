import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, Input, message } from "antd";
import {
  useUpdateStatusContactMutation,
  useGetStatusContactByIdQuery,
} from "../../../services/status_contact";
import { TStatusContact } from "../../../schema/status_contact";
import { useEffect } from "react";
import "../../../assets/scss/admin/appointments.scss";

const confirm = () => {
  message.success("Cập nhật trạng thái thành công.");
};

const cancel = () => {
  message.error("Cập nhật trạng thái không thành công.");
};

const EditStatusContact = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const status_contact = useGetStatusContactByIdQuery(Number(id));
  const [form] = Form.useForm();

  const [updateStatusMutation, { reset }] = useUpdateStatusContactMutation();

  useEffect(() => {
    if (status_contact.data) {
      form.setFieldsValue({
        name: status_contact.data.name,
      });
    }
  }, [status_contact.data, form]);

  const onFinish = async (values: { name: string }) => {
    try {
      const updatedStatus: TStatusContact = {
        id: Number(id),
        name: values.name,
      };
      await updateStatusMutation(updatedStatus).unwrap();
      confirm();

      reset();

      navigate("/admin/status_contact");
    } catch (error) {
      cancel();
      console.error("Error updating stauts:", error);
      reset();
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <h2 className="title-appoiment">Cập nhật trạng thái liên hệ</h2>
      <Form
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
      >
        <Form.Item
          label="Trạng thái"
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập trạng thái" }]}
          initialValue={status_contact.data ? status_contact.data.name : ""}
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

export default EditStatusContact;
