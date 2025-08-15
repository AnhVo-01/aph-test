import {
  Button,
  Card,
  Col,
  Divider,
  Flex,
  Form,
  Input,
  QRCode,
  Row,
  Typography,
  Modal, // ✅ added
} from "antd";
import LogoLong from "../assets/images/logo_an_phat.png";
import LogoAPH from "../assets/icons/logoAP.svg";
import { authService } from "../services/authService";
import { useState } from "react";

function Login() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onLogin = () => {
  form
    .validateFields()
    .then(async (values) => {
      setLoading(true);
      try {
        const res = await authService.login(values); // ✅ single call
        setLoading(false);
        console.log("📥 API Response:", JSON.stringify(res, null, 2));

        if (res?.status) {
          const modal = Modal.success({
            title: "Đăng nhập thành công 🎉",
            content: (
              <div>
                <p><b>Tên:</b> {res.result.user.name}</p>
                <p><b>Email:</b> {res.result.user.email}</p>
              </div>
            ),
            okText: "OK",
          });

          // ⏳ Auto close after 5 seconds
          setTimeout(() => {
            modal.destroy();
          }, 5000);
        }
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    })
    .catch((errorInfo) => {
      form.scrollToField(errorInfo.errorFields[0].name, {
        behavior: "smooth",
        focus: true,
      });
      console.error("Form validation failed:", errorInfo);
    });
};


  return (
    <div id="login-page">
      <div className="bg-cover"></div>
      <Flex vertical gap="large">
        <Card
          title={
            <Row align="middle" style={{ paddingBlock: 12 }}>
              <Col span={6}>
                <img src={LogoLong} width={60} alt="logo" />
              </Col>
              <Col span={13}>
                <Typography.Title
                  level={3}
                  style={{ margin: 0, textAlign: "center" }}
                >
                  Đăng nhập
                </Typography.Title>
              </Col>
              <Col span={5}></Col>
            </Row>
          }
          style={{ width: 400 }}
        >
          <Form layout="vertical" form={form}>
            <Form.Item
              label="Tên đăng nhập"
              name="tenDN"
              rules={[{ required: true, message: "Vui lòng nhập tên đăng nhập" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Mật khẩu"
              name="matKhau"
              rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
            >
              <Input.Password />
            </Form.Item>
          </Form>
          <Flex vertical align="center" gap="small">
            <Button
              type="primary"
              size="large"
              onClick={onLogin}
              loading={loading}
            >
              Đăng nhập
            </Button>
            <Divider>Hoặc</Divider>
            <QRCode
              errorLevel="H"
              size={180}
              iconSize={50}
              icon={LogoAPH}
              bgColor="#e4f2eb"
              value="https://anphatholdings.vn/"
            />
            <Typography.Text>
              Quét mã QR bằng HRM Mobile để đăng nhập
            </Typography.Text>
          </Flex>
        </Card>
      </Flex>
    </div>
  );
}

export default Login;
