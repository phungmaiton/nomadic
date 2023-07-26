import { NavLink, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import PageTransition from "../Transitions/PageTransition";

function Banner({ img, city }) {
  return (
    <>
      <section
        id="home"
        className="pt-[120px] pb-[80px] lg:pt-[170px] lg:pb-[100px] relative overflow-hidden banner-destination"
        style={{ backgroundImage: `url(${img})` }}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white to-[#091D36] opacity-70"></div>
        <div className="container mx-auto px-8">
          <div className="container relative z-[1]">
            <div className="grid gap-9 lg:grid-cols-12 grid-cols-1 items-end">
              <div className="lg:col-span-12">
                <div className="sm:text-center md:text-left lg:mb-0 w-[900px]">
                  <h1 className="text-white font-[600] text-[40px] lg:text-[50px] xl:text-[50px] leading-[1]">
                    {city}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default function DestinationByID({ user, onLogin, closePopup }) {
  const { id } = useParams();
  const [destination, setDestination] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(`/cities/${id}`)
      .then((response) => response.json())
      .then((destination) => {
        setDestination(destination);
        setIsLoading(false);
      });
  }, [id]);

  return (
    <PageTransition>
      {!isLoading && destination && (
        <Banner img={destination.img} city={destination.city_name} />
      )}
    </PageTransition>
  );
}
