import PageTransition from "../Transitions/PageTransition";
import { useState, useEffect } from "react";
import BarLoader from "react-spinners/BarLoader";
import RenderPrice from "./RenderPrice";
import Pagination from "../Pagination/Pagination";

export default function NomadicList({
  selectedCurrency,
  user,
  prices,
  blogs,
  userCities,
  handleAddToList,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [destinations, setDestinations] = useState(null);
  const [lastID, setLastID] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(2);
  const [currentPosts, setCurrentPosts] = useState(null);

  useEffect(() => {
    if (userCities && userCities.length > 0 && prices) {
      const citiesID = userCities.map((city) => city.city_id);
      if (citiesID && prices) {
        const destinations = citiesID.map((city_id) => {
          const cityPrices = prices.filter(
            (price) => price.city_id === city_id
          );
          const city_name =
            cityPrices.length > 0 ? cityPrices[0].city.city_name : "";
          return {
            city_id,
            city_name,
            prices: cityPrices,
          };
        });
        setDestinations(destinations);
      }
      const lastid = userCities.slice(-1)[0].id;
      setLastID(lastid);
    }
  }, [userCities, prices]);

  useEffect(() => {
    if (destinations) {
      const indexOfLastPost = currentPage * postsPerPage;
      const indexOfFirstPost = indexOfLastPost - postsPerPage;
      const currentPosts = destinations.slice(
        indexOfFirstPost,
        indexOfLastPost
      );
      setCurrentPosts(currentPosts);
    }
  }, [currentPage, destinations, postsPerPage]);

  const paginate = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  return (
    <PageTransition>
      <section className="pt-[120px] pb-[20px] lg:pt-[170px] lg:pb-[100px] banner-nomadic-list relative overflow-hidden">
        <div className="container mx-auto px-10">
          <div className="grid grid-cols-1 md:grid-cols-3 items-end">
            <div className="col-span-1 md:col-span-2">
              <h1 className="text-[#373737] font-[600] text-[40px] lg:text-[50px] xl:text-[50px] leading-[1] mb-[25px] md:mb-[20px]">
                Your Nomadic List
              </h1>
              <h6 className="text-[#373737] text-[15px] md:text-[16px] tracking-[2px] font-[600] mb-[20px] md:mb-[30px]">
                Build Your Ideal Haven
              </h6>
            </div>
          </div>
        </div>
      </section>
      <section className="py-[5%] lg:py-[3%] relative overflow-hidden">
        <div className="container mx-auto px-10">
          <div className="two-column-div">
            {currentPosts ? (
              currentPosts.map((destination) => (
                <RenderPrice
                  destination={destination}
                  key={destination.city_id}
                  selectedCurrency={selectedCurrency}
                  handleAddToList={handleAddToList}
                  user={user}
                  userCities={userCities}
                />
              ))
            ) : (
              <div>Your list is empty</div>
            )}
          </div>
        </div>
        {currentPosts && currentPosts.length > 0 && (
          <Pagination
            paginate={paginate}
            array={destinations}
            postsPerPage={postsPerPage}
          />
        )}
      </section>
    </PageTransition>
  );
}
