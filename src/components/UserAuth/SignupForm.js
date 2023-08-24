import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import PageTransition from "../Transitions/PageTransition";
import countryList from "react-select-country-list";

export default function SignupForm({ onLogin }) {
  const navigate = useNavigate();
  const countries = useMemo(() => countryList().getData(), []);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [profile_img, setProfileImg] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [country, setCountry] = useState("");
  const [currency, setCurrency] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    fetch("https://nomadic-db.onrender.com/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        password_confirmation: passwordConfirmation,
        email: email,
        profile_img: profile_img,
        city: city,
        state: state,
        zipcode: zipcode,
        country: country,
        currency_code: currency,
      }),
    })
      .then((r) => {
        setIsLoading(false);
        if (r.ok) {
          r.json().then((user) => {
            onLogin(user);
            navigate("/dashboard"); // Redirect to the dashboard
          });
        } else {
          r.json().then((err) => setErrorMessage(err.error));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <PageTransition>
      <section className="bg-blue relative overflow-hidden">
        <div className="container mx-auto">
          <form onSubmit={handleSubmit} className="form">
            <div className="mb-2">
              <img
                src="/img/nomadic-pin.png"
                alt="logo"
                className="w-[70px] mb-4"
              />
              <label htmlFor="username" className="form-instruction">
                Fill out your information to sign up
              </label>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="col-span-1">
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
              <div className="col-span-1">
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  autoComplete="off"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="col-span-1">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
              </div>
              <div className="col-span-1">
                <label htmlFor="password" className="form-label">
                  Password Confirmation
                </label>
                <input
                  type="password"
                  id="password_confirmation"
                  className="form-control"
                  value={passwordConfirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                  autoComplete="current-password"
                />
              </div>
            </div>
            <div>
              <label htmlFor="profile_img" className="form-label">
                Profile Image
              </label>
              <input
                type="text"
                id="profile_img"
                className="form-control"
                value={profile_img}
                onChange={(e) => setProfileImg(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="col-span-1">
                <label htmlFor="city" className="form-label">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  className="form-control"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div className="col-span-1">
                <label htmlFor="state" className="form-label">
                  State
                </label>
                <input
                  type="text"
                  id="state"
                  className="form-control"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="col-span-1">
                <label htmlFor="zipcode" className="form-label">
                  Zipcode
                </label>
                <input
                  type="text"
                  id="zipcode"
                  className="form-control"
                  value={zipcode}
                  onChange={(e) => setZipcode(e.target.value)}
                />
              </div>
              <div className="col-span-1">
                <label htmlFor="country" className="form-label">
                  Country
                </label>
                <select
                  id="country"
                  name="country"
                  className="form-control"
                  onChange={(e) => setCountry(e.target.value)}
                  value={country}
                >
                  <option disabled></option>
                  {countries.map((country) => (
                    <option key={country.label} value={country.code}>
                      {country.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="col-span-1">
                <label htmlFor="Currency" className="form-label">
                  Default Currency
                </label>

                <select
                  id="currency"
                  className="form-control"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
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
            <div>
              <button type="submit" className="px-btn px-btn-theme mt-4">
                {isLoading ? "Loading..." : "Sign Up"}
              </button>
            </div>
            <div>
              {errorMessage && <div className="error">{errorMessage}</div>}
            </div>
          </form>
        </div>
      </section>
    </PageTransition>
  );
}
