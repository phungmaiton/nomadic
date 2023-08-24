import PageTransition from "../Transitions/PageTransition";
import { useState, useEffect, useMemo } from "react";
import ReactQuill from "react-quill";
import { useFormik } from "formik";
import "react-quill/dist/quill.snow.css";
import { object, string, number } from "yup";
import { useNavigate } from "react-router-dom";
import countryList from "react-select-country-list";

export default function AddBlog({ user, blogs, handleAddBlog }) {
  const [error, setError] = useState();
  const navigate = useNavigate();
  const [lastBlogID, setLastBlogID] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const countries = useMemo(() => countryList().getData(), []);
  const [country, setCountry] = useState("");
  const [userID, setUserID] = useState(null);
  const formSchema = object({
    title: string().required("Please enter a blog title"),
    blog_body: string()
      .required("Blog content must be at least 1000 characters")
      .min(1000, "Blog content must be at least 1000 characters"),
    blog_img: string().required("Please insert cover image url for your blog"),
    blog_city: string().required("Please enter a city name"),
  });

  useEffect(() => {
    if (blogs && blogs.length > 0) {
      const lastBlog = blogs.slice(-1)[0];
      setLastBlogID(lastBlog.id);
      formik.setFieldValue("id", lastBlog.id + 1);
    }

    if (user) {
      setUserID(user.id);
      formik.setFieldValue("user_id", user.id);
    }
  }, [blogs, user]);

  const formik = useFormik({
    initialValues: {
      id: 0,
      user_id: null,
      title: "",
      blog_body: "",
      blog_img: "",
      blog_city: "",
      blog_country: "",
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      const data = {
        id: lastBlogID + 1,
        user_id: userID,
        title: values.title,
        blog_body: values.blog_body,
        blog_img: values.blog_img,
        blog_city: values.blog_city,
        blog_country: country,
      };
      setIsLoading(true);
      fetch("https://nomadic-db.onrender.com/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          console.log("Response received:", response);
          return response.json();
        })
        .then((data) => {
          console.log("Data received:", data);
          if (data.message === "success") {
            setIsLoading(false);
            formik.resetForm();
            navigate(`/community/${values.id}`);
            handleAddBlog();
          } else {
            setError(data.errors);
          }
        })
        .catch((error) => {
          console.error("Error submitting form:", error);
        });
    },
  });

  return (
    <PageTransition>
      <section className="pt-[120px] pb-[80px] lg:pt-[170px] lg:pb-[100px] bg-blue relative overflow-hidden">
        {user && (
          <div className="container mx-auto form-container">
            <form
              onSubmit={formik.handleSubmit}
              id="add-blog-form"
              method="POST"
              className="form"
            >
              <div>
                <label className="blog-form-label">Title</label>
                <input
                  name="title"
                  id="title"
                  placeholder="Your Blog Title"
                  className="form-control"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.title}
                />
                <p className="error"> {formik.errors.title}</p>
              </div>
              <div>
                <label className="blog-form-label">Blog Content</label>
                <ReactQuill
                  value={formik.values.blog_body}
                  onChange={(content) =>
                    formik.setFieldValue("blog_body", content)
                  }
                  className="form-blog-body"
                />
                <p className="error"> {formik.errors.blog_body}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-9">
                <div className="md:col-span-4">
                  <label className="blog-form-label mt-5">Cover Image</label>
                  <input
                    name="blog_img"
                    id="blog_img"
                    placeholder="Cover Image URL"
                    className="form-control"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.blog_img}
                  />
                  <p className="error"> {formik.errors.blog_img}</p>
                </div>
                <div className="md:col-span-4">
                  <label className="blog-form-label mt-5">City</label>
                  <input
                    name="blog_city"
                    id="blog_city"
                    placeholder="Which city is this blog about?"
                    className="form-control"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.blog_city}
                  />
                  <p className="error"> {formik.errors.blog_city}</p>
                </div>
                <div className="md:col-span-4">
                  <label
                    htmlFor="blog_country"
                    className="blog-form-label mt-5"
                  >
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
