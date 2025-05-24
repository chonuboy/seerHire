"use client";

import { useFormik } from "formik";
import { clientFormSchema } from "@/lib/models/client";
import { updateClient } from "@/api/master/clients";
import { toast } from "react-toastify";
import LocationAutocomplete from "@/components/Elements/utils/location-autocomplete";
import { Location } from "@/lib/definitions";

export default function ClientInfoUpdateForm({
  currentClient,
  id,
  autoClose,
  locations,
}: {
  currentClient: any;
  id: number;
  autoClose: () => void;
  locations?:any;
}) {
  const getUpdatedFields = (initialValues: any, values: any) => {
    return Object.keys(values).reduce((acc: Record<string, any>, key) => {
      if (values[key] !== initialValues[key]) {
        acc[key] = values[key];
      }
      return acc;
    }, {});
  };

  const onChangeHeadLocation = (location: Location) => {
    formik.setFieldValue("clientHeadQuarterCountry", {
      locationId: location.locationId,
    });
  };

  const addNewHeadLocation = async (location: Location) => {
    if (locations.includes(location)) {
      toast.error("Location already exists");
      return;
    }
    formik.setFieldValue("clientHeadQuarterCountry", location);
  };

  const onChangeStateLocation = (location: Location) => {
    formik.setFieldValue("clientHeadQuarterState", {
      locationId: location.locationId,
      locationDetails: location.locationDetails,
    });
  };

  const addNewStateLocation = async (location: Location) => {
    if (locations.includes(location)) {
      toast.error("Location already exists");
      return;
    }
    formik.setFieldValue("clientHeadQuarterState", location);
  };

  const formik = useFormik({
    initialValues: currentClient,
    validationSchema: clientFormSchema,
    onSubmit: (values) => {
      const updatedFields = getUpdatedFields(currentClient, values);
      console.log(updatedFields);
      try {
        updateClient(id, updatedFields).then((data) => {
          console.log(data);
          if (data.status === 200) {
            toast.success("Client updated successfully", {
              position: "top-right",
            });
            autoClose();
          } else {
            toast.error(data.message, {
              position: "top-right",
            });
          }
        });
      } catch (error: any) {
        console.log(error);
      }
    },
  });

  return (
    <div className="bg-white rounded-xl shadow-lg max-w-3xl mx-auto p-6 mt-14">
      <div className="border-b border-gray-200 pb-4 mb-6">
        <h2 className="text-xl font-bold text-gray-800">Update Client</h2>
      </div>

      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
          <div className="h-auto rounded-lg">
            <label htmlFor="clientHeadQuarterCountry" className="flex">
              <span className="block text-sm font-medium text-gray-700 mb-1">
                HeadQuarters Country
              </span>
            </label>

            <LocationAutocomplete
              name="clientHeadQuarterCountry"
              placeholder="Enter Headquarter Country"
              value={
                formik.values.clientHeadQuarterCountry.locationDetails ?? ""
              }
              onChange={onChangeHeadLocation}
              options={locations}
              onAdd={addNewHeadLocation}
            ></LocationAutocomplete>
          </div>

          {/* Client HO State (Location) */}

          <div className="h-auto rounded-lg">
            <label htmlFor="clientHeadQuarterState" className="flex">
              <span className="block text-sm font-medium text-gray-700 mb-1">
                HeadQuarters State
              </span>
            </label>

            <LocationAutocomplete
              name="clientHeadQuarterState"
              placeholder="Enter Headquarter State"
              value={formik.values.clientHeadQuarterState.locationDetails}
              onChange={onChangeStateLocation}
              options={locations}
              onAdd={addNewStateLocation}
            ></LocationAutocomplete>
          </div>

          {/* Finance Information Section */}
          <div className="md:col-span-2 mt-2">
            <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-1">
              Finance Contact Information
            </h3>
          </div>

          {/* Finance POC Name */}
          <div>
            <label
              htmlFor="financePocName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Finance Point of Contact
            </label>
            <input
              id="financePocName"
              name="financePocName"
              type="text"
              value={formik.values.financePocName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all dark:text-black"
              placeholder="Enter contact name"
            />
            {formik.touched.financePocName && formik.errors.financePocName ? (
              <div className="text-red-500 text-xs mt-1">
                {formik.errors.financePocName.toString()}
              </div>
            ) : null}
          </div>

          {/* Finance Number */}
          <div>
            <label
              htmlFor="financeNumber"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Finance Contact Number
            </label>
            <input
              id="financeNumber"
              name="financeNumber"
              type="text"
              value={formik.values.financeNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all dark:text-black"
              placeholder="Enter contact number"
            />
            {formik.touched.financeNumber && formik.errors.financeNumber ? (
              <div className="text-red-500 text-xs mt-1">
                {formik.errors.financeNumber.toString()}
              </div>
            ) : null}
          </div>

          {/* Finance Email */}
          <div>
            <label
              htmlFor="financeEmail"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Finance Email Address
            </label>
            <input
              id="financeEmail"
              name="financeEmail"
              type="email"
              value={formik.values.financeEmail}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all dark:text-black"
              placeholder="email@example.com"
            />
            {formik.touched.financeEmail && formik.errors.financeEmail ? (
              <div className="text-red-500 text-xs mt-1">
                {formik.errors.financeEmail.toString()}
              </div>
            ) : null}
          </div>

          {/* Legal Information Section */}
          <div className="md:col-span-2 mt-2">
            <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-1">
              Legal Information
            </h3>
          </div>

          {/* GST Number */}
          <div>
            <label
              htmlFor="gstnumber"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              GST Number
            </label>
            <input
              id="gstnumber"
              name="gstnumber"
              type="text"
              value={formik.values.gstnumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all dark:text-black"
              placeholder="Enter GST number"
            />
            {formik.touched.gstnumber && formik.errors.gstnumber ? (
              <div className="text-red-500 text-xs mt-1">
                {formik.errors.gstnumber.toString()}
              </div>
            ) : null}
          </div>

          {/* CIN Number */}
          <div>
            <label
              htmlFor="cinnumber"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              CIN Number
            </label>
            <input
              id="cinnumber"
              name="cinnumber"
              type="text"
              value={formik.values.cinnumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all dark:text-black"
              placeholder="Enter CIN number"
            />
            {formik.touched.cinnumber && formik.errors.cinnumber ? (
              <div className="text-red-500 text-xs mt-1">
                {formik.errors.cinnumber.toString()}
              </div>
            ) : null}
          </div>

          {/* PAN Number */}
          <div>
            <label
              htmlFor="pannumber"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              PAN Number
            </label>
            <input
              id="pannumber"
              name="pannumber"
              type="text"
              value={formik.values.pannumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all dark:text-black"
              placeholder="Enter PAN number"
            />
            {formik.touched.pannumber && formik.errors.pannumber ? (
              <div className="text-red-500 text-xs mt-1">
                {formik.errors.pannumber.toString()}
              </div>
            ) : null}
          </div>
        </div>

        {/* Submit and Cancel Buttons */}
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
            Update
          </button>
          <button
            type="button"
            onClick={autoClose}
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
  );
}
