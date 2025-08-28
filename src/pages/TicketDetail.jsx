import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTickets } from "../contexts/TicketContext";
import UserInfo from "../components/UserInfo";

export default function TicketDetail() {
  const { ticketId } = useParams();
  const navigate = useNavigate();
  const { allTickets, updateTicket } = useTickets();
  // destructured the array we are gettting here for ease
  const selectedTicket = allTickets.find((ticket) => ticket.id === ticketId);
  const [comment, setComment] = useState("");

  if (!selectedTicket) {
    return (
      <div className="text-center text-red-500 mt-10">
        Ticket not found. Please go back to the dashboard.
      </div>
    );
  }

  return (
    <>
    <UserInfo/>
    <div className="px-8 text-sm md:ml-50 md:text-md p-4">
      <div className="bg-white mt-8 shadow-md rounded-md p-4 md:p-6 max-w-6xl mx-auto flex flex-col">
        <p className="text-lg md:text-xl p-4 font-semibold mb-6 text-left">
          Ticket Details:
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-8 text-sm md:text-base shrink-0 grow-1">
          <div className="flex gap-4 md:gap-5 items-center text-nowrap">
            <p className="font-medium ml-4">Task Number: </p>
            <p className="bg-gray-300 px-4 cursor-not-allowed rounded-md outline-1 w-full max-w-48 sm:max-w-62 outline-gray-500">
              {selectedTicket.id}
            </p>
          </div>
          <div className="flex gap-3 md:gap-4 items-center text-nowrap">
            <p className="font-medium ml-4">Submitted on: </p>
            <p className="bg-gray-300 px-4 cursor-not-allowed rounded-md outline-1 w-full max-w-48 sm:max-w-62 outline-gray-500">
              {selectedTicket.date}
            </p>
          </div>
          <div className="flex gap-3 md:gap-5 items-center text-nowrap">
            <p className="font-medium ml-4">Submitted By: </p>
            <p className="bg-gray-300 px-4 cursor-not-allowed rounded-md outline-1 w-full max-w-48 sm:max-w-62 outline-gray-500">
              {selectedTicket.name}
            </p>
          </div>
          <div className="flex gap-8 md:gap-10 items-center text-nowrap">
            <p className="font-medium ml-4">User Email: </p>
            <p className="bg-gray-300 px-4 cursor-not-allowed rounded-md outline-1 w-full max-w-48 sm:max-w-62 outline-gray-500">
              {selectedTicket.email}
            </p>
          </div>
          <div className="flex gap-14 md:gap-18 items-center text-nowrap">
            <p className="font-medium ml-4">Priority: </p>
            <p className="bg-gray-300 px-4 cursor-not-allowed rounded-md outline-1 w-full max-w-48 sm:max-w-62 outline-gray-500">
              {selectedTicket.priority}
            </p>
          </div>
          <div className="flex gap-15 md:gap-18 items-center text-nowrap">
            <p className="font-medium ml-4">Status: </p>
            <p className="bg-gray-300 px-4 cursor-not-allowed rounded-md outline-1 w-full max-w-48 sm:max-w-62 outline-gray-500">
              {selectedTicket.status}
            </p>
          </div>
        </div>
        {/* breakline */}
        <hr className="my-12 text-gray-400" />
        {/* breakline */}
        <div className="text-sm md:text-base">
          <p className="text-lg md:text-xl px-4 font-semibold text-left ">
            Ticket Issues:
          </p>
          <div className="mx-4 my-6 md:gap-18 text-nowrap">
            <p className="font-medium mb-2">Issue: </p>
            <p className="bg-gray-300 px-4 py-2 cursor-not-allowed rounded-md outline-1 w-full max-w-full outline-gray-500">
              {selectedTicket.subject}
            </p>
          </div>
          <div className="mx-4 my-6 md:gap-18 text-nowrap">
            <p className="font-medium mb-2">Description: </p>
            <p className="bg-gray-300 px-4 py-2 text-wrap cursor-not-allowed rounded-md min-h-20 outline-1 w-full max-w-full outline-gray-500">
              {selectedTicket.description}
            </p>
          </div>
        </div>
        {/* breakline */}
        <hr className="my-12 text-gray-400" />
        {/* breakline */}
        <div className="text-sm md:text-base">
          <p className="text-lg md:text-xl px-4 font-semibold text-left ">
            Resolution by Dev:
          </p>
          <div className="mx-4 my-6 md:gap-18 text-nowrap">
            <form action="" className="">
              <label htmlFor="comment">
                <p className="font-medium mb-2">Resolution Comment:</p>
              </label>
              <textarea
                name="comment"
                id="comment"
                value={selectedTicket.comment}
                className={`   outline-1 rounded-sm w-full px-2 py-1 mb-4 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-600 ${
                  selectedTicket.comment
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-white"
                }`}
                required
                onChange={(e) => {
                  if (selectedTicket.comment) return;

                  setComment(e.target.value);
                }}
              ></textarea>
              <div className="flex gap-4 justify-center items-center">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    updateTicket(ticketId, {
                      status: "Resolved",
                      comment: comment,
                    });
                    navigate("/dev/dashboard");
                  }}
                  disabled={comment.trim() === ""}
                  className="bg-green-800 px-2 py-1 text-sm md:text-md rounded -md text-white font-medium cursor-pointer hover:bg-green-700 block transition duration-300 ease-in-out hover:scale-[1.02] active:scale-95"
                >
                  Resolve
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    updateTicket(ticketId, {
                      status: "Closed-Incomplete",
                      comment: comment,
                    });
                    navigate("/dev/dashboard");
                  }}
                  disabled={comment.trim() === ""}
                  className="bg-orange-800 px-2 py-1 text-sm md:text-md rounded -md text-white font-medium cursor-pointer hover:bg-orange-700 block transition duration-300 ease-in-out hover:scale-[1.02] active:scale-95"
                >
                  Close Incomplete
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
