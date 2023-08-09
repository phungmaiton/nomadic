import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Warning = ({
  closeToast,
  toastProps,
  id,
  handleAddToList,
  user,
  userCities,
  setCurrentPage,
}) => {
  const usercity = userCities.filter(
    (usercity) => usercity.city_id === id && usercity.user_id === user.id
  );

  const usercity_id = usercity[0].id;

  const handleYes = () => {
    fetch(`/usercities/${usercity_id}`, {
      method: "DELETE",
    }).then((response) => {
      if (response.ok) {
        handleAddToList();
        closeToast();
        setCurrentPage(1);
      }
    });
  };

  return (
    <div className="items-center">
      Are you sure you want to remove this destination from your list?
      <div className="flex flex-row items-center mt-2">
        <button className="px-btn px-btn-theme mr-2" onClick={handleYes}>
          Yes
        </button>
        <button className="px-btn px-btn-theme" onClick={closeToast}>
          No
        </button>
      </div>
    </div>
  );
};

export default function RenderPrice({
  destination,
  selectedCurrency,
  handleAddToList,
  user,
  userCities,
  rentValues,
  onRentChange,
  setRentValues,
  utilityValues,
  setUtilityValues,
  onUtilityChange,
  restaurantValues,
  setRestaurantValues,
  onRestaurantChange,
  transportValues,
  setTransportValues,
  onTransportChange,
  setCurrentPage,
  destinations,
}) {
  const [restaurantPrices, setRestaurantPrice] = useState(null);
  const [rentPrices, setRentPrices] = useState(null);
  const [utilityPrices, setUtilityPrices] = useState(null);
  const [transportationPrices, setTransporationPrices] = useState(null);
  const [cityStates, setCityStates] = useState({});

  useEffect(() => {
    if (destination) {
      const restaurant_prices = destination.prices.filter(
        (price) => price.category_name === "Restaurants"
      );
      setRestaurantPrice(restaurant_prices);

      const rent_prices = destination.prices.filter(
        (price) => price.category_name === "Rent Per Month"
      );

      setRentPrices(rent_prices);

      const utility_prices = destination.prices.filter(
        (price) => price.category_name === "Utilities Per Month"
      );

      setUtilityPrices(utility_prices);

      const transportation_prices = destination.prices.filter(
        (price) => price.category_name === "Transportation"
      );

      setTransporationPrices(transportation_prices);
    }
  }, [destination, userCities, user]);

  useEffect(() => {
    if (destinations) {
      const updatedCityStates = {};
      console.log(destinations);

      destinations.forEach((destination) => {
        updatedCityStates[destination.city_id] = {
          cityData: destination,
          total: 0,
        };
      });

      setCityStates(updatedCityStates);
      console.log(cityStates);
    }
  }, [destinations]);

  const displayWarning = (id) => {
    toast.warning(
      <Warning
        id={id}
        handleAddToList={handleAddToList}
        user={user}
        userCities={userCities}
        setCurrentPage={setCurrentPage}
      />,
      {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "light",
      }
    );
  };

  const handleInputChange = (cityId, fieldName, value) => {
    if (fieldName.startsWith("rent")) {
      const rentIndex = parseInt(fieldName.split("_")[1]) - 1;
      const updatedRentValues = { ...rentValues[destination.city_id] };
      updatedRentValues[`rent_${rentIndex + 1}`] = value;
      setRentValues({
        ...rentValues,
        [destination.city_id]: updatedRentValues,
      });
    } else if (fieldName.startsWith("restaurant")) {
      const restaurantIndex = parseInt(fieldName.split("_")[1]) - 1;
      const updatedRestaurantValues = {
        ...restaurantValues[destination.city_id],
      };
      updatedRestaurantValues[`restaurant_${restaurantIndex + 1}`] = value;
      setRestaurantValues({
        ...restaurantValues,
        [destination.city_id]: updatedRestaurantValues,
      });
    } else if (fieldName.startsWith("utility")) {
      const utilityIndex = parseInt(fieldName.split("_")[1]) - 1;
      const updatedutilityValues = {
        ...utilityValues[destination.city_id],
      };
      updatedutilityValues[`utility_${utilityIndex + 1}`] = value;
      setUtilityValues({
        ...utilityValues,
        [destination.city_id]: updatedutilityValues,
      });
    } else if (fieldName.startsWith("transport")) {
      // Similar logic for transportValues
    }
    setCityStates((prevCityStates) => {
      const updatedCity = {
        ...prevCityStates[cityId],
        [fieldName]: value,
      };

      console.log(updatedCity);

      const updatedCityStates = { ...prevCityStates };
      updatedCityStates[cityId] = updatedCity;

      // Recalculate totals for all cities
      Object.keys(updatedCityStates).forEach((id) => {
        const city = updatedCityStates[id];

        const rentTotal =
          parseFloat(
            city.rent_1 * rentPrices[0].averagePrices[selectedCurrency]
          ) +
          parseFloat(
            city.rent_2 * rentPrices[1].averagePrices[selectedCurrency]
          ) +
          parseFloat(
            city.rent_3 * rentPrices[2].averagePrices[selectedCurrency]
          );

        const restaurantTotal =
          parseFloat(
            city.restaurant_1 *
              restaurantPrices[0].averagePrices[selectedCurrency]
          ) +
          parseFloat(
            city.restaurant_2 *
              restaurantPrices[1].averagePrices[selectedCurrency]
          );

        const utilityTotal =
          parseFloat(
            city.utility_1 * utilityPrices[0].averagePrices[selectedCurrency]
          ) +
          parseFloat(
            city.utility_2 * utilityPrices[1].averagePrices[selectedCurrency]
          ) +
          parseFloat(
            city.utility_3 * utilityPrices[2].averagePrices[selectedCurrency]
          );

        const transportationTotal =
          parseFloat(
            city.transport_1 *
              transportationPrices[0].averagePrices[selectedCurrency]
          ) +
          parseFloat(
            city.transport_2 *
              transportationPrices[1].averagePrices[selectedCurrency]
          ) +
          parseFloat(
            city.transport_3 *
              transportationPrices[2].averagePrices[selectedCurrency]
          );

        const newTotal =
          rentTotal + restaurantTotal + utilityTotal + transportationTotal;

        updatedCityStates[id] = {
          ...city,
          total: newTotal,
        };
      });

      return updatedCityStates;
    });
  };

  return (
    <>
      {destination ? (
        <form className="price-compare" id="price-compare">
          <div className="grid grid-cols-3 md:grid-cols-6">
            <h2 className="col-span-2 md:col-span-5">
              {destination.city_name}
            </h2>
            <div
              className="lg:col-span-1 text-right mb-0 lg:mb-0 lg:ml-[10%] flex justify-end items-top"
              onClick={() => displayWarning(destination.city_id)}
              type="button"
            >
              <div className="flex flex-col items-center spacy-y-1.5 relative text-xs">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-x-square dashboard-icon cursor-pointer"
                  viewBox="0 0 16 16"
                >
                  <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                </svg>
                <p>Remove</p>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-[#0B4C84] mt-4 mb-3">Rent Per Month</h3>
            {rentPrices &&
              rentPrices.length > 0 &&
              rentPrices.map((rentPrice, index) => (
                <div
                  key={rentPrice.id}
                  className="grid grid-cols-3 md:grid-cols-6"
                >
                  <div className="col-span-2 md:col-span-4">
                    <div className="flex items-start mb-1">
                      <input
                        type="text"
                        id={`rent_${index + 1}`}
                        name={`rent_${index + 1}`}
                        className="compare-input"
                        autoComplete="off"
                        onChange={(e) => {
                          const fieldName = e.target.name;
                          const value = e.target.value;
                          const cityId = destination.city_id;
                          handleInputChange(cityId, fieldName, value);
                        }}
                        value={
                          rentValues && rentValues[destination.city_id]
                            ? rentValues[destination.city_id][
                                `rent_${index + 1}`
                              ]
                            : ""
                        }
                      />
                      <h4>{rentPrice.item_name}</h4>
                    </div>
                  </div>
                  <div className="col-span-1 md:col-span-2 text-right">
                    <h4>
                      {selectedCurrency === "USD"
                        ? `$ ${rentPrice.averagePrices.USD}`
                        : selectedCurrency === "EUR"
                        ? `€ ${rentPrice.averagePrices.EUR}`
                        : selectedCurrency === "CAD"
                        ? `C$ ${rentPrice.averagePrices.CAD}`
                        : selectedCurrency === "GBP"
                        ? `£ ${rentPrice.averagePrices.GBP}`
                        : selectedCurrency === "SGD"
                        ? `S$ ${rentPrice.averagePrices.SGD}`
                        : `A$ ${rentPrice.averagePrices.AUD}`}
                    </h4>
                  </div>
                </div>
              ))}
          </div>
          <div>
            <h3 className="text-[#0B4C84] mt-4 mb-3">Restaurants</h3>
            {restaurantPrices &&
              restaurantPrices.length > 0 &&
              restaurantPrices.map((price, index) => (
                <div key={price.id} className="grid grid-cols-3 md:grid-cols-6">
                  <div className="col-span-2 md:col-span-4">
                    <div className="flex items-start mb-1">
                      <input
                        type="text"
                        id={`restaurant_${index + 1}`}
                        name={`restaurant_${index + 1}`}
                        className="compare-input"
                        autoComplete="off"
                        onChange={(e) => {
                          const fieldName = e.target.name;
                          const value = e.target.value;
                          const cityId = destination.city_id;
                          handleInputChange(cityId, fieldName, value);
                        }}
                        value={
                          restaurantValues &&
                          restaurantValues[destination.city_id]
                            ? restaurantValues[destination.city_id][
                                `restaurant_${index + 1}`
                              ]
                            : ""
                        }
                      />
                      <h4>{price.item_name}</h4>
                    </div>
                  </div>
                  <div className="col-span-1 md:col-span-2 text-right">
                    <h4>
                      {selectedCurrency === "USD"
                        ? `$ ${price.averagePrices.USD}`
                        : selectedCurrency === "EUR"
                        ? `€ ${price.averagePrices.EUR}`
                        : selectedCurrency === "CAD"
                        ? `C$ ${price.averagePrices.CAD}`
                        : selectedCurrency === "GBP"
                        ? `£ ${price.averagePrices.GBP}`
                        : selectedCurrency === "SGD"
                        ? `S$ ${price.averagePrices.SGD}`
                        : `A$ ${price.averagePrices.AUD}`}
                    </h4>
                  </div>
                </div>
              ))}
          </div>
          <div>
            <h3 className="text-[#0B4C84] mt-4 mb-3">Utilities Per Month</h3>
            {utilityPrices &&
              utilityPrices.length > 0 &&
              utilityPrices.map((price, index) => (
                <div key={price.id} className="grid grid-cols-3 md:grid-cols-6">
                  <div className="col-span-2 md:col-span-4">
                    <div className="flex items-start mb-1">
                      <input
                        type="text"
                        id={`utility_${index + 1}`}
                        name={`utility_${index + 1}`}
                        className="compare-input"
                        autoComplete="off"
                        onChange={(e) => {
                          const fieldName = e.target.name;
                          const value = e.target.value;
                          const cityId = destination.city_id;
                          handleInputChange(cityId, fieldName, value);
                        }}
                        value={
                          utilityValues && utilityValues.length > 0
                            ? utilityValues[`utility_${index + 1}`]
                            : ""
                        }
                      />
                      <h4>{price.item_name}</h4>
                    </div>
                  </div>
                  <div className="col-span-1 md:col-span-2 text-right">
                    <h4>
                      {selectedCurrency === "USD"
                        ? `$ ${price.averagePrices.USD}`
                        : selectedCurrency === "EUR"
                        ? `€ ${price.averagePrices.EUR}`
                        : selectedCurrency === "CAD"
                        ? `C$ ${price.averagePrices.CAD}`
                        : selectedCurrency === "GBP"
                        ? `£ ${price.averagePrices.GBP}`
                        : selectedCurrency === "SGD"
                        ? `S$ ${price.averagePrices.SGD}`
                        : `A$ ${price.averagePrices.AUD}`}
                    </h4>
                  </div>
                </div>
              ))}
          </div>
          <div>
            <h3 className="text-[#0B4C84] mt-4 mb-3">Transportation</h3>
            {transportationPrices &&
              transportationPrices.length > 0 &&
              transportationPrices.map((price, index) => (
                <div key={price.id} className="grid grid-cols-3 md:grid-cols-6">
                  <div className="col-span-2 md:col-span-4">
                    <div className="flex items-start mb-1">
                      <input
                        type="text"
                        id={`transport_${index + 1}`}
                        name={`transport_${index + 1}`}
                        className="compare-input"
                        autoComplete="off"
                        onChange={(e) => {
                          const fieldName = e.target.name;
                          const value = e.target.value;
                          const cityId = destination.city_id;
                          handleInputChange(cityId, fieldName, value);
                        }}
                        value={
                          transportValues && transportValues.length > 0
                            ? transportValues[`transport_${index + 1}`]
                            : ""
                        }
                      />
                      <h4>{price.item_name}</h4>
                    </div>
                  </div>
                  <div className="col-span-1 md:col-span-2 text-right">
                    <h4>
                      {selectedCurrency === "USD"
                        ? `$ ${price.averagePrices.USD}`
                        : selectedCurrency === "EUR"
                        ? `€ ${price.averagePrices.EUR}`
                        : selectedCurrency === "CAD"
                        ? `C$ ${price.averagePrices.CAD}`
                        : selectedCurrency === "GBP"
                        ? `£ ${price.averagePrices.GBP}`
                        : selectedCurrency === "SGD"
                        ? `S$ ${price.averagePrices.SGD}`
                        : `A$ ${price.averagePrices.AUD}`}
                    </h4>
                  </div>
                </div>
              ))}
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 items-center mt-3">
            <div className="col-span-2 md:col-span-4">
              <button type="submit" className="px-btn px-btn-theme">
                Calculate
              </button>
            </div>

            <div className="col-span-1 md:col-span-2 text-right flex items-center">
              <h3 className="mr-2">Total</h3>
              <input
                type="text"
                id={`total_${destination.city_id}`}
                name={`total_${destination.city_id}`}
                className="total"
                autoComplete="off"
                value={
                  cityStates && cityStates[destination.city_id]
                    ? cityStates[destination.city_id].total
                    : 0
                }
                readOnly
              />
            </div>
          </div>
          <ToastContainer />
        </form>
      ) : (
        ""
      )}
    </>
  );
}
