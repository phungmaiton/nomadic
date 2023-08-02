import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, createContext } from "react";
import Home from "./components/Home/Home";
import Header from "./components/Navigation/Header";
import Login from "./components/UserAuth/Login";
import Signup from "./components/UserAuth/Signup";
import Destinations from "./components/Destinations/Destination";
import DestinationByID from "./components/Destinations/DestinationByID";
import Community from "./components/Community/Community";
import AddBlog from "./components/Community/AddBlog";
import BlogByID from "./components/Community/BlogByID";
import NomadicList from "./components/NomadicList/NomadicList";
import Dashboard from "./components/UserAuth/Dashboard";
import EditBlog from "./components/Community/EditBlog";
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
const UserContext = createContext();

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
  const [blogs, setBlogs] = useState(null);
  const [users, setUsers] = useState(null);
  const [comments, setComments] = useState(null);
  const [userCities, setUserCities] = useState(null);

  useEffect(() => {
    // auto-login
    fetch("/check_session")
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

  console.log(user);

  useEffect(() => {
    setIsLoading(true);
    fetch("/blogs")
      .then((response) => response.json())
      .then((blogs) => {
        setBlogs(blogs);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    fetch("/users")
      .then((response) => response.json())
      .then((users) => {
        setUsers(users);
        setIsLoading(false);
      });
  }, []);
  useEffect(() => {
    setIsLoading(true);
    fetch("/comments")
      .then((response) => response.json())
      .then((comments) => {
        setComments(comments);
        setIsLoading(false);
      });
  }, []);

  console.log(comments);

  useEffect(() => {
    setIsLoading(true);
    fetch("/usercities")
      .then((response) => response.json())
      .then((usercities) => {
        setUserCities(usercities);
        setIsLoading(false);
      });
  }, [updatedPrices, destinations]);

  function handleAddBlog() {
    fetch("/blogs")
      .then((response) => response.json())
      .then((blogs) => {
        setBlogs(blogs);
      });
  }

  function onComment() {
    fetch("/comments")
      .then((response) => response.json())
      .then((comments) => {
        setComments(comments);
      });
  }

  function handleAddToList() {
    fetch("/usercities")
      .then((response) => response.json())
      .then((usercities) => {
        setUserCities(usercities);
      });
  }

  function handleUserChange() {
    fetch("/users")
      .then((response) => response.json())
      .then((users) => {
        setUsers(users);
      });
  }

  console.log(users);

  return (
    <div>
      <UserContext.Provider value={{ user, setUser }}>
        <Header
          selectedCurrency={selectedCurrency}
          handleCurrencyChange={setSelectedCurrency}
        />
        <Routes locations={location} key={location.pathname}>
          <Route
            exact
            path="/"
            element={
              <Home
                isLoading={isLoading}
                blogs={blogs}
                destinations={destinations}
                userCities={userCities}
              />
            }
          />
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
                blogs={blogs}
                userCities={userCities}
                handleAddToList={handleAddToList}
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
                blogs={blogs}
                userCities={userCities}
                handleAddToList={handleAddToList}
              />
            }
          />
          <Route
            path="/community"
            element={
              <Community
                user={user}
                isLoading={isLoading}
                onLogin={setUser}
                blogs={blogs}
                users={users}
                onComment={onComment}
                comments={comments}
                setComments={setComments}
              />
            }
          />

          <Route
            path="/add-blog"
            element={
              <AddBlog
                user={user}
                blogs={blogs}
                onLogin={setUser}
                handleAddBlog={handleAddBlog}
              />
            }
          />
          <Route
            path="/community/:id"
            element={
              <BlogByID
                user={user}
                isLoading={isLoading}
                onLogin={setUser}
                blogs={blogs}
                users={users}
                onComment={onComment}
                comments={comments}
                setComments={setComments}
              />
            }
          />
          <Route
            path="/nomadic-list"
            element={
              <NomadicList
                userCities={userCities}
                prices={updatedPrices}
                user={user}
                selectedCurrency={selectedCurrency}
                handleAddToList={handleAddToList}
              />
            }
          />

          <Route
            path="/dashboard"
            element={
              <Dashboard
                user={user}
                selectedCurrency={selectedCurrency}
                blogs={blogs}
                comments={comments}
                handleUserChange={handleUserChange}
                onLogin={setUser}
                handleAddBlog={handleAddBlog}
              />
            }
          />
          <Route
            path="/community/:id/edit"
            element={
              <EditBlog
                user={user}
                blogs={blogs}
                onLogin={setUser}
                handleAddBlog={handleAddBlog}
              />
            }
          />
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
export { UserContext };
