import React, { useState, useEffect } from "react";
import Tracks from "./Tracks";

const Home = () => {
  const [token, setToken] = useState("");

  const uriParams = {
    response_type: "token",
    client_id: "71c45e2025194e60a7b08f6fc0906444",
    scope: "user-read-email user-read-private user-library-read user-top-read",
    redirect_uri: "http://localhost:3000",
    show_dialog: true, // requests access each log in attempt
  };
  const qs = new URLSearchParams(uriParams);
  const auth_uri = "http://accounts.spotify.com/authorize?" + qs;

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.sessionStorage.getItem("token");
    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];
      window.location.hash = "";
      window.sessionStorage.setItem("token", token);
    }
    setToken(token);
  }, []);

  const logout = () => {
    setToken("");
    window.sessionStorage.removeItem("token");
  };

  return (
    <div>
      {!token ? (
        <div className="container">
          <div className="banner loggedOut">
            <h1>Welcome to Spotify Timeline!</h1>
            <h2>
              See your favorite songs ordered by the year they were released
            </h2>
            <a href={auth_uri}>Log in with Spotify</a>
          </div>
        </div>
      ) : (
        <div className="container">
          <div className="banner loggedIn">
              <button onClick={logout}>log out</button>
          </div>
          <Tracks token={token} />
          </div>
          
      )}
    </div>
  );
};

export default Home;
