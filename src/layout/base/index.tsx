import { FC } from "react";
import HeaderBase from "./header";
import FooterBase from "./footer";
import { Outlet } from "react-router-dom";

const LayoutBase: FC = () => {
  return (
    <>                                                                                                                                   
      <HeaderBase />
      <Outlet />
      <FooterBase />
    </>
  );
};
export default LayoutBase;
