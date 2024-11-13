import React from "react";
import imageNot from "../../../assets/image/notAppoiment.png";
import { Link } from "react-router-dom";
import "../../../assets/scss/page/account/order.scss";
import { Popconfirm, message } from "antd";
import {
  useGetOrderByIdUserAndIdStatusQuery,
  useUpdateOrderStatusMutation,
} from "../../../services/order";
const ToPay: React.FC = () => {
  const { data, refetch } = useGetOrderByIdUserAndIdStatusQuery(1);
  const [updateStatus] = useUpdateOrderStatusMutation();
  const confirm = async (id: number | undefined) => {
    try {
      await updateStatus({ id: id, status_id: 5 });
      message.success("Hủy đơn hàng thành công");
      refetch();
    } catch (error) {
      message.success("Hủy đơn hàng thất bại");
    }
  };

  return (
    <>
      {data?.length ? (
        data.map((Item) => (
          <div key={Item.id} className="toShip">
            <div className="toShip-status">
              <div>{Item.paymentMethods.name}</div>
              <div className="toShip-status-name">{Item.status.name}</div>
            </div>
            <div className="toShip-box">
              {Item.products.map((item) => (
                <div key={item.id} className="toShip-box-top">
                  <Link to={`/account/detailOrder/${Item.id}`} state={Item}>
                    <div className="toShip-box-top-item">
                      <div className="toShip-box-top-item-img">
                        <img src={item.img} alt="" />
                      </div>
                      <div>
                        <div>{item.name}</div>
                        <div>x{item.quantity}</div>
                      </div>
                    </div>
                  </Link>
                  <div className="toShip-box-top-price">
                    {new Intl.NumberFormat("vi-VN").format(
                      item.quantity * item.price ?? 0
                    )}{" "}
                    VNĐ
                  </div>
                </div>
              ))}
              <div className="toShip-box-bottom">
                <div className="toShip-box-bottom-action">
                  <Popconfirm
                    onConfirm={() => confirm(Item.id)}
                    title="Hủy đơn hàng"
                    description="Bạn có chắc chắn muốn hủy đơn hàng này không?"
                  >
                    <div className="toShip-box-bottom-action-abort">
                      Hủy đơn hàng
                    </div>
                  </Popconfirm>
                </div>
                <div className="toShip-box-bottom-total">
                  Thành tiền:{" "}
                  <span>
                    {new Intl.NumberFormat("vi-VN").format(Item.total)} VNĐ
                  </span>
                </div>
              </div>
            </div>
            <p style={{ color: "red", margin: "10px" }}>
              Chú ý: Nếu như hủy sẽ không hoàn lại tiền!
            </p>
          </div>
        ))
      ) : (
        <div className="notAppointment">
          <div>
            <img src={imageNot} alt="" />
          </div>
          <div>Chưa có đơn hàng</div>
        </div>
      )}
    </>
  );
};

export default ToPay;
