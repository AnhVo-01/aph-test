import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import App from "../App";
import Dashboard from "../pages/dashboard";
import EditDocument from "../pages/edit-document";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<App />}>
      <Route path="/" element={<Dashboard />} />
      <Route path="/document" element={<EditDocument />} />
    </Route>
  )
);
