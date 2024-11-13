import { FC } from "react";
import { TProduct } from "../../schema/products";
import { useNavigate } from "react-router-dom";

type ProductProps = {
  item: TProduct;
};

const Product: FC<ProductProps> = ({ item }) => {
  const navigate = useNavigate();
  return (
    <div className="card" onClick={() => navigate(`/product/${item.id}`)}>
      <div className="product--image">
        <img src={item.img} alt="productImage" />
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

export default Product;
