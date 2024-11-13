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
import axios from "axios";
import dayjs, { Dayjs } from "dayjs";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import avatarPet from "../../../assets/image/avatar-pet.jpeg";
import logo from "../../../assets/image/logo.png";
import "../../../assets/scss/page/appointment.scss";
import { TpetHouse } from "../../../schema/pethouse";
import { TPets, TUserPets } from "../../../schema/pets";
import { TServices } from "../../../schema/services";
import {
  useAddAppointmentMutation,
  useCheckPetHouseAppointmentMutation,
  useUpdateAppointmentMutation,
} from "../../../services/appointments";
import { useBreedQuery } from "../../../services/breed";
import { useGetAllPaymentMethodsQuery } from "../../../services/paymentMethods";
import { usePetHousePostMutation } from "../../../services/pethouse";
import {
  useGetAllUserPetsQuery,
  useUserPetMutation,
} from "../../../services/pets";
import { useServicesClientQuery } from "../../../services/services";
import { useGetAllspeciesQuery } from "../../../services/species";
import { useGetUserQuery } from "../../../services/user";
import ModalAddPet from "./modalAddPet";

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
};
const API_URL = "http://localhost:8080/api";
const Appointment: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [pet, setPet] = useState<TPets[]>([]);
  const [openAddPest, setOpenAddPest] = useState<boolean>(false);
  const [servicesOpenTime, setServicesOpenTime] = useState<boolean>(false);
  const [idSpecies, setIdSpecies] = useState<number>(0);
  const [idServices, setIdServices] = useState<number[]>([]);
  const [total, setTotal] = useState<number | undefined>(0);
  const [totalServices, setTotalServices] = useState<number | undefined>(0);
  const [namePet, setNamePet] = useState<number>();
  const [defaultValue, setDefaultValue] = useState<number[]>([]);
  const [valueId, setValueId] = useState<number | undefined>();
  const [endTime, setEndTime] = useState<Dayjs | null>(null);
  const [paymentMethods_id, setPaymentMethods_id] = useState<number>(1);
  const { data: user } = useGetUserQuery();
  const [pethouse, setPethouse] = useState<any[]>([]);
  const [isPetServiceSelected, setIsPetServiceSelected] =
    useState<boolean>(false);
  const { data: services } = useServicesClientQuery();
  const { data: species } = useGetAllspeciesQuery();
  const { data: listPet } = useGetAllUserPetsQuery();
  const { data: breed } = useBreedQuery(idSpecies);
  const { data: paymentMethods } = useGetAllPaymentMethodsQuery();
  const [createAppointment, { isLoading: loadingCreate }] =
    useAddAppointmentMutation();
  const [updateAppointment, { isLoading: loadingUpdate }] =
    useUpdateAppointmentMutation();
  const [checkPetHouse] = useCheckPetHouseAppointmentMutation();
  const [userPet] = useUserPetMutation();
  const location = useLocation();
  const [appointmentData] = useState<any>(location.state?.appointmentData);
  const [petHouseData] = usePetHousePostMutation();

  useEffect(() => {
    const fetchData = async () => {
      if (appointmentData) {
        const petIds = appointmentData.pets?.map(
          (item: { id: number }) => item.id
        );
        const serviceId = appointmentData.services.map(
          (item: { id: number }) => item.id
        );
        if (appointmentData.type === 1) {
          if (services) {
            form.setFieldsValue({
              services: serviceId,
            });
          }
        } else if (appointmentData.type === 2) {
          setServicesOpenTime(true);
          setIsPetServiceSelected(true);
          form.setFieldsValue({
            services: serviceId,
            pet: petIds,
            // petHouse_id: appointmentData.pethouse_id,
          });
        } else if (appointmentData.type === 3) {
          setEndTime(dayjs(appointmentData.end_time));
          setIsPetServiceSelected(true);
          form.setFieldsValue({
            services: serviceId,
            pet: petIds,
            petHouse_id: appointmentData.pethouse_id,
            start_time: dayjs(appointmentData.start_time),
          });
          setEndTime(dayjs(appointmentData.end_time));
          const petHouse = await checkPetHouse({
            start_time: dayjs(appointmentData.start_time).format(
              "YYYY-MM-DDTHH:mm:ssZ[Z]"
            ),
            end_time: dayjs(appointmentData.end_time).format(
              "YYYY-MM-DDTHH:mm:ssZ[Z]"
            ),
          });
          if ("data" in petHouse) {
            if (petHouse.data.petHouse.length > 0) {
              const data = await petHouseData({ id:appointmentData?.pethouse_id });
              if ("data" in data) {
                console.log(data.data);
                
                setPethouse([data.data, ...petHouse.data.petHouse]);
                console.log([data.data, ...petHouse.data.petHouse]);
               }
            } else {
              message.error("Không có phòng trống trong giờ bạn chọn");
            }
          }
        }
        listPets(petIds);
        setDefaultValue(petIds);
        setIdServices(serviceId);
        totalService(serviceId);
      }
    };
    fetchData();
  }, [appointmentData, checkPetHouse, form, petHouseData, services]);

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

  const optionsPet = listPet?.map((item: TUserPets) => ({
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
      status_id: 1,
      paymentMethods_id: paymentMethods_id,
    };
    const resAppointment = await createAppointment(newData);
    if ("data" in resAppointment) {
      const appoinmentId = resAppointment.data.id;
      const amountAppointment = total;
      message.success(resAppointment.data.message);
      if (paymentMethods_id === 1) {
        axios
          .post(`${API_URL}/create-payment`, {
            appointmentID: appoinmentId,
            amount: amountAppointment,
          })
          .then((response) => {
            localStorage.setItem(
              "paymentInfo",
              JSON.stringify({ appoinmentId, amountAppointment })
            );
            window.location.href = response.data.paymentUrl;
          });
      }
      if (paymentMethods_id === 2) {
        navigate("/account/wait-for-confirmation-appointment");
      }
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
        message.error("Đặt lịch thất bại, vui lòng thử lại");
      }
    }
  };

  const handleUpdate = async () => {
    const newValue = form.getFieldsValue();
    const newData = {
      id: appointmentData.id,
      day: dayjs().format("YYYY-MM-DD HH:mm:00"),
      pethouse_id: newValue.petHouse_id,
      pet: newValue.pet,
      user_id: user?.id,
      services: newValue.services,
      start_time: dayjs(newValue.start_time).format("YYYY-MM-DDTHH:mm:ssZ[Z]"),
      end_time: dayjs(endTime).format("YYYY-MM-DDTHH:mm:ssZ[Z]"),
      total: total,
    };
    const resAppointment = await updateAppointment(newData);
    if ("data" in resAppointment) {
      message.success("Sửa lịch thành công");
      navigate("/account/wait-for-confirmation-appointment");
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
        message.error("Sửa lịch thất bại");
      }
    }
  };

  const onFinishFailed = async (values: any) => {
    console.log("Failed:", values);
  };

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
        form.setFieldValue("pet", value);
        setPet(pets.data);
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

  const handleChangeService = (value: number[]) => {
    console.log(value);

    if (value.length > 0) {
      totalService(value);
      setServicesOpenTime(true);
      setIdServices(value);
      if (form.getFieldValue("pet")) {
        setIsPetServiceSelected(
          form.getFieldValue("pet").length > 0 && value.length > 0
        );
      }
      if (form.getFieldValue("start_time")) {
        functionEndTimeChange(value);
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

  const onChange = (e: any) => {
    setPaymentMethods_id(e.target.value);
  };
  if (!user) {
    return (
      <div className="login-now">
        <p>Bạn chưa đăng nhập.</p>
        <img src={logo} alt="logo" />
        <Link to="/SignIn">Đăng nhập ngay</Link>
      </div>
    );
  }
  return (
    <div className="appointment">
      <h1 style={{ marginBottom: 20, color: "#00575c" }}>
        Đặt lịch chăm sóc thú cưng
      </h1>
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
              />
            </Form.Item>
            <Form.Item
              name="services"
              label="Dịch vụ"
              rules={[{ required: true, message: "Không được để trống" }]}
            >
              <Select
                mode="multiple"
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
                {appointmentData.type === 3 ? (
                  <Button
                    onClick={() => handleUpdate()}
                    disabled={loadingUpdate}
                    loading={loadingUpdate}
                  >
                    Sửa
                  </Button>
                ) : (
                  <Button
                    htmlType="submit"
                    disabled={loadingCreate}
                    loading={loadingCreate}
                  >
                    Đăng ký
                  </Button>
                )}
              </Space>
            </Form.Item>
          </div>

          <div style={{ flex: 1 }}>
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
                  style={{ maxWidth: 100, color: "white" }}
                >
                  Thêm mới
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
        setNamePet={setNamePet}
        setValueId={setValueId}
      />
    </div>
  );
};

export default Appointment;
