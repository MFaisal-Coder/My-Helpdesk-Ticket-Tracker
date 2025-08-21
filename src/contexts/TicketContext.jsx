import { createContext, useContext, useEffect, useState } from "react";

export const TicketContext = createContext();

export default function TicketProvider({ children }) {
  const [ticket, setTicket] = useState({
    name: "",
    email: "",
    subject: "",
    description: "",
    priority: "low",
    status: "Open",
    date: new Date().toLocaleString(),
  });


  const [existingUser, setExistingUser] = useState(JSON.parse(localStorage.getItem("users")) || []);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users"));
    setExistingUser(storedUsers);
  }, []);

  useEffect(() => {
    const syncUsers = () => {
      const storedUsers = JSON.parse(localStorage.getItem("users"));
      setExistingUser(storedUsers);
    };

    window.addEventListener("storage", syncUsers);
    return () => window.removeEventListener("storage", syncUsers);
  }, []);

  // const existingUser = JSON.parse(localStorage.getItem('users'))

  const addNewUser = (newUser) => {
    const updatedUsers = [...(existingUser||[]), newUser];
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setExistingUser(updatedUsers);
  };

  const [allTickets, setAllTickets] = useState(() => {
    const saved = JSON.parse(localStorage.getItem("tickets"));
    return saved ? saved : [];
  });

  const updateTicket = (ticketId, updatedFields) => {
    setAllTickets((prevTickets) =>
      prevTickets.map((ticket) =>
        ticket.id === ticketId ? { ...ticket, ...updatedFields } : ticket
      )
    );
  };

  useEffect(() => {
    localStorage.setItem("tickets", JSON.stringify(allTickets));
  }, [allTickets]);

  return (
    <TicketContext.Provider
      value={{ ticket, setTicket, allTickets, setAllTickets, updateTicket, existingUser, addNewUser  }}
    >
      {children}
    </TicketContext.Provider>
  );
}

export const useTickets = () => useContext(TicketContext);