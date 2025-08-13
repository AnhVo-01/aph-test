import "antd/dist/reset.css";
import "./App.scss";
import { ConfigProvider, Flex, Layout, Menu } from "antd";
import { useState } from "react";
import Logo from "./assets/images/logo.png";
import { Outlet, useNavigate } from "react-router-dom";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentRoute } from "./redux/route";

function App() {
  const { appRoutes, currentRoute } = useSelector((state) => state.route);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(true);

  const onSelectMenu = (id) => {
    const route = appRoutes.find((item) => item.id == id);

    const findFirstPath = (route) => {
      if (route.url) {
        return route;
      } else if (route.children && route.children.length > 0) {
        return findFirstPath(route.children[0]);
      }
      return null;
    };

    const firstPath = findFirstPath(route);
    if (firstPath) {
      dispatch(setCurrentRoute(firstPath));
      document.title = firstPath.title;
      navigate(firstPath.url);
    } else {
      document.title = "Trang không tồn tại";
    }
  };

  const createSVGComponent = (svgString) => {
    return () => <span dangerouslySetInnerHTML={{ __html: svgString }}></span>;
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#445185",
          colorLink: "#445185",
          fontFamily: "Lexend, sans-serif",
        },
      }}
    >
      <div className="App">
        <Layout hasSider>
          <Layout.Sider
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
          >
            <Flex align="center" className="logo-vertical">
              <div className="logo-area">
                <img src={Logo} alt="" width={38} />
                {!collapsed && <span>Quản lý tài liệu</span>}
              </div>
            </Flex>
            <Menu
              theme="dark"
              mode="inline"
              selectedKeys={[currentRoute?.id.toString()]}
              items={[
                {
                  key: "1",
                  icon: <UserOutlined />,
                  label: "nav 1",
                },
                {
                  key: "2",
                  icon: <VideoCameraOutlined />,
                  label: "nav 2",
                  path: "/document",
                },
                {
                  key: "3",
                  icon: <UploadOutlined />,
                  label: "nav 3",
                },
              ]}
            />
          </Layout.Sider>
          <Layout>
            <Layout.Header></Layout.Header>
            <Layout.Content>
              <Outlet />
            </Layout.Content>
          </Layout>
        </Layout>
      </div>
    </ConfigProvider>
  );
}

export default App;
