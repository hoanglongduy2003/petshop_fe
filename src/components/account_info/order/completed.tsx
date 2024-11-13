import { Button } from "antd";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import imageNot from "../../../assets/image/notAppoiment.png";
import { useGetOrderByIdUserAndIdStatusQuery } from "../../../services/order";
import {
  useAddToCartsMutation,
  useGetUserListCartsQuery,
  useUpdateQuantityCartsMutation,
} from "../../../services/shoppingCart";
import ModalReview from "./modalReview";

const Completed: React.FC = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  const [productId, setProductId] = useState<number>();

  const { data, refetch } = useGetOrderByIdUserAndIdStatusQuery(4);
  const { data: dataCart } = useGetUserListCartsQuery();

  const [AddToCart] = useAddToCartsMutation();
  const [updateOrderMutation] = useUpdateQuantityCartsMutation();

  const resetCart = async (items: any[], userId: number) => {
    const updatedCart: any[] = [];

    for (const item of items) {
      const existingCartItem = dataCart?.find(
        (cartItem: any) => cartItem.productsId === item.id
      );

      if (existingCartItem) {
        const updatedQuantity = existingCartItem.quantity + item.quantity;
        const res = await updateOrderMutation({
          id: existingCartItem.id,
          quantity: updatedQuantity,
        });
        if ("data" in res) {
          navigate("/shoppingCart");
        }
      } else {
        const cartItem = {
          user_id: userId,
          products_id: item.id,
          quantity: item.quantity,
        };
        updatedCart.push(cartItem);
        const res = await AddToCart(cartItem);
        if ("data" in res) {
          navigate("/shoppingCart");
        }
      }
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
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-end",
                      flexDirection: "column",
                      rowGap: 10,
                    }}
                  >
                    <div className="toShip-box-top-price">
                      {new Intl.NumberFormat("vi-VN").format(
                        item.quantity * item.price ?? 0
                      )}{" "}
                      VNĐ
                    </div>
                    {item.review_id === null && (
                      <Button
                        className="review"
                        onClick={() => {
                          setOpen(true);
                          setProductId(item.id);
                        }}
                      >
                        Đánh giá sản phẩm
                      </Button>
                    )}
                  </div>
                </div>
              ))}
              <div className="toShip-box-bottom">
                <div className="toShip-box-bottom-action">
                  <div
                    onClick={() => resetCart(Item.products, Item.userId)}
                    className="toShip-box-bottom-action-abort"
                  >
                    Đặt lại
                  </div>
                </div>
                <div className="toShip-box-bottom-total">
                  Thành tiền:{" "}
                  <span>
                    {new Intl.NumberFormat("vi-VN").format(Item.total)} VNĐ
                  </span>
                </div>
              </div>
            </div>
            <ModalReview refetch={refetch} open={open} setOpen={setOpen} productId={productId} />
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

export default Completed;
