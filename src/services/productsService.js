import Servicebase from "./serviceBase";

class ProductsService extends Servicebase {
  constructor(baseUrl, onUnauthenticated = () => {}) {
    super(baseUrl, onUnauthenticated);
  }
  getAllProducts() {
    return this.get("/products");
  }
  searchProducts(keyword) {
    return this.get(`/products/search?keyword=${keyword}`);
  }
  getProductbySku(sku) {
    return this.get(`/products/${sku}`);
  }
}

export default ProductsService;
