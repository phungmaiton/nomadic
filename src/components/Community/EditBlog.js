import PageTransition from "../Transitions/PageTransition";
import { useState, useEffect, useMemo } from "react";
import ReactQuill from "react-quill";
import { useFormik } from "formik";
import "react-quill/dist/quill.snow.css";
import { object, string, number } from "yup";
import { useNavigate, useParams } from "react-router-dom";
import countryList from "react-select-country-list";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EditBlog({ user, blogs, handleAddBlog }) {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [blogID, setBlogID] = useState(null);
  const [error, setError] = useState();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const countries = useMemo(() => countryList().getData(), []);
  const [country, setCountry] = useState("");
  const [dataReady, setDataReady] = useState(false);

  const successAlert = () => {
    toast.success("Successfully updated", {
      position: "bottom-center",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: "light",
    });
    setTimeout(() => {
      navigate(`/community/${id}`);
    }, 3000);
  };

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://nomadic-db.onrender.com/blogs/${id}`)
      .then((response) => response.json())
      .then((blog) => {
        setBlog(blog);
        setIsLoading(false);
      });
  }, [id]);

  useEffect(() => {
    if (blog) {
      formik.setFieldValue("title", blog.title);
      formik.setFieldValue("blog_body", blog.blog_body);
      formik.setFieldValue("blog_img", blog.blog_img);
      formik.setFieldValue("blog_city", blog.blog_city);
      setCountry(blog.blog_country);
      setDataReady(true);
    }
  }, [blogs, user, blog]);

  const formik = useFormik({
    initialValues: {
      title: "",
      blog_body: "",
      blog_img: "",
      blog_city: "",
      blog_country: "",
    },

    onSubmit: (values) => {
      const data = {
        title: values.title,
        blog_body: values.blog_body,
        blog_img: values.blog_img,
        blog_city: values.blog_city,
        blog_country: country,
      };
      setIsLoading(true);
      fetch(`https://nomadic-db.onrender.com/blogs/${id}   `, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (response.ok) {
            response.json().then((blog) => {
              formik.resetForm();
              successAlert();
              handleAddBlog();
              setIsLoading(false);
            });
          } else {
            setError(data.errors);
          }
        })
        .catch((error) => {
          console.error("Error submitting form:", error);
        });
    },
  });

  console.log(formik.initialValues);

  return (
    <PageTransition>
      <section className="pt-[120px] pb-[80px] lg:pt-[170px] lg:pb-[100px] bg-blue relative overflow-hidden">
        {user && blog && user.id === blog.user_id && dataReady ? (
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
                  {isLoading ? "Loading..." : "Update Blog"}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="error">
            You don't have permission to edit this blog post.
          </div>
        )}
      </section>
      <ToastContainer />
    </PageTransition>
  );
}
