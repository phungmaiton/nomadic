import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageTransition from "../Transitions/PageTransition";

export default function LoginForm({ onLogin }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }).then((r) => {
      console.log(username);
      setIsLoading(false);
      if (r.ok) {
        r.json().then((user) => {
          onLogin(user);
          navigate("/dashboard"); // Redirect to the dashboard
        });
      } else {
        r.json().then((err) => setErrorMessage(err.error));
      }
    });
  }

  return (
    <PageTransition>
      <div className="container mx-auto">
        <form onSubmit={handleSubmit} className="form">
          <div className="mb-3">
            <img src="/img/nomadic-pin.png" className="w-[70px] mb-4" />
            <label htmlFor="username" className="form-instruction">
              Enter username and password to login
            </label>
          </div>
          <div>
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="form-control"
              autoComplete="off"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="form-control"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button type="submit" className="px-btn px-btn-theme mt-4">
              {isLoading ? "Loading..." : "Login"}
            </button>
          </div>
          <div>
            {errorMessage && <div className="error">{errorMessage}</div>}
          </div>
        </form>
      </div>
    </PageTransition>
  );
}
