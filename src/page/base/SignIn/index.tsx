import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "../../../assets/scss/page/SignIn.scss";
import { SignInRequestSchema, TSignIn } from "../../../schema/signIn";

import { message } from "antd";
import banner from "../../../assets/image/background.png";
import EyesCloseIcon from "../../../assets/svg/eyesCloseIcon";
import EyesOpenIcon from "../../../assets/svg/eyesOpenIcon";
import { useLoginUserMutation } from "../../../services/auth";
import { useGetUserQuery } from "../../../services/user";
import { useGetAllWebsiteInformationQuery } from "../../../services/websiteInformation";

const SignIn = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loginForm] = useLoginUserMutation();
  const { data: user, isLoading, isError, isSuccess } = useGetUserQuery();
  const currentTime = new Date().getTime();
  const { data: listWebsiteInformation } = useGetAllWebsiteInformationQuery();

  useEffect(() => {
    if (!isLoading) {
      if (isSuccess) {
        if (user?.role_id === 1 || user?.role_id === 10) {
          navigate("/admin");
        } else {
          navigate("/");
        }
      }
    }
  }, [isError, isLoading, isSuccess, navigate, user?.role_id]);

  const formik = useFormik<TSignIn>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: SignInRequestSchema,
    onSubmit: async (values: any) => {
      try {
        const response = await loginForm(values);
        if ("error" in response) {
          message.error("Tài khoản mật khẩu không chính xác");
        } else {
          const userRoleId = response.data?.user?.role_id;
          if (userRoleId === 3) {
            message.error("Tải khoản bị khóa");
          } else {
            localStorage.setItem("DateTime", String(currentTime));
            await localStorage.setItem("token", response.data?.accessToken);
            console.log(response)
            message.success("Đăng nhập thành công");
            setTimeout(() => {
              userRoleId === 1 || userRoleId === 10
                ? navigate("/admin")
                : navigate("/");
            }, 100);
          }
        }
      } catch (error) {
        console.error("Lỗi", error);
      }
    },
  });
  return (
    <div className="singIn">
      <div className="singin-top">
        <Link to="/">
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
        <Link to="/contact" className="help">
          Trợ giúp?
        </Link>
      </div>
      <div className="singin-bottom">
        <img className="img-bg" src={banner} alt="" />
        <form className="f-singin" onSubmit={formik.handleSubmit}>
          <h1>Đăng nhập</h1>

          <p className="new-to-account">
            Bạn chưa có tài khoản?
            <Link to="/signup" className="text-login">
              Đăng kí
            </Link>
          </p>
          <div className="input-flex">
            <input
              className="btn-f "
              type="text"
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Nhập email của bạn "
            />
            {formik.touched.email && formik.errors.email && (
              <div className="error">{formik.errors.email}</div>
            )}
            <div className="btn-f-input-password">
              <input
                className="btn-f-input-password-1"
                type={showPassword ? "text" : "password"}
                placeholder="Mật khẩu"
                id="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <div onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyesOpenIcon /> : <EyesCloseIcon />}
              </div>
            </div>
            {formik.touched.password && formik.errors.password && (
              <div className="error">{formik.errors.password}</div>
            )}
          </div>

          <button className="btn-f bg-submit" type="submit">
            đăng nhập
          </button>

          <div className="forgot-phone">
            <p
              onClick={() => navigate("/forgotPassword")}
              className="text-login"
            >
              Quên mật khẩu
            </p>
            <p onClick={() => navigate("/signup")} className="text-login">
              Đăng ký
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
export default SignIn;
