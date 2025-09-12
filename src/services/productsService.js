import { ServiceBase } from "./serviceBase";

class ProductsService extends ServiceBase {
  constructor(baseUrl, onUnauthenticated = () => {}) {
    super(baseUrl, onUnauthenticated);
  }
  getAllProducts() {
    return this.get("/products/get-all");
  }
  getProductById(id) {
    return this.get(`/products/get-by-id/${id}`);
  }
  searchProducts(keyword) {
    return this.get(`/products/search/${keyword}`);
  }
  getProductbySku(sku) {
    return this.get(`/products/by-category/${sku}`);
  }
}

export default ProductsService;
