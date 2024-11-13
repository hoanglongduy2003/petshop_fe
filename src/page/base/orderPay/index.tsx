import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Popconfirm, Radio, message } from "antd";
import axios from "axios";
import { FC, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../../assets/scss/page/orderPay.scss";
import Location from "../../../assets/svg/loaction";
import { TDeliveryAddress } from "../../../schema/deliveryAddress";
import {
  useCreateDeliveryAddressMutation,
  useDeleteDeliveryAddressMutation,
  useListDeliveryAddressQuery,
  useUpdateDeliveryAddressMutation,
} from "../../../services/deliveryAddress";
import { useCreateOrderMutation } from "../../../services/order";
import { useGetAllPaymentMethodsQuery } from "../../../services/paymentMethods";
import { useGetUserQuery } from "../../../services/user";

const API_URL = "http://localhost:8080/api";
type Props = {};

const OrderPay: FC<Props> = () => {
  const [form] = Form.useForm();
  const shippingCost: number = 35000;
  const [status_id, setStatusId] = useState<number>();
  const [paymentMethods_id, setPaymentMethods_id] = useState<number>(1);
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState<string | null>();
  const navigate = useNavigate();
  const location = useLocation();

  const [removeDeliveryAddress] = useDeleteDeliveryAddressMutation();
  const [data] = useState<any>(location.state?.data);
  const [address, setAddress] = useState<TDeliveryAddress>();
  const { data: getAllPaymentMethods } = useGetAllPaymentMethodsQuery();
  const { data: user } = useGetUserQuery();
  const { data: deliveryAddress } = useListDeliveryAddressQuery(user?.id || 0);
  const [value, setValue] = useState<number>(0);
  const [openAddAddress, setOpenAddAddress] = useState<boolean>(false);
  const [openEditAddress, setOpenEditAddress] = useState<boolean>(false);
  const [createOrder, { isLoading: isLoadingOrder }] = useCreateOrderMutation();
  const [EditAddress, setEditAddress] = useState<any>([]);
  const [updateDeliveryAddress] = useUpdateDeliveryAddressMutation();
  const [addDeliveryAddress, { isLoading }] =
    useCreateDeliveryAddressMutation();
  useEffect(() => {
    if (!location.state) {
      navigate("/shoppingCart");
    }
  }, [data, navigate]);

  useEffect(() => {
    setAddress(deliveryAddress && deliveryAddress[0]);
    setValue((deliveryAddress && deliveryAddress[0]?.id) ?? 0);
  }, [deliveryAddress]);

  const calculateTotalAmount = () => {
    let totalAmount = 0;
    data.products.forEach(
      (item: { id: number; price: number; quantity: number }) => {
        totalAmount += item.price * item.quantity;
      }
    );
    return totalAmount;
  };
  useEffect(() => {
    if (paymentMethods_id === 1) {
      setStatusId(2);
    } else {
      setStatusId(1);
    }
  }, [paymentMethods_id]);

  const onSubmit = async () => {
    const dataSubmit = {
      user_id: data.userId,
      products: [
        ...data.products.map(
          (product: { id: any; quantity: any; price: any }) => ({
            id: product.id,
            quantity: product.quantity,
            price: product.price,
          })
        ),
      ],
      total: calculateTotalAmount() + shippingCost,
      note: note,
      paymentMethods_id: paymentMethods_id,
      status_payment: 1,
      address_id: address?.id || 0,
      status_id: status_id,
    };
    try {
      const res = await createOrder(dataSubmit);
      if ("data" in res) {
        const orderId = res.data.id;
        const totalAmount = calculateTotalAmount() + shippingCost;
        message.success("Đặt hàng thành công");
        if (paymentMethods_id === 1) {
          axios
            .post(`${API_URL}/create-payment`, {
              OrderID: orderId,
              amount: totalAmount,
            })
            .then((response) => {
              localStorage.setItem(
                "paymentInfo",
                JSON.stringify({ orderId, totalAmount })
              );
              window.location.href = response.data.paymentUrl;
            })
            .catch((error) => {
              console.error("Error", error);
            });
        }
        if (paymentMethods_id === 2) {
          setTimeout(() => {
            navigate("/account/to-pay");
          }, 3000);
        }
      } else {
        message.error("Đặt thất bại");
      }
    } catch (error) {
      message.error("Đặt thất bại");
    }
  };

  const onChange = (e: any) => {
    setPaymentMethods_id(e.target.value);
  };

  const onChangeAddress = (e: any) => {
    setValue(e.target.value);
  };

  const onFinish = async (values: any) => {
    const data = {
      name: values.name,
      phone: values.phone,
      city: values.city,
      district: values.district,
      ward: values.ward,
      address: values.address,
      user_id: user?.id,
    };
    const res = await addDeliveryAddress(data);
    if ("data" in res) {
      await setOpenAddAddress(false);
      await setOpenEditAddress(false);
      await setOpen(true);
    }
  };
  const onEdit = () => {
    setOpenEditAddress(true);
    const addressById = deliveryAddress?.find((address) => address.id === value);
    setEditAddress(addressById)
  }

  const onFinishEdit = async (values: any) => {
    const data = {
      id: EditAddress.id,
      name: values.name,
      phone: values.phone,
      city: values.city,
      district: values.district,
      ward: values.ward,
      address: values.address,
      user_id: user?.id,
    };
    try {
      await updateDeliveryAddress(data);
      await setOpenAddAddress(false);
      await setOpenEditAddress(false);
      await setOpen(true);
      message.success("Cập Nhật địa chỉ thành công!!");
    } catch (error) {
      message.error("Cập Nhật địa chỉ thất bại!!");
    }
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const OkModal = () => {
    const addressId = deliveryAddress?.find((address) => address.id === value);
    setAddress(addressId);
    setOpen(false);
  };
  const confirm = (id: any) => {
    removeDeliveryAddress(id)
      .then((response: any) => {
        if (response.error) {
          message.error("Có lỗi xảy ra");
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

  return (
    data && (
      <>
        <div className="container-order">
          <div className="orderPay">
            <h3>Thông tin thanh toán </h3>
            <div className="orderPay-address">
              <div className="orderPay-address-title">
                <div className="orderPay-address-title-icon">
                  <Location /> Địa chỉ nhận hàng
                </div>
                {address ? (
                  <>
                    <div className="orderPay-address-title-item">
                      <div className="orderPay-address-title-item-user">
                        Họ và tên: {address?.name}
                      </div>
                      <div className="orderPay-address-title-item-user">
                        Số điện thoại: {address?.phone}
                      </div>
                    </div>
                    <div className="orderPay-address-title-item-user">
                      Điạ chỉ: {address?.address}, {address?.ward}, {address.district}, {address?.city}
                    </div>
                    <div className="address" onClick={() => setOpen(true)}>
                      Thay đổi điạ chỉ
                    </div>
                  </>
                ) : (
                  <>
                    <p style={{ margin: "10px 0", color: "red" }}>
                      Bạn chưa có địa chỉ nhận hàng
                    </p>
                    <p
                      className="address"
                      onClick={() => setOpenAddAddress(true)}
                    >
                      đăng ký địa chỉ ở đây!
                    </p>
                  </>
                )}
              </div>
            </div>

            <div className="orderPay-product">
              <table className="orderPay-product-table thead">
                <thead className="orderPay-product-table-thead">
                  <tr className="orderPay-product-table">
                    <th className="product">
                      <p>Sản phẩm</p>
                    </th>
                    <th className="price">Đơn giá</th>
                    <th className="quantity">Số lượng</th>
                    <th className="sum">Thành tiền</th>
                  </tr>
                </thead>
              </table>
              <table className="orderPay-product-table tbody">
                <tbody className="orderPay-product-table">
                  {data &&
                    data.products.map((data: any, index: number) => (
                      <tr key={index + 1}>
                        <td className="product">
                          <div className="product-item">
                            <div className="product-item-img">
                              <img src={data.img} alt="" />
                            </div>
                            <div className="product-item-text">
                              <div className="product-item-text-title">
                                {data.name}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="price">
                          {data.price.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </td>
                        <td className="quantity">{data.quantity}</td>
                        <td className="sum">
                          {" "}
                          {(data.price * data.quantity).toLocaleString(
                            "vi-VN",
                            {
                              style: "currency",
                              currency: "VND",
                            }
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              <div className="orderPay-product-node">
                <form action="" className="orderPay-product-node-form">
                  <div>Lời nhắn:</div>
                  <input
                    style={{ width: 300 }}
                    type="text"
                    placeholder="Lưu ý cho cửa hàng"
                    onChange={(e) => setNote(e.target.value)}
                  />
                </form>
              </div>
              <div className="orderPay-product-total">
                <p>Tổng số tiền ({data.products.length} sản phẩm): </p>
                <div>
                  {new Intl.NumberFormat("vi-VN").format(
                    calculateTotalAmount()
                  )}
                  <span style={{ fontSize: 16, color: "#00575c" }}> VNĐ</span>
                </div>
              </div>
            </div>

            <div className="orderPay-paymentMethods">
              <div className="orderPay-paymentMethods-title">
                <div>Phương thức thanh toán:</div>
                <Radio.Group
                  onChange={onChange}
                  value={paymentMethods_id}
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    columnGap: 10,
                    marginTop: 30,
                  }}
                >
                  {getAllPaymentMethods &&
                    getAllPaymentMethods.map((item) => (
                      <Radio
                        key={item.id}
                        value={item.id}
                        style={{
                          width: 252,
                          height: 172,
                          display: "flex",
                          flexDirection: "column",
                          position: "relative",
                          border: "1px solid #00575c",
                        }}
                      >
                        <img
                          style={{
                            width: 250,
                            height: 170,
                            overflow: "hidden",
                            position: "absolute",
                            top: 0,
                            left: 0,
                          }}
                          src={item.image}
                          alt="ảnh"
                        />
                        <p
                          style={{
                            zIndex: 10,
                            position: "absolute",
                            top: 7,
                            left: 40,
                            color: "#00575c",
                            textShadow:
                              "0 0 0.2em white, 0 0 0.2em white, 0 0 0.2em white",
                          }}
                        >
                          {item.name}
                        </p>
                      </Radio>
                    ))}
                </Radio.Group>
              </div>
              <div className="orderPay-paymentMethods-money">
                <div className="orderPay-paymentMethods-money-item">
                  <div className="orderPay-paymentMethods-money-item-text">
                    Tổng tiền hàng
                  </div>
                  <div className="orderPay-paymentMethods-money-item-price">
                    {new Intl.NumberFormat("vi-VN").format(
                      calculateTotalAmount()
                    )}
                    <span style={{ fontSize: 16, color: "#00575c" }}> VNĐ</span>
                  </div>
                </div>
                <div className="orderPay-paymentMethods-money-item">
                  <div className="orderPay-paymentMethods-money-item-text">
                    Phí vận chuyển
                  </div>
                  <div className="orderPay-paymentMethods-money-item-price">
                    {new Intl.NumberFormat("vi-VN").format(shippingCost)}
                    <span style={{ fontSize: 16, color: "#00575c" }}> VNĐ</span>
                  </div>
                </div>
                <div className="orderPay-paymentMethods-money-item">
                  <div className="orderPay-paymentMethods-money-item-text">
                    Tổng thanh toán
                  </div>
                  <div className="orderPay-paymentMethods-money-item-price">
                    <span style={{ fontSize: 24, color: "#00575c" }}>
                      {new Intl.NumberFormat("vi-VN").format(
                        calculateTotalAmount() + shippingCost ?? 0
                      )}
                    </span>
                    <span style={{ fontSize: 16, color: "#00575c" }}>VNĐ</span>
                  </div>
                </div>
              </div>
              <div className="orderPay-paymentMethods-submit">
                <div className="orderPay-paymentMethods-submit-item">
                  <div className="orderPay-paymentMethods-submit-item-text">
                    Nhấn "Đặt hàng" đồng nghĩa với việc bạn đồng ý tuân theo
                    Điều khoản cửa hàng
                  </div>
                  <div className="orderPay-paymentMethods-submit-item-btn">
                    <Button
                      className="button"
                      loading={isLoadingOrder}
                      onClick={() => onSubmit()}
                    >
                      Đặt hàng
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Modal
          open={open}
          title="Địa chỉ của tôi"
          okText="Xác nhận"
          onOk={OkModal}
          onCancel={() => {
            setOpen(false);
            setOpenAddAddress(false);
            setOpenEditAddress(false);
          }}
          footer={(_, { OkBtn }) => <OkBtn />}
        >
          <Radio.Group
            onChange={onChangeAddress}
            value={value}
            style={{ display: "flex", flexDirection: "column" }}
          >
            {deliveryAddress?.map((item) => (
              <div key={item.id}>
                <div
                  style={{
                    width: "100%",
                    height: 1,
                    backgroundColor: "#e0e0e0",
                    marginTop: 10,
                  }}
                />
                <Radio value={item.id} style={{ margin: 10 }}>
                  <div className="orderPay-address-title-item">
                    <div className="orderPay-address-title-item-user">
                      Họ và tên: {item.name}
                    </div>
                    <div className="orderPay-address-title-item-user">
                      Số điện thoại: {item.phone}
                    </div>
                  </div>
                  <div className="orderPay-address-title-item-user">
                    Điạ chỉ: {item?.address}, {item?.ward}, {item?.district}, {item?.city}
                  </div>
                </Radio>
                <div>
                  <Button onClick={onEdit} className="btn-edit" style={{ marginRight: "1rem" }}>
                    Sửa
                  </Button>
                  <Popconfirm
                    title="Xóa trạng thái."
                    description="Bạn có muốn xóa không?"
                    onConfirm={() =>
                      item.id !== undefined ? confirm(item.id) : undefined
                    }
                    onCancel={cancel}
                    okText="Đồng ý"
                    cancelText="Không"
                  >
                    <Button danger className="btn-delete">
                      Xóa
                    </Button>
                  </Popconfirm>
                </div>
              </div>
            ))}
          </Radio.Group>
          <Button
            onClick={() => {
              setOpen(false);
              setOpenAddAddress(true);
              setOpenEditAddress(false);
            }}
          >
            <PlusOutlined />
            Thêm địa chỉ mới
          </Button>
        </Modal>
        <Modal
          open={openAddAddress}
          title="Thêm Địa chỉ của tôi"
          onCancel={() => {
            form.resetFields();
            setOpen(false);
            setOpenAddAddress(false);
            setOpenEditAddress(false);
          }}
          footer=""
        >
          <Form
            form={form}
            name="validateOnly"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Họ Và Tên"
              name="name"
              rules={[
                { required: true, message: "Vui lòng nhập tên người nhận!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Số Điện Thoại"
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập số điên thoại người nhận!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Tỉnh Thành"
              name="city"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập địa chỉ người nhận!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Quận Huyện"
              name="district"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập địa chỉ người nhận!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Phường Xã"
              name="ward"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập địa chỉ người nhận!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Địa chỉ"
              name="address"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập địa chỉ người nhận!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button loading={isLoading} type="primary" htmlType="submit">
                Thêm mới
              </Button>
            </Form.Item>
          </Form>
        </Modal>

        {/* sửa địa chỉ */}

        <Modal
          open={openEditAddress}
          title="Sửa chỉ của tôi"
          onCancel={() => {
            form.resetFields();
            setOpen(false);
            setOpenAddAddress(false);
            setOpenEditAddress(false);
          }}
          footer=""
        >
          <Form
            form={form}
            name="validateOnly"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 16 }}
            initialValues={{
              name: EditAddress.name,
              phone: EditAddress.phone,
              city: EditAddress.city,
              district: EditAddress.district,
              ward: EditAddress.ward,
              address: EditAddress.address,
            }}
            onFinish={onFinishEdit}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Họ Và Tên"
              name="name"
              rules={[
                { required: true, message: "Vui lòng nhập tên người nhận!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Số Điện Thoại"
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập số điên thoại người nhận!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Tỉnh Thành"
              name="city"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập địa chỉ người nhận!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Quận Huyện"
              name="district"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập địa chỉ người nhận!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Phường Xã"
              name="ward"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập địa chỉ người nhận!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Địa chỉ"
              name="address"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập địa chỉ người nhận!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button type="primary" htmlType="submit">
                Cập Nhật
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </>
    )
  );
};

export default OrderPay;
