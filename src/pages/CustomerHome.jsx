import { useState } from "react";
import { useTickets } from "../contexts/TicketContext";
import UserInfo from "../components/UserInfo";

import "../App.css";

export default function CustomerHome() {
  const { ticket, setTicket, allTickets, addNewTicket } = useTickets();
  const [ticketSubmitted, setTicketSubmitted] = useState(false);
  const [error, setError] = useState({});

  const validationRules = {
    name: [
      {
        required: true,
        error: "Please enter your name.",
      },
    ],
    email: [
      {
        required: true,
        error: "Please enter your E-mail ID.",
      },
      {
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        error: "Please enter valid E-mail ID.",
      },
    ],
    subject: [
      {
        required: true,
        error: "Please enter the issue.",
      },
    ],
    description: [
      {
        required: true,
        error: "Please enter the description of your issue.",
      },
    ],
  };

  function validateErrors(ticket) {
    const newErrors = {};

    for (const key in validationRules) {
      const rules = validationRules[key];
      const value = ticket[key];

      for (const rule of rules) {
        if (rule.required && value === "") {
          newErrors[key] = rule.error;
          break;
        }
        if (rule.pattern && !rule.pattern.test(value)) {
          newErrors[key] = rule.error;
          break;
        }
      }
    }

    return newErrors;
  }

  function generateTicketNumber(exisitingTicket) {
    let newTicket;
    do {
      const randomID = Math.floor(Math.random() * 9000 + 1000);
      newTicket = `TASK${randomID}`;
    } while (exisitingTicket.includes(newTicket));

    return newTicket;
  }

  return (
    <div className="relative">
      {/* Ticket submitted message popuop */}
      {ticketSubmitted ? (
        <div
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                  bg-blue-50 px-16 py-14 rounded-xl shadow-xl font-medium 
                  text-center z-1 w-[90%] sm:w-auto animate-[popup_0.4s_ease-out]"
        >
          <p>Ticket Submitted Successfully!</p>
          <p>
            You can track your tickets and their status on the tracking page.
          </p>
        </div>
      ) : (
        ""
      )}

      {/* Login area div */}
      <UserInfo />

      {/* Main ticket submission area */}
      <div className="mt-6 px-8 text-xs md:ml-50 md:text-md">
        <h1 className="text-xl md:text-2xl font-semibold text-center mb-2">
          Submit a Support Ticket
        </h1>
        <p className="text-gray-600 text-center text-sm md:text-md mb-6">
          Let us know what's troubling you — we'll get back to you as soon as
          possible.
        </p>

        <div className="bg-white shadow-md rounded-md p-4 md:p-6 max-w-2xl mx-auto">
          <form
            action=""
            className="bg-gray-100 mt-4 rounded-md space-y-2 px-3 py-4"
          >
            <div className="relative">
              <label
                htmlFor="name"
                className="text-sm md:text-md font-medium block mb-2"
              >
                <span className="text-red-500">* </span>Enter your name:
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={ticket.name}
                className="bg-white outline-1 rounded-sm w-full px-2 py-1 mb-4 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-600"
                required
                onChange={(e) => {
                  setTicket({ ...ticket, name: e.target.value });
                  setError((prev) => ({ ...prev, name: "" }));
                }}
              />
              {error.name ? (
                <p className="text-sm text-red-500 font-normal absolute -bottom-1">
                  {error.name}
                </p>
              ) : (
                ""
              )}
            </div>
            <div className="relative">
              <label
                htmlFor="email"
                className="text-sm md:text-md font-medium block mb-2"
              >
                <span className="text-red-500">* </span>Enter your Email-ID:
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={ticket.email}
                className="bg-white outline-1 rounded-sm w-full px-2 py-1 mb-4 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-600"
                required
                onChange={(e) => {
                  setTicket({ ...ticket, email: e.target.value });
                  setError((prev) => ({ ...prev, email: "" }));
                }}
              />
              {error.email ? (
                <p className="text-sm text-red-500 font-normal absolute -bottom-1">
                  {error.email}
                </p>
              ) : (
                ""
              )}
            </div>
            <div className="relative">
              <label
                htmlFor="subject"
                className="text-sm md:text-md font-medium block mb-2"
              >
                <span className="text-red-500">* </span>Short Description:
              </label>
              <input
                type="text"
                name="subject"
                id="subject"
                value={ticket.subject}
                className="bg-white outline-1 rounded-sm w-full px-2 py-1 mb-4 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-600"
                required
                onChange={(e) => {
                  setTicket({ ...ticket, subject: e.target.value });
                  setError((prev) => ({ ...prev, subject: "" }));
                }}
              />
              {error.subject ? (
                <p className="text-sm text-red-500 font-normal absolute -bottom-1">
                  {error.subject}
                </p>
              ) : (
                ""
              )}
            </div>
            <div className="relative">
              <label
                htmlFor="description"
                className="font-medium block mb-2 text-sm md:text-md"
              >
                <span className="text-red-500">* </span>
                Additional Information:
              </label>
              <textarea
                name="description"
                id="description"
                value={ticket.description}
                className="bg-white outline-1 rounded-sm w-full px-2 py-1 mb-4 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-600"
                required
                onChange={(e) => {
                  setTicket({ ...ticket, description: e.target.value });
                  setError((prev) => ({ ...prev, description: "" }));
                }}
              ></textarea>
              {error.description ? (
                <p className="text-sm text-red-500 font-normal absolute -bottom-1">
                  {error.description}
                </p>
              ) : (
                ""
              )}
            </div>
            <div className="flex flex-col items-start sm:flex-row sm:items-center ml-0">
              <p className="font-medium text-sm md:text-md">
                Please select Priority:{" "}
              </p>
              <div className="flex gap-1 ml-2">
                <input
                  type="radio"
                  name="priority"
                  id="low"
                  value="low"
                  checked={ticket.priority === "low"}
                  onChange={(e) => {
                    setTicket({ ...ticket, priority: e.target.value });
                  }}
                />
                <label className="text-sm md:text-md" htmlFor="low">
                  Low
                </label>
                <input
                  type="radio"
                  name="priority"
                  value="medium"
                  checked={ticket.priority === "medium"}
                  id="medium"
                  onChange={(e) => {
                    setTicket({ ...ticket, priority: e.target.value });
                  }}
                />
                <label className="text-sm md:text-md" htmlFor="medium">
                  Medium
                </label>
                <input
                  type="radio"
                  name="priority"
                  value="high"
                  checked={ticket.priority === "high"}
                  id="high"
                  onChange={(e) => {
                    // console.log(e.target.value);
                    setTicket({ ...ticket, priority: e.target.value });
                  }}
                />
                <label className="text-sm md:text-md" htmlFor="high">
                  High
                </label>
              </div>
            </div>
            <div className="mt-6">
              <button
                className="bg-green-800 px-2 py-1 text-sm md:text-md rounded -md text-white font-medium cursor-pointer hover:bg-green-700 block mx-auto transition duration-300 ease-in-out hover:scale-[1.02] active:scale-95"
                onClick={async (e) => {
                  e.preventDefault();

                  const validationError = validateErrors(ticket);

                  setError(validationError);
                  if (Object.keys(validationError).length > 0) return;

                  const newTicketID = generateTicketNumber(
                    allTickets.map((ticket) => ticket.id)
                  );
                  const finalTicket = { ...ticket, id: newTicketID };

                  setTicketSubmitted(true);

                  try {
                    // attempt to persist via backend (falls back inside addNewTicket)
                    await addNewTicket(finalTicket);
                  } catch (err) {
                    console.warn("addNewTicket failed:", err);
                  }

                  setTimeout(() => {
                    setTicketSubmitted(false);
                  }, 1200);

                  setTicket({
                    name: "",
                    email: "",
                    subject: "",
                    description: "",
                    priority: "low",
                    status: "Open",
                    date: new Date().toLocaleString(),
                  });
                }}
              >
                Submit Ticket
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
