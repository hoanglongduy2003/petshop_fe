import React from "react";
import "../../assets/scss/page/pageNotFound.scss"
import { Link, useNavigate } from "react-router-dom";
type Props = {};

const PageNotFound = (props: Props) => {
  const navigate = useNavigate();
  setTimeout(() => {
    navigate("/");
  }, 5000);
  return (
    <section className="pageNotFound">
      <div className="">
        <div className="row">
          <div className="col-sm-12 ">
            <div className="col-sm-10 col-sm-offset-1">
              <div  className="bg">
                <h1>404</h1>
              </div>

              <div className="text">
                <h3 className="text-7xl">Trang không khả dụng</h3>

                <p className="mt-12">
                  Xem lại đường dẫn của mình hoặc có thể click về trang chủ
                </p>

                <Link
                  to="/"
                  className="btn text-white p-5 rounded-3xl bg-green-500 m-[20px 0] inline-block mt-12"
                >
                  Trở về trang chủ
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PageNotFound;
