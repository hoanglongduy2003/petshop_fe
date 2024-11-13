import React from "react";
import "../../../assets/scss/page/home.scss";
import ArrowRightIcon from "../../../assets/svg/arrowRightIcon";

import "react-multi-carousel/lib/styles.css";
import { useNavigate } from "react-router-dom";
import CarouselProduct from "../../../components/carouselProduct";
import CarouselBlogs from "../../../components/carouselBlogs";
import ServiceCard from "../../../components/serviceCard";
import { useGetTop8ProductsQuery } from "../../../services/products";
import { useServicesTop4Query } from "../../../services/services";
import { useGetAllBannerQuery } from "../../../services/banner";
import Blogs from "../../../components/blogs";
import { useNewsTop8Query } from "../../../services/news";
import { useGetAllWebsiteInformationQuery } from "../../../services/websiteInformation";

const Home: React.FC = () => {
  const navigator = useNavigate();
  const { data: listServices } = useServicesTop4Query();
  const { data: listTop8Products } = useGetTop8ProductsQuery();
  const { data: listBanner } = useGetAllBannerQuery();
  const { data: newsTop8 } = useNewsTop8Query();
  const { data: listWebsiteInformation } = useGetAllWebsiteInformationQuery();

  return (
    <div className="bg">
      <div className="home">
        <div className="home-banner">
          <div className="home-banner-img">
            <img
              src={
                listBanner &&
                listBanner.length > 0 &&
                typeof listBanner[0]?.img === "string"
                  ? listBanner[0]?.img
                  : undefined
              }
              alt="Ảnh banner website."
            />
          </div>
          <div className="home-banner-text">
            <div className="top">
              <h1>
                {listBanner && listBanner.length > 0 && listBanner[0].title}
              </h1>
            </div>
            <div className="slogan">
              <p>
                {listBanner && listBanner.length > 0 && listBanner[0].slogan}
              </p>
            </div>
            <div className="bottom">
              <button
                onClick={() =>
                  navigator("/product")
                }
              >
                <div>Khám phá ngay</div> <ArrowRightIcon />
              </button>
            </div>
          </div>
        </div>
        <div className="home-listCate">
          {listServices?.map((serviceCardData) => {
            return (
              <ServiceCard
                key={serviceCardData.id}
                id={serviceCardData.id}
                image={serviceCardData.image}
                name={serviceCardData.name}
              />
            );
          })}
        </div>
        <CarouselProduct
          productData={listTop8Products || []}
          name="Sản phẩm mới nhất "
        />
        <CarouselBlogs blogsData={newsTop8 || []} name="Tin tức mới nhất" />
        
      </div>
    </div>
  );
};

export default Home;
