import { Route } from "react-router-dom";
import Login from "../pages/login";
import ProtectedPage from "./protectedPage";
import SalesBarChart from "../component/dashboard";
const routes = [
  <Route
    path="/login"
    element={
      <ProtectedPage guestOnly={true}>
        {" "}
        <Login />
      </ProtectedPage>
    }
  ></Route>,

  <Route
    path="/*"
    element={<ProtectedPage needLogin={true} guestOnly={true}></ProtectedPage>}
  />,
  <Route
    path="/dashboard"
    element={
      <ProtectedPage needLogin={true}>
        <SalesBarChart />
      </ProtectedPage>
    }
  ></Route>,
];
export default routes;
