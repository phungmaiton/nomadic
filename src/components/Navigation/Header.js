import { useState, useContext } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../../App";

/*--------------------
* Header
----------------------*/

export default function Header({ selectedCurrency, handleCurrencyChange }) {
  const { user, setUser } = useContext(UserContext);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const navigate = useNavigate();
  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" })
      .then((r) => {
        if (r.ok) {
          setUser(null);
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleClick() {
    handleLogoutClick();
    setIsOpenMenu(false);
  }
  const location = useLocation();
  const routesWithoutNavbar = ["/login", "/signup"];

  if (routesWithoutNavbar.includes(location.pathname)) {
    return null;
  }

  return (
    <>
      <header className="main-header fixed left-0 right-0 z-[111]">
        <div className="container mx-auto px-10 flex items-center justify-between relative py-2 lg:py-3 ">
          <div className="logo">
            <NavLink to="/">
              <img
                src="img/nomadic-logo.png"
                title="Logo"
                alt="Logo"
                width="200px"
              />
            </NavLink>
          </div>
          <button
            className="lg:hidden mobile_toggle w-[40px] flex flex-col bg-transparent"
            onClick={() => setIsOpenMenu(!isOpenMenu)}
          >
            <span className="w-[25px] h-[2px] bg-slate-900 inline-block"></span>
            <span className="w-[25px] h-[2px] bg-slate-900 inline-block my-[5px]"></span>
            <span className="w-[25px] h-[2px] bg-slate-900 inline-block"></span>
          </button>
          <div
            className={`navbar-collapse flex ${isOpenMenu ? "menu-open" : ""}`}
          >
            <ul className="navbar lg:mx-auto flex flex-col lg:flex-row p-4 lg:p-0">
              <li>
                <NavLink to="/" onClick={() => setIsOpenMenu(false)}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/destinations"
                  onClick={() => setIsOpenMenu(false)}
                >
                  Destinations
                </NavLink>
              </li>
              <li>
                <NavLink to="/community" onClick={() => setIsOpenMenu(false)}>
                  Community
                </NavLink>
              </li>
              {isOpenMenu && !user && (
                <div className="lg:flex pr-[10px]">
                  <NavLink
                    className="px-btn px-btn-dark"
                    to="login"
                    onClick={() => setIsOpenMenu(false)}
                  >
                    Login
                  </NavLink>
                </div>
              )}
              {isOpenMenu && !user && (
                <>
                  <div className="pt-2 lg:flex pr-[10px]">
                    <NavLink
                      className="px-btn px-btn-theme"
                      to="signup"
                      onClick={() => setIsOpenMenu(false)}
                    >
                      Signup
                    </NavLink>
                  </div>
                  <div className="ms-auto hidden lg:flex">
                    <select
                      value={selectedCurrency}
                      onChange={(e) => handleCurrencyChange(e.target.value)}
                      className="mt-2 border-2 px-2 py-2"
                    >
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                      <option value="GBP">GBP</option>
                      <option value="AUD">AUD</option>
                      <option value="SGD">SGD</option>
                      <option value="CAD">CAD</option>
                    </select>
                  </div>
                </>
              )}
              {isOpenMenu && user && (
                <>
                  <div className="lg:flex pr-[10px]">
                    <NavLink
                      className="px-btn px-btn-theme"
                      to="/dashboard"
                      onClick={() => setIsOpenMenu(false)}
                    >
                      Dashboard
                    </NavLink>
                  </div>
                  <div className="lg:flex pr-[10px] mt-3">
                    <NavLink
                      className="px-btn px-btn-dark"
                      to="/nomadic-list"
                      onClick={() => setIsOpenMenu(false)}
                    >
                      Nomadic List
                    </NavLink>
                  </div>
                </>
              )}

              {isOpenMenu && user && (
                <div className="flex flex-row items-center space-x-2 mt-4">
                  <NavLink className="relative inline-block " to="/dashboard">
                    <img
                      className="nav-avatar"
                      src={
                        user
                          ? user.profile_img
                          : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                      }
                      alt="profile_img"
                    />
                  </NavLink>
                  <NavLink className="pl-2 nav-icon" onClick={handleClick}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-box-arrow-right "
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
                      />
                      <path
                        fillRule="evenodd"
                        d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
                      />
                    </svg>
                    Logout
                  </NavLink>{" "}
                  <div className="ms-auto hidden lg:flex">
                    <select
                      value={selectedCurrency}
                      onChange={(e) => handleCurrencyChange(e.target.value)}
                      className="mt-2 border-2 px-2 py-2"
                    >
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                      <option value="GBP">GBP</option>
                      <option value="AUD">AUD</option>
                      <option value="SGD">SGD</option>
                      <option value="CAD">CAD</option>
                    </select>
                  </div>
                </div>
              )}
            </ul>
          </div>

          {user && (
            <>
              <div className="ms-auto hidden lg:flex">
                <select
                  value={selectedCurrency}
                  onChange={(e) => handleCurrencyChange(e.target.value)}
                  className=""
                >
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                  <option value="AUD">AUD</option>
                  <option value="SGD">SGD</option>
                  <option value="CAD">CAD</option>
                </select>
              </div>

              <div className="nav-profile">
                <div className="dropdown">
                  {user && <span className="username">{user.username}</span>}
                  <img
                    className="nav-avatar"
                    alt="profile_img"
                    src={
                      user
                        ? user.profile_img
                        : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                    }
                  />
                  <div className="dropdown-content">
                    <NavLink
                      to="/dashboard"
                      className="flex flex-col items-center spacy-y-1.5 relative text-xs mb-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-gear"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
                        <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z" />
                      </svg>
                      <p>Dashboard</p>
                    </NavLink>
                    <NavLink
                      to="/nomadic-list"
                      className="flex flex-col items-center spacy-y-1.5 relative text-xs mb-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-list"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                        />
                      </svg>

                      <p>Nomadic List</p>
                    </NavLink>
                    <NavLink
                      onClick={handleLogoutClick}
                      className="flex flex-col items-center spacy-y-1.5 relative text-xs"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-box-arrow-right "
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
                        />
                        <path
                          fillRule="evenodd"
                          d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
                        />
                      </svg>

                      <p>Logout</p>
                    </NavLink>
                  </div>
                </div>
              </div>
            </>
          )}
          {!user && (
            <>
              <div className="ms-auto hidden lg:flex mr-2">
                <select
                  value={selectedCurrency}
                  onChange={(e) => handleCurrencyChange(e.target.value)}
                >
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                  <option value="AUD">AUD</option>
                  <option value="SGD">SGD</option>
                  <option value="CAD">CAD</option>
                </select>
              </div>
              <div className="ms-auto hidden lg:flex pr-[10px]">
                <NavLink className="nav-icon" to="/login">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-box-arrow-in-right"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z"
                    />
                    <path
                      fillRule="evenodd"
                      d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
                    />
                  </svg>
                  Login
                </NavLink>
              </div>
              <div className="ms-auto hidden lg:flex ">
                <NavLink className="nav-icon" to="/signup">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-person-plus"
                    viewBox="0 0 16 16"
                  >
                    <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                    <path
                      fillRule="evenodd"
                      d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"
                    />
                  </svg>
                  Signup
                </NavLink>
              </div>
            </>
          )}
        </div>
      </header>
    </>
  );
}
