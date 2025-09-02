import { useEffect, useState } from "react";
import style from "../Signup.module.css";
import { useNavigate } from "react-router";
import { useTickets } from "../contexts/TicketContext";

const SignUp = () => {
  const { existingUser = [], addNewUser } = useTickets(); //This is the detail we saved on localStorage and pushed to our own context sinc we would be using this details in our entire applicatioon.

  const navigate = useNavigate();
  const [userDetail, setUserDetail] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });
  const [userExists, setUserExists] = useState(false);
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  function userExistsAlready(user) {
    const isUserExisitng = existingUser.some((prevUser) => {
      return prevUser.email === user.email;
    });

    if (isUserExisitng) {
      setUserExists(true);
      return true;
    }
  }

  const errorValidation = {
    username: [
      {
        required: true,
        error: "Please enter username",
      },
    ],
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
    ],
    confirmPassword: [
      {
        required: true,
        error: "Please confirm your password.",
      },
      {
        matchField: "password", // custom rule for matching
        error: "Passwords do not match.",
      },
    ],
  };

  //   console.log(errorValidation);

  function validateErrors(userDetail) {
    const newErrors = {};
    for (const errorKeys in errorValidation) {
      const rules = errorValidation[errorKeys];
      const value = userDetail[errorKeys];

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
        if (rule.matchField && value !== userDetail[rule.matchField]) {
          newErrors[errorKeys] = rule.error;
          break;
        }
      }
    }
    return newErrors;
  }

  // console.log(style.pholder)
  return (
    <>
      <div className="bg-white relative shadow-md mt-12 rounded-md p-4 md:p-6 max-w-xl mx-auto">
        <h1 className="font-semibold text-2xl mb-2">Sign Up</h1>
        <p className="text-sm text-gray-600">
          Please fill in the details to create your account
        </p>
        <hr className="text-gray-400 my-6" />
        <form action="">
          <div className="mt-8 gap-6">
            <div className="flex items-center mb-3 gap-7 relative">
              <input
                type="text"
                name="username"
                id="username"
                value={userDetail.username}
                onChange={(e) => {
                  setUserDetail((prev) => ({
                    ...prev,
                    username: e.target.value,
                  }));
                  setError((prev) => ({ ...prev, username: "" }));
                }}
                className={`{pholder bg-white outline-1 max-w-full w-lg rounded-sm p-2 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-600 ${style.pholder}`}
                placeholder="Username "
              />
              {error ? (
                <p className="absolute text-sm top-11 left-0 text-red-500">
                  {error.username}
                </p>
              ) : (
                ""
              )}
            </div>
            <div className="flex items-center my-8 gap-8 relative">
              <input
                type="email"
                name="email"
                id="email"
                value={userDetail.email}
                onChange={(e) => {
                  const role = e.target.value.endsWith("@helpdesk-dev.com")
                    ? "dev"
                    : "user";

                  setUserDetail((prev) => ({
                    ...prev,
                    email: e.target.value,
                    role: role,
                  }));
                  setError((prev) => ({ ...prev, email: "" }));
                }}
                className={`{pholder bg-white outline-1 max-w-full w-lg rounded-sm p-2 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-600 ${style.pholder}`}
                placeholder="Email"
              />
              {error ? (
                <p className="absolute text-sm top-11 left-0 text-red-500">
                  {error.email}
                </p>
              ) : (
                ""
              )}
            </div>
            <div className="flex items-center my-8 gap-9 relative">
              <input
                type="password"
                name="password"
                id="password"
                value={userDetail.password}
                onChange={(e) => {
                  setUserDetail((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }));
                  setError((prev) => ({ ...prev, password: "" }));
                  setError((prev) => ({ ...prev, confirmPassword: "" }));
                }}
                className={`{pholder bg-white outline-1 max-w-full w-lg rounded-sm p-2 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-600 ${style.pholder}`}
                placeholder="Password"
              />
              {error ? (
                <p className="absolute text-sm top-11 left-0 text-red-500">
                  {error.password}
                </p>
              ) : (
                ""
              )}
            </div>
            <div className="flex items-center my-8 gap-2 relative">
              <input
                type="password"
                name="confirm-password"
                id="confirm-password"
                value={userDetail.confirmPassword}
                onChange={(e) => {
                  setUserDetail((prev) => ({
                    ...prev,
                    confirmPassword: e.target.value,
                  }));
                  setError((prev) => ({ ...prev, confirmPassword: "" }));
                }}
                className={`{pholder bg-white outline-1 max-w-full w-lg rounded-sm p-2 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-600 ${style.pholder}`}
                placeholder="Confirm password"
              />
              {error ? (
                <p className="absolute text-sm top-11 left-0 text-red-500">
                  {error.confirmPassword}
                </p>
              ) : (
                ""
              )}
            </div>
            <button
              className="bg-green-800 p-2 text-sm md:text-md rounded -md text-white font-medium cursor-pointer hover:bg-green-700 block w-46 max-w-full transition duration-300 ease-in-out hover:scale-[1.02] active:scale-95"
              onClick={(e) => {
                e.preventDefault();

                const errorsCaught = validateErrors(userDetail);
                if (Object.keys(errorsCaught).length > 0) {
                  setError(errorsCaught);
                  return;
                }

                const exists = userExistsAlready(userDetail);
                if (exists) {
                  setTimeout(() => setUserExists(false), 2000);
                  return;
                }

                setIsLoading(true);
                addNewUser(userDetail);

                setTimeout(() => {
                  navigate("/login");
                  setIsLoading(false);
                  setUserDetail({
                    username: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                    role: "user",
                  });
                  setError({});
                  //Navigation isn't working as expected since the component is unmounting before the setTimeOut hence I am forcing the page to go to login screen here
                  window.location.href = '/login'  
                }, 3000);
              }}
              disabled={isLoading}
            >
              {isLoading ? "Signing up..." : "Sign Up"}
            </button>
          </div>
        </form>
        {userExists && (
          <div className="absolute -top-15 ml-4 text-lg w-124 text-center p-4 rounded-xl bg-amber-200 text-red-500 animate-[noaccount_0.6s_linear]">
            This account already exists. Please contact admin.
          </div>
        )}
        {isLoading && (
          <>
            <div className="bg-white px-10 py-6 rounded-lg border-1 border-gray-200 shadow-xl flex justify-center items-center gap-2 absolute top-50 left-50 z-4">
              <p className="text-gray-600">Please wait</p>
              <div className="inline-block ml-2 h-4 w-4 border-2 border-red border-t-transparent rounded-full animate-spin"></div>
            </div>
            <div className="fixed inset-0 max-w-screen backdrop-blur-[1px]"></div>
          </>
        )}
      </div>
    </>
  );
};

export default SignUp;
