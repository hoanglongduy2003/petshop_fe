import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, Input, message } from "antd";
import {
  useUpdateCategoryMutation,
  useCategoryByIdQuery,
} from "../../../services/category";
import { Tcategory } from "../../../schema/category";
import { useEffect } from "react";import "../../../assets/scss/admin/appointments.scss";


const confirm = () => {
  message.success("Cập nhật danh mục thành công.");
};

const cancel = () => {
  message.error("Cập nhật danh mục không thành công.");
};

const EditCategory = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const category = useCategoryByIdQuery(Number(id));
  const [form] = Form.useForm();

  const [updatePetHouseMutation, { reset }] = useUpdateCategoryMutation();

  useEffect(() => {
    if (category.data) {
      form.setFieldsValue({
        name: category.data.name,
      });
    }
  }, [category.data, form]);

  const onFinish = async (values: { name: string }) => {
    try {
      const updatedPetHouse: Tcategory = {
        id: Number(id),
        name: values.name,
      };
      await updatePetHouseMutation(updatedPetHouse).unwrap();
      confirm();

      reset();

      navigate("/admin/category");
    } catch (error) {
      cancel();
      console.error("Lỗi khi update danh mục:", error);
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
        Cập nhập danh mục
      </h2>
      <Form
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
      >
        <Form.Item
          label="Tên"
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập danh mục" }]}
          initialValue={category.data ? category.data.name : ""}
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

export default EditCategory;
