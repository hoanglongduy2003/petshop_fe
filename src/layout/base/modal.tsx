import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import User from "../../assets/image/user.png";
import "../../assets/scss/layout/admin/modal.scss";
import LogoutIcon from "../../assets/svg/logOut";
import UserIcon from "../../assets/svg/userIcon";
import { useGetUserQuery } from "../../services/user";
import { Login } from "@mui/icons-material";

type Props = {};

const ModalUser = (props: Props) => {
  const { data: userCall } = useGetUserQuery();
  const [user, setUser] = useState<any>();
  const token = localStorage.getItem("token");

  const navigate = useNavigate();
  const logout = async () => {
    localStorage.removeItem('DateTime');
    localStorage.removeItem("token");
    await new Promise(resolve => setTimeout(resolve, 0));
  };
  const someFunction = async () => {
    await logout();
    window.location.reload();
  };
  useEffect(() => {
    if(token){
      setUser(userCall)
    }
  }, [token, userCall]);
  return (
    <div className="model-user">
      {user ? (
        <>
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
            <div
              className="model-user-content-item"
              onClick={() => navigate("account")}
            >
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
              someFunction();
            }}
          >
            <div>
              <LogoutIcon />
            </div>
            <div>Đăng xuất</div>
          </div>
        </>
      ) : (
        <div className="model-user-btn">
          <div className="model-user-content">
            <div
              className="model-user-content-item"
              onClick={() => navigate("signin")}
            >
              <div>
                <Login />
              </div>
              <div>Đăng nhập</div>
            </div>
          </div>
          <hr />
          <div
            className="model-user-logout dk"
            onClick={() => navigate("signup")}
          >
            <div>Đăng ký</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalUser;
