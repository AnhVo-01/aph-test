import { ServiceBase } from "./serviceBase";

class CategoryServices extends ServiceBase {
  constructor(baseUrl, onUnauthenticated = () => {}) {
    super(baseUrl, onUnauthenticated);
  }
  getAllCategories() {
    return this.get("/category/get-all");
  }
  getCategoryById(id) {
    return this.get(`/category/get-by-id/${id}`);
  }
}
export default CategoryServices;
