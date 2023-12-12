import Header from "../components/Header";
import CardsCon from "./CardsCon";
import './Main.css'

const Main = ({ name }) => {
  return (
    <div className="master_con">
      <Header headerName={name} />
      <CardsCon headerName={name} />
    </div>
  );
};

export default Main;
