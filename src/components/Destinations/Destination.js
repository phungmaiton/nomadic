import PageTransition from "../Transitions/PageTransition";
import DestinationItem from "./DestinationItem";
import BarLoader from "react-spinners/BarLoader";
import Pagination from "../Pagination/Pagination";
import { useState, useEffect } from "react";
import DestinationSearch from "../Search/DestinationSearch";

function Banner({ setCountry, setSearchTerm }) {
  return (
    <>
      <section
        id="home"
        className="pt-[120px] pb-[20px] lg:pt-[170px] lg:pb-[100px] banner-destinations relative overflow-hidden"
      >
        <div className="mx-auto px-8">
          <div className="container relative z-[1]">
            <div className="grid gap-9 lg:grid-cols-12 grid-cols-1 items-center">
              <div className="lg:col-span-12">
                <div className="sm:text-center w-full lg:text-left mb-[50px] lg:mb-0 w-[900px]">
                  <h1 className="text-[#373737] font-[600] text-[40px] lg:text-[50px] xl:text-[50px] leading-[1] mb-[25px] md:mb-[20px]">
                    Find Your Perfect Abode with Nomadic
                  </h1>
                  <h6 className="text-[#373737] text-[15px] md:text-[16px] tracking-[2px] font-[600] mb-[20px] md:mb-[30px]">
                    Unveil Living Costs and Expenses Across the Globe
                  </h6>
                  <DestinationSearch
                    setSearchTerm={setSearchTerm}
                    setCountry={setCountry}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default function Destinations({
  user,
  destinations,
  isLoading,
  onLogin,
  selectedCurrency,
  prices,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const [country, setCountry] = useState("");

  useEffect(() => {
    if (!searchTerm && !country) {
      setFilteredDestinations(destinations);
    } else if (country) {
      const filteredDestinations = destinations.filter(
        (destination) => destination.country_name === country
      );
      setFilteredDestinations(filteredDestinations);
    } else if (searchTerm) {
      const filteredDestinations = destinations.filter((destination) =>
        destination.city_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredDestinations(filteredDestinations);
    }
  }, [searchTerm, destinations, country]);

  const currentPosts = () => {
    if (!searchTerm && !country) {
      return destinations.slice(indexOfFirstPost, indexOfLastPost);
    } else {
      return filteredDestinations.slice(indexOfFirstPost, indexOfLastPost);
    }
  };

  const paginate = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  return (
    <PageTransition>
      <Banner setCountry={setCountry} setSearchTerm={setSearchTerm} />
      <section className="py-[5%] lg:py-[3%] relative overflow-hidden">
        <div className="container mx-auto px-10 py-10">
          <div className="column-div">
            {isLoading ? (
              <BarLoader color="#0B4C84" />
            ) : (
              currentPosts().map((destination) => (
                <DestinationItem
                  user={user}
                  key={destination.city_name}
                  city={destination.city_name}
                  country={destination.country_name}
                  id={destination.id}
                  img={destination.img}
                />
              ))
            )}
          </div>
          <Pagination
            paginate={paginate}
            array={filteredDestinations}
            postsPerPage={postsPerPage}
          />
        </div>
      </section>
    </PageTransition>
  );
}
