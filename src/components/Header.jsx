import searchIcon from "../../utils/searchIcon.svg";
import menuIcon from "../../utils/menu.svg";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import sharedContext from "../context/SharedContext";
import SideNav from "./SideNav";
import "./Header.css";


const Header = ({ headerName }) => {
  const { isSideNavOpen, setIsSideNavOpen } = useContext(sharedContext);

  const toggleSideNav = () => {
    setIsSideNavOpen(!isSideNavOpen);
  };

  return (
    <div className="header_con">
      <div className="menu_con">
        <img
          className="menu_icon"
          onClick={toggleSideNav}
          src={menuIcon}
          alt="menuIcon SVG"
        />
        <div className="cmpy_name">
          <h2>BrandElevate |</h2>
          <h6>cms dashboard</h6>
        </div>
      </div>
      <div className="title">
        <h2>{headerName}</h2>
      </div>
      <div className="action_con">
        <div className="search_container">
          <input
            type="text"
            className="search_input"
            placeholder="Search Title By Name"
          />
          <img className="search_icon" src={searchIcon} alt="searchIcon SVG" />
        </div>
        {headerName !== "Case Studies" ? (
          <NavLink
            style={{ textDecoration: "none" }}
            to={{
              pathname: "/upload",
              search: `headerName=${headerName}`,
            }}
          >
            <button>Upload New</button>
          </NavLink>
        ) : (
          <NavLink style={{ textDecoration: "none" }} to="/caseStudyUpload">
            <button>Upload New</button>
          </NavLink>
        )}
      </div>
      <div className="mvHead_con">
        <div className="search_container">
          <input
            type="text"
            className="search_input"
            placeholder="Search Title By Name"
          />
          <img className="search_icon" src={searchIcon} alt="searchIcon SVG" />
        </div>
        <div className="bottom_container">
          <h2>{headerName}</h2>
          {headerName !== "Case Studies" ? (
            <NavLink
              style={{ textDecoration: "none" }}
              to={{
                pathname: "/upload",
                search: `headerName=${headerName}`,
              }}
            >
              <button>Upload New</button>
            </NavLink>
          ) : (
            <NavLink style={{ textDecoration: "none" }} to="/upload">
              <button>Upload New</button>
            </NavLink>
          )}
        </div>
      </div>
      <div className={`side_nav ${isSideNavOpen ? "open" : ""}`}>
        <SideNav />
      </div>
    </div>
  );
};

export default Header;
