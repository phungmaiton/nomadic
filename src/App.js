import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./components/Home/Home";
import Header from "./components/Navigation/Header";
import Login from "./components/UserAuth/Login";
import Signup from "./components/UserAuth/Signup";
import Destinations from "./components/Destinations/Destination";
import DestinationByID from "./components/Destinations/DestinationByID";
function App() {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [destinations, setDestinations] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState("USD");

  useEffect(() => {
    // auto-login
    fetch("http://127.0.0.1:5555/check_session")
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to fetch user session.");
        }
      })
      .then((data) => {
        setUser(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    fetch("/cities")
      .then((response) => response.json())
      .then((cities) => {
        setDestinations(cities);
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      <Header
        user={user}
        setUser={setUser}
        selectedCurrency={selectedCurrency}
        handleCurrencyChange={setSelectedCurrency}
      />
      <Routes locations={location} key={location.pathname}>
        <Route exact path="/" element={<Home isLoading={isLoading} />} />
        <Route path="/login" element={<Login onLogin={setUser} />} />
        <Route path="/signup" element={<Signup onLogin={setUser} />} />
        <Route
          path="/destinations"
          element={
            <Destinations
              user={user}
              destinations={destinations}
              isLoading={isLoading}
              onLogin={setUser}
            />
          }
        />
        <Route path="/destinations/:id" element={<DestinationByID />} />
      </Routes>
    </div>
  );
}

export default App;
