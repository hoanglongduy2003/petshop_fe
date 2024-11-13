import { Button, Form, Input, Rate } from "antd";
import { useCreateReviewMutation } from "../../../services/review";
import { useGetUserQuery } from "../../../services/user";
import dayjs from "dayjs";
import { FC, useState } from "react";
import "../../../assets/scss/components/modalReview.scss";

type TModalReview = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  productId?: number;
  services_id?: number;
  refetch: any;
};

const ModalReview: FC<TModalReview> = ({
  open,
  setOpen,
  productId,
  services_id,
  refetch,
}) => {
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const { data: user } = useGetUserQuery();
  const [createReviewMutation, { isLoading }] = useCreateReviewMutation();

  const [rating, setRating] = useState<number>(5);

  const handleRateChange = (value: number) => {
    setRating(value);
  };

  const onFinish = async (values: any) => {
    const res = await createReviewMutation({
      user_id: user?.id,
      created_at: dayjs().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
      rating: rating,
      comment: values.comment,
      product_id: productId,
      services_id: services_id,
    });
    if ("data" in res) {
      form.resetFields();
      refetch();
      setOpen(false);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      {open && (
        <div className="modalReview">
          <Form
            className="modal"
            name="basic"
            style={{ marginLeft: -30 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <h3 style={{ textAlign: "center" }}>Đánh giá chất lượng dịch vụ</h3>
            <div style={{ margin: "10px 0" }}>
              Bạn cảm thấy chất lượng dịch vụ như thế nào?
            </div>
            <Form.Item>
              <Rate
                style={{ fontSize: 30 }}
                allowHalf
                defaultValue={rating}
                onChange={handleRateChange}
              />
            </Form.Item>
            <Form.Item
              name="comment"
              rules={[
                {
                  required: true,
                  message: "Bạn chưa góp ý",
                },
              ]}
              style={{ marginTop: -10 }}
            >
              <TextArea
                rows={4}
                placeholder="Hãy viết những góp ý của bạn vào đây"
              />
            </Form.Item>
            <Form.Item>
              <Button
                loading={isLoading}
                disabled={isLoading}
                type="primary"
                htmlType="submit"
              >
                Gửi
              </Button>
            </Form.Item>
          </Form>
          <div className="background" />
        </div>
      )}
    </>
  );
};

export default ModalReview;
