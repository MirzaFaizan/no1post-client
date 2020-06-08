/* eslint-disable */
import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { API_BASE_URL, X_AUTH_TOKEN } from "../../types";
import notifications from "../notifications";
import { FiUpload } from "react-icons/fi";
import "./profileUpdation.css";

// import FileUpload from "../FileUpload";

export default function Modal() {
  const { register, handleSubmit, setValue, errors } = useForm();

  const handleFileUpload = (event) => {
    setValue("avatar", event.target.files[0]);
  };

  const onSubmit = (newData) => {
    newData.imageUrl = "";
    axios
      .patch(`${API_BASE_URL}/user/profile/update`, newData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(X_AUTH_TOKEN)}`,
        },
      })
      .then((resp) => {
        console.log(resp);
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
    <>
      <div class="">
        <button
          type="button"
          class="accounting-new-btn bg-transparent ml-2"
          data-toggle="modal"
          data-target="#form"
          onClick={console.log}
        >
          Edit Profile
        </button>
      </div>

      <div
        class="modal fade"
        id="form"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header border-bottom-0">
              <h3 class="modal-title" id="exampleModalLabel">
                Profile Credentials Updation
              </h3>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              class="w-100 p-4"
              onkeydown={(event) => event.key !== "Enter"}
            >
              <div className="row">
                {/* ////////name...  */}
                <div className="col-sm-6 form-group w-100">
                  <label
                    for="exampleInput2"
                    class="text-black font-weight-bold"
                  >
                    Name
                  </label>
                  <input
                    class="form-field shadow w-100 reconcile-form-fields"
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
                  <label
                    for="exampleInput2"
                    class="text-black font-weight-bold"
                  >
                    Old Name
                  </label>
                  <input
                    class="form-field shadow w-100 reconcile-form-fields"
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
                  <label
                    for="exampleInput2"
                    class="text-black font-weight-bold"
                  >
                    Email
                  </label>
                  <input
                    class="form-field shadow w-100 reconcile-form-fields"
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
                  <label
                    for="exampleInput2"
                    class="text-black font-weight-bold"
                  >
                    Old Email
                  </label>
                  <input
                    class="form-field shadow w-100 reconcile-form-fields"
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
                  <label
                    for="exampleInput2"
                    class="text-black font-weight-bold"
                  >
                    Password
                  </label>
                  <input
                    class="form-field shadow w-100 reconcile-form-fields"
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
                  <label
                    for="exampleInput2"
                    class="text-black font-weight-bold"
                  >
                    Old Password
                  </label>
                  <input
                    class="form-field shadow w-100 reconcile-form-fields"
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

                <div>
                  <label htmlFor="file" className="cursor-pointer">
                    <span className="category-item shadow rounded-circle border bg-black">
                      <FiUpload className="category-item-icon m-auto text-white" />
                    </span>
                    <input
                      id="file"
                      type="file"
                      name="file"
                      accept="image/*"
                      className="d-none"
                      onChange={handleFileUpload}
                    />
                  </label>
                </div>

                <div class="col-sm-12 mt-4 d-flex justify-content-center align-items-center">
                  <button
                    class="text-center reconcile-form-sbmt font-14  py-2 px-5"
                    onClick={handleSubmit(onSubmit)}
                    // onClick={props.openStartReconcile}
                  >
                    {/*}  class={`text-center font-14 bg-green text-white py-2 px-5 mt-4 ${
              //     loading ? "button-disabled" : null
              //   }`}
              //   type="submit"
              //   disabled={submt}
              //   style={{ borderRadius: "10px" }}
              // >                                                                                
              //   {loading === true ? (
              //     <div
              //       class="spinner-border spinner-border-sm text-light mr-2"
              //       role="status"
              //     >
              //       <span class="sr-only font-16">Loading...</span>
              //     </div>
              //   ) : null}*/}
                    Update
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
