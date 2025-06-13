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
            if (data.status === 201) {
              toast.success("Branch added successfully", {
                position: "top-center",
              });
              autoClose();
            }
            if (data.message) {
              toast.error(data.message, {
                position: "top-right",
              });
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
    formik.setFieldValue("state", { locationId: location.locationId });
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
    formik.setFieldValue("cityId", { locationId: location.locationId });
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
      <div className="min-h-screen py-8 px-4 mt-8">
        <div className="bg-white shadow-lg rounded-2xl mx-auto max-w-4xl">
          {/* Header */}
          <div className="px-8 py-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">Add New Branch</h1>
          </div>

          <form className="p-8" onSubmit={formik.handleSubmit}>
            {/* Address Section */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-cyan-500 mb-8">
                Address Details
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-6">
                {/* Address Line 1 */}
                <div>
                  <label
                    htmlFor="address1"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="address1"
                    name="address1"
                    type="text"
                    className="w-full px-0 py-1 border-0 border-b border-gray-300 focus:border-blue-500 focus:ring-0 text-sm placeholder-gray-400 focus:outline-none"
                    placeholder="Enter Address"
                    onChange={formik.handleChange}
                    value={formik.values.address1}
                  />
                  {formik.touched.address1 && formik.errors.address1 && (
                    <div className="text-red-500 text-sm mt-1">
                      {formik.errors.address1}
                    </div>
                  )}
                </div>

                {/* Pincode */}
                <div>
                  <label
                    htmlFor="pincode"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Pincode <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="pincode"
                    name="pincode"
                    type="text"
                    className="w-full px-0 py-1 border-0 border-b border-gray-300 focus:border-blue-500 focus:ring-0 text-sm placeholder-gray-400 focus:outline-none"
                    placeholder="Enter Pincode"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.pincode}
                  />
                  {formik.touched.pincode && formik.errors.pincode && (
                    <div className="text-red-500 text-sm mt-1">
                      {formik.errors.pincode}
                    </div>
                  )}
                </div>

                {/* State */}
                <div>
                  <label
                    htmlFor="state"
                    aria-labelledby="state"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    State <span className="text-red-500">*</span>
                  </label>
                  <LocationAutocomplete
                    id="state"
                    name="state"
                    placeholder="Select State"
                    styleMod="w-full px-0 py-1 border-0 border-b border-gray-300 focus:ring-0 text-sm placeholder-gray-400 rounded-none"
                    value={formik.values.state.locationDetails ?? ""}
                    onChange={onChangeState}
                    options={masterLocations}
                    onAdd={addNewState}
                  />
                  {formik.touched.state?.locationId &&
                    formik.errors.state?.locationId && (
                      <div className="text-red-500 text-sm mt-1">
                        {formik.errors.state?.locationId}
                      </div>
                    )}
                </div>

                {/* City */}
                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    City <span className="text-red-500">*</span>
                  </label>
                  <LocationAutocomplete
                    name="city"
                    id="city"
                    placeholder="Select City"
                    styleMod="w-full px-0 py-1 border-0 border-b border-gray-300 focus:ring-0 text-sm placeholder-gray-400 rounded-none"
                    value={formik.values.cityId.locationDetails ?? ""}
                    onChange={onChangeCity}
                    options={masterLocations}
                    onAdd={addNewCity}
                  />
                  {formik.touched.cityId?.locationId &&
                    formik.errors.cityId?.locationId && (
                      <div className="text-red-500 text-sm mt-1">
                        {formik.errors.cityId?.locationId}
                      </div>
                    )}
                </div>
              </div>
            </div>

            {/* Contact Section */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-cyan-500 mb-8">
                Contact Details
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* HR Contact Person */}
                <div>
                  <label
                    htmlFor="hrContactPerson"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    HR Contact Person <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="hrContactPerson"
                    name="hrContactPerson"
                    type="text"
                    className="w-full px-0 py-1 border-0 border-b border-gray-300 focus:border-blue-500 focus:ring-0 text-sm placeholder-gray-400 focus:outline-none"
                    placeholder="Enter HR Contact Person Name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.hrContactPerson}
                  />
                  {formik.touched.hrContactPerson &&
                    formik.errors.hrContactPerson && (
                      <div className="text-red-500 text-sm mt-1">
                        {formik.errors.hrContactPerson}
                      </div>
                    )}
                </div>

                {/* Technical Person */}
                <div>
                  <label
                    htmlFor="technicalPerson"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Technical Person <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="technicalPerson"
                    name="technicalPerson"
                    type="text"
                    className="w-full px-0 py-1 border-0 border-b border-gray-300 focus:border-blue-500 focus:ring-0 text-sm placeholder-gray-400 focus:outline-none"
                    placeholder="Enter Technical Person Name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.technicalPerson}
                  />
                  {formik.touched.technicalPerson &&
                    formik.errors.technicalPerson && (
                      <div className="text-red-500 text-sm mt-1">
                        {formik.errors.technicalPerson}
                      </div>
                    )}
                </div>

                {/* HR Mobile Number */}
                <div>
                  <label
                    htmlFor="hrMobileNumber"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    HR Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="hrMobileNumber"
                    name="hrMobileNumber"
                    type="text"
                    className="w-full px-0 py-1 border-0 border-b border-gray-300 focus:border-blue-500 focus:ring-0 text-sm placeholder-gray-400 focus:outline-none"
                    placeholder="Enter HR Mobile Number"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.hrMobileNumber}
                  />
                  {formik.touched.hrMobileNumber &&
                    formik.errors.hrMobileNumber && (
                      <div className="text-red-500 text-sm mt-1">
                        {formik.errors.hrMobileNumber}
                      </div>
                    )}
                </div>

                {/* Company Landline */}
                <div>
                  <label
                    htmlFor="companyLandline"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Company Landline <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="companyLandline"
                    name="companyLandline"
                    type="text"
                    className="w-full px-0 py-1 border-0 border-b border-gray-300 focus:border-blue-500 focus:ring-0 text-sm placeholder-gray-400 focus:outline-none"
                    placeholder="Enter Company Landline"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.companyLandline}
                  />
                  {formik.touched.companyLandline &&
                    formik.errors.companyLandline && (
                      <div className="text-red-500 text-sm mt-1">
                        {formik.errors.companyLandline}
                      </div>
                    )}
                </div>

                {/* HR Contact Email */}
                <div>
                  <label
                    htmlFor="hrContactPersonEmail"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    HR Contact Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="hrContactPersonEmail"
                    name="hrContactPersonEmail"
                    type="email"
                    className="w-full px-0 py-1 border-0 border-b border-gray-300 focus:border-blue-500 focus:ring-0 text-sm placeholder-gray-400 focus:outline-none"
                    placeholder="Enter HR Contact Email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.hrContactPersonEmail}
                  />
                  {formik.touched.hrContactPersonEmail &&
                    formik.errors.hrContactPersonEmail && (
                      <div className="text-red-500 text-sm mt-1">
                        {formik.errors.hrContactPersonEmail}
                      </div>
                    )}
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 justify-end">
              <button
                type="button"
                onClick={() => {
                  formik.resetForm();
                  autoClose();
                }}
                className="flex-1 sm:flex-none sm:px-8 py-2 border-2 border-cyan-500 text-cyan-500 rounded-lg hover:bg-cyan-50 transition-colors duration-200 font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 sm:flex-none sm:px-8 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors duration-200 font-medium"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </Popup>
  );
};

export default AddClientLocation;
