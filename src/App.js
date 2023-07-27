import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./components/Home/Home";
import Header from "./components/Navigation/Header";
import Login from "./components/UserAuth/Login";
import Signup from "./components/UserAuth/Signup";
import Destinations from "./components/Destinations/Destination";
import DestinationByID from "./components/Destinations/DestinationByID";

const calculateAveragePerPrice = (price) => {
  const { avg_usd, city } = price;
  const exchange_rate = city?.exchange_rate;
  if (!exchange_rate || exchange_rate?.USD === undefined) {
    console.log("Exchange rate for USD is missing or undefined.");
    return null;
  }

  const originalCurrency = avg_usd / exchange_rate.USD;
  try {
    const averagePrices = {
      USD: avg_usd,
      EUR: parseFloat(originalCurrency * exchange_rate.EUR).toFixed(2),
      CAD: parseFloat(originalCurrency * exchange_rate.CAD).toFixed(2),
      GBP: parseFloat(originalCurrency * exchange_rate.GBP).toFixed(2),
      SGD: parseFloat(originalCurrency * exchange_rate.SGD).toFixed(2),
      AUD: parseFloat(originalCurrency * exchange_rate.AUD).toFixed(2),
    };
    return {
      ...price,
      averagePrices,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};

const updatePrices = async (prices) => {
  const updatedPrices = await Promise.all(prices.map(calculateAveragePerPrice));
  return updatedPrices.filter((price) => price !== null);
};

function App() {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [destinations, setDestinations] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [prices, setPrices] = useState([]);
  const [updatedPrices, setUpdatedPrices] = useState([]);
  const [isPricesLoading, setIsPricesLoading] = useState(false);

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

  useEffect(() => {
    setIsPricesLoading(true);
    fetch("/prices")
      .then((response) => response.json())
      .then((prices) => {
        setPrices(prices);
        setIsPricesLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!isPricesLoading) {
      updatePrices(prices).then((updatedPrices) => {
        setUpdatedPrices(updatedPrices);
      });
    }
  }, [isPricesLoading, prices]);

  useEffect(() => {
    if (user) {
      setSelectedCurrency(user.currency_code);
    } else {
      setSelectedCurrency("USD");
    }
  }, [user]);

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
              prices={updatedPrices}
              isLoading={isLoading}
              onLogin={setUser}
              selectedCurrency={selectedCurrency}
            />
          }
        />
        <Route
          path="/destinations/:id"
          element={
            <DestinationByID
              prices={updatedPrices}
              user={user}
              destinations={destinations}
              selectedCurrency={selectedCurrency}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
