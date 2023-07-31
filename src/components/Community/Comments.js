import { useState, useEffect } from "react";
import CommentForm from "./CommentForm";
import Pagination from "../Pagination/Pagination";

function Comment({ comment }) {
  return (
    <>
      <div className="grid grid-cols-12 mt-4">
        <div className="flex col-span-3">
          <img
            className="nav-avatar mr-3"
            src={comment.user.profile_img}
            alt={comment.user.username}
          />
          <div className="flex flex-col">
            <h4>{comment.user.username}</h4>
            <p className="text-[15px]">
              {new Date(comment.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
      <div>
        <div className="ml-[65px]">{comment.comment}</div>
      </div>
    </>
  );
}
export default function Comments({
  blog,
  user,
  users,
  onComment,
  comments,
  setComments,
  setShowLogin,
}) {
  const [blogComments, setBlogComments] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  const [currentPosts, setCurrentPosts] = useState(null);

  useEffect(() => {
    if (blog && comments) {
      const blogcomments = comments.filter(
        (comment) => comment.blog_id === blog.id
      );
      setBlogComments(blogcomments);
    }
  }, [blog, users, user, comments]);

  useEffect(() => {
    if (blogComments) {
      const indexOfLastPost = currentPage * postsPerPage;
      const indexOfFirstPost = indexOfLastPost - postsPerPage;
      const currentPosts = blogComments.slice(
        indexOfFirstPost,
        indexOfLastPost
      );
      setCurrentPosts(currentPosts);
    }
  }, [currentPage, blogComments, postsPerPage]);

  const paginate = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  return (
    <section className="pt-[40px] pb-[80px] lg:pt-[40px] lg:pb-[30px] bg-gradient-1 relative overflow-hidden">
      <div className="container mx-auto px-10">
        <h2 className="mb-4">
          Comments {blogComments && `(${blogComments.length})`}
        </h2>
        {user ? (
          <CommentForm
            user={user}
            blog={blog}
            onComment={onComment}
            comments={comments}
            setComments={setComments}
          />
        ) : (
          <button
            onClick={() => setShowLogin(true)}
            className="px-btn px-btn-theme"
          >
            Login to Comment
          </button>
        )}
        {currentPosts &&
          currentPosts.length > 0 &&
          users &&
          currentPosts.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
      </div>
      {currentPosts && (
        <Pagination
          paginate={paginate}
          array={blogComments}
          postsPerPage={postsPerPage}
        />
      )}
    </section>
  );
}
