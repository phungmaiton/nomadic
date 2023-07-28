import PageTransition from "../Transitions/PageTransition";
import Pagination from "../Pagination/Pagination";
import BlogItem from "./BlogItem";
import BarLoader from "react-spinners/BarLoader";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import DestinationSearch from "../Search/DestinationSearch";

export default function Community({ user, isLoading, blogs }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [country, setCountry] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const [filteredBlogs, setFilteredBlogs] = useState([]);

  useEffect(() => {
    if (!searchTerm && !country) {
      setFilteredBlogs(blogs);
    } else if (country) {
      const filteredBlogs = blogs.filter(
        (blog) => blog.blog_country == country
      );
      setFilteredBlogs(filteredBlogs);
    } else if (searchTerm) {
      const filteredBlogs = blogs.filter((blog) =>
        blog.blog_city.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredBlogs(filteredBlogs);
    }
  }, [searchTerm, blogs, country]);

  const currentPosts = () => {
    if (!searchTerm && !country) {
      return blogs.slice(indexOfFirstPost, indexOfLastPost);
    } else {
      return filteredBlogs.slice(indexOfFirstPost, indexOfLastPost);
    }
  };

  const paginate = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  return (
    <PageTransition>
      <section className="pt-[150px] pb-[20px] lg:pt-[150px] lg:pb-[50px] bg-gradient-1 relative overflow-hidden">
        <div className="container mx-auto px-10">
          <div className="grid grid-cols-2 md:grid-cols-3 items-end">
            <div className="col-span-1 md:col-span-2">
              <h1 className="text-[#373737] font-[600] text-[30px] lg:text-[35px] xl:text-[40px] leading-[1] mb-[25px] md:mb-[32px] px-3">
                Community
              </h1>
              <DestinationSearch
                setSearchTerm={setSearchTerm}
                setCountry={setCountry}
              />
            </div>
            <div className="col-span-1 flex justify-end">
              {user ? (
                <NavLink to={"/add-blog"} className="px-btn px-btn-theme">
                  Contribute
                </NavLink>
              ) : (
                <NavLink to={"/add-blog"} className="px-btn px-btn-theme">
                  Login to Contribute
                </NavLink>
              )}
            </div>
          </div>
        </div>
      </section>
      {!isLoading && blogs ? (
        <>
          <div className="container px-8 mt-5 columns-2 lg:columns-3">
            {currentPosts().map((blog) => (
              <BlogItem
                key={blog.id}
                id={blog.id}
                title={blog.title}
                city={blog.blog_city}
                country={blog.blog_country}
                img={blog.blog_img}
                author={blog.user.username}
              />
            ))}
          </div>
          <Pagination
            paginate={paginate}
            array={currentPosts()}
            postsPerPage={postsPerPage}
          />
        </>
      ) : (
        <BarLoader color="#0B4C84" />
      )}
    </PageTransition>
  );
}
