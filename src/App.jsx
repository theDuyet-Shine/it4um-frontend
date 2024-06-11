import React, { createContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import {
  lookInSession,
  removeFromSession,
  storeInSession,
} from "./utils/session";

export const UserContext = createContext({});

function App() {
  const [userAuth, setUserAuth] = useState(null);

  useEffect(() => {
    let userInSession = lookInSession("user");
    userInSession ? setUserAuth(JSON.parse(userInSession)) : setUserAuth(null);
  }, []);

  const loginContext = (userData) => {
    setUserAuth(userData);
    storeInSession("user", JSON.stringify(userData));
  };

  const logoutContext = () => {
    setUserAuth(null);
    removeFromSession("user");
  };

  return (
    <UserContext.Provider value={{ userAuth, loginContext, logoutContext }}>
      <div>
        <Toaster />
        <Navbar />
        <Outlet />
      </div>
    </UserContext.Provider>
  );
}

export default App;
