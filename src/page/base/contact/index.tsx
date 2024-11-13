/* eslint-disable jsx-a11y/iframe-has-title */
import React from "react";
import type { FormInstance } from "antd";
import { Button, Form, Input, Space, message } from "antd";
import "../../../assets/scss/page/contact.scss";
import { useCreateContactMutation } from "../../../services/contact";
import TextArea from "antd/es/input/TextArea";
import { useNavigate } from "react-router-dom";
import { useGetUserQuery } from "../../../services/user";
import { TContact } from "../../../schema/contact";

const SubmitButton = ({ form }: { form: FormInstance }) => {
  const [submittable, setSubmittable] = React.useState(false);

  const values = Form.useWatch([], form);

  React.useEffect(() => {
    form.validateFields({ validateOnly: true }).then(
      () => {
        setSubmittable(true);
      },
      () => {
        setSubmittable(false);
      }
    );
  }, [form, values]);

  return (
    <Button type="primary" htmlType="submit" disabled={!submittable}>
      Submit
    </Button>
  );
};

const Contact: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const [createContact, { reset }] = useCreateContactMutation();
  const { data: user } = useGetUserQuery();
  const handleFormSubmit = async (values: TContact) => {
    const { phone, title, subject } = values;

    const dateNews = {
      phone,
      title,
      subject,
      user_id: user?.id,
      status_id: 2,
    };
    try {
      await createContact(dateNews).unwrap();
      message.success("Gửi thông tin liên hệ thành công.");

      reset();
      navigate("/");
    } catch (error: any) {
      message.error("Lỗi khi gửi thông tin liên hệ: " + error.message);
    }
  };

  return (
    <>
      <div className="contact">
        <div className="contact_container">
          <div className="contact_main">
            <div className="contact_1">
              <h1>Liên hệ</h1>
              <div className="textwidget">GIỜ LÀM VIỆC</div>
              <div className="title">
                <p>
                  Thứ 2 - thứ 7: 8h - 12h & 14h - 19h (Riêng ngày thứ 7 đóng cửa
                  lúc 16h)
                </p>
                <p>Chủ nhật & Ngày lễ : 8h - 12h</p>
              </div>
              <div className="textwidget">THÔNG TIN TÀI KHOẢN NGÂN HÀNG</div>
              <div className="title">
                <p>Tên tài khoản: PetCare Shop</p>
                <p>
                  Địa chỉ tài khoản: 2 P. Phạm Văn Bạch, Dịch Vọng, Cầu Giấy, Hà Nội, Việt Nam
                </p>
                <p>Số tài khoản: 0562 4975 901</p>
                <p>Ngân hàng: TP Bank</p>
              </div>
            </div>
            <div className="contact_2">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.220245240297!2d105.78785887503123!3d21.02387168062423!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313454b329f68977%3A0x6ddf5ff1e829fc56!2zxJDhuqFpIEjhu41jIEdyZWVud2ljaCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1729549686244!5m2!1svi!2s"
                width="600"
                height="450"
                style={{ border: "0" }}
                loading="lazy"
              ></iframe>
            </div>
          </div>
          <br />
          <hr />
          <br />

          <h1>Gửi thông điệp đến Pet Care Shop</h1>
          <div className="contact_mail">
            <Form
              form={form}
              name="validateOnly"
              layout="vertical"
              autoComplete="off"
              onFinish={handleFormSubmit}
            >
              <Form.Item
                name="name"
                label="Họ tên"
                className="controll"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="phone"
                label="Số điện thoại"
                className="controll"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="title"
                label="Tiêu đề"
                className="controll"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="subject"
                label="Nội dung"
                className="controll"
                rules={[{ required: true }]}
              >
                <TextArea rows={10} cols={30} />
              </Form.Item>

              <Form.Item>
                <Space>
                  <SubmitButton form={form} />
                  <Button
                    style={{
                      background: "transparent",
                      border: "1px solid #00575c",
                      color: "black",
                    }}
                    htmlType="reset"
                  >
                    Reset
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
