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
    fetch(`https://nomadic-db.onrender.com/usercities/${usercity_id}`, {
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
}) {
  const [restaurantPrices, setRestaurantPrice] = useState(null);
  const [rentPrices, setRentPrices] = useState(null);
  const [utilityPrices, setUtilityPrices] = useState(null);
  const [transportationPrices, setTransporationPrices] = useState(null);

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
  const formik = useFormik({
    initialValues: {
      rent_1: rentValues[destination.city_id]?.rent_1 || 0,
      rent_2: rentValues[destination.city_id]?.rent_2 || 0,
      rent_3: rentValues[destination.city_id]?.rent_3 || 0,
      restaurant_1: restaurantValues[destination.city_id]?.restaurant_1 || 0,
      restaurant_2: restaurantValues[destination.city_id]?.restaurant_2 || 0,
      utility_1: utilityValues[destination.city_id]?.utility_1 || 0,
      utility_2: utilityValues[destination.city_id]?.utility_2 || 0,
      utility_3: utilityValues[destination.city_id]?.utility_3 || 0,
      transport_1: transportValues[destination.city_id]?.transport_1 || 0,
      transport_2: transportValues[destination.city_id]?.transport_2 || 0,
      transport_3: transportValues[destination.city_id]?.transport_3 || 0,
      total: 0,
    },
    onSubmit: (values) => {
      setRentValues((prevRentValues) => ({
        ...prevRentValues,
        [destination.city_id]: {
          rent_1: values.rent_1,
          rent_2: values.rent_2,
          rent_3: values.rent_3,
        },
      }));

      setUtilityValues((prevUtilityValues) => ({
        ...prevUtilityValues,
        [destination.city_id]: {
          utility_1: values.utility_1,
          utility_2: values.utility_2,
          utility_3: values.utility_3,
        },
      }));

      setRestaurantValues((prevRestaurantValues) => ({
        ...prevRestaurantValues,
        [destination.city_id]: {
          restaurant_1: values.restaurant_1,
          restaurant_2: values.restaurant_2,
        },
      }));

      setTransportValues((prevTransportValues) => ({
        ...prevTransportValues,
        [destination.city_id]: {
          transport_1: values.transport_1,
          transport_2: values.transport_2,
          transport_3: values.transport_3,
        },
      }));

      const rentTotal =
        values.rent_1 *
          parseFloat(rentPrices[0].averagePrices[selectedCurrency]) +
        values.rent_2 *
          parseFloat(rentPrices[1].averagePrices[selectedCurrency]) +
        values.rent_3 *
          parseFloat(rentPrices[2].averagePrices[selectedCurrency]);

      const restaurantTotal =
        values.restaurant_1 *
          parseFloat(restaurantPrices[0].averagePrices[selectedCurrency]) +
        values.restaurant_2 *
          parseFloat(restaurantPrices[1].averagePrices[selectedCurrency]);

      const utilityTotal =
        values.utility_1 *
          parseFloat(utilityPrices[0].averagePrices[selectedCurrency]) +
        values.utility_2 *
          parseFloat(utilityPrices[1].averagePrices[selectedCurrency]) +
        values.utility_3 *
          parseFloat(utilityPrices[2].averagePrices[selectedCurrency]);

      const transportationTotal =
        values.transport_1 *
          parseFloat(transportationPrices[0].averagePrices[selectedCurrency]) +
        values.transport_2 *
          parseFloat(transportationPrices[1].averagePrices[selectedCurrency]) +
        values.transport_3 *
          parseFloat(transportationPrices[2].averagePrices[selectedCurrency]);

      const total =
        rentTotal + restaurantTotal + utilityTotal + transportationTotal;

      console.log(rentTotal);

      Object.keys(rentValues).forEach((fieldName) => {
        formik.setFieldValue(fieldName, rentValues[fieldName]);
      });

      Object.keys(restaurantValues).forEach((fieldName) => {
        formik.setFieldValue(fieldName, restaurantValues[fieldName]);
      });

      Object.keys(utilityValues).forEach((fieldName) => {
        formik.setFieldValue(fieldName, utilityValues[fieldName]);
      });

      Object.keys(transportValues).forEach((fieldName) => {
        formik.setFieldValue(fieldName, transportValues[fieldName]);
      });

      formik.setFieldValue(
        "total",
        selectedCurrency === "USD"
          ? `$ ${total.toFixed(2)}`
          : selectedCurrency === "EUR"
          ? `€ ${total.toFixed(2)}`
          : selectedCurrency === "CAD"
          ? `C$ ${total.toFixed(2)}`
          : selectedCurrency === "GBP"
          ? `£ ${total.toFixed(2)}`
          : selectedCurrency === "SGD"
          ? `S$ ${total.toFixed(2)}`
          : `A$ ${total.toFixed(2)}`
      );
    },
  });
  return (
    <>
      {destination ? (
        <form
          className="price-compare"
          id="price-compare"
          onSubmit={formik.handleSubmit}
        >
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
                          const fieldName = `rent_${index + 1}`;
                          const value = e.target.value;
                          formik.handleChange(e);
                          onRentChange(fieldName, value);
                        }}
                        value={rentValues[`rent_${index + 1}`]}
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
                          const fieldName = `restaurant_${index + 1}`;
                          const value = e.target.value;
                          formik.handleChange(e);
                          onRestaurantChange(fieldName, value);
                        }}
                        value={restaurantValues[`restaurant_${index + 1}`]}
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
                          const fieldName = `utility_${index + 1}`;
                          const value = e.target.value;
                          formik.handleChange(e);
                          onUtilityChange(fieldName, value);
                        }}
                        value={utilityValues[`utility_${index + 1}`]}
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
                          const fieldName = `transport_${index + 1}`;
                          const value = e.target.value;
                          formik.handleChange(e);
                          onTransportChange(fieldName, value);
                        }}
                        value={transportValues[`transport_${index + 1}`]}
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
                id="total"
                name="total"
                className="total"
                autoComplete="off"
                onChange={formik.handleChange}
                value={formik.values.total}
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
