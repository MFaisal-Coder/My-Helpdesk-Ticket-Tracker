import { createContext, useContext, useEffect, useState } from "react";
import dummyData from "../dummyData.json";

const API_BASE =
  import.meta.env.REACT_APP_API_URL || "http://localhost:4000/api";

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

  const [existingUser, setExistingUser] = useState(() => {
    try {
      const stored = localStorage.getItem("users");
      return stored ? JSON.parse(stored) : dummyData.users;
    } catch (err) {
      console.error("Failed to parse users from localStorage:", err);
      return dummyData.users;
    }
  });

  const [allTickets, setAllTickets] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("tickets"));
      return saved ? saved : dummyData.tickets;
    } catch (err) {
      return dummyData.tickets;
    }
  });

  // sync users across tabs
  useEffect(() => {
    const syncUsers = () => {
      try {
        const storedUsers = JSON.parse(localStorage.getItem("users"));
        setExistingUser(storedUsers ? storedUsers : dummyData.users);
      } catch (err) {
        setExistingUser(dummyData.users);
      }
    };

    window.addEventListener("storage", syncUsers);
    return () => window.removeEventListener("storage", syncUsers);
  }, []);

  // Load initial data from backend if available (best-effort).
  useEffect(() => {
    let mounted = true;

    async function loadFromApi() {
      try {
        const [usersRes, ticketsRes] = await Promise.all([
          fetch(`${API_BASE}/users`).then((r) => r.json()),
          fetch(`${API_BASE}/tickets`).then((r) => r.json()),
        ]);

        if (!mounted) return;

        if (Array.isArray(usersRes) && usersRes.length) {
          setExistingUser(usersRes);
          localStorage.setItem("users", JSON.stringify(usersRes));
        }

        if (Array.isArray(ticketsRes) && ticketsRes.length) {
          setAllTickets(ticketsRes);
          localStorage.setItem("tickets", JSON.stringify(ticketsRes));
        }
      } catch (err) {
        // ignore and continue with local data
      }
    }

    loadFromApi();
    return () => {
      mounted = false;
    };
  }, []);

  // Add user: try backend, fallback to localStorage
  const addNewUser = async (newUser) => {
    try {
      const res = await fetch(`${API_BASE}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      if (res.ok) {
        const created = await res.json();
        const updated = [...(existingUser || []), created];
        setExistingUser(updated);
        localStorage.setItem("users", JSON.stringify(updated));
        return created;
      }
    } catch (err) {
      // fallback
    }

    const updated = [...(existingUser || []), newUser];
    setExistingUser(updated);
    localStorage.setItem("users", JSON.stringify(updated));
    return newUser;
  };

  // Add ticket: try backend, fallback to localStorage
  const addNewTicket = async (newTicket) => {
    try {
      const res = await fetch(`${API_BASE}/tickets`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTicket),
      });

      if (res.ok) {
        const created = await res.json();
        setAllTickets((prev) => {
          const updated = [...prev, created];
          localStorage.setItem("tickets", JSON.stringify(updated));
          return updated;
        });
        return created;
      }
    } catch (err) {
      // fallback
    }

    setAllTickets((prev) => {
      const updated = [...prev, newTicket];
      localStorage.setItem("tickets", JSON.stringify(updated));
      return updated;
    });
    return newTicket;
  };

  // Update ticket locally and best-effort persist to backend
  const updateTicket = (ticketId, updatedFields) => {
    setAllTickets((prev) => {
      const updated = prev.map((t) =>
        t.id === ticketId ? { ...t, ...updatedFields } : t
      );
      localStorage.setItem("tickets", JSON.stringify(updated));

      (async () => {
        try {
          const ticketToPersist = updated.find((t) => t.id === ticketId);
          if (!ticketToPersist) return;
          await fetch(`${API_BASE}/tickets/${encodeURIComponent(ticketId)}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(ticketToPersist),
          });
        } catch (err) {
          // ignore
        }
      })();

      return updated;
    });
  };

  // Keep tickets persisted to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("tickets", JSON.stringify(allTickets));
    } catch (err) {
      // ignore storage errors
    }
  }, [allTickets]);

  return (
    <TicketContext.Provider
      value={{
        ticket,
        setTicket,
        allTickets,
        setAllTickets,
        updateTicket,
        existingUser,
        addNewUser,
        addNewTicket,
      }}
    >
      {children}
    </TicketContext.Provider>
  );
}

export const useTickets = () => useContext(TicketContext);
