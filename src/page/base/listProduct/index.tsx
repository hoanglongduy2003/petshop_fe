import Modal from "@mui/material/Modal";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Checkbox, Col, Slider } from "antd";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import * as React from "react";
import { useEffect, useState } from "react";
import "../../../assets/scss/page/listproduct.scss";
import FilterIcon from "../../../assets/svg/filterIcon";
import ListProductCard from "../../../components/listProduct";
import { TProduct } from "../../../schema/products";
import { useGetAllcategoryQuery } from "../../../services/category";
import { useGetAllProductsQuery } from "../../../services/products";

const ListProduct: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: productsList } = useGetAllProductsQuery();
  const { data: categories } = useGetAllcategoryQuery();
  const handlePageChange = (
    _event: any,
    page: React.SetStateAction<number>
  ) => {
    window.scrollTo({
      top: 0,
    });
    setCurrentPage(page);
  };
  const itemsPerPage = 8;
  useEffect(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = productsList?.slice(indexOfFirstItem, indexOfLastItem);
    setProducts(currentItems);
  }, [currentPage, productsList]);
  const totalPages = Math.ceil((productsList?.length || 0) / itemsPerPage);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [value, setValue] = useState<number[]>([]);
  const [price, setPrice] = useState<number[]>([0, 1000000]);
  const [cate, setCate] = useState<CheckboxValueType[]>([]);
  const [products, setProducts] = useState<TProduct[] | undefined>();

  const onChange = (checkedValues: CheckboxValueType[]) => {
    setCate(checkedValues);
  };

  const onAfterChangePrice = (value: number[]) => {
    setValue(value);
    setPrice(value);
  };

  useEffect(() => {
    if (value.length > 0 || cate.length > 0) {
      const filteredData = productsList?.filter((item) => {
        const price = parseFloat(item.price?.toString() || "");
        const isPriceInRange =
          value.length === 0 || (price >= value[0] && price <= value[1]);
        const isCategorySelected =
          cate.length === 0 || cate.includes(item.category_id || 0);
        return isPriceInRange && isCategorySelected;
      });
      setProducts(filteredData);
    } else {
      setProducts(productsList);
    }
  }, [products, value, cate, productsList]);

  const formatSliderValue = (value: any) => {
    return `${new Intl.NumberFormat("vi-VN").format(value)} VNĐ`;
  };

  return (
    <div className="bg">
      {/* <div className="titleProduct">
        <h2>
          Phụ kiện thú cưng 
          <span>({products?.length})</span>
        </h2>

        <div className="btn-filter" onClick={handleOpen}>
          <FilterIcon />
          <button>Tất cả</button>
        </div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div className="filter-onclick">
            <h2>Lọc Sản Phẩm</h2>
            <div className="brand">
              <div>
                <Checkbox.Group style={{ width: "100%" }} onChange={onChange}>
                  <Col>
                    {categories?.map((FilterCard) => (
                      <Col key={FilterCard.id}>
                        <Checkbox value={FilterCard.id}>
                          {FilterCard.name}
                        </Checkbox>
                      </Col>
                    ))}
                  </Col>
                </Checkbox.Group>
              </div>
              <div>
                <h4>Giá</h4>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>{formatSliderValue(price[0])}</div>
                  <div>{formatSliderValue(price[1])}</div>
                </div>
                <Slider
                  range
                  step={100000}
                  defaultValue={[0, 10000000]}
                  max={10000000}
                  tooltip={{ formatter: null }}
                  onChange={onAfterChangePrice}
                  tipFormatter={formatSliderValue}
                />
              </div>
            </div>
          </div>
        </Modal>
      </div> */}

      <div className="product">
        <div className="filter">
        <h2>Lọc Sản Phẩm</h2>
          <div className="brand">
            <div>
              <Checkbox.Group style={{ width: "100%" }} onChange={onChange}>
                <Col>
                  {categories?.map((FilterCard) => (
                    <Col key={FilterCard.id}>
                      <Checkbox value={FilterCard.id}>
                        {FilterCard.name}
                      </Checkbox>
                    </Col>
                  ))}
                </Col>
              </Checkbox.Group>
            </div>
            <div>
              <h4>Giá</h4>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>{formatSliderValue(price[0])}</div>
                <div>{formatSliderValue(price[1])}</div>
              </div>
              <Slider
                range
                step={10000}
                defaultValue={[0, 1000000]}
                max={1000000}
                tooltip={{ formatter: null }}
                onChange={onAfterChangePrice}
                tipFormatter={formatSliderValue}
              />
            </div>
          </div>
        </div>
        <div className="list-pagination">
          <div className="product-list">
            {products?.map((item) => {
              return <ListProductCard key={item.id} item={item} />;
            })}
          </div>
          <div className="pagination">
            <Stack direction="row" spacing={2}>
              <Pagination
                count={totalPages}
                page={currentPage}
                variant="outlined"
                onChange={handlePageChange}
              />
            </Stack>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListProduct;
