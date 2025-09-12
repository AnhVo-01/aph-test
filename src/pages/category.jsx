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
} from "antd";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";
import ProductsService from "../services/productsService";
import CategoryService from "../services/categoryService";
import { setCategories } from "../redux/category";

function Category() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Bỏ cmt nếu bạn sử dụng phần này
  // const { productCategory } = useSelector((state) => state.category);

  const [form] = Form.useForm();
  const [dataCategory, setDataCategory] = useState([]);
  const [dataProducts, setDataProducts] = useState([]);
  const productService = new ProductsService(
    import.meta.env.VITE_BASE_URL,
    () => {}
  );
  const categoryService = new CategoryService(
    import.meta.env.VITE_BASE_URL,
    () => {}
  );

  useEffect(() => {
    try {
      const fetchDataCategory = async () => {
        const categories = await categoryService.getAllCategories();
        setDataCategory(categories);
        dispatch(setCategories(categories));
      };
      fetchDataCategory();
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }, []);
  useEffect(() => {
    try {
      const fetchDataProducts = async () => {
        const products = await productService.getAllProducts();
        setDataProducts(products);
      };
      fetchDataProducts();
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  }, []);

  const [filterData, setFilterData] = useState(dataProducts);
  const [isSubmitDisabled, setSubmitDisabled] = useState(true);

  const onValuesChange = (changedValues, allValues) => {
    const hasValue = Object.values(allValues).some((value) => value);
    setSubmitDisabled(!hasValue);
  };

  const onFilter = async (values) => {
    const hasValue = Object.values(values).some((value) => value);
    if (!hasValue) {
      setFilterData(undefined);
      return;
    }

    let filtered = dataProducts;

    if (values.categories && values.categories.length > 0) {
      filtered = filtered.filter((item) =>
        values.categories.includes(item.categoryId)
      );
    }

    if (values["Type of"] && values["Type of"].length > 0) {
      filtered = filtered.filter((item) =>
        values["Type of"].includes(item.type)
      );
    }

    if (values["Width (cm)"] && Array.isArray(values["Width (cm)"])) {
      const [minW, maxW] = values["Width (cm)"];
      filtered = filtered.filter(
        (item) => item.width >= minW && item.width <= maxW
      );
    }

    if (values["Length (cm)"] && Array.isArray(values["Length (cm)"])) {
      const [minL, maxL] = values["Length (cm)"];
      filtered = filtered.filter(
        (item) => item.length >= minL && item.length <= maxL
      );
    }

    if (values.Recycle && values.Recycle.length > 0) {
      filtered = filtered.filter((item) =>
        values.Recycle.includes(item.recycle)
      );
    }

    if (values.textSearch && values.textSearch.trim() !== "") {
      const search = values.textSearch.trim().toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(search) ||
          item.sku.toLowerCase().includes(search)
      );
    }

    setFilterData(filtered);
  };

  const clearFilters = () => {
    form.resetFields();
    setFilterData();
    setSubmitDisabled(true);
  };

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
                      <Checkbox.Group className="form-group">
                        {dataCategory?.map((category) => (
                          <Checkbox
                            value={category.categoryId}
                            key={category.categoryId}
                          >
                            {category.categoryName}
                          </Checkbox>
                        ))}
                      </Checkbox.Group>
                    </Form.Item>

                    <Form.Item
                      label="Type of"
                      className="widget_product_categories"
                    >
                      <Checkbox.Group className="form-group">
                        <Checkbox value={3}>Food Storage</Checkbox>
                        <Checkbox value={4}>Trash Bags</Checkbox>
                        <Checkbox value={5}>
                          Knife – Case – Storage Box
                        </Checkbox>
                        <Checkbox value={6}>Containers</Checkbox>
                        <Checkbox value={7}>Gloves</Checkbox>
                      </Checkbox.Group>
                    </Form.Item>

                    <Form.Item
                      label="Width (cm)"
                      className="widget_product_categories"
                    >
                      <Slider min={10} max={60} range />
                    </Form.Item>

                    <Form.Item
                      label="Length (cm)"
                      className="widget_product_categories"
                    >
                      <Slider min={20} max={120} range />
                    </Form.Item>

                    <Form.Item
                      label="Recycle"
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
                  <h2 className="_3rac">Consumer Packaging</h2>
                </div>
                <div className="products">
                  <Row gutter={30}>
                    {(filterData && filterData.length > 0
                      ? filterData
                      : dataProducts
                    ).map((item) => {
                      const url = item.productId;
                      return (
                        <Col
                          xs={24}
                          md={8}
                          className="col has-hover product"
                          key={item.productId}
                        >
                          <div className="col-inner">
                            <div className="box-product has-hover">
                              <div className="box-image customer-box-image-product">
                                <a
                                  className="_1gqs block image-zoom"
                                  onClick={() => navigate(`/product/${url}`)}
                                  style={{ cursor: "pointer" }}
                                >
                                  <img
                                    src={item.img}
                                    className="_8wjh"
                                    alt={item.img}
                                  />
                                </a>
                              </div>
                              <div className="box-text box-text-products text-left">
                                <div className="title-wrapper">
                                  <h4 className="product-title">
                                    <a
                                      className="product_link"
                                      onClick={() =>
                                        navigate(`/product/${url}`)
                                      }
                                      style={{ cursor: "pointer" }}
                                    >
                                      {item.productName}
                                    </a>
                                  </h4>
                                  <p className="sku">
                                    Price: <span>{item.price}</span>
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Col>
                      );
                    })}
                  </Row>
                </div>

                <Pagination
                  defaultCurrent={1}
                  total={27}
                  defaultPageSize={9}
                  className="pagination-cntt"
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
