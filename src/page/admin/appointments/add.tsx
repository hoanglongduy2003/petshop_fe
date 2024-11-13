import {
  Avatar,
  Button,
  DatePicker,
  Form,
  Radio,
  Select,
  Space,
  message,
} from "antd";
import { RangePickerProps } from "antd/es/date-picker";
import dayjs, { Dayjs } from "dayjs";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import avatarPet from "../../../assets/image/avatar-pet.jpeg";
import User from "../../../assets/image/user.png";
import "../../../assets/scss/admin/appointments.scss";
import { TpetHouse } from "../../../schema/pethouse";
import { TPets, TPetsSchemaRes, TUserPets } from "../../../schema/pets";
import { TServices } from "../../../schema/services";
import { TUser } from "../../../schema/user";
import {
  useAddAppointmentAdminMutation,
  useCheckPetHouseAppointmentMutation,
  useGetAppointmentTimeMutation,
} from "../../../services/appointments";
import { useBreedQuery } from "../../../services/breed";
import { useGetAllPaymentMethodsQuery } from "../../../services/paymentMethods";
import {
  useGetPetByIdPostMutation,
  useUserPetMutation,
} from "../../../services/pets";
import { useServicesClientQuery } from "../../../services/services";
import { useGetAllspeciesQuery } from "../../../services/species";
import {
  useStatusPaymentQuery,
  useStatusQuery,
} from "../../../services/status_appointment";
import { useGetAllUserQuery, useUserByIdQuery } from "../../../services/user";
import ModalAddPet from "../../base/appointments/modalAddPet";
import ModalAddUser from "../../base/appointments/modalAddUser";
import { TGetAppointmentTime } from "../../../schema/appointments";

type TFinish = {
  petHouse_id: number;
  pet: number[];
  services: number[];
  start_time: string;
  end_time: string;
  total: number;
  age: number;
  breed_id: number;
  gender: string;
  name: string;
  species_id: number;
  animalCondition: string;
  status_payment: number;
  status_id: number;
};

const AppointmentsAdd: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [pet, setPet] = useState<TPets[]>([]);
  const [user, setUser] = useState<TUser>();
  const [isPetServiceSelected, setIsPetServiceSelected] = useState<boolean>(false);
  const [petByUserId, setPetByUserId] = useState<TPetsSchemaRes[]>([]);
  const [userId, setUserId] = useState<number | undefined>(0);
  const [openAddPest, setOpenAddPest] = useState<boolean>(false);
  const [openAddUser, setOpenAddUser] = useState<boolean>(false);
  const [onChangedisabled, setOnChangedisabled] = useState<boolean>(true);
  const [servicesOpenTime, setServicesOpenTime] = useState<boolean>(false);
  const [idSpecies, setIdSpecies] = useState<number>(0);
  const [idServices, setIdServices] = useState<number[]>([]);
  const [total, setTotal] = useState<number | undefined>(0);
  const [totalServices, setTotalServices] = useState<number | undefined>(0);
  const [namePet, setNamePet] = useState<number>();
  const [defaultValue, setDefaultValue] = useState<number[]>([]);
  const [valueId, setValueId] = useState<number | undefined>();
  const [disableTime, setDisableTime] = useState<TGetAppointmentTime[]>([]);
  const [endTime, setEndTime] = useState<Dayjs | null>(null);
  const [pethouse, setPethouse] = useState<any[]>([]);
  const { data: services } = useServicesClientQuery();
  const { data: statusPayment } = useStatusPaymentQuery();
  const { data: statusAppointment } = useStatusQuery();
  const { data: getAllUser, refetch } = useGetAllUserQuery();
  const { data: species } = useGetAllspeciesQuery();
  const { data: breed } = useBreedQuery(idSpecies);
  const [addAppointment, { isLoading }] = useAddAppointmentAdminMutation();
  const [getPetByUserId] = useGetPetByIdPostMutation();
  const [getAppointmentTime] = useGetAppointmentTimeMutation();
  const [userPet] = useUserPetMutation();
  const { data: userSelect } = useUserByIdQuery(userId || 0);
  const { id: idService } = useParams<{ id: string }>();
  const location = useLocation();
  const [appointmentData] = useState<any>(location.state?.appointmentData);
  const [paymentMethods_id, setPaymentMethods_id] = useState<number>(1);
  const { data: paymentMethods } = useGetAllPaymentMethodsQuery();
  const [checkPetHouse] = useCheckPetHouseAppointmentMutation();

  useEffect(() => {
    const fetchData = async () => {
      if (appointmentData) {
        const petIds = appointmentData.pets?.map(
          (item: { id: number }) => item.id
        );
        const serviceId = appointmentData.services.map(
          (item: { id: number }) => item.id
        );
        form.setFieldsValue({
          services: serviceId,
          pet: petIds,
          petHouse_id: appointmentData.pethouse_id,
          status_payment: appointmentData.statusPaymentId,
          start_time: dayjs(appointmentData.start_time),
          status_id: appointmentData.status_id,
        });
        setEndTime(dayjs(appointmentData.end_time));
        listPets(petIds);
        setDefaultValue(petIds);
        setIdServices(serviceId);
        totalService(serviceId);
        setServicesOpenTime(true);
      }
    };
    fetchData();
  }, [appointmentData, form, services]);

  const optionsServices = services?.map((item: TServices) => ({
    value: item.id,
    label: `${item.name} - ${new Intl.NumberFormat("vi-VN").format(
      item.price
    )}VNĐ - ${item.time}`,
  }));

  const optionsPetHouse = pethouse?.map((item: TpetHouse) => ({
    value: item.id,
    label: item.name,
  }));
  const optionsStatusAppointment = [
    {
      value: 2,
      label: "Đã xác nhận",
    },
    {
      value: 3,
      label: "Thực hiện",
    },
  ];
  const optionsStatusPayment = statusPayment?.map((item: any) => ({
    value: item.id,
    label: item.name,
  }));
  const optionsUser = getAllUser?.map((item: any) => ({
    value: item.id,
    label: item.email,
  }));
  const optionsPet = petByUserId?.map((item: TUserPets) => ({
    value: item.id,
    label: item.name,
    disabled: item.id === namePet,
  }));

  const onFinish = async (values: TFinish) => {
    const newData = {
      day: dayjs().format("YYYY-MM-DD HH:mm:00"),
      pethouse_id: values.petHouse_id,
      pet: values.pet,
      user_id: user?.id,
      services: values.services,
      start_time: dayjs(values.start_time).format("YYYY-MM-DD HH:mm:ss"),
      end_time: dayjs(endTime).format("YYYY-MM-DD HH:mm:ss"),
      total: total,
      status_id: Number(values.status_id),
      status_payment: Number(values.status_payment),
      paymentMethods_id: paymentMethods_id,
    };
    const resAppointment = await addAppointment(newData);
    if ("data" in resAppointment) {
      message.success("Thêm thành công");
      navigate("/admin/appointment");
    } else {
      if (
        resAppointment.error &&
        "status" in resAppointment.error &&
        resAppointment.error.data &&
        "message" in (resAppointment.error.data as Record<string, unknown>)
      ) {
        const errorMessage = (
          resAppointment.error.data as Record<string, unknown>
        ).message as string;
        message.error(errorMessage);
      } else {
        message.error("Thêm lịch thất bại");
      }
    }
  };

  const onFinishFailed = async (values: any) => {
    console.log("Failed:", values);
  };

  // const onChangePetHouse = async (value: number) => {
  //   form.setFieldValue("start_time", null);
  //   setEndTime(null);
  //   const res = await getAppointmentTime({ pethouse_id: value });
  //   if ("data" in res) {
  //     const formattedData = res.data.map((item) => ({
  //       id: item.id,
  //       start_time: dayjs(item.start_time).format("YYYY-MM-DD HH:mm:ss"),
  //       end_time: dayjs(item.end_time)
  //         .subtract(1, "second")
  //         .format("YYYY-MM-DD HH:mm:ss"),
  //     }));
  //     setDisableTime(formattedData);
  //   }
  // };

  const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    if (!current) {
      return false;
    }
    const today = dayjs().startOf("day");
    const afterFiveDays = today.add(5, "day").endOf("day");
    return current.isBefore(today) || current.isAfter(afterFiveDays);
  };

  const disabledDateTime = (current: Dayjs | null) => {
    return {
      disabledHours: () => {
        const defaultDisabledHours = Array.from(
          { length: 24 },
          (_, i) => i
        ).filter((hour) => hour < 9 || hour > 17 || hour === 12);

        if (current && current.isSame(dayjs(), "day")) {
          const currentDayDisabledHours = Array.from(
            { length: dayjs().hour() + 1 },
            (_, i) => i
          );

          return [...defaultDisabledHours, ...currentDayDisabledHours];
        }

        return defaultDisabledHours;
      },
      disabledMinutes: () => [],
      disabledSeconds: () => [],
    };
  };

  const onChangeTime = async (value: Dayjs | null, dateString: string) => {
    if (value) {
      const servicesId =
        services?.filter((service) => idServices.includes(service.id)) || [];

      if (servicesId.length > 0) {
        const totalMilliseconds = servicesId.reduce((total, service) => {
          const regexResult = service.time.match(/(\d+):(\d+):(\d+)/);
          if (regexResult) {
            const [, hours, minutes, seconds] = regexResult;
            const milliseconds =
              parseInt(hours, 10) * 3600000 +
              parseInt(minutes, 10) * 60000 +
              parseInt(seconds, 10) * 1000;

            return total + milliseconds * pet.length;
          }

          return total;
        }, 0);

        if (totalMilliseconds > 0) {
          let newEndTime = dayjs(dateString).add(
            totalMilliseconds,
            "millisecond"
          );
          if (newEndTime.hour() > 18) {
            const currentHour = newEndTime.hour();
            const currentMinute = newEndTime.minute();
            const remainingMinutes = (currentHour - 18) * 60 + currentMinute;
            const remainingHours = Math.floor(remainingMinutes / 60);
            const remainingMinutesAfterHours = remainingMinutes % 60;
            newEndTime = newEndTime.add(1, "day");
            newEndTime = newEndTime
              .hour(9)
              .minute(0)
              .second(0)
              .millisecond(0)
              .add(remainingHours, "hours")
              .add(remainingMinutesAfterHours, "minutes");
          }
          if (value.hour() < 12 && newEndTime.hour() >= 12) {
            if (newEndTime.hour() === 12 && newEndTime.minute() > 0) {
              newEndTime = newEndTime.add(1, "hour").add(1, "millisecond");
            } else {
              newEndTime = newEndTime.add(3, "millisecond");
            }
          }
          const petHouse = await checkPetHouse({
            start_time: dayjs(value).format("YYYY-MM-DDTHH:mm:ssZ[Z]"),
            end_time: dayjs(newEndTime).format("YYYY-MM-DDTHH:mm:ssZ[Z]"),
          });
          if ("data" in petHouse) {
            if (petHouse.data.petHouse.length > 0) {
            setPethouse(petHouse.data.petHouse);
            } else {
              message.error("Không có phòng trống trong giờ bạn chọn");
            }
          }
          setEndTime(newEndTime);
        } else {
          setEndTime(null);
        }
      } else {
        setEndTime(null);
      }
    } else {
      setEndTime(null);
    }
  };

  const listPets = async (value: number[]) => {
    if (value.length > 0) {
      const petData = value.map((petId) => ({
        pet_id: petId,
      }));
      const pets = await userPet({ data: petData });
      if ("data" in pets) {
        setPet(pets.data);
        form.setFieldValue("pet", value);
      }
    } else {
      setPet([]);
    }
  };

  const handleChangePets = (petValue: number[]) => {
    listPets(petValue);
    setDefaultValue(petValue);
    if (form.getFieldValue("start_time")) {
      functionEndTimeChange(undefined, petValue);
    }
    if (form.getFieldValue("services")) {
      setIsPetServiceSelected(
        petValue.length > 0 && form.getFieldValue("services").length > 0
      );
    }
  };

  useEffect(() => {
    if (user) {
      form.setFieldValue("user_id", user?.id);
      refetch();
      setOnChangedisabled(false);
      onChangeUser(user.id);
    }
  }, [form, user, user?.id]);

  useEffect(() => {
    if (totalServices && defaultValue.length) {
      setTotal(totalServices * defaultValue.length);
    }
  }, [defaultValue, totalServices]);

  useEffect(() => {
    if (valueId) {
      defaultValue.push(valueId);
      listPets(defaultValue);
      setValueId(undefined);
    }
  }, [defaultValue, valueId]);

  useEffect(() => {
    if (userSelect) {
      setUser(userSelect);
    }
  }, [userSelect]);

  const handleChangeService = (value: number[]) => {
    if (value.length > 0) {
      totalService(value);
      setServicesOpenTime(true);
      setIdServices(value);
      if (form.getFieldValue("start_time")) {
        functionEndTimeChange(value);
      }
      if (form.getFieldValue("pet")) {
        setIsPetServiceSelected(
          form.getFieldValue("pet").length > 0 && value.length > 0
        );
      }
    } else {
      form.resetFields(["start_time"]);
      setIsPetServiceSelected(false);
      setServicesOpenTime(false);
      setTotal(0);
      setEndTime(null);
    }
  };

  const functionEndTimeChange = async (
    servicesValue?: number[],
    petValue?: number[]
  ) => {
    let servicesId: any[] = [];
    if (servicesValue) {
      servicesId =
        services?.filter((service) => servicesValue.includes(service.id)) || [];
    } else {
      servicesId =
        services?.filter((service) => idServices.includes(service.id)) || [];
    }
    if (servicesId.length > 0) {
      const totalMilliseconds = servicesId.reduce((total, service) => {
        const regexResult = service.time.match(/(\d+):(\d+):(\d+)/);

        if (regexResult) {
          const [, hours, minutes, seconds] = regexResult;
          const milliseconds =
            parseInt(hours, 10) * 3600000 +
            parseInt(minutes, 10) * 60000 +
            parseInt(seconds, 10) * 1000;
          if (petValue) {
            return total + milliseconds * petValue.length;
          } else {
            return total + milliseconds * pet.length;
          }
        }

        return total;
      }, 0);

      if (totalMilliseconds > 0) {
        let newEndTime = dayjs(form.getFieldValue("start_time")).add(
          totalMilliseconds,
          "millisecond"
        );
        if (newEndTime.hour() > 18) {
          const currentHour = newEndTime.hour();
          const currentMinute = newEndTime.minute();
          const remainingMinutes = (currentHour - 18) * 60 + currentMinute;
          const remainingHours = Math.floor(remainingMinutes / 60);
          const remainingMinutesAfterHours = remainingMinutes % 60;
          newEndTime = newEndTime.add(1, "day");
          newEndTime = newEndTime
            .hour(9)
            .minute(0)
            .second(0)
            .millisecond(0)
            .add(remainingHours, "hours")
            .add(remainingMinutesAfterHours, "minutes");
        }
        if (
          form.getFieldValue("start_time").hour() < 12 &&
          newEndTime.hour() > 12
        ) {
          newEndTime = newEndTime.add(1, "hour").add(1, "millisecond");
        }
        if (newEndTime.hour() === 12 && newEndTime.minute() > 0) {
          newEndTime = newEndTime.add(1, "hour").add(1, "millisecond");
        }
        const petHouse = await checkPetHouse({
          start_time: dayjs(form.getFieldValue("start_time")).format(
            "YYYY-MM-DDTHH:mm:ssZ[Z]"
          ),
          end_time: dayjs(newEndTime).format("YYYY-MM-DDTHH:mm:ssZ[Z]"),
        });

        if ("data" in petHouse) {
          if (petHouse.data.petHouse.length > 0) {
          setPethouse(petHouse.data.petHouse);
          } else {
            message.error("Không có phòng trống trong giờ bạn chọn");
          }
        }
        setEndTime(newEndTime);
      } else {
        setEndTime(null);
      }
    } else {
      setEndTime(null);
    }
  };

  const totalService = (value: number[]) => {
    if (services) {
      const servicesId =
        services.filter((service) => value.includes(service.id)) || [];
      const totalServices = servicesId.reduce(
        (acc, service) => acc + (service.price ?? 0),
        0
      );
      setTotalServices(totalServices);
    }
  };
  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const onChangeUser = async (value: number) => {
    const data = { id: value };
    try {
      const response = await getPetByUserId(data);

      if ("data" in response) {
        const { data: dataPet } = response;
        setPetByUserId(dataPet);
        setOnChangedisabled(false);
        setUserId(value);
      } else {
        console.error("No 'data' property found in the API response");
      }
    } catch (error) {
      console.error("Error fetching pet data:", error);
    }
  };

  const onChange = (e: any) => {
    setPaymentMethods_id(e.target.value);
  };

  return (
    <div className="appointment-edit">
      <h2 className="title-appoiment">Thêm lịch đặt</h2>
      <Form
        form={form}
        name="validateOnly"
        layout="vertical"
        autoComplete="off"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <div className="fromAppointment">
          <div style={{ flex: 1 }}>
            <Form.Item
              name="user_id"
              label="Người dùng"
              rules={[{ required: true, message: "Không được để trống" }]}
            >
              <Select
                showSearch
                optionFilterProp="children"
                filterOption={filterOption}
                options={optionsUser}
                onChange={onChangeUser}
              />
            </Form.Item>
            <Form.Item
              name="pet"
              label="Thú cưng"
              rules={[{ required: true, message: "Không được để trống" }]}
            >
              <Select
                mode="multiple"
                style={{ width: "100%" }}
                defaultValue={defaultValue}
                onChange={handleChangePets}
                options={optionsPet}
                disabled={onChangedisabled}
              />
            </Form.Item>
            <Form.Item
              name="services"
              label="Dịch vụ"
              rules={[{ required: true, message: "Không được để trống" }]}
            >
              <Select
                mode="multiple"
                disabled={!!idService}
                style={{ width: "100%" }}
                defaultValue={[]}
                onChange={handleChangeService}
                options={optionsServices}
              />
            </Form.Item>
            <div style={{ display: "flex", gap: 10 }}>
              <Form.Item
                name="start_time"
                label="Thời gian bắt đầu"
                rules={[{ required: true, message: "Không được để trống" }]}
                style={{ width: "100%" }}
              >
                <DatePicker
                  style={{ width: "100%" }}
                  format="YYYY-MM-DD HH:mm"
                  placeholder=""
                  disabledDate={disabledDate}
                  disabledTime={disabledDateTime}
                  showTime={{
                    defaultValue: dayjs("09:00:00", "HH:mm:ss"),
                  }}
                  disabled={!isPetServiceSelected}
                  onChange={onChangeTime}
                  showNow={false}
                />
              </Form.Item>
              <Form.Item
                label="Thời gian kết thúc"
                style={{ width: "100%" }}
                rules={[{ required: true, message: "Không được để trống" }]}
              >
                <DatePicker
                  placeholder=""
                  style={{ width: "100%" }}
                  format="YYYY-MM-DD HH:mm"
                  value={endTime}
                  disabled
                />
              </Form.Item>
            </div>
            <Form.Item
              name="petHouse_id"
              label="Loại phòng"
              rules={[{ required: true, message: "Không được để trống" }]}
            >
              <Select options={optionsPetHouse} />
            </Form.Item>
            <Form.Item label="Phương thức thanh toán">
              <Radio.Group
                onChange={onChange}
                value={paymentMethods_id}
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  columnGap: 10,
                }}
              >
                {paymentMethods &&
                  paymentMethods.map((item) => (
                    <Radio
                      key={item.id}
                      value={item.id}
                      style={{
                        width: 252,
                        height: 172,
                        display: "flex",
                        flexDirection: "column",
                        position: "relative",
                        border: "1px solid #00575c",
                      }}
                    >
                      <img
                        style={{
                          width: 250,
                          height: 170,
                          overflow: "hidden",
                          position: "absolute",
                          top: 0,
                          left: 0,
                        }}
                        src={item.image}
                        alt="ảnh"
                      />
                      <p
                        style={{
                          zIndex: 10,
                          position: "absolute",
                          top: 7,
                          left: 40,
                          color: "#00575c",
                          textShadow:
                            "0 0 0.2em white, 0 0 0.2em white, 0 0 0.2em white",
                        }}
                      >
                        {item.name}
                      </p>
                    </Radio>
                  ))}
              </Radio.Group>
            </Form.Item>
            <Form.Item
              name="status_payment"
              label="Thanh toán"
              rules={[{ required: true, message: "Không được để trống" }]}
            >
              <Select options={optionsStatusPayment} />
            </Form.Item>
            <Form.Item
              name="status_id"
              label="Trạng thái"
              rules={[{ required: true, message: "Không được để trống" }]}
            >
              <Select options={optionsStatusAppointment} />
            </Form.Item>
            <Form.Item label="Tổng số tiền">
              <div>
                <span style={{ fontSize: 24, color: "#00575c" }}>
                  {new Intl.NumberFormat("vi-VN").format(total ?? 0)}
                </span>
                <span style={{ fontSize: 16, color: "#00575c" }}>VNĐ</span>
              </div>
            </Form.Item>

            <Form.Item>
              <Space>
                <Button loading={isLoading} type="primary" htmlType="submit">
                  Đặt lịch
                </Button>
              </Space>
            </Form.Item>
          </div>
          <div style={{ flex: 1 }}>
            {user ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  rowGap: 20,
                }}
              >
                <div
                  style={{
                    position: "relative",
                    background: "#F7F7F7",
                    padding: 10,
                    height: "150px",
                    color: "#00575C",
                    border: 2,
                    borderColor: "#00575C",
                  }}
                >
                  <div>Email: {user.email}</div>
                  <div>Tên tài khoản: {user.name}</div>
                  <div style={{ position: "absolute", top: 5, right: 5 }}>
                    {user.img ? (
                      <Avatar size={100} shape="circle" src={User} />
                    ) : (
                      <Avatar size={100} shape="circle" src={user.img} />
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: "3rem",
                }}
              >
                <Avatar size={200} src={User} />
                <div>Chưa chọn người dùng</div>
                <p>Nếu bạn chưa có hoặc thêm mới ấn vào đây!</p>
                <Button
                  onClick={() => setOpenAddUser(true)}
                  style={{ maxWidth: 100, color: "white" }}
                >
                  Thêm
                </Button>
              </div>
            )}

            {pet.length > 0 ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  rowGap: 20,
                }}
              >
                {pet.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      position: "relative",
                      background: "#F7F7F7",
                      padding: 10,
                      color: "#00575C",
                      border: 2,
                      borderColor: "#00575C",
                    }}
                  >
                    <div>Tên thú cưng: {item?.name}</div>
                    <div>Tuổi: {item?.age}</div>
                    <div>Giới tính: {item?.gender}</div>
                    <div>Giống: {item?.nameBreed}</div>
                    <div style={{ position: "absolute", top: 5, right: 5 }}>
                      <Avatar size={100} shape="circle" src={item.img} />
                    </div>
                  </div>
                ))}
                <Button
                  onClick={() => setOpenAddPest(!openAddPest)}
                  style={{ maxWidth: 100, color: "white" }}
                >
                  Thêm mới
                </Button>
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Avatar size={200} src={avatarPet} />
                <div>Chưa chọn thú cưng</div>
                <p>Nếu bạn chưa có hoặc thêm mới ấn vào đây!</p>
                <Button
                  onClick={() => setOpenAddPest(!openAddPest)}
                  disabled={onChangedisabled}
                  style={{ maxWidth: 100, color: "white" }}
                >
                  Thêm
                </Button>
              </div>
            )}
          </div>
        </div>
      </Form>
      <ModalAddPet
        setIdSpecies={setIdSpecies}
        openAddPest={openAddPest}
        species={species}
        breed={breed}
        setOpenAddPest={setOpenAddPest}
        user={user}
        userId={userId}
        setNamePet={setNamePet}
        setValueId={setValueId}
      />
      <ModalAddUser
        openAddUser={openAddUser}
        setOpenAddUser={setOpenAddUser}
        setUser={setUser}
      />
    </div>
  );
};

export default AppointmentsAdd;
