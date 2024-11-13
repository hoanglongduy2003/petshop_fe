import React, { FC } from "react";
import "../../assets/scss/page/account/pet.scss";
import { useGetAllUserPetsQuery } from "../../services/pets";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const PetUser: FC = () => {
  const { data: listPet } = useGetAllUserPetsQuery();
  return (
    <>
      <div className="pet">
        <div className="pet-title">
          <div className="pet-title-text">
            <h4>Thú cưng</h4>
          </div>
          <div className="pet-title-add">
            <button className="">
              <Link to={"add"}>
                <p className="btn-add">Thêm</p>
              </Link>
            </button>
          </div>
          <div className="pet-title-plus">
            <PlusOutlined />
          </div>
        </div>
        <table className="pet-table">
          <thead className="pet-table-thead">
            <tr className="pet-table-thead-tr">
              <th className="pet-table-thead-tr-stt">STT</th>
              <th className="pet-table-thead-tr-name">Tên</th>
              <th className="pet-table-thead-tr-image">Hình</th>
              <th className="pet-table-thead-tr-age">Tuổi</th>
              <th className="pet-table-thead-tr-breed">Giống</th>
              <th className="pet-table-thead-tr-gender">Giới tính</th>
              <th>hành động</th>
            </tr>
          </thead>
          <tbody className="pet-table-tbody">
            {listPet &&
              listPet.map((item, i) => {
                return (
                  <tr key={item.id} className="pet-table-tbody-tr">
                    <td className="pet-table-tbody-tr-stt">{i + 1}</td>
                    <td className="pet-table-tbody-tr-name">{item.name}</td>
                    <td className="pet-table-tbody-tr-image">
                      <img src={item.img} alt="" />{" "}
                    </td>
                    <td className="pet-table-tbody-tr-age">{item.age}</td>
                    <td className="pet-table-tbody-tr-breed">
                      {item.nameBreed}
                    </td>
                    <td className="pet-table-thead-tr-gender">{item.gender}</td>
                    <td className="pet-table-tbody-tr-btn">
                      <button className="pet-table-tbody-tr-btn-detail">
                        Chi tiết
                      </button>
                      <button className="pet-table-tbody-tr-btn-edit">
                        <Link to={`edit/${item.id}`}>
                          <p className="btn-edit">Sửa</p>
                        </Link>
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <div className="pet-res">
          {listPet &&
            listPet.map((item) => {
              return (
                <div className="pet-res-item" key={item.id}>
                  <div className="pet-res-item-image">
                    <img src={item.img} alt="" />
                  </div>
                  <div className="pet-res-item-box">
                    <div className="pet-res-item-box-text">
                      <div className="pet-res-item-box-text-name">
                        {item.name}
                      </div>
                      <div className="pet-res-item-box-text-age">
                        <span>Tuổi:</span>
                        <div>{item.age}</div>
                      </div>
                      <div className="pet-res-item-box-text-breed">
                        <span>Giống:</span>
                        <div>{item.nameBreed}</div>
                      </div>
                    </div>
                    <div className="pet-res-item-box-btn">
                      <div className="pet-res-item-box-btn-edit">
                        <EditOutlined />
                      </div>
                      <div className="pet-res-item-box-btn-delete">
                        <DeleteOutlined />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default PetUser;
