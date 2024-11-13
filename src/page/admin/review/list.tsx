import { Button, Popconfirm, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import TableAdmin from "../../../components/table";
import { TStatus } from "../../../schema/status";
import {
  useReviewQuery,
  useUpdateBlockReviewMutation,
} from "../../../services/review";
import dayjs from "dayjs";
import { TBlockReview, TReview } from "../../../schema/review";
import Search from "antd/es/input/Search";
import "../../../assets/scss/admin/appointments.scss";

const ReviewAdmin: React.FC = () => {
  const { data } = useReviewQuery();
  const [updateBlockReview] = useUpdateBlockReviewMutation();

  const [filter, setFilter] = useState({ name: "" });
  const [listReview, setListReview] = useState<TReview[] | undefined>([]);
  const [openReset, setOpenReset] = useState<boolean>(false);

  const handleFilterChange = (fieldName: string, value: string) => {
    setFilter({ ...filter, [fieldName]: value });
  };
  const confirmBlock = (review: TBlockReview) => {
    updateBlockReview({ id: review.id, is_delete: 1 });
    message.success("Khóa thành công.");
  };

  const confirm = (review: TBlockReview) => {
    updateBlockReview({ id: review.id, is_delete: 0 });
    message.success("Mở thành công.");
  };

  const cancel = () => {
    message.error("Xóa không thành công.");
  };

  const columns: ColumnsType<TStatus> = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      fixed: "right",
      width: 150,
      render: (text, record, index) => index + 1,
    },
    {
      title: "Tên tài khoản",
      dataIndex: "user_name",
      key: "user_name",
      width: 150,
    },
    {
      title: "Xếp hạng",
      dataIndex: "rating",
      key: "rating",
      width: 150,
    },
    {
      title: "Bình luận",
      dataIndex: "comment",
      key: "comment",
      width: 150,
    },
    {
      title: "Thời gian",
      dataIndex: "created_at",
      key: "created_at",
      render: (text) => <div>{dayjs(text).format("DD-MM-YYYY (HH:mm)")}</div>,
      width: 150,
    },
    {
      title: "Thao tác",
      key: "id",
      width: 100,
      render: (review) => (
        <div>
          {review.is_delete ? (
            <Popconfirm
              title="Xóa trạng thái."
              description="Bạn có muốn mở khóa không?"
              onConfirm={() => confirm(review)}
              onCancel={cancel}
              okText="Đồng ý"
              cancelText="Không"
            >
              <Button type="primary" ghost>
                Mở khóa
              </Button>
            </Popconfirm>
          ) : (
            <Popconfirm
              title="Xóa trạng thái."
              description="Bạn có muốn khóa không?"
              onConfirm={() => confirmBlock(review)}
              onCancel={cancel}
              okText="Đồng ý"
              cancelText="Không"
            >
              <Button danger className="btn-delete">
                Khóa
              </Button>
            </Popconfirm>
          )}
        </div>
      ),
    },
  ];

  useEffect(() => {
    const filteredData = data?.filter((item) =>
      item.user_name?.toLowerCase().includes(filter.name.trim().toLowerCase())
    );
    setListReview(filteredData);
  }, [data, filter]);

  useEffect(() => {
    if (filter.name === "") {
      setOpenReset(false);
    } else {
      setOpenReset(true);
    }
  }, [filter.name]);

  return (
    <>
      <h2 className="title-appoiment">Quản lý đánh giá</h2>
      <h2 style={{ margin: "0.5rem" }}>Tìm kiếm</h2>
      <div className="btn-table">
        <div style={{ display: "flex", columnGap: 20 }}>
          <Search
            placeholder="Tìm kiếm tên tài khoản"
            value={filter?.name}
            onChange={(e) => handleFilterChange("name", e.target.value)}
            style={{ width: 200, marginBottom: 10 }}
          />
          <Button
            onClick={() => setFilter({ name: "" })}
            danger
            disabled={!openReset}
          >
            Cài lại
          </Button>
        </div>
      </div>
      <TableAdmin columns={columns} data={listReview} />
    </>
  );
};

export default ReviewAdmin;
