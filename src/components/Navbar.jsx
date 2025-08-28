import { Link, NavLink, useLocation } from "react-router";


const Navbar = () => {
  const location = useLocation();
  const pathname = location.pathname;


  const isDev = pathname.startsWith("/dev");
  const isSubmit =
    pathname.startsWith("/submit") || pathname.startsWith("/track");
  const isHome =
    pathname === "/" ||
    pathname === "/about" ||
    pathname === "/contact-us";

  return (
    <>
      <nav className="bg-blue-950 text-white p-3 md:p-4 flex justify-between items-center sticky top-0 z-5">
        <div className="flex items-center gap-2">
          <img
            src="/assets/help-desk.svg"
            alt="HelpDesk Pro Logo"
            className="w-6 md:w-8"
          />
          <Link to="/home">
            <h1 className="font-medium text-md md:text-lg cursor-pointer">
              HelpDesk Pro
            </h1>
          </Link>
        </div>
        <div className="flex gap-4">
          {isHome && (
            <>
              <NavLink
                to="/"
                className={({ isActive }) => {
                  // console.log(isActive)
                  return isActive
                    ? "text-blue-300 underline underline-offset-4 font-medium"
                    : "text-white hover:text-blue-300";
                }}
              >
                Home
              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive }) => {
                  // console.log(isActive)
                  return isActive
                    ? "text-blue-300 underline underline-offset-4 font-medium"
                    : "text-white hover:text-blue-300";
                }}
              >
                About
              </NavLink>
              <NavLink
                to="/contact-us"
                className={({ isActive }) => {
                  // console.log(isActive)
                  return isActive
                    ? "text-blue-300 underline underline-offset-4 font-medium"
                    : "text-white hover:text-blue-300";
                }}
              >
                Contact Us
              </NavLink>
            </>
          )}
        </div>
      </nav>
     { (isDev || isSubmit) && <div className="bg-blue-900 w-full max-w-[218px] min-h-dvh fixed top-0 z-1">
        <div className="space-x-4 nav-div flex flex-col gap-2 absolute top-20 ml-2 z-99">
          {isDev && (
            <>
              <NavLink
                to="/dev/dashboard"
                className={({ isActive }) => {
                  // console.log(isActive)
                  return isActive
                    ? "text-blue-300 underline underline-offset-4 font-medium"
                    : "text-white hover:text-blue-300";
                }}
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/dev/resolved"
                className={({ isActive }) => {
                  // console.log(isActive)
                  return isActive
                    ? "text-blue-300 underline underline-offset-4 font-medium"
                    : "text-white hover:text-blue-300";
                }}
              >
                Resolved Tickets
              </NavLink>
            </>
          )}
          
          {isSubmit && (
            <>
              <NavLink
                to="/submit"
                className={({ isActive }) => {
                  // console.log(isActive)
                  return isActive
                    ? "text-blue-300 underline underline-offset-4 font-medium"
                    : "text-white hover:text-blue-300";
                }}
              >
                Submit Ticket
              </NavLink>
              <NavLink
                to="/track"
                className={({ isActive }) => {
                  // console.log(isActive)
                  return isActive
                    ? "text-blue-300 underline underline-offset-4 font-medium"
                    : "text-white hover:text-blue-300";
                }}
              >
                Track a Ticket
              </NavLink>
            </>
          )}
        </div>
      </div>}
    </>
  );
};

export default Navbar;
