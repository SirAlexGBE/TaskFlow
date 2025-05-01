import React from "react";
import {useEffect, useState} from "react";
export default function Home() {
  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  return <h1>Welcome, {currentUser.fullName}!</h1>;
}
