import "./Upload.css";
import { useState, useRef, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { storage, db } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import Loader from "./Loader";
import sharedContext from "../context/SharedContext";
import menuIcon from "../../utils/menu.svg";
import SideNav from "./SideNav";
import toast from "react-hot-toast";

const Upload = () => {
  const navigate = useNavigate();
  const { setLoader, isSideNavOpen, setIsSideNavOpen } =
    useContext(sharedContext);

  const toggleSideNav = () => {
    setIsSideNavOpen(!isSideNavOpen);
  };

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const headerName = queryParams.get("headerName");

  console.log(headerName)

  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const [heading, setHeading] = useState("");
  const [bodyText, setBodyText] = useState("");
  const [img, setImg] = useState(null);
  const [error, setError] = useState("");

  const types = ["image/png", "image/jpeg"]; // image types

  const imgHandler = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile && types.includes(selectedFile.type)) {
      setImg(selectedFile);
      setError("");
    } else {
      setImg(null);
      setError("Please select a valid image type (jpg or png)");
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setLoader(true);

    try {
      // Upload the image to Firebase Storage
      const storageRef = ref(storage, `images/${img.name}`);
      await uploadBytes(storageRef, img);

      // Get the download URL of the uploaded image
      const imgUrl = await getDownloadURL(storageRef);

      const dataToAdd = {
        heading: heading,
        bodyText: bodyText,
        img: imgUrl,
        uploadDate: new Date().toISOString(),
      };

      // Store data in Firestore
      await addDoc(collection(db, headerName), dataToAdd);
      // Clear form fields and error state after successful upload
      setHeading("");
      setBodyText("");
      setImg(null);
      setError("");
      setLoader(false);
      navigate(-1);
      toast.success("uploaded data Successfully");
    } catch (error) {
      setLoader(false);
      toast.error(error.message);
      setError(error.message);
    }
  };
  const handleBack = () => {
    navigate(-1);
  };
  return (
    <div className="upload_con">
      <Loader />
      <div className="content">
        <div className="heading_container">
          <div className="menu_con">
            <img
              className="menu_icon"
              onClick={toggleSideNav}
              src={menuIcon}
              alt="menuIcon SVG"
            />
          </div>
          <p className="heading">{headerName} - Upload</p>
        </div>
        <div className="main_con">
          <div className="input_field">
            <label htmlFor="heading">Heading*</label>
            <input
              type="text"
              id="heading"
              name="heading"
              value={heading}
              onChange={(e) => setHeading(e.target.value)}
              placeholder="Title Name"
              autoComplete="off"
            />
          </div>
          <div className="img_con">
            <div className="imgUpload_field">
              <p>Image Upload*</p>
              <div className="buttons_con">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={imgHandler}
                  style={{ display: "none" }}
                />
                <button
                  className="uploadBtn"
                  onClick={handleButtonClick}
                  disabled={img ? true : false}
                >
                  Upload
                </button>
                <button
                  className="changeBtn"
                  onClick={handleButtonClick}
                  disabled={!img}
                >
                  Change Image
                </button>
              </div>
            </div>
            <div className="imgPreview_field">
              {img ? (
                <img
                  src={URL.createObjectURL(img)}
                  style={{
                    height: "100%",
                    width: "100%",
                    objectFit: "fill",
                    borderRadius: "10px",
                  }}
                  alt="Preview"
                />
              ) : (
                <p>Image Preview</p>
              )}
            </div>
          </div>
          <div className="input_field">
            <label htmlFor="bodyText">Body Text</label>
            <textarea
              id="bodyText"
              name="bodyText"
              value={bodyText}
              onChange={(e) => setBodyText(e.target.value)}
              placeholder="Body Text"
              autoComplete="off"
              style={{ height: "300px" }}
            ></textarea>
          </div>
        </div>
        <div className="uploadBtn_con">
          <button className="changeBtn" onClick={handleBack}>
            Back
          </button>
          <button className="uploadBtn" onClick={handleUpload}>
            Upload
          </button>
        </div>
      </div>
      <div className={`side_nav ${isSideNavOpen ? "open" : ""}`}>
        <SideNav />
      </div>
    </div>
  );
};

export default Upload;
