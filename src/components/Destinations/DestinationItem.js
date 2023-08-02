import { NavLink } from "react-router-dom";

export default function DestinationItem({ user, city, country, id, img }) {
  return (
    <div className="city-card" style={{ width: "100%" }}>
      <div>
        <img src={img} alt={city} className="card-img" />
      </div>
      <div className="card-body">
        <h5 className="card-title">{city}</h5>
        <p className="city-card-text">{country}</p>
        <div className="flex items-center justify-center">
          <NavLink to={`/destinations/${id}`} className="px-btn px-btn-theme">
            Explore
          </NavLink>
        </div>
      </div>
    </div>
  );
}
