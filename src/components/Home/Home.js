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
      const sorted_blogs = blogs.sort((a, b) => b.id - a.id).slice(0, 4);
      setSortedBlogs(sorted_blogs);
      console.log(sortedBlogs);
    }
  }, [blogs]);

  useEffect(() => {
    if (destinations && userCities) {
      const citiesID = userCities.map((city) => city.city_id);
      console.log(citiesID);
    }
  }, [destinations, userCities]);
  return (
    <PageTransition>
      <div>
        <Banner />
      </div>
      <div className="container mx-auto px-10 mt-5">
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
    </PageTransition>
  );
}
