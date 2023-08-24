import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useState, useRef } from "react";

const failureAlert = () => {
  toast.warning("Failed to login", {
    position: "bottom-center",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    theme: "light",
  });
};

export default function LoginPopup({ closePopup, setShowModal, onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const formRef = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    fetch("https://nomadic-db.onrender.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((r) => {
        console.log(username);
        setIsLoading(false);
        if (r.ok) {
          r.json().then((user) => {
            onLogin(user);
            formRef.current.reset();
            setShowModal(false);
          });
        } else {
          r.json().then((err) => setErrorMessage(err.error));
        }
      })

      .catch((errors) => {
        console.log("Errors", errors);
        failureAlert();
      });
  }
  return (
    <div className="px-modal mfp-hide">
      <div className="popup">
        <div className="grid grid-cols-1 gx-3">
          <form ref={formRef} onSubmit={handleSubmit} className="popup-form">
            <div className="mb-3">
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
            <div className="pt-5">
              Not a user?{" "}
              <a className="text-[#0B4C84] font-[700]" href="/signup">
                Sign up here.
              </a>
            </div>
            <div>
              {errorMessage && <div className="error">{errorMessage}</div>}
            </div>
          </form>
          <button className="px-close" onClick={closePopup}>
            <i className="fa fa-times"></i>
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
