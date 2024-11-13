import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../assets/image/logo.png";
import "../../../assets/scss/page/signUp.scss";
import AppleIcon from "../../../assets/svg/appleIcon";
import FacebookIcon2 from "../../../assets/svg/facebookIcon2";
import GoogleIcon from "../../../assets/svg/googleIcon";
import { SignUpRequestSchema, TSignUp } from "../../../schema/signUp";
import banner from "../../../assets/image/background.png";
import { useGetAllWebsiteInformationQuery } from "../../../services/websiteInformation";

const SignUp = () => {
  const navigate = useNavigate();
  const { data: listWebsiteInformation } = useGetAllWebsiteInformationQuery();

  const formik = useFormik<TSignUp>({
    initialValues: {
      email: "",
    },
    validationSchema: SignUpRequestSchema,
    onSubmit: (values) => {
      navigate("/RegisterAccount", { state: values });
    },
  });

  return (
    <div className="signUp">
      <div className="singUp-top">
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
      <div className="singUp-bottom">
        <img className="img-bg" src={banner} alt="" />
        <form className="f-singUp" onSubmit={formik.handleSubmit}>
          <h1>Đăng ký</h1>
          <br />
          <p>
            Bạn đã có tài khoản?
            <Link to="/signin" className="text-login">
              Đăng nhập
            </Link>
          </p>
          <div className="input-flex">
            <input
              style={{ marginTop: "10px" }}
              className="btn-f"
              type="text"
              placeholder="Số điện thoại/Tên tài khoản/Email"
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="error">{formik.errors.email}</div>
            )}
          </div>
          <button className="btn-f bg-submit" type="submit">
            tiếp theo
          </button>
          <br />
          {/* <div className="or">
            <div className="or-border" />
            <div className="or-title">Hoặc</div>
            <div className="or-border" />
          </div> */}

          <div className="btn-flex">
            {/* <button className="btn-f bg-with">
              <GoogleIcon />
              <Link to="" className="google">
                Đăng nhập bằng google
              </Link>
            </button>
            <button className="btn-f bg-with">
              <FacebookIcon2 />
              <Link to="" className="google">
                Đăng nhập bằng facebook
              </Link>
            </button>
            <button className="btn-f bg-with">
              <AppleIcon />
              <Link to="" className="google">
                Đăng nhập bằng Apple
              </Link>
            </button> */}
          </div>
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
    </div>
  );
};

export default SignUp;
