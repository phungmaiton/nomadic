import { NavLink, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import PageTransition from "../Transitions/PageTransition";
import BarLoader from "react-spinners/BarLoader";

function RenderBlog({ title, city, country, id, img }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 items-center pb-3">
      <div className="col-span-2">
        <img src={img} className="blog-img rounded-lg" />
      </div>
      <div className="lg:col-span-4">
        <NavLink to={`/community/${id}`} className="text-left">
          <h3 className="leading-[18px] text-[16px]">
            {title.length < 50 ? title : title.substring(0, 50) + "..."}
          </h3>
          <p className="text-[13px] pt-2">
            {city}, {country}
          </p>
        </NavLink>
      </div>
    </div>
  );
}

function Banner({ img, city, country, title, date, avatar, author }) {
  const dateObj = new Date(date);
  const formattedDate = dateObj.toLocaleDateString();

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
                    {title.replace(/'S/g, "'s")}
                  </h1>
                  <h4 className="text-white">
                    {city}, {country}
                  </h4>
                  <p className="text-white text-[15px]">{formattedDate}</p>
                  <div className="grid grid-cols-4 gap-1 md:grid-cols-6 lg:grid-cols-12 grid-cols-1 items-center">
                    <div className="col-span-1 lg:col-span-1">
                      <img
                        className="avatar mt-3 width-100"
                        src={
                          avatar
                            ? avatar
                            : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                        }
                      ></img>
                    </div>
                    <div className="col-span-3 ml-2 lg:col-span-4 text-white">
                      <ul>
                        <li>Author</li>
                        <li>
                          <strong>{author}</strong>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default function BlogByID({ onLogin, users, user, blogs }) {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [blog, setBlog] = useState(null);
  const [authorBlogs, setAuthorBlogs] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetch(`/blogs/${id}`)
      .then((response) => response.json())
      .then((blog) => {
        setBlog(blog);
        setIsLoading(false);
      });
  }, [id]);

  useEffect(() => {
    if (blogs && users && blog) {
      const authorBlogs = blogs
        .filter(
          (authorBlog) =>
            authorBlog.user_id == blog.user_id && authorBlog.id !== blog.id
        )
        .slice(-4);
      setAuthorBlogs(authorBlogs);
    }
  }, [blogs, users, blog]);
  return (
    <PageTransition>
      {!isLoading && blog ? (
        <>
          <Banner
            img={blog.blog_img}
            title={blog.title.replace(/'S/g, "'s")}
            city={blog.blog_city}
            country={blog.blog_country}
            date={blog.created_at}
            author={blog.user.username}
            avatar={blog.user.profile_img}
          />
          <section className="pt-[40px] pb-[80px] lg:pt-[40px] lg:pb-[30px] relative overflow-hidden">
            <div className="container mx-auto px-10">
              <div className="grid lg:grid-cols-12 grid-cols-1 items-start mt-2">
                <div className="lg:col-span-8 text-left mb-0 lg:mb-0 mr-3">
                  <div dangerouslySetInnerHTML={{ __html: blog.blog_body }} />
                </div>
                {authorBlogs && authorBlogs.length > 0 && (
                  <div className="lg:col-span-4 text-left mb-[0px] lg:mb-0 lg:ml-[10%] items-center text-center">
                    <div className="related-posts">
                      <h2 className="mb-3 text-[#0B4C84] text-[23px]">
                        From the same author
                      </h2>
                      {authorBlogs.map((blog) => (
                        <RenderBlog
                          key={blog.id}
                          id={blog.id}
                          title={blog.title.replace(/'S/g, "'s")}
                          city={blog.blog_city}
                          country={blog.blog_country}
                          img={blog.blog_img}
                        />
                      ))}
                    </div>
                  </div>
                )}
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
