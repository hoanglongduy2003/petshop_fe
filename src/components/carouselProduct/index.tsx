import { FC, useEffect, useRef } from "react";
import Carousel from "react-multi-carousel";
import ArrowLeft from "../../assets/svg/arrow-left";
import ArrowRight from "../../assets/svg/arrow-right";
import { responsive } from "../../page/base/home/data";
import Product from "../product";
import { TProduct } from "../../schema/products";

type Props = {
  productData: TProduct[];
  name: string;
};

const CarouselProduct: FC<Props> = ({ productData, name }) => {
  const carouselRef = useRef<Carousel | null>(null);

  const handleNext = () => {
    if (carouselRef.current) {
      const { currentSlide, totalItems } = carouselRef.current.state;
      if (currentSlide === totalItems - 4) {
        carouselRef.current.goToSlide(0);
      } else {
        carouselRef.current.next(1);
      }
    }
  };

  const handlePrev = () => {
    if (carouselRef.current) {
      const { currentSlide, totalItems } = carouselRef.current.state;

      if (currentSlide === 0) {
        carouselRef.current.goToSlide(totalItems);
      } else {
        carouselRef.current.previous(1);
      }
    }
  };
  const autoNext = () => {
    handleNext();
    setTimeout(autoNext, 4000);
  };

  useEffect(() => {
    const timerId = setTimeout(autoNext, 4000);
    return () => clearTimeout(timerId);
  }, []);

  return (
    <div className="home-product">
      <Carousel
        className="carousel"
        responsive={responsive}
        customTransition="transform 500ms ease-in-out"
        containerClass="carousel-container"
        infinite={false}
        ref={carouselRef}
        showDots={true}
        draggable={false}
      >
        {productData.map((item) => (
          <Product key={item.id} item={item} />
        ))}
      </Carousel>
      <button className="home-product-prev button" onClick={handlePrev}>
        <ArrowLeft />
      </button>
      <button className="home-product-next button" onClick={handleNext}>
        <ArrowRight />
      </button>
      <div className="home-product-title">{name}</div>
    </div>
  );
};

export default CarouselProduct;
