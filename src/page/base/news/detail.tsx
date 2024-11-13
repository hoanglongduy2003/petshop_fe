import React from "react";
import "../../../assets/scss/page/news.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useNewsByIdQuery, useNewsTop3Query } from "../../../services/news";
import dayjs from "dayjs";

const DetailNews: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: dataNewsTop3 } = useNewsTop3Query();
  const { data: dataNews } = useNewsByIdQuery(Number(id));
  const navigate = useNavigate();

  return (
    <>
      <div className="bg">
        <div className="detailNews">
          <div className="detailNews-recentPost">
            <div className="detailNews-recentPost-title">Bài đăng gần đây</div>
            <div className="detailNews-recentPost-hr"></div>
            {dataNewsTop3 &&
              dataNewsTop3.map((item) => (
                <div
                  onClick={() => {
                    navigate(`/news/${item.id}`);
                  }}
                  key={item.id}
                  className="detailNews-recentPost-item"
                >
                  <div className="detailNews-recentPost-item-img">
                    <img src={item.img} alt="" />
                  </div>
                  <div className="detailNews-recentPost-item-text">
                    <div className="detailNews-recentPost-item-text-title">
                      {item.title}
                    </div>
                    <div className="detailNews-recentPost-item-text-date">
                      {dayjs(item.created_at).format("DD-MM-YYYY")}
                    </div>
                    <div className="detailNews-recentPost-item-text-user">
                      <span>Người đăng: </span>
                      {item.nameUser}
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <div className="detailNews-item">
            <h3 className="detailNews-item-title">{dataNews?.title}</h3>
            <div
              className="detailNews-item-description"
              dangerouslySetInnerHTML={{
                __html: dataNews?.description || "",
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailNews;
