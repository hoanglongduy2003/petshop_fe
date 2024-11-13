import { Dropdown } from "antd";
import { useContext } from "react";
import User from "../../assets/image/user.png";
import "../../assets/scss/layout/contentAdmin/contentTop.scss";
import BellIcon from "../../assets/svg/belIIcon";
import MenuIcon from "../../assets/svg/menuIcon";
import { SidebarContext } from "../../context/sidebarContext";
import { useGetUserQuery } from "../../services/user";
import ModalUser from "./modal";

const ContentTop: React.FC = () => {
  const { toggleSidebar } = useContext<any>(SidebarContext);

  const { data: user } = useGetUserQuery();

  return (
    <div className="content-top">
      <div className="content-top-left">
        <button
          type="button"
          className="sidebar-toggler"
          onClick={() => toggleSidebar()}
        >
          <MenuIcon />
        </button>
      </div>
      <div className="content-top-btn">
        <button className="notification-btn content-top-btn">
          <BellIcon />
          <span className="notification-btn-dot" />
        </button>
        <div className="notification-user">
          <Dropdown
            overlay={<ModalUser />}
            placement="bottomLeft"
            arrow={{ pointAtCenter: true }}
          >
            <div>
              {user?.img ? (
                <img
                  src={user?.img}
                  width="25px"
                  height="25px"
                  style={{ borderRadius: "50%", marginLeft: "18px" }}
                  alt="avatar"
                />
              ) : (
                <img
                  src={User}
                  width="25px"
                  height="25px"
                  style={{ borderRadius: "50%", marginLeft: "18px" }}
                  alt="user"
                />
              )}
            </div>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default ContentTop;
