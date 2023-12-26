import "./SideBar.css";
import news from "../../utils/news.svg";
import portfolio from "../../utils/portfolio.svg";
import logout from "../../utils/logout.svg";
import { NavLink, useLocation } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import toast from "react-hot-toast";

const SideBar = () => {
  const location = useLocation();
  // Function to check if the current route matches a given path
  const isRouteActive = (path) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        toast.success("logged out Successfully");
        console.log("User signed out");
      })
      .catch((error) => {
        // An error happened.
        toast.error(error.message);
        console.error("Error signing out:", error);
      });
  };

  return (
    <div className="sideNav_con">
      <div className="Routes_con">
        <div className="heading">
          <h2>BrandElevate |</h2>
          <h6>cms dashboard</h6>
        </div>
        <div className="categories_con">
          <NavLink
            style={{
              textDecoration: "none",
              color: "white",
              backgroundColor: isRouteActive("/blog") ? "gray" : "transparent",
              borderRadius: "5px",
            }}
            to="/blog"
          >
            <div className="category">
              <img src={news} alt="News SVG" />
              <h3>Blog</h3>
            </div>
          </NavLink>
          <NavLink
            style={{
              textDecoration: "none",
              color: "white",
              backgroundColor: isRouteActive("/portfolio") ? "gray" : "transparent",
              borderRadius: "5px",
            }}
            to="/portfolio"
          >
            <div className="category">
              <img src={portfolio} alt="portfolio SVG" />
              <h3>Portfolio</h3>
            </div>
          </NavLink>
        </div>
      </div>
      <div className="logout_con" onClick={handleLogout}>
        <h3>
          <u>Logout</u>
        </h3>
        <img src={logout} alt="caseStudies SVG" />
      </div>
    </div>
  );
};

export default SideBar;
