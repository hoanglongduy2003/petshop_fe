import { PlusOutlined } from "@ant-design/icons";
import { Button, Popconfirm, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import React from "react";
import { useNavigate } from "react-router-dom";
import TableAdmin from "../../../components/table";
import { TSetTime } from "../../../schema/setTime";
import {
  useRemoveSetTimeMutation,
  useSetTimeQuery,
} from "../../../services/setTime";

const SetTimeAdmin: React.FC = () => {
  const navigate = useNavigate();
  const { data } = useSetTimeQuery();

  const [removeSetTime] = useRemoveSetTimeMutation();

  const confirm = (id: number) => {
    removeSetTime(id)
      .then((response: any) => {
        if (response.error) {
          message.error("Bạn không thể xóa vì có liên quan khóa ngoại");
        } else {
          message.success("Xóa thành công.");
        }
      })
      .catch((error: any) => {
        message.error("Có lỗi xảy ra khi xóa.");
      });
  };

  const cancel = () => {
    message.error("Xóa không thành công.");
  };

  const columns: ColumnsType<TSetTime> = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      fixed: "right",
      width: 50,
      render: (text, record, index) => index + 1,
    },
    {
      title: "Ca",
      dataIndex: "name",
      key: "name",
      width: 150,
    },
    {
      title: "Thời gian",
      key: "time",
      width: 150,
      render: (setTime) => (
        <>
          {setTime.start_time && setTime.end_time ? (
            <div>
              ({dayjs(setTime.start_time, "HH:mm:ss").format("HH:mm")} -
              {dayjs(setTime.end_time, "HH:mm:ss").format("HH:mm")})
            </div>
          ) : (
            <div>null</div>
          )}
        </>
      ),
    },
    {
      title: "Thao tác",
      dataIndex: "id",
      key: "id",
      width: 100,
      render: (id) => (
        <div>
          <Button
            onClick={() => navigate(`edit/${id}`)}
            className="btn-edit"
            style={{ marginRight: "1rem" }}
          >
            Sửa
          </Button>
          <Popconfirm
            title="Xóa trạng thái."
            description="Bạn có muốn xóa không?"
            onConfirm={() => confirm(id)}
            onCancel={cancel}
            okText="Đồng ý"
            cancelText="Không"
          >
            <Button danger className="btn-delete">
              Xóa
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <>
      <Button
        type="primary"
        onClick={() => navigate("add")}
        icon={<PlusOutlined />}
        style={{ marginBottom: "1rem" }}
      >
        THÊM THỜI GIAN
      </Button>
      <TableAdmin columns={columns} data={data} />
    </>
  );
};

export default SetTimeAdmin;
