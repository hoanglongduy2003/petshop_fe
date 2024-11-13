import { Dropdown } from "antd";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/image/logo.png";
import User from "../../assets/image/user.png";
import "../../assets/scss/layout/base/headerBase.scss";
import MenuIcon from "../../assets/svg/menuIcon";
import RightIcon from "../../assets/svg/rightIcon";
import SearchIcon from "../../assets/svg/searchIcon";
import ShoppingCartIcon from "../../assets/svg/shoppingCartIcon";
import { useGetUserListCartsQuery } from "../../services/shoppingCart";
import { useGetUserQuery } from "../../services/user";
import ModalUser from "./modal";
import { useMenuQuery } from "../../services/menu";
import { useGetAllWebsiteInformationQuery } from "../../services/websiteInformation";
import { useGetAllBannerQuery } from "../../services/banner";

const HeaderBase = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data: user } = useGetUserQuery();
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [isWideScreen, setIsWideScreen] = useState(false);
  const { data: carts } = useGetUserListCartsQuery();
  const { data: menuData } = useMenuQuery();
  const { data: listWebsiteInformation } = useGetAllWebsiteInformationQuery();
  const { data: listBanner } = useGetAllBannerQuery();

  useEffect(() => {
    setOpenMenu(false);
  }, [location]);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      setIsWideScreen(screenWidth > 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    if (isWideScreen) {
      setOpenMenu(false);
    }
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isWideScreen]);
  const handleSearch = () => {

  }
  const filteredMenuDataTop =
    menuData && menuData?.filter((item) => item.menuType_id === 5);
  const filteredMenuDataMain =
    menuData && menuData?.filter((item) => item.menuType_id === 6);

  const handleBookAppointmentClick = () => {
    navigate(
      listBanner && listBanner.length > 0 && listBanner[0].link
        ? listBanner[0].link
        : "/default-link",
      {
        state: {
          appointmentData: {
            pets: [],
            services: [],
            type: 1,
          },
        },
      }
    );
  };
  return (
    <div className="headerBase">
      <div className="frame32">
        {filteredMenuDataTop &&
          filteredMenuDataTop?.map((item) => (
            <p key={item.id}>
              {item.link ? (
                <Link className="frame32-title" to={item.link}>
                  {item.name}
                </Link>
              ) : (
                <button
                  className="title-button"
                  onClick={handleBookAppointmentClick}
                >
                  <div>{item.name}</div>
                </button>
              )}
            </p>
          ))}
        {user ? (
          <p className="frame32-title">
            Xin chào: <span className="hello_login">{user.name}</span>
          </p>
        ) : (
          <p>
            <Link to="/signin" className="help">
              Đăng nhập
            </Link>
          </p>
        )}
      </div>
      <div className="nav">
        <div className="menu" onClick={() => setOpenMenu(!openMenu)}>
          <MenuIcon />
        </div>
        <Link className="logo" to="">
          <img
            src={
              listWebsiteInformation &&
                listWebsiteInformation.length > 0 &&
                typeof listWebsiteInformation[0]?.logo === "string"
                ? listWebsiteInformation[0]?.logo
                : undefined
            }
            alt="Ảnh logo"
          />
        </Link>
        <form
          className="frame31" 
          onSubmit={(e) => { e.preventDefault(); handleSearch(); }}
          >
          <SearchIcon />
          <input
            className="frame33"
            type="text"
            placeholder="Chúng tôi có thể giúp gì cho bạn tìm thấy?"
          />
          <button className="Rectangle29">TÌM KIẾM</button>
        </form>
        <form className="frame31-1">
          <input
            className="frame33"
            type="text"
            placeholder="Chúng tôi có thể giúp gì cho bạn tìm thấy?"
          />
          <button className="Rectangle29">
            <SearchIcon />
          </button>
        </form>
        <form className="frame31-2">
          <input className="frame33" type="text" placeholder="Tìm kiếm" />
          <button className="Rectangle29">
            <SearchIcon />
          </button>
        </form>
        <div className="frame51">
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
          <div className="frame5" onClick={() => navigate("shoppingCart")}>
            <ShoppingCartIcon />
            <div className="group13">{carts?.length || 0}</div>
          </div>
        </div>
      </div>
      <div className="frame52">
        <ul className="menu">
          <li className="menu-title">
            <Link className="title1" to={`/`}>
              TRANG CHỦ
            </Link>
          </li>
          <li className="menu-title">
            <Link className="title1" to={`/product`}>
              SẢN PHẨM
            </Link>
          </li>
          <li className="menu-title">
            <Link className="title1" to={`/about`}>
              GIỚI THIỆU
            </Link>
          </li>
          <li className="menu-title">
            <Link className="title1" to={`/news`}>
              TIN TỨC
            </Link>
          </li>
          <li className="menu-title">
            <Link className="title1" to={`/contact`}>
              LIÊN HỆ
            </Link>
          </li>
          <li className="menu-title">
            <button
              className="title-button"
              onClick={() =>
                navigate(
                  listBanner && listBanner.length > 0 && listBanner[0].link
                    ? listBanner[0].link
                    : "/default-link",
                  {
                    state: {
                      appointmentData: {
                        pets: [],
                        services: [],
                        type: 1,
                      },
                    },
                  }
                )
              }
            >
            </button>
          </li>
        </ul>
      </div>
      <div
        className="menu-2"
        style={{ marginLeft: openMenu ? "0px" : "-300px" }}
      >
        <div className="box">
          <div className="menu" onClick={() => setOpenMenu(!openMenu)}>
            <MenuIcon />
          </div>
          <Link className="logo" to={""}>
            <img className="logo-image" src={logo} alt="Logo" />
          </Link>
        </div>
        <ul className="menu">
          <li className="menu-title">
            <button
              className="title-button"
              onClick={() =>
                navigate(
                  listBanner && listBanner.length > 0 && listBanner[0].link
                    ? listBanner[0].link
                    : "/default-link",
                  {
                    state: {
                      appointmentData: {
                        pets: [],
                        services: [],
                        type: 1,
                      },
                    },
                  }
                )
              }
            >
              <div>ĐẶT LỊCH CHĂM SÓC</div>
            </button>
            <RightIcon />
          </li>
          <li className="menu-title">
            <Link className="title1" to={"/product"}>
              SẢN PHẨM CHO THÚ CƯNG
            </Link>
            <RightIcon />
          </li>
          <li className="menu-title">
            <Link className="title1" to={"/services"}>
              LOẠI DỊCH VỤ
            </Link>
            <RightIcon />
          </li>
          <li className="menu-title">
            <Link className="title1" to={""}>
              NHÀ CHO MÈO
            </Link>
            <RightIcon />
          </li>
          <li className="menu-title">
            <Link className="title1" to={""}>
              MÁY ĂN CHO MÈO
            </Link>
            <RightIcon />
          </li>
        </ul>
      </div>
      {openMenu && (
        <div
          onClick={() => {
            setOpenMenu(false);
          }}
          className="background"
        />
      )}
    </div>
  );
};
export default HeaderBase;
