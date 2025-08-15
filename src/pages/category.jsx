import { SearchOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Breadcrumb,
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  Pagination,
  Row,
  Slider,
  Spin,
  message,
} from "antd";
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axiosClient from "../services/interceptor";

function Category() {
  const { url } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();


  const [categories, setCategories] = useState([]); // Parent categories
  const [subCategories, setSubCategories] = useState([]); // Child categories
  const [loading, setLoading] = useState(false); // Loading state for categories
  const [error, setError] = useState(null); // Error state for API failures

   const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [totalProducts, setTotalProducts] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
  const [filterData, setFilterData] = useState({});
  const [isSubmitDisabled, setSubmitDisabled] = useState(true);

  

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axiosClient.get("/category/GetListCategory", { params: { lang: "en" } });
        // Handle potential wrapping in response.data
        const data = response;
        // Validate response
        if (!Array.isArray(data)) {
          throw new Error("API response is not an array");
        }

        const parentCategories = data.filter((cat) => cat.parentId === null);
        const childCategories = data.flatMap((cat) =>
          Array.isArray(cat.children) ? cat.children : []
        );

        console.log("Parent Categories:", parentCategories); // Debug
        console.log("Child Categories:", childCategories); // Debug

        setCategories(parentCategories);
        setSubCategories(childCategories);
        if (url) {
          const matchedCategory = [...parentCategories, ...childCategories].find(cat => cat.link?.includes(url));
          if (matchedCategory) setSelectedCategoryIds([matchedCategory.id]);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        setError("Failed to load categories. Please try again later.");
        message.error("Failed to load categories. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [url]);

  const fetchProducts = async (page = 1, filters = {}) => {
    setLoadingProducts(true);
    try {
      // Chuyển categories/subCategories thành mảng id
      const ids = [
        ...(filters.categories || []),
        ...(filters.subCategories || []),
      ];

      const response = await axiosClient.get("/product/GetProductByCategory", {
        params: {
          lang: "en",
          page,
          ids: ids.join(","), // API nhận dạng dạng "1,2,3"
        },
      });

      const items = response.items.map((item) => ({
        id: item.id,
        name: item.prodName,
        image: item.thumb,
        link: item.slug,
        sku: item.sku,
      }));

      console.log("Fetched Products:", items); // Debug


      setProducts(items);
      setTotalProducts(response.totalCount);
      setCurrentPage(response.currentPage || 1);
    } catch (error) {
      console.error(error);
      message.error("Failed to load products");
      setProducts([]);
      setTotalProducts(0);
    } finally {
      setLoadingProducts(false);
    }
  };

   useEffect(() => {
    fetchProducts(currentPage, selectedCategoryIds);
  }, [currentPage, selectedCategoryIds]);

  // --- Form filter ---
  const onValuesChange = (changedValues, allValues) => {
    const hasValue = Object.values(allValues).some((v) => v && v.length !== 0);
    setSubmitDisabled(!hasValue);
  };

  const onFilter = (values) => {
    const filters = {};
    Object.keys(values).forEach((key) => {
      if (values[key] && values[key].length > 0) filters[key] = values[key];
    });
    setFilterData(filters);

    // Nếu lọc categories → update selectedCategoryIds
    if (filters.categories && filters.categories.length > 0) {
      setSelectedCategoryIds(filters.categories);
      setCurrentPage(1);
      navigate(`/category/${filters.categories[0]}`);
    } else {
      setSelectedCategoryIds([]);
    }
  };

  const clearFilters = () => {
    form.resetFields();
    setFilterData({});
    setSelectedCategoryIds([]);
    setSubmitDisabled(true);
    setCurrentPage(1);
  };

  const pageSize = 10;

  return (
    <div id="content" className="content-area">
      <section className="heath-lek section">
        <div className="section-bg fill">
          <div className="video-overlay no-click fill"></div>
          <video
            className="video-bg fill"
            preload="true"
            playsInline
            autoPlay
            muted
            loop
          >
            <source
              src="images/website/video_category_product.mp4"
              type="video/mp4"
            />
          </video>
          <div className="section-bg-overlay absolute fill"></div>
        </div>
        <div className="section-content relative">
          <div className="_4csl">
            <Row gutter={30}>
              <Col span={12} className="_9trw RemovePaddingBottom">
                <div className="_4yvp">
                  <Breadcrumb
                    items={[
                      {
                        title: (
                          <a href="/" className="item-bread">
                            Home
                          </a>
                        ),
                      },
                      {
                        title: (
                          <Link to="/all-product" className="item-bread">
                            All Products
                          </Link>
                        ),
                      },
                      {
                        title: <span className="active-bread">Packaging</span>,
                      },
                    ]}
                    id="breadcrumb"
                  />

                  <h2 className="_5xfq _1kly">Packaging</h2>
                  <div className="_7vyg">
                    <p>
                      All our products are under absolute supervision, from raw
                      materials to finished products.
                    </p>
                    <p>
                      We apply an international quality management system to all
                      of our products.
                    </p>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </section>
      <section className="penury-gym section">
        <div className="section-content relative">
          {error && <p style={{ color: "red" }}>{error}</p>}
          <div className="category-page-row">
            <Row gutter={30}>
              <Col span={6}>
                <div className="product_sidebar_cate">
                  <Form
                    layout="vertical"
                    form={form}
                    onValuesChange={onValuesChange}
                    onFinish={onFilter}
                  >
                    <div className="_4get">
                      <div className="_4yee">
                        <div className="_5tyu">Filters</div>
                        <div className="_2wzq">
                          <Button
                            type="link"
                            size="small"
                            id="clear-filter"
                            onClick={clearFilters}
                            disabled={!filterData}
                          >
                            Clear Filters
                          </Button>
                        </div>
                      </div>
                      <Form.Item name="textSearch" className="_7pia">
                        <Input
                          placeholder="Search Products"
                          className="_8jji"
                          suffix={<SearchOutlined />}
                        />
                      </Form.Item>
                    </div>

                    <Form.Item
                      label="Categories"
                      name="categories"
                      className="widget_product_categories"
                    >
                      {loading ? (
                        <Spin tip="Loading categories..." />
                      ) : (
                        <Checkbox.Group className="form-group">
                          {categories.length > 0 ? (
                            categories.map((category) => (
                              <Checkbox key={category.id} value={category.id}>
                                {category.categoryName}
                              </Checkbox>
                            ))
                          ) : (
                            <p>No categories available</p>
                          )}
                        </Checkbox.Group>
                      )}
                    </Form.Item>

                    <Form.Item
                      label="Type of"
                      name="subCategories"
                      className="widget_product_categories"
                    >
                      {loading ? (
                        <Spin tip="Loading subcategories..." />
                      ) : (
                        <Checkbox.Group className="form-group">
                          {subCategories.length > 0 ? (
                            subCategories.map((subCategory) => (
                              <Checkbox key={subCategory.id} value={subCategory.id}>
                                {subCategory.categoryName}
                              </Checkbox>
                            ))
                          ) : (
                            <p>No subcategories available</p>
                          )}
                        </Checkbox.Group>
                      )}
                    </Form.Item>

                    <Form.Item
                      label="Width (cm)"
                      name="width"
                      className="widget_product_categories"
                    >
                      <Slider min={10} max={60} range />
                    </Form.Item>

                    <Form.Item
                      label="Length (cm)"
                      name="length"
                      className="widget_product_categories"
                    >
                      <Slider min={20} max={120} range />
                    </Form.Item>

                    <Form.Item
                      label="Recycle"
                      name="recycle"
                      className="widget_product_categories"
                    >
                      <Checkbox.Group className="form-group">
                        <Checkbox value="Yes">Yes</Checkbox>
                        <Checkbox value="No">No</Checkbox>
                      </Checkbox.Group>
                    </Form.Item>

                    {!isSubmitDisabled && (
                      <Button type="link" htmlType="submit" className="filter">
                        Filter
                      </Button>
                    )}
                  </Form>
                </div>
              </Col>

              <Col span={18}>
                <div className="_7mkr">
                  <h2 className="_3rac">
                    {filterData?.categories?.length === 1
                      ? categories.find((cat) => cat.id === filterData.categories[0])
                          ?.categoryName || "Consumer Packaging"
                      : "Consumer Packaging"}
                  </h2>
                </div>
                <div className="products">
                    {loadingProducts ? (
                    <Spin />
                  ) : products.length > 0 ? (
                    products.map((product) => (
                      <div key={product.id} className="product">
                        <img src={product.thumb} alt={product.prodName} />
                        <h4>{product.name}</h4>
                        <p>SKU: {product.sku}</p>
                        <img src={product.thumb} alt={product.prodName} />
                      </div>
                    ))
                  ) : (
                    <p>No products found.</p>
                  )}
                </div>

                  <Pagination
                  current={currentPage}
                  onChange={setCurrentPage}
                  total={totalProducts}
                  pageSize={pageSize}
                />
              </Col>
            </Row>
          </div>
        </div>
      </section>

      <section className="lichen-gel section">
        <div className="section-content relative">
          <div className="_2gia">
            <Row gutter={60}>
              <Col span={12}>
                <div className="text-box_image">
                  <p className="_0kce">Our catalog</p>
                  <h3 className="_8mak">Explore Our Catalogs</h3>
                  <p className="_8fet">
                    Through a journey of establishment and continuous
                    development, An Phat Holdings has emerged as the leading
                    high-tech, environmentally friendly plastics group in
                    Southeast Asia. With over 20 years of experience, we are
                    dedicated to delivering high-quality, sustainable products
                    across a wide range of industries. As the region’s foremost
                    innovator in eco-friendly plastic solutions, we have built a
                    strong reputation and successfully expanded our presence
                    into key global markets, including Europe, the Americas, the
                    UAE, Japan, Korea, Singapore, Taiwan, and the Philippines.
                    Driven by ongoing research, innovation, and creativity, we
                    are committed to creating enduring value for our customers,
                    investors, and employees.
                  </p>
                  <div className="_3qdw">
                    <a className="button button-outline-green" href="/catalog">
                      <span>Our Catalogs</span>
                      <FontAwesomeIcon icon="fa-solid fa-arrow-right" />
                    </a>
                  </div>
                </div>
              </Col>
              <Col span={12}>
                <div className="image-box_image">
                  <img src="/images/website/explore.png" className="_6ikc" />
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Category;