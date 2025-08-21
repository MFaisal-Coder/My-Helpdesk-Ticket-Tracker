import { Link, useNavigate } from "react-router";
import { useTickets } from "../contexts/TicketContext";
import { userInfo } from "../contexts/Loggeduser";

const ResolvedTickets = () => {
  const { username} = userInfo()
  const navigate = useNavigate()
  const {allTickets} = useTickets()
  return (
    <div className="p-4 ml-54">
      <h1 className="text-2xl font-semibold mb-6 text-center">
        Developer Dashboard
      </h1>
      <div className="flex gap-5 items-center justify-between ml-54 fixed top-2 right-6 z-7">
          <div className="bg-green-100 border border-green-400 px-4 py-2 rounded-full">
            {username[0]}
          </div>
          <button
            className="bg-red-700 p-2 text-sm md:text-md rounded -md text-white font-medium cursor-pointer hover:bg-red-600 block w-16 max-w-full transition duration-300 ease-in-out"
            onClick={() => {
              navigate("/home");
              localStorage.removeItem("user");
            }}
          >
            Logout
          </button>
        </div>

      {allTickets.length === 0 ? (
        <p className="text-center text-gray-500">No tickets available yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {allTickets.map((ticket) => 
          ticket.status === 'Resolved'  &&
          (
            <Link key={ticket.id} to={`/dev/dashboard/ticket/${ticket.id}`}>
              <div
                key={ticket.id}
                className={`bg-white border-l-4 cursor-pointer p-4 rounded-md shadow hover:shadow-md transition-all duration-200 hover:scale-103 min-h-64 flex flex-col justify-between
    ${
      ticket.priority === "high"
        ? "border-l-red-600"
        : ticket.priority === "medium"
        ? "border-l-yellow-500"
        : "border-l-green-600"
    }`}
              >
                <div className="flex justify-between items-center mb-2">
                  <h2 className="font-bold text-lg text-gray-800">
                    {ticket.subject}
                  </h2>
                  <span className="text-sm font-medium text-blue-700 underline underline-offset-2">
                    {ticket.id}
                  </span>
                </div>

                <div className="space-y-2 text-sm text-gray-700">
                  <p>
                    <span className="font-semibold">Submitted by:</span>{" "}
                    {ticket.name}
                  </p>
                  <p>
                    <span className="font-semibold">Email:</span> {ticket.email}
                  </p>
                  <p className="text-nowrap overflow-hidden">
                    <span className="font-semibold mr-1">Description:</span>
                    {ticket.description}
                  </p>
                  <p>
                    <span className="font-semibold">Priority:</span>
                    <span
                      className={`inline-block ml-1 px-2 py-0.5 rounded text-white text-xs font-medium ${
                        ticket.priority === "high"
                          ? "bg-red-600"
                          : ticket.priority === "medium"
                          ? "bg-yellow-500 text-black"
                          : "bg-green-600"
                      }`}
                    >
                      {ticket.priority}
                    </span>
                  </p>
                  <p>
                    <span className="font-semibold">Status:</span>
                    <span
                      className={`inline-block ml-1 px-2 py-0.5 rounded text-white text-xs font-medium ${
                          ticket.status === "Open"
                            ? "bg-blue-700"
                            : ticket.status === "In-Progress"
                            ? "bg-yellow-700"
                            : ticket.status === "Closed-Incomplete"
                            ? "bg-red-700"
                            : "bg-green-700"
                      }`}
                    >
                      {ticket.status}
                    </span>
                  </p>
                  <p className="text-gray-400 text-xs mt-1">📅 {ticket.date}</p>
                </div>
              </div>
            </Link>
          ))} 
        </div>
      )}
    </div>
  );
};

export default ResolvedTickets;
