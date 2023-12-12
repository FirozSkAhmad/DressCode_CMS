import { useEffect, useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import sharedContext from "../context/SharedContext";
import Loader from "./Loader";
import toast from "react-hot-toast";
import "./CardsCon.css";

const CardsCon = ({ headerName }) => {
  const { setLoader } = useContext(sharedContext);

  const [blogData, setBlogData] = useState([]);

  const fetchData = async () => {
    try {
      setLoader(true);
      const collectionRef = collection(db, headerName); // Replace 'your_collection_name' with the actual name of your collection
      const snapshot = await getDocs(collectionRef);

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBlogData(data);

      setLoader(false);
    } catch (error) {
      console.error("Error fetching data:", error.message);
      setLoader(false);
    }
  };

  // Call the function to fetch data
  useEffect(() => {
    fetchData();
  }, [headerName]);

  let completeData = blogData;

  const removeCard = async (rowId) => {
    try {
      const documentRef = doc(db, headerName, rowId);
      await deleteDoc(documentRef);
      console.log(`Row with ID ${rowId} removed successfully from Firestore`);
      toast.success("removed card Successfully");
      fetchData();
    } catch (error) {
      console.error("Error removing document:", error.message);
    }
  };

  return (
    <div className="cards_container">
      <Loader />
      {completeData?.map((data) => (
        <div className="card" key={data.id}>
          <div className="img_con">
            <img
              src={data?.img}
              style={{
                height: "100%",
                width: "100%",
                objectFit: "fill",
                borderRadius: "8px 8px 0 0",
              }}
              alt="Preview"
            />
          </div>
          <div className="body_con">
            <div className="heading_con">
              <h3>{data?.heading}</h3>
            </div>
            <div className="decp_con">
              <p>{data?.bodyText}</p>
            </div>
          </div>
          <div className="btns_con">
            <NavLink
              to={{
                pathname: "/editCard",
                search: `rowData=${encodeURIComponent(
                  JSON.stringify(data)
                )}&headerName=${headerName}`,
              }}
            >
              <u>Edit</u>
            </NavLink>
            <button className="remove_btn" onClick={() => removeCard(data.id)}>
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardsCon;
