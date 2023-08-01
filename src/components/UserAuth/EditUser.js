import { useState, useMemo } from "react";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const failureAlert = () => {
  toast.warning("Failed to edit user.", {
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

  console.log(user);
  const successAlert = () => {
    toast.success("Username already exists", {
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
    },
    onSubmit: (values) => {
      setIsLoading(true);

      fetch(`/users/${user.id}`, {
        method: "PATCH",
        body: JSON.stringify(values),
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
            <div>
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
            <div>
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
