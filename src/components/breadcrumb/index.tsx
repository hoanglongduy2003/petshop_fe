import { Link } from "react-router-dom";
import "../../../src/assets/scss/page/account/account.scss";

interface IBreadcrumb {
  link?: string;
  nameLink?: string;
    name: string | undefined;
}

const Breadcrumb = ({ link, nameLink , name}: IBreadcrumb) => {
  return (
    <div className="breadcumb">
      <Link className="" to="/" style={{textDecoration : "none"}}>
        <div className="home">Trang chủ</div>
      </Link>

      {link && (
        <>
          <div className="slash">/</div>
          <Link className="hover:text-alizarin-crimson" to={link} style={{textDecoration : "none"}}>
            {nameLink}
          </Link>
        </>
      )}
      <div className="slash">/</div>
      <p className="text-alizarin-crimson cursor-pointer">{name}</p>
    </div>
  );
};

export default Breadcrumb;
