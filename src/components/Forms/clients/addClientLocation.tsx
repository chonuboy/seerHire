import React from "react";
import { useFormik } from "formik";
import { clientLocationFormValues } from "@/lib/models/client";
import { clientLocationSchema } from "@/lib/models/client";
import { Popup } from "../../Elements/cards/popup";
import { createClientLocation } from "@/api/client/locations";
import LocationAutocomplete from "../../Elements/utils/location-autocomplete";
import { Location as locations } from "@/lib/definitions";
import { toast } from "react-toastify";

const AddClientLocation = ({
  masterLocations,
  clientId,
  autoClose,
}: {
  clientId: number;
  autoClose: () => void;
  masterLocations: locations[];
}) => {
  const formik = useFormik<clientLocationFormValues>({
    initialValues: {
      pincode: "",
      address1: "",
      hrContactPerson: "",
      technicalPerson: "",
      hrMobileNumber: "",
      companyLandline: "",
      hrContactPersonEmail: "",
      state: { locationId: 0 },
      client: { clientId: clientId },
      cityId: { locationId: 0 },
    },
    validationSchema: clientLocationSchema,
    validateOnChange: true,
    
    onSubmit: async (values) => {
      try {
        createClientLocation(values)
          .then((data) => {
            console.log(data);
            if(data.status === 201) {
              
              toast.success("Branch added successfully", {
                position: "top-center",
              })
              autoClose();
            }
            if(data.message) {
              toast.error(data.message, {
                position: "top-right",
              })
            }
          })
          .catch((err) => {
            console.log(err);
          });
        // Handle success (show toast, redirect, etc.)
      } catch (error) {
        console.error("Form submission error", error);
        // Handle error (show error message)
      }
    },
  });
  const onChangeState = (location: locations) => {
    formik.setFieldValue("state", {locationId: location.locationId});
  };

  const addNewState = async (location: locations) => {
    if (masterLocations.includes(location)) {
      toast.error("Location already exists");
      return;
    }
    formik.setFieldValue("state", location);
    autoClose();
  };

  const onChangeCity = (location: locations) => {
    formik.setFieldValue("cityId", {locationId: location.locationId});
  };

  const addNewCity = async (location: locations) => {
    if (masterLocations.includes(location)) {
      toast.error("Location already exists");
      return;
    }
    formik.setFieldValue("cityId", location);
    autoClose();
  };

  return (
    <Popup onClose={() => autoClose()}>
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Company Information
        </h2>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* Address Section */}
          <div className="space-y-3">
            <label htmlFor="address1" className="font-semibold text-gray-600">
              Address <span className="font-bold text-red-500">*</span>
            </label>
            <input
              id="address1"
              name="address1"
              type="text"
              placeholder="Enter Address"
              onChange={formik.handleChange}
              value={formik.values.address1}
              className="w-full border border-gray-300 rounded-md p-2 dark:text-black"
            />
            {formik.touched.address1 && formik.errors.address1 && (
                <p className="mt-1 text-sm text-red-600">
                  {formik.errors.address1}
                </p>
              )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="h-auto space-y-4 rounded-lg">
              <label htmlFor="state" className="flex">
                <span className="font-semibold text-gray-600">State</span>
                <span className="px-1 font-bold text-red-500">*</span>
              </label>

              <LocationAutocomplete
                name="state"
                placeholder="Select State"
                value={formik.values.state.locationDetails ?? ""}
                onChange={onChangeState}
                options={masterLocations}
                onAdd={addNewState}
              ></LocationAutocomplete>
              {formik.touched.state?.locationId && formik.errors.state?.locationId && (
                <p className="mt-1 text-sm text-red-600">
                  {formik.errors.state?.locationId}
                </p>
              )}
            </div>

            <div className="h-auto space-y-3 rounded-lg">
              <label htmlFor="city" className="flex">
                <span className="font-semibold text-gray-600">City</span>
                <span className="px-1 font-bold text-red-500">*</span>
              </label>

              <LocationAutocomplete
                name="city"
                placeholder="Select City"
                value={formik.values.cityId.locationDetails ?? ""}
                onChange={onChangeCity}
                options={masterLocations}
                onAdd={addNewCity}
              ></LocationAutocomplete>
              {formik.touched.cityId?.locationId && formik.errors.cityId?.locationId && (
                <p className="mt-1 text-sm text-red-600">
                  {formik.errors.cityId?.locationId}
                </p>
              )}
            </div>

            <div className="space-y-3">
              <label htmlFor="pincode" className="font-semibold text-gray-600">
                Pincode <span className="font-bold text-red-500">*</span>
              </label>
              <input
                id="pincode"
                name="pincode"
                type="text"
                placeholder="Enter Pincode"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.pincode}
                className="py-2 px-2 w-full border rounded-lg focus:outline-[var(--theme-background)] dark:text-black"
              />
              {formik.touched.pincode && formik.errors.pincode && (
                <p className="mt-1 text-sm text-red-600">
                  {formik.errors.pincode}
                </p>
              )}
            </div>
          </div>

          {/* Contact Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <label
                htmlFor="hrContactPerson"
                className="font-semibold text-gray-600"
              >
                HR Contact Person{" "}
                <span className="font-bold text-red-500">*</span>
              </label>
              <input
                id="hrContactPerson"
                name="hrContactPerson"
                type="text"
                placeholder="Enter HR Contact Person Name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.hrContactPerson}
                className="py-2 px-2 w-full border rounded-lg focus:outline-[var(--theme-background)] dark:text-black"
              />
              {formik.touched.hrContactPerson &&
                formik.errors.hrContactPerson && (
                  <p className="mt-1 text-sm text-red-600">
                    {formik.errors.hrContactPerson}
                  </p>
                )}
            </div>

            <div className="space-y-3">
              <label
                htmlFor="technicalPerson"
                className="font-semibold text-gray-600"
              >
                Technical Person{" "}
                <span className="font-bold text-red-500">*</span>
              </label>
              <input
                id="technicalPerson"
                name="technicalPerson"
                type="text"
                placeholder="Enter Technical Person Name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.technicalPerson}
                className="py-2 px-2 w-full border rounded-lg focus:outline-[var(--theme-background)] dark:text-black"
              />
              {formik.touched.technicalPerson &&
                formik.errors.technicalPerson && (
                  <p className="mt-1 text-sm text-red-600">
                    {formik.errors.technicalPerson}
                  </p>
                )}
            </div>

            <div className="space-y-3">
              <label
                htmlFor="hrMobileNumber"
                className="font-semibold text-gray-600"
              >
                HR Mobile Number{" "}
                <span className="font-bold text-red-500">*</span>
              </label>
              <input
                id="hrMobileNumber"
                name="hrMobileNumber"
                type="text"
                placeholder="Enter HR Mobile Number"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.hrMobileNumber}
                className="py-2 px-2 w-full border rounded-lg focus:outline-[var(--theme-background)] dark:text-black"
              />
              {formik.touched.hrMobileNumber &&
                formik.errors.hrMobileNumber && (
                  <p className="mt-1 text-sm text-red-600">
                    {formik.errors.hrMobileNumber}
                  </p>
                )}
            </div>

            <div className="space-y-3">
              <label
                htmlFor="companyLandline"
                className="font-semibold text-gray-600"
              >
                Company Landline{" "}
                <span className="font-bold text-red-500">*</span>
              </label>
              <input
                id="companyLandline"
                name="companyLandline"
                type="text"
                placeholder="Enter Company Landline"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.companyLandline}
                className="py-2 px-2 w-full border rounded-lg focus:outline-[var(--theme-background)] dark:text-black"
              />
              {formik.touched.companyLandline &&
                formik.errors.companyLandline && (
                  <p className="mt-1 text-sm text-red-600">
                    {formik.errors.companyLandline}
                  </p>
                )}
            </div>

            <div className="space-y-3">
              <label
                htmlFor="hrContactPersonEmail"
                className="font-semibold text-gray-600"
              >
                HR Contact Email{" "}
                <span className="font-bold text-red-500">*</span>
              </label>
              <input
                id="hrContactPersonEmail"
                name="hrContactPersonEmail"
                type="email"
                placeholder="Enter HR Contact Email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.hrContactPersonEmail}
                className="py-2 px-2 w-full border rounded-lg focus:outline-[var(--theme-background)] dark:text-black"
              />
              {formik.touched.hrContactPersonEmail &&
                formik.errors.hrContactPersonEmail && (
                  <p className="mt-1 text-sm text-red-600">
                    {formik.errors.hrContactPersonEmail}
                  </p>
                )}
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center justify-center"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Add
                </button>
                <button
                  type="button"
                  onClick={() => {
                    formik.resetForm();
                    autoClose();
                  }}
                  className="flex-1 bg-red-500 text-white py-3 px-6 rounded-lg hover:bg-gray-300 transition duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 flex items-center justify-center"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  Cancel
                </button>
              </div>
        </form>
      </div>
    </Popup>
  );
};

export default AddClientLocation;
