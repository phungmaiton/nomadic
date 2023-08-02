import Banner from "./Banner";
import PageTransition from "../Transitions/PageTransition";
import BarLoader from "react-spinners/BarLoader";
import { useState, useEffect } from "react";
import BlogItem from "./BlogItem";
import DestinationItem from "../Destinations/DestinationItem";

export default function Home({ isLoading, blogs, destinations, userCities }) {
  const [sortedBlogs, setSortedBlogs] = useState(null);
  const [sortedDestinations, setSortedDestinations] = useState(null);

  useEffect(() => {
    if (blogs) {
      const sorted_blogs = [...blogs].sort((a, b) => b.id - a.id).slice(0, 4);
      setSortedBlogs(sorted_blogs);
    }
  }, [blogs]);

  useEffect(() => {
    if (destinations && userCities) {
      const citiesID = userCities.map((city) => city.city_id);
      console.log(citiesID);

      const cityIdCounts = citiesID.reduce((acc, cityId) => {
        acc[cityId] = (acc[cityId] || 0) + 1;
        return acc;
      }, {});

      function compareDestinations(a, b) {
        const cityIdA = a.id;
        const cityIdB = b.id;
        const countA = cityIdCounts[cityIdA] || 0;
        const countB = cityIdCounts[cityIdB] || 0;
        return countB - countA;
      }

      setSortedDestinations(
        [...destinations].sort(compareDestinations).slice(0, 4)
      );
      console.log(sortedDestinations);
    }
  }, [destinations, userCities]);
  return (
    <PageTransition>
      <div>
        <Banner />
      </div>
      <div className="container mx-auto px-10 pt-[80px] pb-[100px]">
        <h2>New in Community</h2>
        <div className="column-div pt-5">
          {!sortedBlogs ? (
            <BarLoader color="#0B4C84" />
          ) : (
            sortedBlogs.map((blog) => (
              <BlogItem
                key={blog.id}
                title={
                  blog.title.length < 50
                    ? blog.title
                    : blog.title.substring(0, 50) + "..."
                }
                details={blog.blog_body.substring(0, 100) + "..."}
                image={blog.blog_img}
                id={blog.id}
                author={blog.user.username}
              />
            ))
          )}
        </div>
      </div>
      <div className="bg-gradient-2 pt-[20px] pb-[100px]">
        <div className="container mx-auto px-10 mt-5 ">
          <h2>Popular Destinations</h2>
          <div className="column-div pt-5">
            {!sortedDestinations ? (
              <BarLoader color="#0B4C84" />
            ) : (
              sortedDestinations.map((destination) => (
                <DestinationItem
                  key={destination.id}
                  city={destination.city_name}
                  country={destination.country_name}
                  id={destination.id}
                  img={destination.img}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
