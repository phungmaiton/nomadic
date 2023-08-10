import PageTransition from "../Transitions/PageTransition";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import EditUser from "./EditUser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Pagination from "../Pagination/Pagination";

const Warning = ({
  closeToast,
  toastProps,
  id,
  handleAddBlog,
  setCurrentPage,
}) => {
  const handleYes = () => {
    fetch(`/blogs/${id}`, {
      method: "DELETE",
    }).then((response) => {
      if (response.ok) {
        handleAddBlog();
        setCurrentPage(1);
      }
    });
  };

  return (
    <div className="items-center">
      Are you sure you want to remove this blog post?
      <div className="flex flex-row items-center mt-2">
        <button className="px-btn px-btn-theme mr-2" onClick={handleYes}>
          Yes
        </button>
        <button className="px-btn px-btn-theme" onClick={closeToast}>
          No
        </button>
      </div>
    </div>
  );
};
function RenderBlog({ title, author, id, img, handleAddBlog, setCurrentPage }) {
  const displayWarning = () => {
    toast.warning(
      <Warning
        id={id}
        handleAddBlog={handleAddBlog}
        setCurrentPage={setCurrentPage}
      />,
      {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "light",
      }
    );
  };
  return (
    <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 items-center pb-4">
      <div className="col-span-2">
        <img src={img} className="blog-img rounded-lg" />
      </div>
      <div className="lg:col-span-4">
        <NavLink to={`/community/${id}`} className="text-left">
          <h3 className="leading-[18px] text-[16px]">
            {title.length < 90 ? title : title.substring(0, 90) + "..."}
          </h3>
        </NavLink>
        <p className="text-[13px] pt-2">by {author}</p>
        <div className="lg:col-span-1 text-right mb-0 lg:mb-0 lg:ml-[10%] flex justify-end items-top">
          <NavLink
            to={`/community/${id}/edit`}
            className="flex flex-col items-center spacy-y-1.5 relative text-xs mr-3"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-pencil-square dashboard-icon cursor-pointer"
              viewBox="0 0 16 16"
            >
              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
              <path
                fillRule="evenodd"
                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
              />
            </svg>
            <p>Edit</p>
          </NavLink>
          <div
            className="flex flex-col items-center spacy-y-1.5 relative text-xs"
            onClick={() => displayWarning(id)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-x-square dashboard-icon cursor-pointer"
              viewBox="0 0 16 16"
            >
              <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
            </svg>
            <p>Remove</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Dashboard({
  user,
  selectedCurrency,
  blogs,
  comments,
  onLogin,
  handleUserChange,
  handleAddBlog,
}) {
  const [showUserEditModal, setShowUserEditModal] = useState(false);
  const [userBlogs, setUserBlogs] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  const [currentPosts, setCurrentPosts] = useState(null);

  useEffect(() => {
    if (user && blogs) {
      const userblogs = blogs.filter((blog) => blog.user_id === user.id);
      setUserBlogs(userblogs);
    }
  }, [user, blogs]);

  const closeUserEditPopup = () => {
    setShowUserEditModal(false);
  };

  useEffect(() => {
    if (userBlogs && userBlogs.length > 0) {
      const indexOfLastPost = currentPage * postsPerPage;
      const indexOfFirstPost = indexOfLastPost - postsPerPage;
      const currentPosts = userBlogs.slice(indexOfFirstPost, indexOfLastPost);
      setCurrentPosts(currentPosts);
    }
  }, [currentPage, userBlogs, postsPerPage]);

  const paginate = ({ selected }) => {
    setCurrentPage(selected + 1);
  };
  return (
    <PageTransition>
      {user && comments && blogs && (
        <>
          <section className="pt-[150px] pb-[20px] lg:pt-[150px] lg:pb-[50px] bg-gradient-2 relative overflow-hidden">
            <div className="container mx-auto px-10">
              <div>
                <h1 className="text-[#373737] font-[600] text-[30px] lg:text-[35px] xl:text-[40px] leading-[1] mb-[25px] md:mb-[32px] px-3">
                  Hi, {user.username} 👋
                </h1>
              </div>
            </div>
          </section>
          <section className="py-[5%] lg:py-[5%] relative overflow-hidden">
            <div className="container mx-auto px-10">
              <div className="container mx-auto px-10">
                <div className="grid lg:grid-cols-12 grid-cols-1 grid gap-10 items-top">
                  {/* Personal Info
                  ------------------------------*/}
                  <div className="lg:col-span-6 text-left mb-0 lg:mb-0 dashboard-half">
                    <div className="grid grid-cols-4 gap-4">
                      <div className="col-span-3">
                        <h2>Personal Information</h2>
                      </div>
                      <div
                        className="lg:col-span-1 text-right mb-0 lg:mb-0 lg:ml-[10%] flex justify-end items-top"
                        onClick={() => setShowUserEditModal(true)}
                      >
                        <div className="flex flex-col items-center spacy-y-1.5 relative text-xs ml-3">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-pencil-square dashboard-icon cursor-pointer"
                            viewBox="0 0 16 16"
                          >
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                            <path
                              fillRule="evenodd"
                              d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                            />
                          </svg>
                          <p>Edit</p>
                        </div>
                      </div>
                      <div className="col-span-4">
                        <div>
                          <img
                            src={user.profile_img}
                            alt={user.username}
                            className="profile-img my-4"
                          />
                        </div>
                      </div>
                      <div className="col-span-2">
                        <h3>Username</h3>
                      </div>
                      <div className="col-span-2 flex justify-end">
                        <p>{user.username}</p>
                      </div>
                      <div className="col-span-4 border-b-2"></div>
                      <div className="col-span-2">
                        <h3>Email</h3>
                      </div>
                      <div className="col-span-2 flex justify-end">
                        <p>{user.email}</p>
                      </div>
                      <div className="col-span-4 border-b-2"></div>
                      <div className="col-span-2">
                        <h3>City</h3>
                      </div>
                      <div className="col-span-2 flex justify-end">
                        <p>{user.city}</p>
                      </div>
                      <div className="col-span-4 border-b-2"></div>

                      <div className="col-span-2">
                        <h3>State</h3>
                      </div>
                      <div className="col-span-2 flex justify-end">
                        <p>{user.state}</p>
                      </div>
                      <div className="col-span-4 border-b-2"></div>

                      <div className="col-span-2">
                        <h3>Country</h3>
                      </div>
                      <div className="col-span-2 flex justify-end">
                        <p>{user.country}</p>
                      </div>
                      <div className="col-span-4 border-b-2"></div>
                      <div className="col-span-2">
                        <h3>Default Currency</h3>
                      </div>
                      <div className="col-span-2 flex justify-end">
                        <p>{user.currency_code}</p>
                      </div>
                      <div className="col-span-4 border-b-2"></div>
                    </div>
                  </div>
                  <div className="lg:col-span-6 text-left mb-0 lg:mb-0 dashboard-half">
                    {/* Blogs
                  ------------------------------*/}
                    <div className="grid grid-cols-4 gap-4">
                      <div className="col-span-3">
                        <h2>Community Contributions</h2>
                      </div>
                      <NavLink
                        className="lg:col-span-1 text-right mb-0 lg:mb-0 lg:ml-[10%] flex justify-end items-top"
                        to="/add-blog"
                      >
                        <div className="flex flex-col items-center spacy-y-1.5 relative text-xs ml-3">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-plus-square"
                            viewBox="0 0 16 16"
                          >
                            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                          </svg>
                          <p>Add</p>
                        </div>
                      </NavLink>
                    </div>
                    {currentPosts && currentPosts.length > 0 ? (
                      <div className=" mt-4">
                        {currentPosts.map((blog) => (
                          <RenderBlog
                            key={blog.id}
                            id={blog.id}
                            author={blog.user.username}
                            title={blog.title.replace(/'S/g, "'s")}
                            img={blog.blog_img}
                            handleAddBlog={handleAddBlog}
                            setCurrentPage={setCurrentPage}
                          />
                        ))}
                        <Pagination
                          paginate={paginate}
                          array={userBlogs}
                          postsPerPage={postsPerPage}
                        />
                      </div>
                    ) : (
                      <div className="mt-4">
                        You currently have no contributions
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
          {showUserEditModal ? (
            <>
              <EditUser
                closePopup={closeUserEditPopup}
                setShowModal={setShowUserEditModal}
                onLogin={onLogin}
                user={user}
                handleUserChange={handleUserChange}
              />
            </>
          ) : null}
        </>
      )}
      <ToastContainer />
    </PageTransition>
  );
}
