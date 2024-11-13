import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { TNews } from "../../schema/news";

type ProductProps = {
  item: TNews;
};

const Blogs: FC<ProductProps> = ({ item }) => {
  const formattedDate = new Date(item.created_at).toLocaleDateString("en-GB");
  const navigate = useNavigate();
  return (
    <div className="card" onClick={() => navigate(`/news/${item.id}`)}>
      <div className="product--image">
        <img src={item.img} alt="productImage" />
      </div>
      <div className="card-name">
        <div>{item.title}</div>
      </div>
      <div className="card-information">
        <div className="price"></div>
        <div className="sold">Ngày đăng: {formattedDate}</div>
      </div>
    </div>
  );
};

export default Blogs;
