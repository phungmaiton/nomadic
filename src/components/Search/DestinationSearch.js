import countryList from "react-select-country-list";
import { useMemo } from "react";

export default function DestinationSearch({ setSearchTerm, setCountry }) {
  const countries = useMemo(() => countryList().getData(), []);
  function handleChange(e) {
    setSearchTerm(e.target.value);
  }

  return (
    <div className="container m-auto px-2">
      <div className="flex flex-col md:flex-row">
        <input
          onChange={handleChange}
          type="text"
          className="search"
          placeholder="City Name"
        />
        <select
          id="country"
          name="country"
          className="search-select"
          onChange={(e) => setCountry(e.target.value)}
        >
          <option value="">Select Country</option>
          {countries.map((country) => (
            <option key={country.label} value={country.code}>
              {country.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
