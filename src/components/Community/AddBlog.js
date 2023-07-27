import PageTransition from "../Transitions/PageTransition";
import { useState, useEffect, useMemo } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import countryList from "react-select-country-list";

export default function AddBlog({ user, blogs }) {
  const [error, setError] = useState();
  const navigate = useNavigate();
  const [lastBlogID, setLastBlogID] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const countries = useMemo(() => countryList().getData(), []);
  const [country, setCountry] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    blog_body: "",
    blog_img: "",
    blog_city: "",
    blog_country: "",
  });

  useEffect(() => {
    if (blogs && blogs.length > 1) {
      const lastBlog = blogs.slice(-1)[0];
      setLastBlogID(lastBlog.id);
    }
  }, [blogs]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting form...");
    setIsLoading(true);
    fetch("/blogs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        id: lastBlogID + 1,
        user_id: user.id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Data received:", data);
        if (data.message === "success") {
          setIsLoading(false);
          setFormData({
            title: "",
            blog_body: "",
            blog_img: "",
            blog_city: "",
            blog_country: "",
          });
          navigate(`/community/${lastBlogID + 1}`);
        } else {
          setError(data.errors);
        }
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
      });
  };

  const handleChangeQuill = (content) => {
    setFormData((prevData) => ({
      ...prevData,
      blog_body: content,
    }));
  };

  return (
    <PageTransition>
      <section className="pt-[120px] pb-[80px] lg:pt-[170px] lg:pb-[100px] bg-blue relative overflow-hidden">
        {user && (
          <div className="container mx-auto form-container">
            <form
              onSubmit={handleSubmit}
              id="add-blog-form"
              method="POST"
              className="form"
            >
              <div>
                <label className="form-label">Title</label>
                <input
                  name="title"
                  id="title"
                  placeholder="Your Blog Title"
                  className="form-control"
                  type="text"
                  onChange={handleChange}
                  value={formData.title}
                />
                <p className="error"> {error && error.title}</p>
              </div>
              <div>
                <label className="form-label">Blog Content</label>
                <ReactQuill
                  value={formData.blog_body}
                  onChange={handleChangeQuill}
                  className="form-blog-body"
                />
                <p className="error"> {error && error.blog_body}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-9">
                <div className="md:col-span-4">
                  <label className="form-label mt-5">Cover Image</label>
                  <input
                    name="blog_img"
                    id="blog_img"
                    placeholder="Cover Image URL"
                    className="form-control"
                    type="text"
                    onChange={handleChange}
                    value={formData.blog_img}
                  />
                  <p className="error"> {error && error.blog_img}</p>
                </div>
                <div className="md:col-span-4">
                  <label className="form-label mt-5">City</label>
                  <input
                    name="blog_city"
                    id="blog_city"
                    placeholder="Which city is this blog about?"
                    className="form-control"
                    type="text"
                    onChange={handleChange}
                    value={formData.blog_city}
                  />
                  <p className="error"> {error && error.blog_city}</p>
                </div>
                <div className="md:col-span-4">
                  <label htmlFor="blog_country" className="form-label mt-5">
                    Country
                  </label>
                  <select
                    id="blog_country"
                    name="blog_country"
                    className="form-control"
                    onChange={(e) => setCountry(e.target.value)}
                    value={country}
                  >
                    <option disabled></option>
                    {countries.map((country) => (
                      <option key={country.label} value={country.code}>
                        {country.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <button type="submit" className="px-btn px-btn-theme mt-2">
                  {isLoading ? "Loading..." : "Post Blog"}
                </button>
              </div>
            </form>
          </div>
        )}
      </section>
    </PageTransition>
  );
}
