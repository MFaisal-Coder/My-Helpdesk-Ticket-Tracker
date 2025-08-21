import { createContext, useContext, useEffect } from "react";

const ActiveUser = createContext();

export function Loggeduser({ children }) {
  const loggeduserInfo = JSON.parse(localStorage.getItem("user"));

//   console.log(children)
  return <ActiveUser.Provider value={loggeduserInfo}>
        {children}
    </ActiveUser.Provider>;
}

export const userInfo = () =>{return useContext(ActiveUser)}
