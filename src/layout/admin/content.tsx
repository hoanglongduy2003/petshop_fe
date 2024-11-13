import { Outlet } from "react-router-dom";
import "../../assets/scss/layout/contentAdmin/content.scss"
import ContentTop from "./contentTop";
const Content = () => {
  return (
    <div className='main-content'>
      <ContentTop />
      <Outlet />
    </div>
  )
}

export default Content
