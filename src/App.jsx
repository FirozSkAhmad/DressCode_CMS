import "./index.css";
import { Outlet, createBrowserRouter, useLocation } from "react-router-dom";
import Protected from "./components/Protected";
import Main from "./components/Main";
import Upload from "./components/Upload";
import Login from "./pages/Login";
import EditCard from "./components/EditCard";
import SideBar from "./components/SideBar";
import ForgotPassword from "./pages/ForgotPassword";

const App = () => {
  const location = useLocation();
  const isLoginPage =
    location.pathname === "/login" || location.pathname === "/forgotPassword";
  return (
    <>
      {!isLoginPage ? (
        <div className="screen">
          <div className="sideBar">
            <SideBar />
          </div>
          <div className="main">
            <Outlet />
          </div>
        </div>
      ) : (
        <Outlet />
      )}
    </>
  );
};

const appRouter = createBrowserRouter([
  {
    element: <Protected cmp={<App />} />,
    path: "/",
    children: [
      {
        element: <Login />,
        path: "/login",
      },
      {
        element: <ForgotPassword />,
        path: "/forgotPassword",
      },
      {
        element: <Protected cmp={<Main name="In The Blog" />} />,
        path: "/blog",
      },
      // {
      //   element: <Protected cmp={<Main name="Portfolio" />} />,
      //   path: "/portfolio",
      // },
      {
        element: <Protected cmp={<Upload />} />,
        path: "/upload",
      },
      {
        element: <Protected cmp={<EditCard />} />,
        path: "/EditCard",
      },
    ],
  },
]);

export default appRouter;
