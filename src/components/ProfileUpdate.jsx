/* eslint-disable */
import React, { useState } from "react";
import ReactModal from "react-modal";
import { useForm } from "react-hook-form";
import axios from "axios";
import { API_BASE_URL, X_AUTH_TOKEN } from "../types";
import notifications from "./notifications";
import { FiUpload } from "react-icons/fi";

const ProfileUpdate = ({ isOpen, onClose }) => {
  const [imageUrl, setImageUrl] = useState(null);
  const { register, handleSubmit, errors } = useForm();

  const handleFileUpload = (event) => {
    setImageUrl(event.target.files[0]);
  };

  const onSubmit = (newData) => {
    const formData = new FormData();

    Object.keys(newData).forEach((k) => {
      const v = newData[k];
      formData.append(k, v);
    });

    formData.append("imageUrl", imageUrl);

    axios
      .patch(`${API_BASE_URL}/user/profile/update`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(X_AUTH_TOKEN)}`,
        },
      })
      .then((resp) => {
        notifications.success(
          "Info Updated",
          "Your Credentials Updated Successfully"
        );
        window.location.reload();
      })
      .catch((error) => {
        notifications.error("Update Failed", `${error.response.data.message}`);
      });
  };

  return (
    <ReactModal isOpen={isOpen} onRequestClose={onClose}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-100 p-4"
        onkeydown={(event) => event.key !== "Enter"}
      >
        <div className="row">
          {/* ////////name...  */}
          <div className="col-sm-6 form-group w-100">
            <label for="exampleInput2" className="text-black font-weight-bold">
              Name
            </label>
            <input
              className="form-field shadow w-100 reconcile-form-fields"
              name="name"
              ref={register({ required: true })}
            />
            {errors.name && (
              <small className="font-weight-bold text-danger">
                This field is required
              </small>
            )}
          </div>
          {/* old name............ */}
          <div className="col-sm-6 form-group w-100">
            <label for="exampleInput2" className="text-black font-weight-bold">
              Old Name
            </label>
            <input
              className="form-field shadow w-100 reconcile-form-fields"
              name="oldName"
              ref={register({ required: true })}
            />
            {errors.oldName && (
              <small className="font-weight-bold text-danger">
                This field is required
              </small>
            )}
          </div>
          {/* email............ */}
          <div className="col-sm-6 form-group w-100">
            <label for="exampleInput2" className="text-black font-weight-bold">
              Email
            </label>
            <input
              className="form-field shadow w-100 reconcile-form-fields"
              name="email"
              ref={register({
                required: true,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "invalid email address",
                },
              })}
            />
            {errors.email && errors.email.message && (
              <small className="font-weight-bold text-danger">
                Enter a valid email address
              </small>
            )}
          </div>
          {/* old email............ */}
          <div className="col-sm-6 form-group w-100">
            <label for="exampleInput2" className="text-black font-weight-bold">
              Old Email
            </label>
            <input
              className="form-field shadow w-100 reconcile-form-fields"
              name="oldEmail"
              type="email"
              ref={register({ required: true })}
            />
            {errors.oldEmail && (
              <small className="font-weight-bold text-danger">
                This field is required
              </small>
            )}
          </div>
          {/* ////////password...  */}
          <div className="col-sm-6 form-group w-100">
            <label for="exampleInput2" className="text-black font-weight-bold">
              Password
            </label>
            <input
              className="form-field shadow w-100 reconcile-form-fields"
              name="password"
              type="password"
              ref={register({ required: true })}
            />
            {errors.password && (
              <small className="font-weight-bold text-danger">
                This field is required
              </small>
            )}
          </div>
          {/* old Password............ */}
          <div className="col-sm-6 form-group w-100">
            <label for="exampleInput2" className="text-black font-weight-bold">
              Old Password
            </label>
            <input
              className="form-field shadow w-100 reconcile-form-fields"
              name="oldPassword"
              type="password"
              ref={register({ required: true })}
            />
            {errors.oldPassword && (
              <small className="font-weight-bold text-danger">
                This field is required
              </small>
            )}
          </div>

          <div class="text-center w-100 mt-5">
            <label htmlFor="dp" className="cursor-pointer">
              <span className="category-item shadow rounded-circle border bg-black">
                <FiUpload className="category-item-icon m-auto text-white" />
              </span>
              <input
                id="dp"
                type="file"
                name="dp"
                accept="image/*"
                className="d-none"
                onChange={handleFileUpload}
              />
            </label>
            <p>Profile Picture</p>
          </div>

          <div className="col-sm-12 mt-4 d-flex justify-content-center align-items-center">
            <button
              className="text-center reconcile-form-sbmt font-14  py-2 px-5"
              onClick={handleSubmit(onSubmit)}
              // onClick={props.openStartReconcile}
            >
              {/*}  className={`text-center font-14 bg-green text-white py-2 px-5 mt-4 ${
        //     loading ? "button-disabled" : null
        //   }`}
        //   type="submit"
        //   disabled={submt}
        //   style={{ borderRadius: "10px" }}
        // >                                                                                
        //   {loading === true ? (
        //     <div
        //       className="spinner-border spinner-border-sm text-light mr-2"
        //       role="status"
        //     >
        //       <span className="sr-only font-16">Loading...</span>
        //     </div>
        //   ) : null}*/}
              Update
            </button>
          </div>
        </div>
      </form>
    </ReactModal>
  );
};

export default ProfileUpdate;
