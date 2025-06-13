import LocationAutocomplete from "@/components/Elements/utils/location-autocomplete";
import { Location } from "@/lib/definitions";
import { toast } from "react-toastify";
import { useState } from "react";
import { countryCodes } from "@/api/countryCodes";

const AddClient = ({
  formik,
  locations,
  autoClose,
}: {
  formik: any;
  locations: any;
  autoClose: () => void;
}) => {
  const [selectedCountry, setSelectedCountry] = useState(countryCodes[0]);
  const [showGSTField, setShowGSTField] = useState(countryCodes[0].hasGST);
  const [displayedFinanceNumber, setDisplayedFinanceNumber] = useState("");

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

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const country =
      countryCodes.find((c) => c.code === e.target.value) || countryCodes[0];
    setSelectedCountry(country);
    setShowGSTField(country.hasGST);

    // If country doesn't have GST, clear the GST field
    if (!country.hasGST) {
      formik.setFieldValue("gstnumber", "");
    }
  };
  return (
    <div className="min-h-screen py-8 px-4 mt-4">
      <div className="bg-white shadow-lg rounded-2xl mx-auto max-w-4xl">
        {/* Header */}
        <div className="px-8 py-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">Add New Client</h1>
        </div>

        <form className="p-8" onSubmit={formik.handleSubmit}>
          {/* Basic Details Section */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-cyan-500 mb-8">
              Basic Details
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-6">
              {/* Client Name */}
              <div className="lg:col-span-2">
                <label
                  htmlFor="clientName"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Client Name
                  {/* <span className="text-red-500">*</span> */}
                </label>
                <input
                  id="clientName"
                  name="clientName"
                  type="text"
                  className="w-full px-0 py-1 border-0 border-b border-gray-300 focus:border-blue-500 focus:ring-0 text-sm placeholder-gray-400 focus:outline-none"
                  placeholder="Enter client name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.clientName}
                />
                {formik.touched.clientName && formik.errors.clientName ? (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.clientName}
                  </div>
                ) : null}
              </div>

              {/* Country (Headquarter) */}
              <div>
                <label
                  htmlFor="clientHeadQuarterCountry"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Country (Headquarter) <span className="text-red-500">*</span>
                </label>
                <LocationAutocomplete
                  name="clientHeadQuarterCountry"
                  id="clientHeadQuarterCountry"
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
                  State (Headquarter) <span className="text-red-500">*</span>
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
                {formik.errors.clientHeadQuarterState?.locationDetails ? (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.clientHeadQuarterState.locationDetails}
                  </div>
                ) : null}
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
              <div className="lg:col-span-2">
                <label
                  htmlFor="financePocName"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Finance Person Name{" "}
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
                    {formik.errors.financePocName}
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
                    {formik.errors.financeEmail}
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
                <div className="flex">
                  <select
                    id="country"
                    name="country"
                    className="w-16 px-0 py-1 border-0 border-b border-gray-300 focus:border-blue-500 focus:ring-0 text-sm placeholder-gray-400 focus:outline-none text-gray-700"
                    value={selectedCountry.code}
                    onChange={handleCountryChange}
                  >
                    {countryCodes.map((country) => (
                      <option key={country.code} value={country.code}>
                        {country.dial_code}
                      </option>
                    ))}
                  </select>
                  <input
                    id="financeNumber"
                    name="financeNumber"
                    type="text"
                    className="w-full px-0 py-1 border-0 border-b border-gray-300 focus:border-blue-500 focus:ring-0 text-sm placeholder-gray-400 focus:outline-none"
                    placeholder="9876543340"
                    value={displayedFinanceNumber
                      .replace(selectedCountry.dial_code, "")
                      .trim()}
                    onChange={(e) => {
                      const mobilenumberWithoutCode = e.target.value;
                      setDisplayedFinanceNumber(`${mobilenumberWithoutCode}`);
                      formik.setFieldValue(
                        "financeNumber",
                        `${selectedCountry.dial_code}${mobilenumberWithoutCode}`
                      );
                    }}
                    onBlur={formik.handleBlur}
                  />
                </div>
                {formik.touched.financeNumber && formik.errors.financeNumber ? (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.financeNumber}
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
                    {formik.errors.cinnumber}
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
                    {formik.errors.pannumber}
                  </div>
                ) : null}
              </div>

              {/* GST Number */}
              {showGSTField && (
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
                      {formik.errors.gstnumber}
                    </div>
                  ) : null}
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6 justify-end">
            <button
              type="button"
              onClick={() => {
                autoClose();
                formik.resetForm();
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
  );
}

export default AddClient;
