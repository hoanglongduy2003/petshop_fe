import { useFormik } from "formik";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import banner from "../../../../assets/image/background.png";
import logo from "../../../../assets/image/logo.png";
import "../../../../assets/scss/page/SignIn.scss";
import AppleIcon from "../../../../assets/svg/appleIcon";
import EyesCloseIcon from "../../../../assets/svg/eyesCloseIcon";
import EyesOpenIcon from "../../../../assets/svg/eyesOpenIcon";
import FacebookIcon from "../../../../assets/svg/facebookIcon";
import GoogleIcon from "../../../../assets/svg/googleIcon";
import {
  ResetPasswordSchema,
  TResetPassword,
} from "../../../../schema/resetPassword";
import { useResetPasswordUserMutation } from "../../../../services/user";

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [resetPassword] = useResetPasswordUserMutation();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const email = searchParams.get("email") || "";
  const token = searchParams.get("token") || "";
  const formik = useFormik<TResetPassword>({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: ResetPasswordSchema,
    onSubmit: async (values: any) => {
      try {
        const data = {
          ...values,
          email,
          token,
        };
        const response = await resetPassword(data);
        if ("error" in response) {
          alert("Đổi mật khẩu thất bại");
        } else {
          alert("Đổi mật khẩu Thành công");
        }
      } catch (error) {
        navigate("/signin");
      }
    },
  });
  return (
    <div className="singIn">
      <div className="singin-top">
        <img src={logo} alt="logo" />
        <Link to="" className="help">
          Trợ giúp?
        </Link>
      </div>
      <div className="singin-bottom">
        <img className="img-bg" src={banner} alt="" />
        <form className="f-singin" onSubmit={formik.handleSubmit}>
          <h1>Mật khẩu mới</h1>
          <div className="input-flex">
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

            <div className="btn-f-input-password">
              <input
                className="btn-f-input-password-1"
                type={showPassword ? "text" : "password"}
                placeholder="Nhập lại mật khẩu"
                id="confirmPassword"
                name="confirmPassword"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <div onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyesOpenIcon /> : <EyesCloseIcon />}
              </div>
            </div>
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <div className="error">{formik.errors.confirmPassword}</div>
              )}
          </div>

          <button className="btn-f bg-submit" type="submit">
            đăng nhập
          </button>

          <div className="forgot-phone">
            <Link to="" className="text-login">
              Quên mật khẩu
            </Link>
            <Link to="" className="text-login">
              Login with phone number
            </Link>
          </div>
          <br />

          {/* <div className="or">
            <div className="or-border" />
            <div className="or-title">Hoặc</div>
            <div className="or-border" />
          </div> */}

          <div className="btn-flex">
            {/* <button className="btn-f bg-with">
              <GoogleIcon />
              <Link to="" className="login-icon-with">
                Đăng nhập bằng google
              </Link>
            </button>
            <button className="btn-f bg-with">
              <FacebookIcon />
              <Link to="" className="login-icon-with">
                Đăng nhập bằng facebook
              </Link>
            </button>
            <button className="btn-f bg-with">
              <AppleIcon />
              <Link to="" className="login-icon-with">
                Đăng nhập bằng Apple
              </Link>
            </button> */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
