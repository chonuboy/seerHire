import React from "react";
import { useFormik } from "formik";
import { clientLocationFormValues } from "@/lib/models/client";
import { clientLocationSchema } from "@/lib/models/client";
import { Popup } from "@/components/Elements/cards/popup";
import { updateClientLocation } from "@/api/client/locations";
import LocationAutocomplete from "@/components/Elements/utils/location-autocomplete";
import { Location as locations } from "@/lib/definitions";
import { toast } from "react-toastify";

const UpdateClientLocation = ({
  currentClientLocation,
  masterLocations,
  locationId,
  autoClose,
}: {
  locationId: number;
  autoClose: () => void;
  masterLocations: locations[];
  currentClientLocation: any;
}) => {
  const getUpdatedFields = (initialValues: any, values: any) => {
    return Object.keys(values).reduce((acc: Record<string, any>, key) => {
      if (values[key] !== initialValues[key]) {
        acc[key] = values[key];
      }
      return acc;
    }, {});
  };
  const formik = useFormik<clientLocationFormValues>({
    initialValues: currentClientLocation,
    validationSchema: clientLocationSchema,
    validateOnChange: true,
    validateOnBlur: true,

    onSubmit: async (values) => {
      console.log(currentClientLocation)
      const updatedFields = getUpdatedFields(currentClientLocation, values);
      console.log(updatedFields);
      try {
        updateClientLocation(locationId, updatedFields).then((data) => {
          console.log(data);
          if (data.status === 200) {
            toast.success("Branch updated successfully", {
              position: "top-right",
            });
            autoClose();
          } else {
            toast.error(data.message, {
              position: "top-right",
            });
          }
        });
      } catch (error) {
        console.error("Form submission error", error);
      }
    },
  });
  const onChangeState = (location: locations) => {
    formik.setFieldValue("state", { locationId: location.locationId });
  };

  const UpdateNewState = async (location: locations) => {
    if (masterLocations.includes(location)) {
      toast.error("Location already exists");
      return;
    }
    formik.setFieldValue("state", location);
    autoClose();
  };

  const onChangeCity = (location: locations) => {
    formik.setFieldValue("cityId", {
      locationId: location.locationId,
      locationDetails: location.locationDetails,
    });
  };

  const UpdateNewCity = async (location: locations) => {
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
          <div className="px-8 py-6 border-b border-gray-200 flex items-center gap-2">
            <svg
              className="w-6 h-6 text-cyan-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
            <h1 className="text-2xl font-bold text-gray-900">Update Branch</h1>
          </div>

          <form className="p-8" onSubmit={formik.handleSubmit}>
            {/* Address Section */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-cyan-500 mb-8">
                Address Details
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-6">
                {/* State */}
                <div>
                  <label
                    htmlFor="state"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    State
                  </label>
                  <LocationAutocomplete
                    name="state"
                    id="state"
                    placeholder="Select State"
                    styleMod="w-full px-0 py-1 border-0 border-b border-gray-300 focus:ring-0 text-sm placeholder-gray-400 rounded-none"
                    value={formik.values.state?.locationDetails ?? ""}
                    onChange={onChangeState}
                    options={masterLocations}
                    onAdd={UpdateNewState}
                  />
                </div>

                {/* City */}
                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    City
                  </label>
                  <LocationAutocomplete
                    name="city"
                    id="city"
                    placeholder="Select City"
                    styleMod="w-full px-0 py-1 border-0 border-b border-gray-300 focus:ring-0 text-sm placeholder-gray-400 rounded-none"
                    value={formik.values.cityId?.locationDetails ?? ""}
                    onChange={onChangeCity}
                    options={masterLocations}
                    onAdd={UpdateNewCity}
                  />
                </div>

                {/* Address */}
                <div>
                  <label
                    htmlFor="address1"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Address
                  </label>
                  <input
                    id="address1"
                    name="address1"
                    type="text"
                    className="w-full px-0 py-1 border-0 border-b border-gray-300 focus:border-blue-500 focus:ring-0 text-sm placeholder-gray-400 focus:outline-none"
                    placeholder="Enter Address"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
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
                    Pincode
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
                    HR Contact Person
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
                    Technical Person
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
                    HR Mobile Number
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
                    Company Landline
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
                    HR Contact Email
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

export default UpdateClientLocation;
