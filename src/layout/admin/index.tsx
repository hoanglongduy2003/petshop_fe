import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/scss/layout/admin/index.scss";
import "../../assets/scss/layout/admin/sidebar.scss";
import { useGetUserQuery } from "../../services/user";
import Sidebar from "./Sidebar";
import Content from "./content";
type Props = {};

const LayoutAdmin: FC<Props> = () => {
  // const navigate = useNavigate();
  // const { data: user, isLoading } = useGetUserQuery();
  // useEffect(() => {
  //   if (!isLoading) {
  //     if (!user) {
  //       navigate("/signin");
  //     } else if (user.role_id !== 1 && user.role_id !== 10) {
  //       navigate("/");
  //     }
  //   }
  // }, [user, navigate, isLoading]);

  return (
    <div>
      <div className="app">
        <Sidebar />
        <Content />
      </div>
    </div>
  );
};

export default LayoutAdmin;
