import { useState } from "react";
import { userInfo } from "../contexts/Loggeduser";
import Hamburger from "./Hamburger";
import { useLocation, useNavigate } from "react-router";
import { NavLink } from "react-router";

const UserInfo = () => {
  const [showInfo, setShowInfo] = useState(false);
  const [showMenu, setShowMenu] = useState(true);
  const { username } = userInfo();
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  const isDev = pathname.startsWith("/dev");
  const isSubmit =
    pathname.startsWith("/submit") || pathname.startsWith("/track");

  return (
    <div className="relative">
      <div
        className={`${
          showMenu ? "hidden" : "flex"
        } md:flex gap-3 ml-2 md:gap-5 items-center justify-between fixed top-3 right-6 z-7 text-sm md:text-lg`}
      >
        <div
          className={`${
            showMenu ? "" : "hidden"
          } bg-green-100 border border-green-400 flex items-center justify-center w-7 h-7 md:w-10 md:h-10 rounded-full hover:bg-green-200 cursor-pointer user`}
          onClick={() => {
            setShowInfo(!showInfo);
          }}
        >
          {username[0]}
        </div>
        <div
          className={`bg-white absolute top-10 w-55 p-4 right-0 user-info ${
            showInfo ? "show" : ""
          }`}
        >
          <div>Hello, {username}</div>
          <hr className="my-2" />
          <button
            className="text-red-700 md:text-md font-medium text-center cursor-pointer hover:text-red-500 transition duration-300 ease-in-out"
            onClick={() => {
              navigate("/");
              localStorage.removeItem("user");
            }}
          >
            Logout
          </button>
        </div>

        {/* Hamburger Menu info */}
        {(isDev || isSubmit) && (
          <div className="bg-gradient-to-bl from-blue-900 to-blue-950 rounded-lg w-55 h-60 absolute -top-2 -right-5 md:hidden">
            <div className="mt-4 p-3 text-md space-y-3">
              <p className="font-medium text-white">Hello, {username}!</p>
              <hr className="text-gray-400" />
              <div className="">
                <p className="mt-3 mb-4 text-white">Navigate to:</p>
                {isDev && (
                  <div className="flex flex-col justify-center gap-2 mb-6 ml-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                      <NavLink
                        to="/dev/dashboard"
                        className={({ isActive }) => {
                          // console.log(isActive)
                          return isActive
                            ? "text-blue-300 underline underline-offset-4 font-medium"
                            : "text-white hover:text-blue-300 transition duration-300 ease-in-out";
                        }}
                      >
                        Dashboard
                      </NavLink>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                      <NavLink
                        to="/dev/resolved"
                        className={({ isActive }) => {
                          // console.log(isActive)
                          return isActive
                            ? "text-blue-300 underline underline-offset-4 font-medium"
                            : "text-white hover:text-blue-300 transition duration-300 ease-in-out";
                        }}
                      >
                        Resolved Tickets
                      </NavLink>
                    </div>
                  </div>
                )}
                {isSubmit && (
                  <div className="flex flex-col justify-center gap-2 mb-6 ml-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                      <NavLink
                        to="/submit"
                        className={({ isActive }) => {
                          // console.log(isActive)
                          return isActive
                            ? "text-blue-300 underline underline-offset-4 font-medium"
                            : "text-white hover:text-blue-300 transition duration-300 ease-in-out";
                        }}
                      >
                        Submit a Ticket
                      </NavLink>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                      <NavLink
                        to="/track"
                        className={({ isActive }) => {
                          // console.log(isActive)
                          return isActive
                            ? "text-blue-300 underline underline-offset-4 font-medium"
                            : "text-white hover:text-blue-300 transition duration-300 ease-in-out";
                        }}
                      >
                        Track Your Tickets
                      </NavLink>
                    </div>
                  </div>
                )}
              </div>
              <hr className="text-gray-400" />
              <button
                className="bg-red-700 text-white px-2 py-1 rounded-md md:text-md font-medium text-center cursor-pointer hover:bg-red-500 transition duration-300 ease-in-out"
                onClick={() => {
                  navigate("/");
                  localStorage.removeItem("user");
                  setShowMenu(false)
                }}
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
      <Hamburger setState={setShowMenu} state={showMenu} />
    </div>
  );
};

export default UserInfo;
