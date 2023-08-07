import PageTransition from "../Transitions/PageTransition";
import Pagination from "../Pagination/Pagination";
import BlogItem from "./BlogItem";
import BarLoader from "react-spinners/BarLoader";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import DestinationSearch from "../Search/DestinationSearch";
import LoginPopup from "../UserAuth/LoginPopup";

export default function Community({ user, isLoading, blogs, onLogin }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [country, setCountry] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(9);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    if (!searchTerm && !country) {
      setFilteredBlogs(blogs);
    } else if (country) {
      const filteredBlogs = blogs.filter(
        (blog) => blog.blog_country === country
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

  const closePopup = () => {
    setShowLogin(false);
  };

  return (
    <PageTransition>
      <section className="pt-[120px] pb-[20px] lg:pt-[170px] lg:pb-[100px] banner-community relative overflow-hidden">
        <div className="container mx-auto px-10">
          <div className="grid grid-cols-1 md:grid-cols-3 items-end">
            <div className="col-span-1 md:col-span-2">
              <h1 className="text-[#373737] font-[600] text-[40px] lg:text-[50px] xl:text-[50px] leading-[1] mb-[25px] md:mb-[20px]">
                Community
              </h1>
              <h6 className="text-[#373737] text-[15px] md:text-[16px] tracking-[2px] font-[600] mb-[20px] md:mb-[30px]">
                Discover Cities through the Lens of Fellow Nomads
              </h6>
              <DestinationSearch
                setSearchTerm={setSearchTerm}
                setCountry={setCountry}
              />
            </div>
            <div className="col-span-1 mt-2 ml-2 flex md:justify-end md:mt-0 md:mt-0">
              {user ? (
                <NavLink to={"/add-blog"} className="px-btn px-btn-theme">
                  Contribute
                </NavLink>
              ) : (
                <button
                  onClick={() => setShowLogin(true)}
                  className="px-btn px-btn-theme"
                >
                  Login to Contribute
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
      {!isLoading && blogs ? (
        <>
          <div className="container px-8 mt-5 columns-2 lg:columns-3 pt-4">
            {currentPosts().map((blog) => (
              <BlogItem
                key={blog.id}
                id={blog.id}
                title={blog.title.replace(/'S/g, "'s")}
                city={blog.blog_city}
                country={blog.blog_country}
                img={blog.blog_img}
                author={blog.user.username}
              />
            ))}
          </div>
          <div className="pb-5">
            <Pagination
              paginate={paginate}
              array={blogs}
              postsPerPage={postsPerPage}
            />
          </div>
        </>
      ) : (
        <BarLoader color="#0B4C84" />
      )}
      {showLogin ? (
        <>
          <LoginPopup
            closePopup={closePopup}
            setShowModal={setShowLogin}
            onLogin={onLogin}
          ></LoginPopup>
        </>
      ) : null}
    </PageTransition>
  );
}
