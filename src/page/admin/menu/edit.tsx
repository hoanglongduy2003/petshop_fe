import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, Input, Select, message } from "antd";
import {
  useUpdateMenuMutation,
  useMenuByIdQuery,
} from "../../../services/menu";
import { TMenu } from "../../../schema/menu";
import { useMenuTypeQuery } from "../../../services/menuType";
import { TMenuType } from "../../../schema/menuType";
import { useEffect } from "react";
import "../../../assets/scss/admin/appointments.scss";

const confirm = () => {
  message.success("Cập nhật menu thành công.");
};

const cancel = () => {
  message.error("Cập nhật menu không thành công.");
};

const EditMenuAdmin = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const menu = useMenuByIdQuery(Number(id));
  const menuType = useMenuTypeQuery();
  const [form] = Form.useForm();

  const [UpdateMenuMutation, { reset }] = useUpdateMenuMutation();
  useEffect(() => {
    if (menu.data) {
      form.setFieldsValue({
        name: menu.data.name,
        link: menu.data.link,
      });
    }
  }, [menu.data, form]);

  const onFinish = async (values: {
    name: string;
    link: string;
    menuType_id: number;
  }) => {
    try {
      const updatedMenu: TMenu = {
        id: Number(id),
        name: values.name,
        link: values.link,
        menuType_id: values.menuType_id || menu.data?.menuType_id,
      };

      await UpdateMenuMutation(updatedMenu).unwrap();
      confirm();
      reset();
      navigate("/admin/menu");
    } catch (error) {
      cancel();
      console.error("Error updating menu:", error);
      reset();
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <h2 className="title-appoiment">Cập nhật menu</h2>
      <div>
        <Form
          form={form}
          name="updateUserRoleForm"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
        >
          <Form.Item
            label="Tên Menu"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập tên menu!" }]}
            initialValue={menu.data ? menu.data.name : ""}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Liên kết"
            name="link"
            rules={[
              { required: true, message: "Vui lòng nhập đường liên kết!" },
            ]}
            initialValue={menu.data ? menu.data.link : ""}
          >
            <Input disabled />
          </Form.Item>

          <Form.Item label="Kiểu Menu" name="menuType_id">
            {menu.data && menu.data?.menuType_id && (
              <Select defaultValue={menu.data?.menuType_id}>
                {menuType.data?.map((item: TMenuType) => (
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
      </div>
    </>
  );
};

export default EditMenuAdmin;
