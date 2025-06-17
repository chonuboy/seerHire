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
import AddClient from "@/components/Forms/clients/addClient";

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
            <div className="min-h-screen py-8 px-4 mt-4">
              <div className="bg-white shadow-lg rounded-2xl mx-auto max-w-4xl">
                {/* Header */}
                <div className="px-8 py-6 border-b border-gray-200">
                  <h1 className="text-2xl font-bold text-gray-900">
                    Add New Client
                  </h1>
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
                          <span className="text-red-500">*</span> 
                        </label>
                        <input
                          id="clientName"
                          name="clientName"
                          type="text"
                          className="w-full px-0 py-1 border-0 border-b border-gray-300 focus:border-blue-500 focus:ring-0 text-sm placeholder-gray-400 focus:outline-none"
                          placeholder="Enter client name"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.clientName ?? ""}
                        />
                        {formik.touched.clientName &&
                        formik.errors.clientName ? (
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
                          Country (Headquarter){" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <LocationAutocomplete
                          name="clientHeadQuarterCountry"
                          placeholder="Select country"
                          styleMod="w-full px-0 py-1 border-0 border-b border-gray-300 focus:ring-0 text-sm placeholder-gray-400 rounded-none"
                          value={
                            formik.values.clientHeadQuarterCountry
                              .locationDetails ?? ""
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
                          State (Headquarter){" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <LocationAutocomplete
                          name="clientHeadQuarterState"
                          styleMod="w-full px-0 py-1 border-0 border-b border-gray-300 focus:ring-0 text-sm placeholder-gray-400 rounded-none"
                          placeholder="Select state"
                          value={
                            formik.values.clientHeadQuarterState.locationDetails
                          }
                          onChange={onChangeStateLocation}
                          options={locations}
                          onAdd={addNewStateLocation}
                        />
                        {formik.errors.clientHeadQuarterState
                          ?.locationDetails ? (
                          <div className="text-red-500 text-sm mt-1">
                            {
                              formik.errors.clientHeadQuarterState
                                .locationDetails
                            }
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
                          value={formik.values.financePocName ?? ""}
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
                          value={formik.values.financeEmail ?? ""}
                        />
                        {formik.touched.financeEmail &&
                        formik.errors.financeEmail ? (
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
                          value={formik.values.cinnumber ?? ""}
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
                          value={formik.values.pannumber ?? ""}
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
                            value={formik.values.gstnumber ?? ""}
                          />
                          {formik.touched.gstnumber &&
                          formik.errors.gstnumber ? (
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
                        setIsClientAdded(false);
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
                      Add
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <AddClient autoClose={()=>setIsClientAdded(false)} formik={formik} locations={locations} ></AddClient>
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
