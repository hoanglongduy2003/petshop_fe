import { useFormik } from "formik";
import { Link } from "react-router-dom";
import logo from "../../../../assets/image/logo.png";
import "../../../../assets/scss/page/resetPassword.scss";
import AppleIcon from "../../../../assets/svg/appleIcon";
import FacebookIcon from "../../../../assets/svg/facebookIcon";
import GoogleIcon from "../../../../assets/svg/googleIcon";
import {
  ResetPassRequestSchema,
  TResetPass,
} from "../../../../schema/resetPassword";
import { useEmailPasswordUserMutation } from "../../../../services/auth";
import { useGetAllWebsiteInformationQuery } from "../../../../services/websiteInformation";

const ForgotPassword = () => {
  const [resetPassword] = useEmailPasswordUserMutation();
  const { data: listWebsiteInformation } = useGetAllWebsiteInformationQuery();

  const formik = useFormik<TResetPass>({
    initialValues: {
      email: "",
    },
    validationSchema: ResetPassRequestSchema,
    onSubmit: async (values) => {
      try {
        const response = await resetPassword(values);
        if ("error" in response) {
          alert("Tài khoản mật khẩu không chính xác");
        } else {
          localStorage.setItem("user", JSON.stringify(response.data));
          alert("Vui lòng check mail");
        }
      } catch (error) {
        console.error("Lỗi", error);
      }
    },
  });

  return (
    <div className="resetPassword">
      <div className="resetPassword-top">
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
        <Link to="" className="help">
          Trợ giúp?
        </Link>
      </div>
      <div className="resetPassword-bottom">
        <div className="f-resetPassword">
          <form className="" onSubmit={formik.handleSubmit}>
            <h1>Quên mật Khẩu</h1>
            <br />

            <div className="input-flex">
              <input
                className="btn-f"
                type="text"
                placeholder="Email"
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
              Gửi
            </button>
          </form>
          <br />
          {/* <div className="or">
            <div className="or-border" />
            <div className="or-title">Hoặc</div>
            <div className="or-border" />
          </div> */}

          <div className="btn-flex">
            {/* <button className="btn-f bg-with">
              <GoogleIcon />
              <Link to="" className="social">
                Đăng nhập bằng google
              </Link>
            </button>
            <button className="btn-f bg-with">
              <FacebookIcon />
              <Link to="" className="social">
                Đăng nhập bằng facebook
              </Link>
            </button>
            <button className="btn-f bg-with">
              <AppleIcon />
              <Link to="" className="social">
                Đăng nhập bằng Apple
              </Link>
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
