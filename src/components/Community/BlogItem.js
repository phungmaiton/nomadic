import { NavLink } from "react-router-dom";

export default function BlogItem({ title, author, city, country, img, id }) {
  return (
    <div className="blog-item-container">
      <NavLink className="relative" to={`/community/${id}`}>
        <div className="relative">
          <img className="w-full rounded-md" src={img} alt={title} />
          <div className="absolute inset-0 bg-mystic opacity-50 rounded-md"></div>
        </div>
        <div className="test__body absolute inset-0 p-3 md:p-8 text-white flex flex-col">
          <div className="relative">
            <a
              className="test__link absolute inset-0"
              target="_blank"
              href={`/community/${id}`}
            ></a>
            <h3 className="text-[15px] leading-[15px] md:text-[20px] md:leading-[25px] lg:text-[25px] lg:leading-[30px]">
              {title < 70 ? title : title.substring(0, 70) + "..."}
            </h3>
            <p className="test__author text-[10px] md:text-[15px] font-sm font-light">
              {author}
            </p>
          </div>
          <div className="mt-auto  overflow-hidden">
            <span className="test__tag text-[10px] md:text-[20px] bg-white bg-opacity-60 py-1 px-4 rounded-md text-black">
              {city}
            </span>
          </div>
        </div>
      </NavLink>
    </div>
  );
}
