import { useNavigate } from "react-router-dom";
import User from "../../assets/image/user.png";
import "../../assets/scss/layout/admin/modal.scss";
import LogoutIcon from "../../assets/svg/logOut";
import UserIcon from "../../assets/svg/userIcon";
import { useGetUserQuery } from "../../services/user";

type Props = {};

const ModalUser = (props: Props) => {
  const { data: user } = useGetUserQuery();
  const navigate = useNavigate();
  const logout = async () => {
    await localStorage.removeItem("token");
    window.location.reload();
    // navigate("/signin");
  };
  return (
    <div className="model-user">
      <div className="model-user-title">
        <div className="model-user-title-image">
          {user?.img ? (
            <img src={user?.img} alt="user" />
          ) : (
            <img src={User} alt="user" />
          )}
        </div>
        <div className="model-user-title-text">
          <div className="name">{user?.name}</div>
          <div className="role">{user?.nameRole}</div>
        </div>
      </div>
      <hr />
      <div className="model-user-content">
        <div className="model-user-content-item">
          <div>
            <UserIcon />
          </div>
          <div>Hồ sơ</div>
        </div>
      </div>
      <hr />
      <div
        className="model-user-logout"
        onClick={() => {
          logout();
        }}
      >
        <div>
          <LogoutIcon />
        </div>
        <div>Đăng xuất</div>
      </div>
    </div>
  );
};

export default ModalUser;
