import dayjs from "dayjs";
import { FC } from "react";
import "../../assets/scss/components/blog.scss";
import Image from "../../assets/svg/icon";

type BlogProps = {
  name: string;
  description: string;
  url: string;
  date: string;
};

const Blog: FC<BlogProps> = ({ name, description, url, date }) => (
  <div className="blog">
    <div className="blog-image">
      <img src={url} alt="blogImage" />
      <div className="date">
        <div className="date-title">
          <Image />
          <p>{dayjs(date).format("DD-MM-YYYY")}</p>
        </div>
      </div>
    </div>
    <div className="blog-name">{name}</div>
    <div
      className="blog-describe"
      dangerouslySetInnerHTML={{
        __html: description || "",
      }}
    ></div>
  </div>
);

export default Blog;
