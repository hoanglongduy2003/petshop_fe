import { useNavigate, useParams } from "react-router-dom";

import { Button, Form, Input, TimePicker, message } from "antd";
import dayjs from "dayjs";
import { useEffect } from "react";
import { TRole } from "../../../schema/role";
import {
  useSetTimeByIdQuery,
  useUpdateSetTimeMutation,
} from "../../../services/setTime";
import { TSetTimeAdd } from "../../../schema/setTime";

const confirm = () => {
  message.success("Cập nhật thành công.");
};

const cancel = () => {
  message.error("Cập nhật không công.");
};

const EditSetTime = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const setTime = useSetTimeByIdQuery(Number(id));
  const [form] = Form.useForm();

  const [updateSetTimeMutation, { reset }] = useUpdateSetTimeMutation();

  useEffect(() => {
    form.setFieldsValue({
      name: setTime.data?.name,
      time: [
        dayjs(setTime.data?.start_time ?? "00:00:00", "HH:mm"),
        dayjs(setTime.data?.end_time ?? "00:00:00", "HH:mm"),
      ],
    });
  }, [
    form,
    setTime.data?.end_time,
    setTime.data?.name,
    setTime.data?.start_time,
  ]);

  const onFinish = async (values: { name: string; time: any }) => {
    try {
      const updatedSetTime: TSetTimeAdd = {
        id: Number(id),
        name: values.name,
        start_time: dayjs(values.time[0]).format("HH:mm:00.000[Z]"),
        end_time: dayjs(values.time[1]).format("HH:mm:00.000[Z]"),
      };
      await updateSetTimeMutation(updatedSetTime).unwrap();
      confirm();
      reset();
      navigate("/admin/setTime");
    } catch (error) {
      cancel();
      console.error("Lỗi cập nhật vai trò:", error);
      reset();
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
    <h1 style={{ marginBottom: 20, color: "#00575c", fontSize: 20 }}>
        Cập nhập Thời gian #{id}
      </h1>
      <Form
        form={form}
        name="updateSetTimeForm"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
      >
        <Form.Item
          name="name"
          label="Tên"
          rules={[{ required: true, message: "Vui lòng nhập tên thời gian !" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="time"
          label="Thời gian"
          rules={[{ required: true, message: "Vui lòng nhập thời gian !" }]}
        >
          <TimePicker.RangePicker
            format={"HH:mm"}
            defaultValue={[
              dayjs(setTime.data?.start_time ?? "00:00:00", "HH:mm"),
              dayjs(setTime.data?.end_time ?? "00:00:00", "HH:mm"),
            ]}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Cập nhật
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default EditSetTime;
