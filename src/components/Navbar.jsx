import { Link, NavLink, useLocation } from "react-router";

const Navbar = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const isDev = pathname.startsWith("/dev");
  const isSubmit =
    pathname.startsWith("/submit") || pathname.startsWith("/track");
  const isHome =
    pathname === "/" || pathname === "/about" || pathname === "/contact-us";

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
                    : "text-white hover:text-blue-300 transition duration-300 ease-in-out";
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
                    : "text-white hover:text-blue-300 transition duration-300 ease-in-out";
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
                    : "text-white hover:text-blue-300 transition duration-300 ease-in-out";
                }}
              >
                Contact Us
              </NavLink>
            </>
          )}
        </div>
      </nav>

      {(isDev || isSubmit) && (
        <div className="side-menu w-full max-w-[200px] min-h-dvh fixed top-0 z-1 hidden md:block">
          <div className="absolute top-20 h-24 w-24 bg-blue-900 rounded-full mix-blend-multiply blur-xl opacity-100 animate-blob z-1"></div>
          <div className="absolute top-70 h-24 w-24 bg-cyan-950 rounded-full mix-blend-screen blur-xl opacity-100 animate-blob animation-delay-2000"></div>
          <div className="ml-4 flex flex-col gap-2 absolute top-20 z-99 text-md md:text-lg">
            {isDev && (
              <>
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
                      : "text-white hover:text-blue-300 transition duration-300 ease-in-out";
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
                      : "text-white hover:text-blue-300 transition duration-300 ease-in-out";
                  }}
                >
                  Track Your Tickets
                </NavLink>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
