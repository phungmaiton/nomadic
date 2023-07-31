import { useState, useEffect } from "react";
import { useFormik } from "formik";

export default function RenderPrice({ destination, selectedCurrency }) {
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
  }, [destination]);

  const formik = useFormik({
    initialValues: {
      rent_1: 0,
      rent_2: 0,
      rent_3: 0,
      restaurant_1: 0,
      restaurant_2: 0,
      utility_1: 0,
      utility_2: 0,
      utility_3: 0,
      transport_1: 0,
      transport_2: 0,
      transport_3: 0,
      total: 0,
    },
    onSubmit: (values) => {
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
    <form className="price-compare" onSubmit={formik.handleSubmit}>
      <div>
        <h2>{destination.city_name}</h2>
      </div>
      <div>
        <h3 className="text-[#0B4C84] mt-4 mb-3">Rent Per Month</h3>
        {rentPrices &&
          rentPrices.length > 0 &&
          rentPrices.map((rentPrice, index) => (
            <div key={rentPrice.id} className="grid grid-cols-3 md:grid-cols-6">
              <div className="col-span-2 md:col-span-4">
                <div className="flex items-start mb-1">
                  <input
                    type="text"
                    id={`rent_${index + 1}`}
                    name={`rent_${index + 1}`}
                    className="compare-input"
                    autoComplete="off"
                    onChange={formik.handleChange}
                    value={formik.values[`rent_${index + 1}`]}
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
                    onChange={formik.handleChange}
                    value={formik.values[`restaurant_${index + 1}`]}
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
                    onChange={formik.handleChange}
                    value={formik.values[`utility_${index + 1}`]}
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
                    onChange={formik.handleChange}
                    value={formik.values[`transport_${index + 1}`]}
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
            Calculate All
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
    </form>
  );
}
