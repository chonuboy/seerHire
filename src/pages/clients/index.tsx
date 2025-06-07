import MainLayout from "@/components/Layouts/layout";
import ContentHeader from "@/components/Layouts/content-header";
import ClientTable from "@/components/Elements/tables/clientTable";
import { ClientTableColumn } from "@/lib/models/client";
import { useEffect, useState } from "react";
import { fetchAllClients } from "@/api/master/clients";
import { createClient } from "@/api/master/clients";
import { Popup } from "@/components/Elements/cards/popup";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { clientValidationSchema } from "@/lib/models/client";
import { searchClient } from "@/api/master/clients";
import { fetchAllLocations, createLocation } from "@/api/master/masterLocation";
import { countryCodes } from "@/api/countryCodes";
import { Location } from "@/lib/definitions";
import LocationAutocomplete from "@/components/Elements/utils/location-autocomplete";

export default function Clients() {
  const [allClients, setClients] = useState();
  const [isClientAdded, setIsClientAdded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [clientFound, setClientFound] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showNewLocationForm, setShowNewLocationForm] = useState(false);
  const [newLocation, setNewLocation] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(countryCodes[0]);
  const [showGSTField, setShowGSTField] = useState(countryCodes[0].hasGST);
  const [displayedFinanceNumber, setDisplayedFinanceNumber] = useState("");
  const [locations, setLocations] = useState<Location[]>([]);
  const [locationAdded, setLocationAdded] = useState(false);
  const [isSearchMode, setIsSearchMode] = useState(false);

  useEffect(() => {
    if (!isSearchMode) {
      fetchAllClients(currentPage - 1, 10).then((data: any) => {
        setClients(data);
      });
    }
    fetchAllLocations().then((data: any) => {
      setLocations(data);
    });
  }, [currentPage, searchKeyword, locationAdded, isSearchMode]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);

    // If in search mode, perform search with new page
    if (isSearchMode && searchKeyword.trim()) {
      setIsLoading(true);
      searchClient(searchKeyword, newPage - 1).then((data) => {
        setIsLoading(false);
        if (data.status === "NOT_FOUND") {
          toast.error("No more clients found", {
            position: "top-center",
          });
        } else {
          setClients(data);
        }
      });
    }
  };

  const clearSearch = () => {
    setSearchKeyword("");
    setIsSearchMode(false);
    setCurrentPage(1);
    // Fetch all clients again
    fetchAllClients(0, 10).then((data: any) => {
      setClients(data);
    });
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

  const handleSearch = () => {
  if (!searchKeyword.trim()) {
    toast.error("Please Enter a Keyword", {
      position: "top-center",
    });
    return;
  }

  setIsLoading(true);
  setIsSearchMode(true); // Enter search mode
  setCurrentPage(1); // Reset to first page when performing new search

  searchClient(searchKeyword, currentPage - 1).then((data) => {
    setIsLoading(false);
    if (data.status === "NOT_FOUND") {
      toast.error(data.message, {
        position: "top-center",
      });
      setIsSearchMode(false); // Exit search mode if no results
    } else {
      setClientFound(false);
      setClients(data);
    }
  });
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

  const handleFinanceNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const mobilenumberWithoutCode = e.target.value.replace(/^\+?\d*\s?/, ""); // Remove any existing country code
    setDisplayedFinanceNumber(
      `${selectedCountry.dial_code} ${mobilenumberWithoutCode}`
    );
    formik.setFieldValue(
      "financeNumber",
      `${selectedCountry.dial_code}${mobilenumberWithoutCode}`
    );
  };

  const formik = useFormik({
    initialValues: {
      clientName: null,
      clientHeadQuarterCountry: {
        locationId: null,
        locationDetails: "",
      },
      clientHeadQuarterState: {
        locationId: null,
        locationDetails: "",
      },
      financePocName: null,
      financeNumber: null,
      financeEmail: null,
      gstnumber: null,
      cinnumber: null,
      pannumber: null,
      isClientBillingStateTamilNadu: false,
    },
    validationSchema: clientValidationSchema,
    validateOnMount: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      console.log(values);
      if (!values.clientHeadQuarterCountry.locationId) {
        toast.error("Please Select Headquarter Country", {
          position: "top-center",
        });
        return;
      }
      if (!values.clientHeadQuarterState.locationId) {
        toast.error("Please Select Headquarter State", {
          position: "top-center",
        });
        return;
      }

      if (
        values.clientHeadQuarterState.locationDetails === "Tamil Nadu" ||
        values.clientHeadQuarterState.locationDetails === "TamilNadu" ||
        values.clientHeadQuarterState.locationDetails === "Tamilnadu" ||
        values.clientHeadQuarterState.locationDetails === "tamilnadu"
      ) {
        formik.setFieldValue("isClientBillingStateTamilNadu", true);
      }
      try {
        createClient(values).then((data) => {
          if (data.status === 200) {
            toast.success("Client added successfully", {
              position: "top-center",
            });
            setIsClientAdded(false);
            fetchAllClients(currentPage - 1, 10).then((data: any) => {
              setClients(data);
            });
            formik.resetForm();
          }
          if (data.message) {
            toast.error(data.message, {
              position: "top-center",
            });
          }
        });
      } catch (err) {
        console.log(err);
      }
    },
  });

  return (
    <MainLayout>
      <ContentHeader title="Clients" />
      <div className="space-y-4 mb-4">
        <div className="space-y-4 mb-4">
          <input
            type="text"
            className="text-sm py-3 border bg-gray-50 w-full rounded-md font-sans dark:text-black px-2"
            placeholder="Search Clients By Name or Email or Phone"
            onChange={(e) => setSearchKeyword(e.target.value)}
            value={searchKeyword}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <div className="flex justify-between items-center">
            <div>
              <button
                className="bg-blue-500 text-white px-4 py-1 rounded-md border-2 border-blue-500 hover:bg-white hover:text-blue-500 hover:shadow-lg transition duration-200 box-border mr-2"
                onClick={handleSearch}
              >
                Search
              </button>
              {isSearchMode && (
                <button
                  className="bg-gray-500 text-white px-4 py-1 rounded-md border-2 border-gray-500 hover:bg-white hover:text-gray-500 hover:shadow-lg transition duration-200 box-border"
                  onClick={clearSearch}
                >
                  Clear
                </button>
              )}
            </div>
            <button
              className="bg-blue-500 text-white px-4 py-1 rounded-md border-2 border-blue-500 hover:bg-white hover:text-blue-500 hover:shadow-lg transition duration-200 box-border"
              onClick={() => setIsClientAdded(true)}
            >
              Add New Client
            </button>
          </div>
        </div>

        {isLoading && (
          <div>
            <Popup onClose={() => setIsLoading(false)}>
              <div className="flex mx-auto items-center justify-center flex-col my-80">
                <div>
                  <div className="ml-4 w-10 h-10 rounded-full border-white border-4 border-t-blue-600 animate-spin" />
                  <span className="text-white">Searching</span>
                </div>
              </div>
            </Popup>
          </div>
        )}

        {isClientAdded && (
          <Popup onClose={() => setIsClientAdded(false)}>
            <div className="bg-white shadow-lg rounded-xl mx-auto mt-14 max-w-2xl p-6">
              <div className="border-b border-gray-200 pb-4 mb-6">
                <h2 className="text-xl font-bold text-gray-800">
                  Add New Client
                </h2>
              </div>

              <form className="space-y-6" onSubmit={formik.handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                  {/* Client Name */}
                  <div>
                    <label
                      htmlFor="clientName"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Client Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="clientName"
                      name="clientName"
                      type="text"
                      className="py-2 px-2 w-full border rounded-lg focus:outline-[var(--theme-background)]"
                      placeholder="Enter client name"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.clientName}
                    />
                    {formik.touched.clientName && formik.errors.clientName ? (
                      <div className="text-red-500 text-xs mt-1">
                        {formik.errors.clientName}
                      </div>
                    ) : null}
                  </div>

                  {/* Client HO Country (Location) */}
                  <div className="h-auto rounded-lg">
                    <label htmlFor="clientHeadQuarterCountry" className="flex">
                      <span className="block text-sm font-medium text-gray-700 mb-1">
                        HeadQuarters Country
                      </span>
                      <span className="px-1 font-bold text-red-500">*</span>
                    </label>

                    <LocationAutocomplete
                      name="clientHeadQuarterCountry"
                      placeholder="Enter Headquarter Country"
                      value={
                        formik.values.clientHeadQuarterCountry
                          .locationDetails ?? ""
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
                      <span className="px-1 font-bold text-red-500">*</span>
                    </label>

                    <LocationAutocomplete
                      name="clientHeadQuarterState"
                      placeholder="Enter Headquarter State"
                      value={
                        formik.values.clientHeadQuarterState.locationDetails
                      }
                      onChange={onChangeStateLocation}
                      options={locations}
                      onAdd={addNewStateLocation}
                    ></LocationAutocomplete>
                    {formik.errors.clientHeadQuarterState?.locationDetails ? (
                      <div className="text-red-500 text-sm border-red-500">
                        {formik.errors.clientHeadQuarterState.locationDetails}
                      </div>
                    ) : null}
                  </div>

                  {/* Finance POC */}
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
                      className="py-2 px-2 w-full border rounded-lg focus:outline-[var(--theme-background)]"
                      placeholder="Enter contact name"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.financePocName}
                    />
                    {formik.touched.financePocName &&
                    formik.errors.financePocName ? (
                      <div className="text-red-500 text-xs mt-1">
                        {formik.errors.financePocName}
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
                    <div className="flex">
                      <select
                        id="country"
                        name="country"
                        className="inline-flex items-center py-2 outline-none rounded-l-md border border-r-0 text-gray-500 text-sm"
                        value={selectedCountry.code}
                        onChange={handleCountryChange}
                      >
                        {countryCodes.map((country) => (
                          <option key={country.code} value={country.code}>
                            {country.dial_code} ({country.code})
                          </option>
                        ))}
                      </select>
                      <input
                        id="financeNumber"
                        name="financeNumber"
                        type="text"
                        className="py-2 px-2 w-full border-l-0 border rounded-r-md focus:outline-[var(--theme-background)]"
                        placeholder="Enter contact number"
                        value={displayedFinanceNumber
                          .replace(selectedCountry.dial_code, "")
                          .trim()}
                        onChange={(e) => {
                          const mobilenumberWithoutCode = e.target.value;
                          setDisplayedFinanceNumber(
                            `${mobilenumberWithoutCode}`
                          );
                          formik.setFieldValue(
                            "financeNumber",
                            `${selectedCountry.dial_code}${mobilenumberWithoutCode}`
                          );
                        }}
                        onBlur={formik.handleBlur}
                      />
                    </div>
                    {formik.touched.financeNumber &&
                    formik.errors.financeNumber ? (
                      <div className="text-red-500 text-xs mt-1">
                        {formik.errors.financeNumber}
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
                      className="py-2 px-2 w-full border rounded-lg focus:outline-[var(--theme-background)]"
                      placeholder="email@example.com"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.financeEmail}
                    />
                    {formik.touched.financeEmail &&
                    formik.errors.financeEmail ? (
                      <div className="text-red-500 text-xs mt-1">
                        {formik.errors.financeEmail}
                      </div>
                    ) : null}
                  </div>

                  {/* GST - Only show if country has GST */}
                  {showGSTField && (
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
                        className="py-2 px-2 w-full border rounded-lg focus:outline-[var(--theme-background)]"
                        placeholder={`Enter ${selectedCountry.name} GST number`}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.gstnumber}
                      />
                      {formik.touched.gstnumber && formik.errors.gstnumber ? (
                        <div className="text-red-500 text-xs mt-1">
                          {formik.errors.gstnumber}
                        </div>
                      ) : null}
                    </div>
                  )}

                  {/* CIN */}
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
                      className="py-2 px-2 w-full border rounded-lg focus:outline-[var(--theme-background)]"
                      placeholder="Enter CIN number"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.cinnumber}
                    />
                    {formik.touched.cinnumber && formik.errors.cinnumber ? (
                      <div className="text-red-500 text-xs mt-1">
                        {formik.errors.cinnumber}
                      </div>
                    ) : null}
                  </div>

                  {/* PAN */}
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
                      className="py-2 px-2 w-full border rounded-lg focus:outline-[var(--theme-background)]"
                      placeholder="Enter PAN number"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.pannumber}
                    />
                    {formik.touched.pannumber && formik.errors.pannumber ? (
                      <div className="text-red-500 text-xs mt-1">
                        {formik.errors.pannumber}
                      </div>
                    ) : null}
                  </div>
                </div>

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
                      setIsClientAdded(false);
                      formik.resetForm();
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
        )}
      </div>

      {allClients ? (
        <ClientTable
          clientTableData={allClients}
          clientTableColumns={ClientTableColumn}
          onPageChange={handlePageChange}
          currentPage={currentPage}
        />
      ) : (
        <p className="p-2">Loading Clients...</p>
      )}
    </MainLayout>
  );
}
