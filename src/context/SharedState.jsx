import { useState } from "react";
import SharedContext from "./SharedContext";

const SharedState = (props) => {
  const [loader, setLoader] = useState(false);
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);

  return (
    <SharedContext.Provider
      value={{
        loader,
        setLoader,
        isSideNavOpen,
        setIsSideNavOpen,
      }}
    >
      {props.children}
    </SharedContext.Provider>
  );
};

export default SharedState;
