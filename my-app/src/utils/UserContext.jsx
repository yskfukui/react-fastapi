import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [token, setToken] = useState(localStorage.getItem("Token"));
  if(token==="null"){
    setToken(null)
  }
  const URL="http://127.0.0.1:8000/api/users/me"

  useEffect(() => {
    const fetchUser = async () => {
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      const response = await fetch(URL, requestOptions);
      if (!response.ok) {
        setToken(null);
      }
      console.log(token)
      console.log(typeof(token))
      localStorage.setItem("Token", token);
    };
    fetchUser();
  }, [token]);

  return (
    <UserContext.Provider value={[token, setToken]}>
      {props.children}
    </UserContext.Provider>
  );
};
