import { Menu, MenuProps } from "antd";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "../../../../assets/scss/page/account/account.scss";
import Breadcrumb from "../../../../components/breadcrumb";
import logo from "../../../../assets/image/logo.png";
import { useGetUserQuery } from "../../../../services/user";
type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem(<Link to={"/account"}>Thông tin</Link>, "account"),
  getItem("Đơn hàng", "sub2", null, [
    getItem(<Link to={"to-pay"}>Chờ xác nhận</Link>, "10"),
    getItem(<Link to={"to-ship"}>Chờ lấy hàng</Link>, "11"),
    getItem(<Link to={"to-receive"}>Chờ giao hàng</Link>, "12"),
    getItem(<Link to={"completed"}>Đã giao</Link>, "13"),
    getItem(<Link to={"cancelled"}>Đã hủy</Link>, "14"),
    getItem(<Link to={"return-refund"}>Trả hàng</Link>, "15"),
  ]),
];

const AccountPage = () => {
  const navigate = useNavigate();
  const { data: user } = useGetUserQuery();

  if (!user) {
    return (
      <div style={{ width: "50%", margin: "0 auto" }}>
        <p style={{ textAlign: "center" }}>Bạn chưa đăng nhập.</p>
        <img style={{ width: "100%" }} src={logo} alt="logo" />
        <p className="link" onClick={() => navigate("/SignIn")}>
          Đăng nhập ngay tại đây!
        </p>
      </div>
    );
  }
  return (
    <div className="account_info">
      <div className="account_info-row">
        <h4 className="account_info-heading">Tài Khoản</h4>
      </div>
      <div className="account_info-row">
        <div className="account_info-col col_1">
          <Menu defaultSelectedKeys={["1"]} mode="inline" items={items} />
        </div>
        <div className="account_info-col col_2">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
