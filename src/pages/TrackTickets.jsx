import { useEffect, useState } from "react";
import { useTickets } from "../contexts/TicketContext";
import { userInfo } from "../contexts/Loggeduser";
import { useNavigate } from "react-router";

const TrackTickets = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const { allTickets } = useTickets();
  const { username } = userInfo();
  // console.log(username)

  const navigate = useNavigate();

  const loggedUser = JSON.parse(localStorage.getItem("user"));

  const filteredTickets = allTickets.filter((ticket) => {
    // console.log(ticket);
    /* if (
      ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return ticket;
    }
 */
    return (
      ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  function userSpecificTicket(ticket) {
    return ticket.filter((prevTicket) => {
      if (prevTicket.email === loggedUser.email) {
        return prevTicket;
      }
    });
  }

  // const a = userSpecificTicket(filteredTickets);
  // console.log(a);

  return (
    <>
      <div className=" max-w-6xl ml-54">
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
        <h2 className="text-md md:text-lg font-medium text-center">
          My Raised Tickets
        </h2>
        <div className="flex flex-col sm:flex-row items-center gap-4 rounded-lg my-5 py-4 px-4 bg-gray-100">
          <label htmlFor="search-ticket">Search Ticket:</label>
          <input
            type="text"
            id="search-ticket"
            placeholder="Enter Subject/Task Number"
            className="bg-white outline-1 rounded-sm search-ticket px-2"
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
          />
        </div>
        <div className="bg-gray-100 mt-4 rounded-md px-3 py-4 overflow-x-auto">
          {userSpecificTicket(filteredTickets).length !== 0 ? (
            <table className="rounded-lg min-w-full text-sm md:text-md">
              <thead>
                <tr>
                  <th>Ticket</th>
                  <th>Submitted by</th>
                  <th>Subject</th>
                  <th>Description</th>
                  <th>Priority</th>
                  <th>User Email</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Comments from Support team</th>
                </tr>
              </thead>
              <tbody>
                {filteredTickets
                  .filter((prevTicket) => {
                    if (prevTicket.email === loggedUser.email) {
                      return prevTicket;
                    }
                  })
                  .map((singleTicket, id) => {
                    const priorityColor =
                      singleTicket.priority === "low"
                        ? "bg-yellow-100 text-yellow-700"
                        : singleTicket.priority === "medium"
                        ? "bg-orange-100 text-orange-700"
                        : "bg-red-100 text-red-700";

                    return (
                      <tr
                        key={id}
                        className="odd:bg-white even:bg-gray-50 border-t"
                      >
                        <td className="px-3 py-2">{singleTicket.id}</td>
                        <td className="px-3 py-2">{singleTicket.name}</td>
                        <td className="px-3 py-2">{singleTicket.subject}</td>
                        <td className="px-3 py-2">
                          {singleTicket.description}
                        </td>
                        <td className="px-3 py-2">
                          <span
                            className={`px-2 py-1 rounded text-xs font-semibold ${priorityColor}`}
                          >
                            {singleTicket.priority}
                          </span>
                        </td>
                        <td>{singleTicket.email}</td>
                        <td>{singleTicket.date}</td>
                        <td className="px-3 py-2">
                          <span
                            className={`px-2 py-1 rounded text-xs font-semibold ${
                              singleTicket.status === "Open"
                                ? "bg-blue-200 text-blue-700"
                                : singleTicket.status === "In-Progress"
                                ? "bg-yellow-200 text-yellow-700"
                                : singleTicket.status === "Closed-Incomplete"
                                ? "bg-red-200 text-red-700"
                                : "bg-green-200 text-green-700"
                            }`}
                          >
                            {singleTicket.status}
                          </span>
                        </td>
                        <td>{singleTicket.comment}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <p className=" text-gray-700">No tickets available</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="gray"
                className="bi bi-info-circle"
                viewBox="0 0 16 16"
              >
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
              </svg>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TrackTickets;
