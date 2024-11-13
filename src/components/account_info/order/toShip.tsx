import React from "react";
import { useGetOrderByIdUserAndIdStatusQuery } from "../../../services/order";
import imageNot from "../../../assets/image/notAppoiment.png";
import { Link } from "react-router-dom";

const ToShip: React.FC = () => {
  const { data } = useGetOrderByIdUserAndIdStatusQuery(2);
  return (
    <>
      {data?.length ? (
        data.map((Item) => (
          <div className="toShip" key={Item.id}>
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
              <div className="toShip-box-bottom" style={{justifyContent: 'flex-end'}}>
                <div className="toShip-box-bottom-total">
                  Thành tiền:{" "}
                  <span>
                    {new Intl.NumberFormat("vi-VN").format(Item.total)} VNĐ
                  </span>
                </div>
              </div>
            </div>
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

export default ToShip;
