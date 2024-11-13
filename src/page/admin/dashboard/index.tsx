import { useEffect, useState } from "react";
import "../../../assets/scss/admin/dashBoard.scss";
import {
  useGetCountUserDayQuery,
  useRevenueAppointmentsDayQuery,
  useRevenueAppointmentsThisMonthQuery,
  useRevenueThisMonthQuery,
  useRevenueTodayQuery,
  useScheduleStatusAppointmentQuery,
  useScheduleStatusOrderQuery,
  useTotalQuery,
  useTotalRevenueQuery,
} from "../../../services/dashboard";
import { Line, Pie, Column } from "@ant-design/charts";
import dayjs from "dayjs";

const DashBoard = () => {
  const { data: revenueToday } = useRevenueTodayQuery();
  
  const { data: revenueThisMonth } = useRevenueThisMonthQuery();

  const { data: countUserDay } = useGetCountUserDayQuery();
  const { data: revenueAppointmentsThisMonth } =
    useRevenueAppointmentsThisMonthQuery();
  const { data: revenueAppointmentsDay } = useRevenueAppointmentsDayQuery();
  const { data: scheduleStatusAppointment } =
    useScheduleStatusAppointmentQuery();
  const { data: scheduleStatusOrder } = useScheduleStatusOrderQuery();
  const [lineData, setLineData] = useState<any[]>([]);
  const [scheduleStatusAppointmentData, setScheduleStatusAppointmentData] =
    useState<any[]>([]);
  const [scheduleStatusOrderData, setScheduleStatusOrderData] = useState<any[]>(
    []
  );
  const [chartType, setChartType] = useState("column");

  const currentDate = dayjs().format("DD-MM-YYYY");
  const { data: totalRevenue } = useTotalRevenueQuery();
  const { data: listTotal } = useTotalQuery();
  useEffect(() => {
    if (revenueToday) {
      const dataChart = [
        {
          type: `${currentDate}`,
          total: Number(revenueToday?.total_revenue),
          unit: "đ",
        },
      ];
      setLineData(dataChart);
    }
    if (scheduleStatusAppointment) {
      const data =
        scheduleStatusAppointment?.map((data) => ({
          type: `${data.name}`,
          value: data.status_count,
        })) ?? [];
      setScheduleStatusAppointmentData(data);
    }
    if (scheduleStatusOrder) {
      const data =
        scheduleStatusOrder?.map((data) => ({
          type: `${data.name}`,
          value: data.status_count,
        })) ?? [];
      setScheduleStatusOrderData(data);
    }
  }, [
    currentDate,
    revenueAppointmentsDay,
    revenueToday,
    scheduleStatusAppointment,
    scheduleStatusOrder,
  ]);
  const pieConfig1 = {
    data: scheduleStatusOrderData,
    angleField: "value",
    colorField: "type",
  };
  const lineConfig = {
    data: lineData,
    xField: "type",
    yField: "total",
    point: {
      size: 4,
      shape: "circle",
    },
    label: {
      style: {
        fill: "#aaa",
      },
      formatter: (item: any) =>
        `${new Intl.NumberFormat("vi-VN").format(item.total)} ${item.unit}`,
    },
    yAxis: {
      label: {
        formatter: (value: any) =>
          `${new Intl.NumberFormat("vi-VN").format(value)} đ`,
      },
    },
    xAxis: {
      type: "cat",
    },
  };
  const onClickToday = (id: number) => {
        setChartType("column");
        const data =
        listTotal?.map(
            (data: { activity_date: any; total: string | number }) => ({
              type: `${data.activity_date}`,
              total: data.total ? +data.total : 0,
              unit: "đ",
            })
          ) ?? [];
        setLineData(data);
  };
  const onClickMonth = (id: number) => {
        setChartType("line");
        const data =
          totalRevenue?.map(
            (data: { activity_date: any; total_revenue: string | number }) => ({
              type: `${data.activity_date}`,
              total: data.total_revenue ? +data.total_revenue : 0,
              unit: "đ",
            })
          ) ?? [];
        setLineData(data);
  };
  return (
    <div className="dashBoard">
      <h2>Kết quả kinh doanh hôm nay</h2>

      <div className="dashBoard-box">
        <div className="dashBoard-box-item bg-030f39">
          <div className="dashBoard-box-item-title">
            {" "}
            {new Intl.NumberFormat("vi-VN").format(
              Number(revenueToday?.total_revenue)
            )}{" "}
            VNĐ
          </div>
          <div className="dashBoard-box-item-subTitle">DOANH THU HÔM NAY</div>
        </div>
        <div className="dashBoard-box-item bg-007db8">
          <div className="dashBoard-box-item-title">
            {" "}
            {new Intl.NumberFormat("vi-VN").format(
              revenueThisMonth?.total_revenue
            )}{" "}
            VNĐ
          </div>
          <div className="dashBoard-box-item-subTitle">DOANH THU THÁNG NÀY</div>
        </div>
        <div className="dashBoard-box-item bg-369b8a">
          <div className="dashBoard-box-item-title">{countUserDay?.count}</div>
          <div className="dashBoard-box-item-subTitle">
            KHÁCH HÀNG MỚI HÔM NAY
          </div>
        </div>
      </div>
      <div className="line">
        <div className="line-box">
          <div className="line-box-title">
            <h2>Tổng doanh thu của cửa hàng</h2>
            <div className="line-box-title-btn">
              <div onClick={() => onClickToday(1)}>Ngày</div>
              <div onClick={() => onClickMonth(1)}>Tháng</div>
            </div>
          </div>
          {chartType === "column" ? (
            <Column {...lineConfig} />
          ) : (
            <Line {...lineConfig} />
          )}
        </div>
        <div className="line-box">
          <div className="line-box-title">
            <h2>Phân phối trạng thái đơn hàng</h2>
          </div>
          <Pie {...pieConfig1} />
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
