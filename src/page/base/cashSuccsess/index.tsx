import { Result, Button } from "antd";
import { Link } from "react-router-dom";

const PaymentCashPage = () => {
  return (
    <Result
      status="success"
      title="Thanh toán thành công!"
      subTitle="Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi."
      extra={[
        <Link to="/account" key="home-link">
          <Button>Xem lại hóa đơn </Button>
        </Link>,
      ]}
    />
  );
};

export default PaymentCashPage;
