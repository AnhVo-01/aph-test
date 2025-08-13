import { Outlet } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";

function Main() {
  return (
    <div id="wrapper">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Main;
