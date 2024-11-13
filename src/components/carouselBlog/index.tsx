import { FC } from "react";
import Carousel from "react-multi-carousel";
import { responsive } from "../../page/base/home/data";
import Blog from "../blog";

type Props = {
  blogData: any;
};

const CarouseBlog: FC<Props> = ({ blogData }) => {
  return (
    <div className="home-blog">
      <Carousel
        className="carousel"
        responsive={responsive}
        customTransition="transform 500ms ease-in-out"
        containerClass="carousel-container"
        infinite={false}
        showDots={true}
        draggable={false}
      >
        {blogData.map(
          (blogData: {
            id: number;
            name: string;
            imageUrl: string;
            description: string;
            date: string;

          }) => (
            <Blog key={blogData.id} date={blogData.date} name={blogData.name} description={blogData.description} url={blogData.imageUrl}/>
          )
        )}
      </Carousel>
    </div>
  );
};

export default CarouseBlog;
