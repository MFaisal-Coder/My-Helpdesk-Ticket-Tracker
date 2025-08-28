import { useState } from "react";
import "../Hamburger.css";

const Hamburger = ({setShowMenu, showMenu}) => {
  const [isOpen, setIsOpen] = useState(false);
  // console.log(setShowMenu)
  return (
    <div
      className={`hamburger-icon fixed top-2 right-2 z-99 ${isOpen ? "change" : ""} inline-block md:hidden`}
      onClick={() => {
        setIsOpen(!isOpen);
        setShowMenu(!showMenu)
      }}
    >
      <div className="bar1"></div>
      <div className="bar2"></div>
      <div className="bar3"></div>
    </div>
  );
};

export default Hamburger;
