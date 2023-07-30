import { useFormik } from "formik";
import { useState, useEffect } from "react";

export default function CommentForm({
  user,
  blog,
  onComment,
  comments,
  setComments,
}) {
  const [userID, setUserID] = useState(null);
  const [blogID, setBlogID] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [lastCommentID, setLastCommentID] = useState(0);

  useEffect(() => {
    if (user && blog) {
      setUserID(user.id);
      setBlogID(blog.id);
    }

    if (blog && comments && comments.length > 0) {
      const lastID = comments.slice(-1)[0].id;
      setLastCommentID(lastID);
    }
  }, [user, blog, comments]);

  const formik = useFormik({
    initialValues: {
      blog_id: null,
      user_id: null,
      comment: "",
    },
    onSubmit: (values) => {
      const data = {
        id: lastCommentID + 1,
        blog_id: blogID,
        user_id: userID,
        comment: values.comment,
      };

      setIsLoading(true);
      fetch("/comments", {
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
            setComments([...comments, data]);
            onComment();
            window.location.reload(false);
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
    <>
      {!user ? (
        "Please login to comment"
      ) : (
        <div className="grid grid-cols-3 md:grid-cols-12 gap-4">
          <div className="col-span-1">
            <img
              className="nav-avatar mr-3"
              src={user.profile_img}
              alt={user.username}
            />
          </div>
          <div className="col-span-2 ml-[-60px] md:col-span-9 md:ml-[0] lg:ml-[-30px]">
            <form
              id="comment-form"
              onSubmit={formik.handleSubmit}
              method="POST"
            >
              <textarea
                name="comment"
                form="comment-form"
                className="form-control"
                placeholder="Comment here..."
                value={formik.values.comment}
                onChange={formik.handleChange}
              ></textarea>
              <button type="submit" className="px-btn px-btn-theme mt-2">
                {isLoading ? "Loading..." : "Post Comment"}
              </button>
              <p className="error">{error}</p>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
