/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Form, Input, message } from "antd";
import { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";
import { TFooter } from "../../../schema/footer";
import {
  useGetFooterByIdQuery,
  useUpdateFooterMutation,
} from "../../../services/footer";
import ReactQuill from "react-quill";
import "../../../assets/scss/admin/appointments.scss";

const EditFooterAdmin = () => {
  const { TextArea } = Input;
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const footer = useGetFooterByIdQuery(Number(id));
  const [form] = Form.useForm();
  const [contentRight, setContentRight] = useState("");

  const [updateFooterMutation, { reset }] = useUpdateFooterMutation();
  const confirm = () => {
    message.success("Cập nhật thành công.");
  };

  const cancel = () => {
    message.error("Cập nhật không công.");
  };

  useEffect(() => {
    form.setFieldsValue({
      id: footer.data?.id,
      slogan: footer.data?.slogan,
      content_left: footer.data?.content_left,
      content_right: footer.data?.content_right,
      license: footer.data?.license,
    });
  }, [
    form,
    footer.data?.id,
    footer.data?.slogan,
    footer.data?.content_left,
    footer.data?.content_right,
    footer.data?.license,
  ]);

  const onFinish = async (values: TFooter) => {
    try {
      await updateFooterMutation(values).unwrap();
      confirm();
      reset();
      navigate("/admin/footer");
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
      <h2 className="title-appoiment">Cập nhật footer</h2>
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
          name="slogan"
          label="Slogan"
          rules={[{ required: true, message: "Vui lòng nhập slogan!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="content_left"
          label="Nội dung trái"
          rules={[{ required: true, message: "Vui lòng nhập nội dung!" }]}
        >
          <TextArea rows={6} placeholder="Vui lòng nhập nội dung..." />
        </Form.Item>

        <Form.Item
          name="content_right"
          label="Nội dung phải"
          rules={[{ required: true, message: "Vui lòng nhập nội dung!" }]}
        >
          <TextArea rows={6} placeholder="Vui lòng nhập nội dung..." />
        </Form.Item>

        <Form.Item
          name="license"
          label="Bản quyền"
          rules={[{ required: true, message: "Vui lòng nhập bản quyền!" }]}
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

export default EditFooterAdmin;
