import "../../../../assets/scss/page/account/account.scss";
import EditProfile from "../../../../components/account_info/editprofile";
import { TAccountEdit } from "../../../../schema/accountSchema";
import { useGetUserQuery } from "../../../../services/user";
import { FC, useState, useEffect } from "react";
import User from "../../../../assets/image/user.png";
import ModalResetPassword from "../../../../components/modal/resetPassword";

export const Account: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: user } = useGetUserQuery();
  const [data, setData] = useState<TAccountEdit>({
    id: Number(user?.id),
    name: String(user?.name),
    email: String(user?.email),
    img: String(user?.img),
    phone: String(user?.phone),
    gender: Number(user?.gender),
  });
  useEffect(() => {
    if (user) {
      const data = {
        id: user.id,
        name: user.name,
        email: user.email,
        img: user.img,
        phone: user.phone,
        gender: user.gender,
      };
      setData(data);
    }
  }, [user]);

  const [isModalProfileOpen, setIsModalProfileOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const showModalProfile = () => {
    setIsModalProfileOpen(true);
  };

  return (
    <>
      <div className="bg-acc">
        <div className="col_2-heading">
          <h4>Hồ sơ</h4>
        </div>
        <div className="profile">
          <div className="profile-tile">
            <div className="avatar-container">
              <img src={user?.img ?? User} className="avatar" alt="user" />
              <i
                className="fa fa-2x fa-camera img-upload"
                aria-hidden="true"
              ></i>
            </div>
            <div className="profile-detail">
              <div className="fullname">{user?.name}</div>
              <div className="info">
                <div className="col-title text-secondary">Số điện thoại:</div>
                <div className="col-info ml-2">{user?.phone}</div>
              </div>
              <div className="info">
                <div className="col-title text-secondary">Email:</div>
                <div className="col-info ml-2">{user?.email}</div>
              </div>
              <div className="info">
                <div className="col-title text-secondary">Giới tính:</div>
                <div className="col-info ml-2">
                  <div>{user?.gender === 1 && "Nam"}</div>
                  <div>{user?.gender === 2 && "Nữ"}</div>
                </div>
              </div>
            </div>
            <div className="profile-edit">
              <div>
                <button
                  type="submit"
                  className="btn btn-edit"
                  onClick={showModalProfile}
                >
                  Cập nhật thông tin
                </button>
                <EditProfile
                  isModalOpen={isModalProfileOpen}
                  setIsModalOpen={setIsModalProfileOpen}
                  user={data}
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="btn btn-edit"
                  onClick={showModal}
                >
                  Đổi mật khẩu
                </button>
                <ModalResetPassword
                  isModalOpen={isModalOpen}
                  setIsModalOpen={setIsModalOpen}
                  idUser={Number(user?.id)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Account;
