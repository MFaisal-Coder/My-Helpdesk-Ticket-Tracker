import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { useTickets } from "../contexts/TicketContext";

import style from "../Signup.module.css";

const Login = () => {
  const navigate = useNavigate();
  const [isAccountExist, setIsAccountExist] = useState(false);
  const { existingUser } = useTickets();
  const [userRole, setUserRole] = useState({
    username: "",
    email: "",
    role: "",
    password: "",
  });

  const [error, setError] = useState({});

 

  function getFullUserDetails(email) {
    // console.log(email)
    // console.log(existingUser)
    return existingUser.find((user) => user.email === email);
  }


  const errorValidation = {
    email: [
      {
        required: true,
        error: "Please enter your Email ID.",
      },
      {
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        error: "Please enter a valid E-mail ID.",
      },
    ],
    password: [
      {
        required: true,
        error: "Please enter the password.",
      },
      {
        minLength: 5,
        error: "Password should be minimum 5 characters in length.",
      },
      {
        pattern: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
        error: "Password should have minimum 1 digit and 1 special character.",
      },
      /* {
        match: "password",
        error: "Entered wrong password. Try again.",
      }, */
    ],
  };

  //   console.log(errorValidation);

  function validateErrors(user) {
    const newErrors = {};
    for (const errorKeys in errorValidation) {
      const rules = errorValidation[errorKeys];
      const value = user[errorKeys];

      for (const rule of rules) {
        if (value === "" && rule.required) {
          newErrors[errorKeys] = rule.error;
          break;
        }
        if (rule.pattern && !rule.pattern.test(value)) {
          newErrors[errorKeys] = rule.error;
          break;
        }
        if (rule.minLength && value.length < rule.minLength) {
          newErrors[errorKeys] = rule.error;
          break;
        }
        /* if (rule.match && value !== existingUser[rules.match]) {
          newErrors[errorKeys] = rule.error;
          break;
        } */
      }
    }
    return newErrors;
  }

  return (
    <>
      <div className="bg-white shadow-md mt-18 rounded-md p-4 md:p-6 max-w-sm mx-auto relative">
        <h1 className="text-center font-semibold text-lg">
          Login to your account
        </h1>
        <form action="">
          <div className="flex flex-col items-center justify-center mt-8 gap-6">
            <div className="flex items-center justify-center mb-3 gap-5 flex-wrap relative">
              <div className="w-5 absolute left-1">
                <img src="assets/email.svg" alt="" />
              </div>
              <input
                type="email"
                name="login"
                id="login"
                value={userRole.email}
                onChange={(e) => {
                  setUserRole((prev) => ({ ...prev, email: e.target.value }));
                }}
                className={`bg-white outline-1 rounded-sm py-2 pl-7 px-2 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-600 ${style.pholder}`}
                placeholder="Email"
              />
              {error ? (
                <p className="absolute text-xs w-56 top-11 left-0 text-red-500">
                  {error.email}
                </p>
              ) : (
                ""
              )}
            </div>
            <div className="flex items-center mb-4 justify-center gap-2 flex-wrap relative">
              <div className="w-5 absolute left-1">
                <img src="assets/lock.svg" alt="" />
              </div>
              <input
                type="password"
                name="password"
                id="password"
                value={userRole.password}
                onChange={(e) => {
                  setUserRole((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }));
                }}
                className={`bg-white outline-1 rounded-sm py-2 pl-7 px-2 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-600 ${style.pholder}`}
                placeholder="Password"
              />
              {error ? (
                <p className="absolute text-xs w-56 top-11 left-0 text-red-500">
                  {error.password}
                </p>
              ) : (
                ""
              )}
            </div>
            {isAccountExist && (
              <div className="absolute -top-18 text-lg w-124 text-center p-4 rounded-xl bg-amber-200 text-red-500 animate-[noaccount_0.6s_linear]">
                Account Does not exists. Please create an account
              </div>
            )}
            <button
              className="bg-green-800 p-2 text-sm md:text-md rounded -md text-white font-medium cursor-pointer mt-2 hover:bg-green-700 block w-62 max-w-full mx-auto transition duration-300 ease-in-out hover:scale-[1.02] active:scale-95"
              onClick={(e) => {
                e.preventDefault();

                const newError = validateErrors(userRole);
                setError(newError);

                if (Object.keys(newError).length > 0) return;

                let role = "user";
                const email = userRole.email.toLowerCase();
                if (email.includes("dev")) {
                  role = "dev";
                } else if (email.includes("admin")) {
                  role = "admin";
                }

                const foundUser = getFullUserDetails(userRole.email);

                if (!foundUser) {
                  setIsAccountExist(true);
                  setTimeout(() => setIsAccountExist(false), 2000);
                  return;
                }

                if (foundUser.password !== userRole.password) {
                  setError({ password: "Entered wrong password. Try again" });
                  return;
                }

                const finalUser = {
                  username: foundUser.username,
                  email: foundUser.email,
                  role: role, 
                  password: userRole.password, 
                };
                // console.log(finalUser)
                // setUserRole((prev)=> ({...prev,username: loggedUsername.username}))

                localStorage.setItem("user", JSON.stringify(finalUser));

                setUserRole({
                  username: "",
                  email: "",
                  role: "",
                  password: "",
                });

                setError({});

                const route = {
                  dev: "/dev/dashboard",
                  admin: "/admin",
                  user: "/submit",
                };

                navigate(route[role]);
              }}
            >
              Login
            </button>
            <p className="text-sm text-gray-500">
              Don't have an account?
              <NavLink
                to={"/sign-up"}
                className="cursor-pointer text-blue-600 hover:text-blue-300"
                onClick={() => {
                  setIsAccountExist(false);
                }}
              >
                &nbsp; create account
              </NavLink>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
