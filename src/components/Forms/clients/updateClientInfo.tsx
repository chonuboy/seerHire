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
  locations?: any;
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
    <div className="min-h-screen py-8 px-4 mt-8">
      <div className="bg-white shadow-lg rounded-2xl mx-auto max-w-4xl">
        {/* Header */}
        <div className="px-8 py-6 border-b border-gray-200 flex items-center gap-2">
          <svg
            className="w-6 h-6 mr-2 text-blue-600"
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
          <h1 className="text-2xl font-bold text-gray-900">Update Client</h1>
        </div>

        <form className="p-8" onSubmit={formik.handleSubmit}>
          {/* Basic Details Section */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-cyan-500 mb-8">
              Location Details
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-6">
              {/* Country (Headquarter) */}
              <div>
                <label
                  htmlFor="clientHeadQuarterCountry"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Country (Headquarter)
                </label>
                <LocationAutocomplete
                  name="clientHeadQuarterCountry"
                  placeholder="Select country"
                  styleMod="w-full px-0 py-1 border-0 border-b border-gray-300 focus:ring-0 text-sm placeholder-gray-400 rounded-none"
                  value={
                    formik.values.clientHeadQuarterCountry.locationDetails ?? ""
                  }
                  onChange={onChangeHeadLocation}
                  options={locations}
                  onAdd={addNewHeadLocation}
                />
              </div>

              {/* State (Headquarter) */}
              <div>
                <label
                  htmlFor="clientHeadQuarterState"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  State (Headquarter)
                </label>
                <LocationAutocomplete
                  name="clientHeadQuarterState"
                  styleMod="w-full px-0 py-1 border-0 border-b border-gray-300 focus:ring-0 text-sm placeholder-gray-400 rounded-none"
                  placeholder="Select state"
                  value={formik.values.clientHeadQuarterState.locationDetails}
                  onChange={onChangeStateLocation}
                  options={locations}
                  onAdd={addNewStateLocation}
                />
              </div>
            </div>
          </div>

          {/* Contact Details Section */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-cyan-500 mb-8">
              Contact Details
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Finance Person Name */}
              <div>
                <label
                  htmlFor="financePocName"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Finance Person Name
                </label>
                <input
                  id="financePocName"
                  name="financePocName"
                  type="text"
                  className="w-full px-0 py-1 border-0 border-b border-gray-300 focus:border-blue-500 focus:ring-0 text-sm placeholder-gray-400 focus:outline-none"
                  placeholder="Enter full name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.financePocName}
                />
                {formik.touched.financePocName &&
                formik.errors.financePocName ? (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.financePocName.toString()}
                  </div>
                ) : null}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="financeEmail"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Email
                </label>
                <input
                  id="financeEmail"
                  name="financeEmail"
                  type="email"
                  className="w-full px-0 py-1 border-0 border-b border-gray-300 focus:border-blue-500 focus:ring-0 text-sm placeholder-gray-400 focus:outline-none"
                  placeholder="abc@acme.com"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.financeEmail}
                />
                {formik.touched.financeEmail && formik.errors.financeEmail ? (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.financeEmail.toString()}
                  </div>
                ) : null}
              </div>

              {/* Contact Number */}
              <div>
                <label
                  htmlFor="financeNumber"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Contact Number
                </label>
                <input
                  id="financeNumber"
                  name="financeNumber"
                  type="text"
                  className="w-full px-0 py-1 border-0 border-b border-gray-300 focus:border-blue-500 focus:ring-0 text-sm placeholder-gray-400 focus:outline-none"
                  placeholder="9876543340"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.financeNumber}
                />
                {formik.touched.financeNumber && formik.errors.financeNumber ? (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.financeNumber.toString()}
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          {/* Billing Details Section */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-cyan-500 mb-8">
              Billing Details
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* CIN Number */}
              <div>
                <label
                  htmlFor="cinnumber"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  CIN Number
                </label>
                <input
                  id="cinnumber"
                  name="cinnumber"
                  type="text"
                  className="w-full px-0 py-1 border-0 border-b border-gray-300 focus:border-blue-500 focus:ring-0 text-sm placeholder-gray-400 focus:outline-none"
                  placeholder="56P-XXX-XXXX"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.cinnumber}
                />
                {formik.touched.cinnumber && formik.errors.cinnumber ? (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.cinnumber.toString()}
                  </div>
                ) : null}
              </div>

              {/* PAN Number */}
              <div>
                <label
                  htmlFor="pannumber"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  PAN Number
                </label>
                <input
                  id="pannumber"
                  name="pannumber"
                  type="text"
                  className="w-full px-0 py-1 border-0 border-b border-gray-300 focus:border-blue-500 focus:ring-0 text-sm placeholder-gray-400 focus:outline-none"
                  placeholder="AQYXXX9O"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.pannumber}
                />
                {formik.touched.pannumber && formik.errors.pannumber ? (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.pannumber.toString()}
                  </div>
                ) : null}
              </div>

              {/* GST Number */}
              <div>
                <label
                  htmlFor="gstnumber"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  GST Number
                </label>
                <input
                  id="gstnumber"
                  name="gstnumber"
                  type="text"
                  className="w-full px-0 py-1 border-0 border-b border-gray-300 focus:border-blue-500 focus:ring-0 text-sm placeholder-gray-400 focus:outline-none"
                  placeholder="1234-XXX-XXX-XX56"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.gstnumber}
                />
                {formik.touched.gstnumber && formik.errors.gstnumber ? (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.gstnumber.toString()}
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6 justify-end">
            <button
              type="button"
              onClick={autoClose}
              className="flex-1 sm:flex-none sm:px-8 py-2 border-2 border-cyan-500 text-cyan-500 rounded-lg hover:bg-cyan-50 transition-colors duration-200 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 sm:flex-none sm:px-8 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors duration-200 font-medium"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
