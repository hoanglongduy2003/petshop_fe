import Products from "../models/products";
import {
  productsSchema,
  productsUpdateQuatitySchema,
} from "../schemas/products";

export const list = async (req, res) => {
  try {
    const product = await Products.getAllProducts();
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getTop8 = async (req, res) => {
  try {
    const product = await Products.getTop8Products();
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getProductsCate = async (req, res) => {
  try {
    const product = await Products.getProductsCate(req.params.id);
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const show = async (req, res) => {
  try {
    const product = await Products.getProductById(req.params.id);
    if (!product) {
      res.status(404).json({ error: "Product không tồn tại" });
    } else {
      res.json(product);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const create = async (req, res) => {
  try {
    const { name, description, price, img, quantity, category_id } = req.body;
    const { error } = productsSchema.validate(req.body);
    if (error) {
      const errors = error.details.map((errorItem) => errorItem.message);
      return res.status(400).json({
        message: errors,
      });
    }
    const productId = await Products.addProducts(
      name,
      description,
      price,
      img,
      quantity,
      category_id
    );
    res.json({ id: productId, message: "thêm product thành công" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const update = async (req, res) => {
  try {
    const { name, description, price, img, quantity, category_id } = req.body;
    const { error } = productsSchema.validate(req.body);
    if (error) {
      const errors = error.details.map((errorItem) => errorItem.message);
      return res.status(400).json({
        message: errors,
      });
    }
    await Products.updateProduct(
      req.params.id,
      name,
      description,
      price,
      img,
      quantity,
      category_id
    );
    res.json({ message: "Update product thành công" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateQuantity = async (req, res) => {
  try {
    const { quantity } = req.body;
    const { error } = productsUpdateQuatitySchema.validate(req.body);
    if (error) {
      const errors = error.details.map((errorItem) => errorItem.message);
      return res.status(400).json({
        message: errors,
      });
    }
    await Products.updateQuantity(req.params.id, quantity);
    res.json({ message: "Update quantity product thành công" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const remote = async (req, res) => {
  try {
    await Products.deleteProducts(req.params.id);
    res.json({ message: "Xóa product thành công" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const searchProductsAdmin = async (req, res) => {
  try {
    const { category_id } = req.body;
    const product = await Products.searchProducts(category_id);
    if (product.length === 0) {
      return res.status(400).json({
        message: "Không có sản phẩm nào phù hợp",
      });
    }
    return res.status(200).json({
      message: "search thành công",
      products: product,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};
export const searchProductAdmin = async (req, res) => {
  try {
      const { name } = req.body; // Lấy tên sản phẩm từ body
      if (!name) {
          return res.status(400).json({
              message: "Vui lòng nhập tên sản phẩm để tìm kiếm.",
          });
      }

      // Gọi hàm searchProduct từ model để tìm kiếm sản phẩm theo tên
      const products = await Products.searchProduct(name);

      if (products.length === 0) {
          return res.status(400).json({
              message: "Không có sản phẩm nào phù hợp.",
          });
      }

      return res.status(200).json({
          message: "Tìm kiếm thành công",
          products: products,
      });
  } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
  }
}



