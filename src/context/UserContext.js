import React, { createContext, useState } from "react";

const UserContext = createContext();
const UserProvider = ({ children }) => {
  const [username, setUsername] = useState("");
  const updateUsername = (newUsername) => {
    setUsername(newUsername);
  };
  return (
    <UserContext.Provider value={{ username, updateUsername }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
