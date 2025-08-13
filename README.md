<div align="center"><a name="readme-top"></a>

<img height="100" src="https://anphatholdings.vn/wp-content/uploads/2019/12/Logo-An-Phat.png">

<h1>Bài kiểm tra front-end React</h1>
</div>


## 🖥 Môi trường
- React 18
- NodeJS: >= 18.20.8 (Khuyến nghị sử dụng phiên bản bản LTS >= 20.19.4)
- Visual Studio Code (Hoặc các code editor khác)
- Git


## 📦 Cài đặt
1. Clone repo về máy
2. Tạo nhánh riêng từ main
3. Tiến hành thực hiện theo yêu cầu
4. Commit code lên nhánh riêng (không cần merge vào main)

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
### Tên đề: 📦 Product Introduction – Giới thiệu sản phẩm

> "Bạn được phép dùng bất kỳ AI code assistant nào (ChatGPT, Copilot, v.v.). Hãy ghi rõ đoạn code nào được AI gợi ý."

### Thiết kế Figma: 
- [Dev mode](https://www.figma.com/design/IySGuTvZnBSJT5FA5RLceI/Product-Introduction?node-id=0-1&m=dev&t=EQ48VlCkYx6SsaFc-1)
- [Prototype](https://www.figma.com/proto/IySGuTvZnBSJT5FA5RLceI/Product-Introduction?node-id=1-4&p=f&t=aDYAKcnJa9Obj4fA-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=1%3A4)

### Yêu cầu chức năng:
#### 1. Trang danh mục sản phẩm:
* Lấy dữ liệu từ API: `GET /products/:id` → trả về chi tiết sản phẩm.
   
#### 2. Trang danh sách sản phẩm theo danh mục:
* Khi click vào một danh mục → điều hướng sang `/category/:url`
* Lấy dữ liệu từ API: `GET /products` → trả về danh sách sản phẩm: id, name, price, category, stock, thumbnail.

#### 3. Trang chi tiết sản phẩm:
* Khi click vào một sản phẩm → điều hướng sang `/products/:url`
* Lấy dữ liệu từ API: `GET /products/:id` → trả về chi tiết sản phẩm.

>🔸 **Lưu ý**:
> - Bạn cần tự fake data khi thực hiện, URL API và dữ liệu thật sẽ được cung cấp tại buổi phỏng vấn. Sau đó bạn có `15 - 30 phút` để tiến hành ghép nối và chỉnh sửa.
> - Vui lòng không xóa tất cả các đoạn mã code đã có. Trong trường hợp code có sẵn gây lỗi hoặc ảnh hưởng đến code của bạn, vui lòng comment và ghi rõ lý do.
> - Bạn có thể sử dụng thư viện AntDesign đã được cài sẵn hoặc thêm style custom vào `src/styles/_product.scss`
> - Chúng tôi đã cài sẵn thư viện icon bạn có thể sử dụng [Ant Design Icon](https://ant.design/components/icon) hoặc [FontAweSome 7 Free](https://fontawesome.com/icons)


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
