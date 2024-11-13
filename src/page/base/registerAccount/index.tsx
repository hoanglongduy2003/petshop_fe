import { useFormik } from "formik";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../../assets/image/logo.png";
import "../../../assets/scss/page/registerAccount.scss";
import EyesCloseIcon from "../../../assets/svg/eyesCloseIcon";
import banner from "../../../assets/image/background.png";
import EyesOpenIcon from "../../../assets/svg/eyesOpenIcon";
import {
  RegisterAccountSchema,
  TRegisterAccount,
} from "../../../schema/registerAccount";
import { useRegisterUserMutation } from "../../../services/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGetAllWebsiteInformationQuery } from "../../../services/websiteInformation";

const RegisterAccount = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { data: listWebsiteInformation } = useGetAllWebsiteInformationQuery();

  const [registerForm] = useRegisterUserMutation();

  const formik = useFormik<TRegisterAccount>({
    initialValues: {
      email: location.state.email,
      name: "",
      password: "",
      phone: "",
      address: "",
    },
    validationSchema: RegisterAccountSchema,
    onSubmit: async (values) => {
      if (!values.address) {
        formik.setFieldError("address", "Vui lòng nhập địa chỉ");
        toast.error("Vui lòng nhập địa chỉ");
        return;
      }
      try {
        const response = await registerForm(values);
        if ("error" in response) {
          formik.setFieldError("email", "Email đã tồn tại");
          toast.error("Email đã tồn tại");
        } else {
          toast.success("Đăng ký thành công");
          setTimeout(() => {
            navigate("/signin");
          }, 2000);
        }
      } catch (error) {
        console.error("Lỗi", error);
      }
    },
  });

  return (
    <div className="registerAccount">
      <div className="singUp-top">
        <img
          src={
            listWebsiteInformation &&
            listWebsiteInformation.length > 0 &&
            typeof listWebsiteInformation[0]?.logo === "string"
              ? listWebsiteInformation[0]?.logo
              : undefined
          }
          alt="Ảnh logo"
          className="signup_logo"
        />
        <Link to="" className="help">
          Trợ giúp?
        </Link>
      </div>
      <div className="singUp-bottom">
        <img className="img-bg" src={banner} alt="" />
        <form className="f-singUp" onSubmit={formik.handleSubmit}>
          <h1>Điền thông tin tài khoản</h1>
          <p className="new-to-account">
            Bạn đã có tài khoản?
            <Link to="/signin" className="text-login">
              Đăng nhập
            </Link>
          </p>
          <div className="input-flex">
            <input
              className="btn-f-input"
              type="email"
              disabled={true}
              placeholder="Email"
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <input
              className="btn-f-input"
              type="text"
              placeholder="Tên tài khoản"
              id="name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />{" "}
            {formik.touched.name && formik.errors.name && (
              <div className="error">{formik.errors.name}</div>
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
            <input
              className="btn-f-input"
              type="text"
              placeholder="Số điện thoại"
              id="phone"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.phone && formik.errors.phone && (
              <div className="error">{formik.errors.phone}</div>
            )}
            <input
              className="btn-f-input"
              type="text"
              placeholder="Địa chỉ"
              id="address"
              name="address"
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>

          <button className="btn-submit" type="submit">
            tiếp theo
          </button>
          <p className="rule">
            Bằng việc đăng ký, bạn đồng ý với
            <Link to="" className="rule-click">
              Điều khoản dịch vụ
            </Link>
            &
            <Link to="" className="rule-click">
              Chính sách quyền riêng tư
            </Link>
            của Meow
          </p>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default RegisterAccount;
