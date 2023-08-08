import { useState, useMemo } from "react";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import countryList from "react-select-country-list";

const failureAlert = () => {
  toast.warning("Username already exists", {
    position: "bottom-center",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    theme: "light",
  });
};

export default function EditUser({
  user,
  onLogin,
  setShowModal,
  closePopup,
  handleUserChange,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const countries = useMemo(() => countryList().getData(), []);
  const [country, setCountry] = useState(user.country);
  const [currency_code, setCurrency] = useState(user.currency_code);
  const successAlert = () => {
    toast.success("Updated successfully", {
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
      setShowModal(false);
      handleUserChange();
    }, 3000);
  };

  const formik = useFormik({
    initialValues: {
      username: user.username,
      email: user.email,
      profile_img: user.profile_img,
      city: user.city,
      state: user.state,
      country: user.country,
      currency_code: user.currency_code,
    },
    onSubmit: (values) => {
      setIsLoading(true);

      const data = {
        username: values.username,
        email: values.email,
        profile_img: values.profile_img,
        city: values.city,
        state: values.state,
        country: country,
        currency_code: currency_code,
      };
      fetch(`/users/${user.id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            response.json().then((user) => {
              onLogin(user);
              successAlert();
              formik.resetForm();
            });
          } else {
            failureAlert();
          }
        })
        .catch((errors) => {
          console.log("Errors", errors);
          failureAlert();
        });
    },
  });
  return (
    <div className="px-modal mfp-hide">
      <div className="popup">
        <div className="grid grid-cols-1 gx-3">
          <form
            onSubmit={formik.handleSubmit}
            id="user-edit-form"
            method="PATCH"
            className="form"
          >
            <div className="grid grid-cols-2 gap-2">
              <div className="col-span-1">
                <label className="form-label">Username</label>
                <input
                  name="username"
                  id="username"
                  placeholder="Enter your new username"
                  className="form-control"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.username}
                />
                <p className="error"> {formik.errors.username}</p>
              </div>
              <div className="col-span-1">
                <label className="form-label">Email Addresss</label>
                <input
                  name="email"
                  id="email"
                  placeholder="Enter your new email"
                  className="form-control"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
                <p className="error"> {formik.errors.email}</p>
              </div>
            </div>
            <div>
              <label className="form-label">Profile Image URL</label>
              <input
                name="profile_img"
                id="profile_img"
                placeholder="Enter your new email"
                className="form-control"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.profile_img}
              />
              <p className="error"> {formik.errors.profile_img}</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="col-span-1">
                <label className="form-label">City</label>
                <input
                  name="city"
                  id="city"
                  placeholder="Enter your new city"
                  className="form-control"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.city}
                />
                <p className="error"> {formik.errors.city}</p>
              </div>
              <div className="col-span-1">
                <label className="form-label">State</label>
                <input
                  name="state"
                  id="state"
                  placeholder="Enter your new state"
                  className="form-control"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.state}
                />
                <p className="error"> {formik.errors.state}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="col-span-1">
                <label htmlFor="country" className="form-label">
                  Country
                </label>
                <select
                  id="country"
                  name="country"
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
              <div className="col-span-1">
                <label htmlFor="currency_code" className="form-label">
                  Default Currency
                </label>

                <select
                  id="currency_code"
                  className="form-control"
                  value={currency_code}
                  onChange={(e) => {
                    setCurrency(e.target.value);
                  }}
                >
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                  <option value="AUD">AUD</option>
                  <option value="SGD">SGD</option>
                  <option value="CAD">CAD</option>
                </select>
              </div>
            </div>

            <div>
              <button type="onClick" className="px-btn px-btn-theme mt-4">
                {isLoading ? "Loading..." : "Update"}
              </button>
            </div>
            {/* <div>{errorMessage && <div className="error">{errorMessage}</div>}</div> */}
          </form>
          <button className="px-close" onClick={closePopup}>
            <i className="fa fa-times"></i>
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
