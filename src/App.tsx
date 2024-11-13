import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";

import Follow from "./components/account_info/follow";
import Pay from "./components/account_info/pay";
import LayoutAdmin from "./layout/admin";
import LayoutBase from "./layout/base";
import Account from "./page/base/account/account/account";

import Home from "./page/base/home";
import SignUp from "./page/base/signUp";

import DashBoard from "./page/admin/dashboard";
import StatusAdmin from "./page/admin/status_appointment/list";

import SignIn from "./page/base/SignIn";
import AccountPage from "./page/base/account/account";
import ForgotPassword from "./page/base/account/forgotPassword";
import ResetPassword from "./page/base/account/resetPassword";
import Appointments from "./page/base/appointments";
import ListProduct from "./page/base/listProduct";
import RegisterAccount from "./page/base/registerAccount";

import AddAbout from "./page/admin/about/add";
import EditAbout from "./page/admin/about/edit";
import AboutAdmin from "./page/admin/about/list";
import AppointmentsAdmin from "./page/admin/appointments/list";
import AddBreed from "./page/admin/breed/add";
import EditBreed from "./page/admin/breed/edit";
import BreedAdmin from "./page/admin/breed/list";
import ContactAdmin from "./page/admin/contact/list";
import AddNews from "./page/admin/news/add";
import NewsAdmin from "./page/admin/news/list";
import AddPetHouse from "./page/admin/pethouse/add";
import EditPetHouse from "./page/admin/pethouse/edit";
import PethouseAdmin from "./page/admin/pethouse/list";
import PetsAdmin from "./page/admin/pets/list";

import ReviewAdmin from "./page/admin/review/list";
import AddRoleAdmin from "./page/admin/role/add";
import EditRole from "./page/admin/role/edit";
import RoleAdmin from "./page/admin/role/list";
import AddService from "./page/admin/services/add";
import EditService from "./page/admin/services/edit";
import ServicesAdmin from "./page/admin/services/list";
import AddSpecies from "./page/admin/species/add";
import EditSpecies from "./page/admin/species/edit";
import SpeciesAdmin from "./page/admin/species/list";
import EditStaff from "./page/admin/staff/edit";
import StaffAdmin from "./page/admin/staff/list";
import AddStatusAdmin from "./page/admin/status_appointment/add";
import EditStatus from "./page/admin/status_appointment/edit";
import AddStatusContactAdmin from "./page/admin/status_contact/add";
import EditStatusContact from "./page/admin/status_contact/edit";
import StatusContactAdmin from "./page/admin/status_contact/list";
import EditUser from "./page/admin/user/edit";
import UserAdmin from "./page/admin/user/list";
import { useEffect, useState } from "react";
import AddPetPage from "./components/account_info/addpet";
import AccomplishedAppointment from "./components/account_info/appointment/accomplished";
import CancelledAppointment from "./components/account_info/appointment/cancelledAppointment";
import ConfirmedAppointment from "./components/account_info/appointment/confirmed";
import DoingAppointment from "./components/account_info/appointment/doing";
import WaitForConfirmation from "./components/account_info/appointment/wait-for-confirmation";
import EditPetPage from "./components/account_info/editpet";
import PetUser from "./components/account_info/pet";
import AppointmentEdit from "./page/admin/appointments/edit";
import AddBanner from "./page/admin/banner/add";
import EditBanner from "./page/admin/banner/edit";
import EditFooterAdmin from "./page/admin/footer/edit";
import BannerAdmin from "./page/admin/banner/list";
import FooterAdmin from "./page/admin/footer/list";
import AddCategory from "./page/admin/category/add";
import EditCategory from "./page/admin/category/edit";
import CategoryAdmin from "./page/admin/category/list";
import EditContact from "./page/admin/contact/edit";
import EditNews from "./page/admin/news/edit";
import AddProduct from "./page/admin/products/add";
import EditProduct from "./page/admin/products/edit";
import ProductsAdmin from "./page/admin/products/list";
import AddStatusOrderAdmin from "./page/admin/status_order/add";
import EditStatusOrder from "./page/admin/status_order/edit";
import StatusOrderAdmin from "./page/admin/status_order/list";
import AddStatusPetAdmin from "./page/admin/status_pet/add";
import EditStatusPet from "./page/admin/status_pet/edit";
import StatusPetAdmin from "./page/admin/status_pet/list";
import MenuTypeAdmin from "./page/admin/menuType/list";
import PaymentPage from "./page/base/Payment";
import CallbackVNPAY from "./page/base/callback";
import CartPage from "./page/base/cart";
import DetailProduct from "./page/base/detailProduct";
import PageNotFound from "./page/pageNotFound";
import AppointmentsAdd from "./page/admin/appointments/add";
import ShoppingCart from "./page/base/shoppingCart";
import AddMenuTypeAdmin from "./page/admin/menuType/add";
import EditMenuType from "./page/admin/menuType/edit";
import MenuAdmin from "./page/admin/menu/list";
import AddMenuAdmin from "./page/admin/menu/add";
import EditMenuAdmin from "./page/admin/menu/edit";
import WebsiteInformationAdmin from "./page/admin/websiteInformation/list";
import EditWebsiteInformationAdmin from "./page/admin/websiteInformation/edit";
import OrderPay from "./page/base/orderPay";
import PaymentCashPage from "./page/base/cashSuccsess";
import OrderAdmin from "./page/admin/order";
import DetailOrderAdmin from "./page/admin/order/detail";
import ToShip from "./components/account_info/order/toShip";
import ToPay from "./components/account_info/order/toPay";
import Cancelled from "./components/account_info/order/cancelled";
import ReturnRefund from "./components/account_info/order/returnRefund";
import ToReceive from "./components/account_info/order/toReceive";
import Completed from "./components/account_info/order/completed";
import DetailOrderPage from "./components/account_info/order/orderDetail";
import ListNews from "./page/base/news/list";
import DetailNews from "./page/base/news/detail";
import Contact from "./page/base/contact";
import About from "./page/base/about";
function App() {
  const [dateTime] = useState(localStorage.getItem("DateTime"));
  useEffect(() => {
    const checkTokenExpiration = async () => {
      if (dateTime) {
        const currentTime = new Date().getTime();
        const loginTimestamp = parseInt(dateTime, 10);
        if (currentTime - loginTimestamp > 86400000) {
          await localStorage.removeItem("token");
          await localStorage.removeItem("DateTime");
        }
      }
    };
    checkTokenExpiration();
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayoutBase />}>
          <Route index element={<Home />} />
          <Route path="product" element={<ListProduct />} />
          <Route path="product/:id" element={<DetailProduct />} />
          <Route path="appointment" element={<Appointments />} />
          <Route path="appointment/:id" element={<Appointments />} />
          <Route path="detailProduct/:id" element={<DetailProduct />} />
          <Route path="ShoppingCart" element={<ShoppingCart />} />
          <Route path="orderPay" element={<OrderPay />} />
          <Route path="contact" element={<Contact />} />
          <Route path="about" element={<About/>}/>
          <Route path="news">
            <Route index element={<ListNews />} />
            <Route path=":id" element={<DetailNews />} />
          </Route>
          <Route path="account" element={<AccountPage />}>
            <Route index element={<Account />} />
            <Route path="payment" element={<Pay />} />
            <Route path="follow" element={<Follow />} />

            <Route path="pet-user">
              <Route index element={<PetUser />} />
              <Route path="add" element={<AddPetPage />} />
              <Route path="edit/:id" element={<EditPetPage />} />
            </Route>
            <Route
              path="cancelledAppointment"
              element={<CancelledAppointment />}
            />
            <Route
              path="wait-for-confirmation-appointment"
              element={<WaitForConfirmation />}
            />
            <Route
              path="confirmed-appointment"
              element={<ConfirmedAppointment />}
            />
            <Route path="doing-appointment" element={<DoingAppointment />} />
            <Route
              path="accomplished-appointment"
              element={<AccomplishedAppointment />}
            />
            <Route path="doing-appointment" element={<DoingAppointment />} />
            <Route
              path="accomplished-appointment"
              element={<AccomplishedAppointment />}
            />
            {/* order */}

            <Route path="to-ship" element={<ToShip />} />
            <Route path="to-pay" element={<ToPay />} />
            <Route path="cancelled" element={<Cancelled />} />
            <Route path="return-refund" element={<ReturnRefund />} />
            <Route path="to-receive" element={<ToReceive />} />
            <Route path="completed" element={<Completed />} />
            <Route path="detailOrder/:id" element={<DetailOrderPage />} />
          </Route>
          <Route path="cart" element={<CartPage />} />
        </Route>
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="SignIn" element={<SignIn />} />
        <Route path="SignUp" element={<SignUp />} />
        <Route path="RegisterAccount" element={<RegisterAccount />} />
        <Route path="/admin" element={<LayoutAdmin />}>
          <Route index element={<DashBoard />} />

          <Route path="status_appointment">
            <Route index element={<StatusAdmin />} />
            <Route path="add" element={<AddStatusAdmin />} />
            <Route path="edit/:id" element={<EditStatus />} />
          </Route>
          <Route path="appointment">
            <Route index element={<AppointmentsAdmin />} />
            <Route path="edit" element={<AppointmentEdit />} />
            <Route path="add" element={<AppointmentsAdd />} />
          </Route>

          <Route path="about">
            <Route index element={<AboutAdmin />} />
            <Route path="add" element={<AddAbout />} />
            <Route path="edit/:id" element={<EditAbout />} />
          </Route>

          <Route path="category">
            <Route index element={<CategoryAdmin />} />
            <Route path="add" element={<AddCategory />} />
            <Route path="edit/:id" element={<EditCategory />} />
          </Route>
          <Route path="order">
            <Route index element={<OrderAdmin />} />
            <Route path="detail" element={<DetailOrderAdmin />} />
          </Route>
          <Route path="products">
            <Route index element={<ProductsAdmin />} />
            <Route path="add" element={<AddProduct />} />
            <Route path="edit/:id" element={<EditProduct />} />
          </Route>

          <Route path="user">
            <Route index element={<UserAdmin />} />
            <Route path="edit/:id" element={<EditUser />} />
          </Route>

          <Route path="services">
            <Route index element={<ServicesAdmin />} />
            <Route path="add" element={<AddService />} />
            <Route path="edit/:id" element={<EditService />} />
          </Route>

          <Route path="role">
            <Route index element={<RoleAdmin />} />
            <Route path="add" element={<AddRoleAdmin />} />
            <Route path="edit/:id" element={<EditRole />} />
          </Route>
          <Route path="pethouse">
            <Route index element={<PethouseAdmin />} />
            <Route path="edit/:id" element={<EditPetHouse />} />
          </Route>

          <Route path="staff">
            <Route index element={<StaffAdmin />} />
            <Route path="edit/:id" element={<EditStaff />} />
          </Route>

          <Route path="pethouse">
            <Route index element={<PethouseAdmin />} />
            <Route path="add" element={<AddPetHouse />} />
          </Route>

          <Route path="species">
            <Route index element={<SpeciesAdmin />} />
            <Route path="add" element={<AddSpecies />} />
            <Route path="edit/:id" element={<EditSpecies />} />
          </Route>
          <Route path="breed">
            <Route index element={<BreedAdmin />} />
            <Route path="add" element={<AddBreed />} />
            <Route path="edit/:id" element={<EditBreed />} />
          </Route>

          <Route path="contact">
            <Route index element={<ContactAdmin />} />
            <Route path="edit/:id" element={<EditContact />} />
          </Route>

          <Route path="status_contact">
            <Route index element={<StatusContactAdmin />} />
            <Route path="add" element={<AddStatusContactAdmin />} />
            <Route path="edit/:id" element={<EditStatusContact />} />
          </Route>

          <Route path="news">
            <Route index element={<NewsAdmin />} />
            <Route path="add" element={<AddNews />} />
            <Route path="edit/:id" element={<EditNews />} />
          </Route>

          <Route path="banner">
            <Route index element={<BannerAdmin />} />
            <Route path="add" element={<AddBanner />} />
            <Route path="edit/:id" element={<EditBanner />} />
          </Route>

          <Route path="footer">
            <Route index element={<FooterAdmin />} />
            {/* <Route path="add" element={<AddBanner />} /> */}
            <Route path="edit/:id" element={<EditFooterAdmin />} />
          </Route>

          <Route path="websiteinformation">
            <Route index element={<WebsiteInformationAdmin />} />
            <Route path="edit/:id" element={<EditWebsiteInformationAdmin />} />
          </Route>

          <Route path="review" element={<ReviewAdmin />} />
          <Route path="pets" element={<PetsAdmin />} />

          <Route path="status_pet">
            <Route index element={<StatusPetAdmin />} />
            <Route path="add" element={<AddStatusPetAdmin />} />
            <Route path="edit/:id" element={<EditStatusPet />} />
          </Route>

          <Route path="menutype">
            <Route index element={<MenuTypeAdmin />} />
            <Route path="add" element={<AddMenuTypeAdmin />} />
            <Route path="edit/:id" element={<EditMenuType />} />
          </Route>

          <Route path="menu">
            <Route index element={<MenuAdmin />} />
            <Route path="add" element={<AddMenuAdmin />} />
            <Route path="edit/:id" element={<EditMenuAdmin />} />
          </Route>

          <Route path="status_order">
            <Route index element={<StatusOrderAdmin />} />
            <Route path="add" element={<AddStatusOrderAdmin />} />
            <Route path="edit/:id" element={<EditStatusOrder />} />
          </Route>
        </Route>
        <Route path="payment/:id/:total" element={<PaymentPage />} />
        <Route path="callback" element={<CallbackVNPAY />} />
        {/* <Route path="print-invoices/:id" element={<PrintInvoice />} /> */}
        <Route path="pay-cash" element={<PaymentCashPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
