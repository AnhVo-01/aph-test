<div align="center">

<img height="100" src="https://anphatholdings.vn/wp-content/uploads/2019/12/Logo-An-Phat.png">

<h1>Bài kiểm tra React</h1>
</div>
Vui lòng đọc kỹ hướng dẫn trước khi bắt đầu.
Chúc bạn may mắn 🍀

</br>

## 🖥 Môi trường

- React 18
- NodeJS: >= 18.20.8 (Khuyến nghị sử dụng phiên bản bản LTS >= 20.19.5)
- Visual Studio Code (Hoặc các code editor khác)
- Git

## 🚀 Bắt đầu

1. **Tạo repository riêng của bạn từ repo này**

   - Nhấn nút **"Use this template"** ở góc trên bên phải.
   - Chọn **Create a new repository**.
   - Đặt tên repo theo format:
     ```
     <tên-ứng-viên>-AphTest
     ```
     (Ví dụ: `nguyen-van-a-AphTest`)

2. **Clone repo mới về máy của bạn**
   ```bash
   git clone https://github.com/<tên-user>/<repo-vừa-tạo>.git
   cd <repo-vừa-tạo>
   ```

## 📤 Cách nộp bài

Sau khi hoàn thành, bạn có 2 cách để nộp:

- **Cách 1**: Gửi link repo của bạn cho HR hoặc người phụ trách tuyển dụng.

- **Cách 2:**

  - Vào `repo → Settings → Collaborators`
  - Nhấn `Add people` và nhập GitHub username: `AnhVo-01`

## 🔨 Một số câu lệnh làm việc

```bash
$ git clone <your project URL>
```

```bash
$ git branch -d <branch_name>
```

```bash
$ git commit -m “your useful commit message”
```

```bash
$ git push -u <short_name> <your_branch_name>
```

```bash
$ npm install
```

```bash
$ npm run dev
```

## ⌨️ Thực hành

### Tên đề: 📦 E-Catalog – Giới thiệu sản phẩm

> "Bạn được phép dùng bất kỳ AI code assistant nào (ChatGPT, Copilot, v.v.). Hãy ghi rõ đoạn code nào được AI gợi ý."

### Thiết kế Figma:

- [Dev mode](https://www.figma.com/design/IySGuTvZnBSJT5FA5RLceI/Product-Introduction?node-id=0-1&m=dev&t=EQ48VlCkYx6SsaFc-1)
- [Prototype](https://www.figma.com/proto/IySGuTvZnBSJT5FA5RLceI/Product-Introduction?node-id=1-4&t=WlEwaOVbZAZZZIkF-1)

### Yêu cầu chức năng (Bắt buộc):

#### 1. Trang danh mục sản phẩm: `all-product.jsx`

- Lấy dữ liệu từ API: `GET /Category/GetListCategory, params: {lang=en}` → trả về danh sách danh mục sản phẩm:

```
{
    id: number,
    thumb: string,
    categoryName: string,
    link: string,
    shortDesc: string,
    description: string,
    parentId: number,
    children: []
}
```

#### 2. Trang danh sách sản phẩm theo danh mục: `category.jsx`

- Khi click vào một danh mục → điều hướng sang `/category/:url`

- Lấy dữ liệu của danh mục từ API `GET /Category/GetCategoryByUrl, params: {lang=en, url=:url}`

```
{
    id: number,
    thumb: string,
    categoryName: string,
    description: string,
    children: [], // danh sách các danh mục con
    filterList: [], // danh sách bộ lọc sản phẩm theo danh mục
}
```

- Lấy dữ liệu sản phẩm thep danh mục từ API: `GET /Product/GetProductByCategory, params: {lang=en, page=:pageNum, ids=[/* Danh sách categoryId */]}`, → trả về danh sách sản phẩm theo trang:

```
{
    items: [
        {
            id: number,
            thumb: string,
            prodName: string,
            slug: string,
            sku: string
        }
    ],
    totalCount: number
}
```

🔸 <u>Ghi chú</u>: Danh sách categoryId bao gồm id của danh mục hiện tại và id của các danh mục con

#### 3. Trang chi tiết sản phẩm: `product-details.jsx`

- Khi click vào một sản phẩm → điều hướng sang `/product/:url`
- Lấy dữ liệu từ API: `GET /Product/GetProductByUrl, params: {lang=en, url=:slug}` → trả về chi tiết sản phẩm:

```
{
    id: number,
    thumb: string,
    prodName: string,
    shortDesc: string,
    description: string,
    specification: string
    sku: string,
    dataSheet: string,
    media: [] // Danh sách ảnh sản phẩm,
}
```

### Các API khác (Tùy chọn):

- Lấy dữ liệu từ API: `GET /Product/GetRelatedProducts, params: {lang=en, id=:productId}` → trả về danh sách các sản phẩm liên quan (sử dụng tại trang chi tiết sản phẩm):

```
{
    id: number,
    thumb: string,
    prodName: string,
    slug: string,
    sku: string,
}
```

- Khi thực hiện tìm kiếm → điều hướng sang `/search?query=:keyword`
- Lấy dữ liệu từ API: `GET /Product/SearchProducts, params: {lang=en, query=:keyword}` → trả về danh sách sản phẩm: `search.jsx`

```
{
    products: [
        {
            id: number,
            thumb: string,
            prodName: string,
            slug: string,
            sku: string
        }
    ],
    categories: [
        {
            id: number,
            categoryName: string
        }
    ], // Dùng cho filters
    filters: [],    // Dùng cho filters
}
```

- Lấy dữ liệu từ API: `POST /Product/FilterSearchProduct, body: {lang=en, textSearch=:keyword, categories=[/*Danh sách categoryId*/], page=:pageNum}` → trả về danh sách sản phẩm đã lọc.

> 🔸 **Lưu ý**:
>
> - Bạn cần tự fake data hoặc tự viết API nếu muốn (không giới hạn ngôn ngữ) khi thực hiện, URL API và dữ liệu thật sẽ được cung cấp tại buổi phỏng vấn. Sau đó bạn có `15 - 30 phút` để tiến hành ghép nối và chỉnh sửa. Trường hợp tự viết API, vui lòng đẩy lên cùng với repo này.
> - Vui lòng không xóa tất cả các đoạn mã code đã có. Trong trường hợp code có sẵn gây lỗi hoặc ảnh hưởng đến code của bạn, vui lòng comment và ghi rõ lý do.
> - Bạn có thể sử dụng thư viện AntDesign đã được cài sẵn hoặc thêm style custom vào `src/styles/_product.scss`
> - Chúng tôi đã cài sẵn thư viện icon để bạn có thể sử dụng [Ant Design Icon](https://ant.design/components/icon) và [FontAweSome 7 Free](https://fontawesome.com/icons), hoặc bạn có thể sử dụng SVG nếu muốn.

## 🔗 Đường dẫn

- [React](https://react.dev/)
- [NodeJS](https://nodejs.org/en/download)
- [Vite](https://vite.dev/)
- [Ant Design](https://ant.design/)
- [Sass](https://sass-lang.com/)
- [Axios](https://axios-http.com/docs/intro)
- [React Router v6](https://reactrouter.com/6.30.1)
- [Redux Toolkit](https://redux-toolkit.js.org/introduction/getting-started)
- [FontAwesome](https://docs.fontawesome.com/web/use-with/react)
