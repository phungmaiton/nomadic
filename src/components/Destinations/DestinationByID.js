import { NavLink, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import PageTransition from "../Transitions/PageTransition";
import BarLoader from "react-spinners/BarLoader";
import Map from "./Map";

function Banner({ img, city, country }) {
  return (
    <>
      <section
        id="home"
        className="pt-[120px] pb-[80px] lg:pt-[170px] lg:pb-[80px] relative overflow-hidden banner-destination"
        style={{ backgroundImage: `url(${img})` }}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white to-[#091D36] opacity-70"></div>
        <div className="mx-auto px-8">
          <div className="container relative z-[1]">
            <div className="grid gap-9 lg:grid-cols-12 grid-cols-1 items-end">
              <div className="lg:col-span-12">
                <div className="sm:text-center md:text-left lg:mb-0 w-[900px]">
                  <h1 className="text-white font-[600] text-[40px] lg:text-[50px] xl:text-[50px] leading-[1]">
                    {city}
                  </h1>
                  <h4 className="text-white">{country}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function RenderPrice({ item_name, avg, selectedCurrency }) {
  return (
    <>
      <div className="col-span-1 md:col-span-5">
        <h4>{item_name}</h4>
      </div>
      <div className="col-span-1 md:col-span-1 text-right">
        <h4>
          {selectedCurrency === "USD"
            ? `$ ${avg.USD}`
            : selectedCurrency === "EUR"
            ? `€ ${avg.EUR}`
            : selectedCurrency === "CAD"
            ? `C$ ${avg.CAD}`
            : selectedCurrency === "GBP"
            ? `£ ${avg.GBP}`
            : selectedCurrency === "SGD"
            ? `S$ ${avg.SGD}`
            : `A$ ${avg.AUD}`}
        </h4>
      </div>
    </>
  );
}

export default function DestinationByID({
  selectedCurrency,
  onLogin,
  user,
  prices,
}) {
  const { id } = useParams();
  const [destination, setDestination] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [cityPrices, setCityPrices] = useState(null);
  const [restaurantPrices, setRestaurantPrice] = useState(null);
  const [rentPrices, setRentPrices] = useState(null);
  const [utilityPrices, setUtilityPrices] = useState(null);
  const [transportationPrices, setTransporationPrices] = useState(null);
  const [address, setAddress] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetch(`/cities/${id}`)
      .then((response) => response.json())
      .then((destination) => {
        setDestination(destination);
        setAddress(`${destination.city_name}, ${destination.country_name}`);
        setIsLoading(false);
      });
  }, [id]);

  console.log(address);

  useEffect(() => {
    if (prices && prices.length > 0 && destination) {
      const filteredPrices = prices.filter(
        (price) => price.city_id === destination.id
      );
      setCityPrices(filteredPrices);
      console.log(cityPrices);
    }
  }, [destination, prices, id]);

  useEffect(() => {
    if (cityPrices) {
      const restaurant_prices = cityPrices.filter(
        (price) => price.category_name === "Restaurants"
      );
      setRestaurantPrice(restaurant_prices);

      const rent_prices = cityPrices.filter(
        (price) => price.category_name === "Rent Per Month"
      );

      setRentPrices(rent_prices);

      const utility_prices = cityPrices.filter(
        (price) => price.category_name === "Utilities Per Month"
      );

      setUtilityPrices(utility_prices);

      const transportation_prices = cityPrices.filter(
        (price) => price.category_name === "Transportation"
      );

      setTransporationPrices(transportation_prices);
    }
  }, [cityPrices]);

  return (
    <PageTransition>
      {!isLoading && destination ? (
        <>
          <Banner
            img={destination.img}
            city={destination.city_name}
            country={destination.country_name}
          />
          <section className="pt-[40px] pb-[80px] lg:pt-[40px] lg:pb-[30px] relative overflow-hidden">
            <div className="container mx-auto px-10">
              <div className="grid lg:grid-cols-12 grid-cols-1 items-start">
                <div className="lg:col-span-8 text-left mb-0 lg:mb-0">
                  <div className="price-info">
                    <h2 className="text-[#0B4C84] mb-3">Restaurants</h2>
                    <div className="grid grid-cols-2 md:grid-cols-6">
                      {restaurantPrices ? (
                        restaurantPrices.map((price) => (
                          <RenderPrice
                            key={price.item_name}
                            item_name={price.item_name}
                            avg={price.averagePrices}
                            selectedCurrency={selectedCurrency}
                          />
                        ))
                      ) : (
                        <BarLoader color="#0B4C84" />
                      )}
                    </div>
                    <h2 className="text-[#0B4C84] mt-4 mb-3">Rent Per Month</h2>
                    <div className="grid grid-cols-2 md:grid-cols-6">
                      {rentPrices ? (
                        rentPrices.map((price) => (
                          <RenderPrice
                            key={price.item_name}
                            item_name={price.item_name}
                            avg={price.averagePrices}
                            selectedCurrency={selectedCurrency}
                          />
                        ))
                      ) : (
                        <BarLoader color="#0B4C84" />
                      )}
                    </div>
                    <h2 className="text-[#0B4C84] mt-4 mb-3">
                      Utilities Per Month
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-6">
                      {utilityPrices ? (
                        utilityPrices.map((price) => (
                          <RenderPrice
                            key={price.item_name}
                            item_name={price.item_name}
                            avg={price.averagePrices}
                            selectedCurrency={selectedCurrency}
                          />
                        ))
                      ) : (
                        <BarLoader color="#0B4C84" />
                      )}
                    </div>
                    <h2 className="text-[#0B4C84] mt-4 mb-3">Transportation</h2>
                    <div className="grid grid-cols-2 md:grid-cols-6">
                      {transportationPrices ? (
                        transportationPrices.map((price) => (
                          <RenderPrice
                            key={price.item_name}
                            item_name={price.item_name}
                            avg={price.averagePrices}
                            selectedCurrency={selectedCurrency}
                          />
                        ))
                      ) : (
                        <BarLoader color="#0B4C84" />
                      )}
                    </div>
                    <div className="text-center mt-4">
                      {user ? (
                        <NavLink class="px-btn px-btn-theme">
                          Add to List
                        </NavLink>
                      ) : (
                        <NavLink className="px-btn px-btn-theme">
                          Login to Add
                        </NavLink>
                      )}
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-4 text-left mb-[0px] lg:mb-0 lg:ml-[10%] items-center text-center">
                  <div className="shadow-lg rounded-lg">
                    <Map address={address} />
                  </div>
                  <div className="price-info mt-4">
                    <h3>Related Posts</h3>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      ) : (
        <BarLoader
          color="#0B4C84"
          className="pt-[120px] pb-[80px] lg:pt-[170px] lg:pb-[80px] relative overflow-hidden justify-center"
        />
      )}
    </PageTransition>
  );
}
