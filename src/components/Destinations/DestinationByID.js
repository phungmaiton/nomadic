import { NavLink, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import PageTransition from "../Transitions/PageTransition";
import BarLoader from "react-spinners/BarLoader";

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

function RenderPrice({ item_name, avg_usd }) {
  return (
    <>
      <div className="col-span-1 md:col-span-5">
        <h4>{item_name}</h4>
      </div>
      <div className="col-span-1 md:col-span-1 text-right">$ {avg_usd}</div>
    </>
  );
}

export default function DestinationByID({ user, onLogin, closePopup }) {
  const { id } = useParams();
  const [destination, setDestination] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [prices, setPrices] = useState(null);
  const [restaurantPrices, setRestaurantPrice] = useState(null);
  const [rentPrices, setRentPrices] = useState(null);
  const [utilityPrices, setUtilityPrices] = useState(null);
  const [transportationPrices, setTransporationPrices] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetch(`/cities/${id}`)
      .then((response) => response.json())
      .then((destination) => {
        setDestination(destination);
        setPrices(destination.prices);
        setIsLoading(false);
      });
  }, [id]);

  useEffect(() => {
    if (prices) {
      const restaurant_prices = prices.filter(
        (price) => price.category_name === "Restaurants"
      );
      setRestaurantPrice(restaurant_prices);

      const rent_prices = prices.filter(
        (price) => price.category_name === "Rent Per Month"
      );

      setRentPrices(rent_prices);

      const utility_prices = prices.filter(
        (price) => price.category_name === "Utilities Per Month"
      );

      setUtilityPrices(utility_prices);

      const transportation_prices = prices.filter(
        (price) => price.category_name === "Transportation"
      );

      setTransporationPrices(transportation_prices);
    }
  }, [prices]);

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
              <div className="grid lg:grid-cols-12 grid-cols-1 items-center">
                <div className="lg:col-span-8 text-left mb-0 lg:mb-0">
                  <div className="meetup-info">
                    <h2 className="text-[#0B4C84]">Restaurants</h2>
                    <div className="grid grid-cols-2 md:grid-cols-6">
                      {restaurantPrices ? (
                        restaurantPrices.map((price) => (
                          <RenderPrice
                            key={price.item_name}
                            item_name={price.item_name}
                            avg_usd={price.avg_usd}
                          />
                        ))
                      ) : (
                        <BarLoader color="#0B4C84" />
                      )}
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-4 text-left mb-[0px] lg:mb-0 lg:ml-[10%] items-center"></div>
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
