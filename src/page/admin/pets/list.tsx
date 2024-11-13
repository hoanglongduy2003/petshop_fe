import { Button, Popconfirm, message, Image } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TableAdmin from "../../../components/table";
import { TPets } from "../../../schema/pets";
import {
  useGetAllPetsQuery,
  useRemovePetsMutation,
} from "../../../services/pets";
import "../../../assets/scss/admin/appointments.scss";
import Search from "antd/es/input/Search";

const PetsAdmin: React.FC = () => {
  const [filter, setFilter] = useState({ name: "", nameUser: "" });
  const [listPet, setListPet] = useState<TPets[] | undefined>([]);
  const [openReset, setOpenReset] = useState<boolean>(false);

  const { data } = useGetAllPetsQuery();
  const [removePet] = useRemovePetsMutation();

  const handleFilterChange = (fieldName: string, value: string) => {
    setFilter({ ...filter, [fieldName]: value });
  };

  const confirm = (id: number) => {
    removePet(id)
      .then((response: any) => {
        if (response.error) {
          message.error("Bạn không thể xóa vì có liên quan khóa ngoại");
        } else {
          message.success("Xóa thành công.");
        }
      })
      .catch((error: any) => {
        message.error("Có lỗi xảy ra khi xóa.");
      });
  };

  const cancel = () => {
    message.error("Xóa không thành công.");
  };

  const columns: ColumnsType<TPets> = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      fixed: "right",
      width: 50,
      render: (text, record, index) => index + 1,
    },
    {
      title: "Ảnh",
      dataIndex: "img",
      key: "img",
      width: 150,
      render: (logo) => <Image width={100} src={logo} />,
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
      width: 150,
    },
    {
      title: "Tuổi",
      dataIndex: "age",
      key: "age",
      width: 50,
    },
    {
      title: "Giới tính",
      dataIndex: "gender",
      key: "gender",
      width: 100,
    },
    {
      title: "Người dùng",
      dataIndex: "nameUser",
      key: "nameUser",
      width: 150,
    },
    {
      title: "Loài",
      dataIndex: "nameSpecies",
      key: "nameSpecies",
      width: 150,
    },
    {
      title: "Giống",
      dataIndex: "nameBreed",
      key: "nameBreed",
      width: 150,
    }
  ];

  useEffect(() => {
    const filteredData = data?.filter(
      (item) =>
        item.name?.toLowerCase().includes(filter.name.trim().toLowerCase()) &&
        item.nameUser
          ?.toLowerCase()
          .includes(filter.nameUser.trim().toLowerCase())
    );
    setListPet(filteredData);
  }, [data, filter]);

  useEffect(() => {
    if (filter.nameUser === "" && filter.name === "") {
      setOpenReset(false);
    } else {
      setOpenReset(true);
    }
  }, [filter.nameUser, filter.name]);

  return (
    <>
      <h2 className="title-appoiment">Quản lý thông tin thú cưng</h2>
      <h2 style={{ margin: "0.5rem" }}>Tìm kiếm</h2>
      <div className="btn-table">
        <div style={{ display: "flex", columnGap: 20 }}>
          <Search
            placeholder="Tìm kiếm tên"
            value={filter?.name}
            onChange={(e) => handleFilterChange("name", e.target.value)}
            style={{ width: 200, marginBottom: 10 }}
          />
          <Search
            placeholder="Tìm kiếm tên chủ"
            value={filter?.nameUser}
            onChange={(e) => handleFilterChange("nameUser", e.target.value)}
            style={{ width: 200, marginBottom: 10 }}
          />
          <Button
            onClick={() => setFilter({ name: "", nameUser: "" })}
            danger
            disabled={!openReset}
          >
            Cài lại
          </Button>
        </div>
      </div>
      <TableAdmin columns={columns} data={listPet} />
    </>
  );
};

export default PetsAdmin;
