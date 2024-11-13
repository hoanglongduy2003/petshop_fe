import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { TProduct } from "../../schema/products";

type ProductProps = {
  item: TProduct;
};

const ListProductCard: FC<ProductProps> = ({ item }) => {
  const navigate = useNavigate();
  return (
    <div className="card" onClick={() => navigate(`${item.id}`)}>
      <div className="product--image">
        <div style={{ width: "100%", minHeight: "16em", overflow: "none" }}>
          <img
            style={{ width: "100%", height: "16em" }}
            src={item.img}
            alt="productImage"
          />
        </div>
      </div>
      <div className="card-name">
        <div>{item.name}</div>
      </div>
      <div className="card-information">
        <div className="price">
          {new Intl.NumberFormat("vi-VN").format(item.price ?? 0)} VNĐ
        </div>
        {item.quantity !== 0 ? (
          <div className="sold"> {item.quantity} sản phẩm</div>
        ) : (
          <div className="sold">Hết hàng</div>
        )}
      </div>
    </div>
  );
};

export default ListProductCard;
