import "./EditCard.css";
import { useState, useRef, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { storage, db } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import Loader from "./Loader";
import sharedContext from "../context/SharedContext";
import menuIcon from "../../utils/menu.svg";
import SideNav from "./SideNav";
import toast from "react-hot-toast";

const EditCard = () => {
  const navigate = useNavigate();
  const { setLoader, isSideNavOpen, setIsSideNavOpen } =
    useContext(sharedContext);

  const toggleSideNav = () => {
    setIsSideNavOpen(!isSideNavOpen);
  };

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const rowData = JSON.parse(decodeURIComponent(searchParams.get("rowData")));
  const headerName = searchParams.get("headerName");

  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const [heading, setHeading] = useState(rowData.heading);
  const [bodyText, setBodyText] = useState(rowData.bodyText);
  const [buttonTitle, setButtonTitle] = useState(rowData.buttonTitle);
  const [img, setImg] = useState(null);
  const [modifiedImgUrl, setModifiedImgUrl] = useState(
    rowData.img.replace("/images/", "/images%2F")
  );
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

  const handleEdit = async (e) => {
    e.preventDefault();
    setLoader(true);

    try {
      let imgUrl;
      if (img) {
        // Upload the image to Firebase Storage
        const storageRef = ref(storage, `images/${img.name}`);
        await uploadBytes(storageRef, img);

        // Get the download URL of the uploaded image
        imgUrl = await getDownloadURL(storageRef);
      }

      const updatedFields = {
        heading: heading,
        bodyText: bodyText,
        img: img ? imgUrl : modifiedImgUrl,
        // uploadDate: new Date().toISOString(),
      };

      const docRef = doc(db, headerName, rowData.id);
      // update data in Firestore
      await updateDoc(docRef, updatedFields);
      // Clear form fields and error state after successful upload
      setHeading("");
      setBodyText("");
      setButtonTitle("");
      setImg(null);
      setModifiedImgUrl(null);
      setError("");
      setLoader(false);
      navigate(-1);
      toast.success("updated data Successfully");
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
          <p className="heading">{headerName} - Edit</p>
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
                  disabled={img || modifiedImgUrl ? true : false}
                >
                  Upload
                </button>
                <button
                  className="changeBtn"
                  onClick={handleButtonClick}
                  disabled={!img && !modifiedImgUrl}
                >
                  Change Image
                </button>
              </div>
            </div>
            <div className="imgPreview_field">
              {img || modifiedImgUrl ? (
                <img
                  src={img ? URL.createObjectURL(img) : modifiedImgUrl}
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
          <button className="uploadBtn" onClick={handleEdit}>
            Edit
          </button>
        </div>
      </div>
      <div className={`side_nav ${isSideNavOpen ? "open" : ""}`}>
        <SideNav />
      </div>
    </div>
  );
};

export default EditCard;
