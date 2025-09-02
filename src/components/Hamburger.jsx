import { useEffect, useState } from "react";
import "../Hamburger.css";
import { useLocation } from "react-router";

const Hamburger = ({setState, state}) => {
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false);
  // console.log(setShowMenu)
  
  useEffect(()=>{
      setIsOpen(false)
  },[location])

  return (
    <div
      className={`hamburger-icon fixed top-2 right-2 z-99 ${isOpen ? "change" : ""} inline-block md:hidden`}
      onClick={() => {
        setIsOpen(!isOpen);
        setState(!state)
      }}
    >
      <div className="bar1"></div>
      <div className="bar2"></div>
      <div className="bar3"></div>
    </div>
  );
};

export default Hamburger;
