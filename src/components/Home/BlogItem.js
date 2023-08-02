import { NavLink } from "react-router-dom";

export default function BlogItem({ id, title, details, image, author }) {
  return (
    <div className="card" style={{ width: "100%" }}>
      <div className="card-img">
        <img src={image} alt={id} className="card-img" />
      </div>
      <div className="card-body">
        <h4 className="leading-[20px]">{title}</h4>
        <div dangerouslySetInnerHTML={{ __html: details }} />
        <div className="flex items-center justify-center">
          <NavLink to={`/community/${id}`} className="px-btn px-btn-theme mt-3">
            Read More
          </NavLink>
        </div>
      </div>
    </div>
  );
}
