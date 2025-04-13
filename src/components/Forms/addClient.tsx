import type React from "react"
import { useEffect, useState } from "react"
import { fetchAllLocations,createLocation } from "@/api/master/masterLocation"
import { countryCodes } from "@/api/countryCodes"

export default function ClientForm({
  formik,
  setIsClientAdded,
}: {
  formik: any
  setIsClientAdded: (value: boolean) => void
}) {
  const [locations, setLocations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showNewLocationForm, setShowNewLocationForm] = useState(false)
  const [newLocation, setNewLocation] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(countryCodes[0]);
  const [showGSTField, setShowGSTField] = useState(countryCodes[0].hasGST);

  // Fetch locations on component mount
  useEffect(() => {
    const getLocations = async () => {
      setIsLoading(true)
      try {
        const data = await fetchAllLocations()
        if (Array.isArray(data)) {
          setLocations(data)
        } else {
          console.error("Failed to fetch locations:", data)
          setLocations([])
        }
      } catch (error) {
        console.error("Error fetching locations:", error)
        setLocations([])
      } finally {
        setIsLoading(false)
      }
    }

    getLocations()
  }, [])

  // Handle country change
  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const country = countryCodes.find((c) => c.code === e.target.value) || countryCodes[0]
    setSelectedCountry(country)
    setShowGSTField(country.hasGST)

    // If country doesn't have GST, clear the GST field
    if (!country.hasGST) {
      formik.setFieldValue("gstnumber", "")
    }
  }

  // Handle adding a new location
  const handleAddLocation = async () => {
    if (!newLocation.trim()) return

    try {
      const reqData = { locationName: newLocation.trim() }
      const response = await createLocation(reqData)

      if (response && response.id) {
        // Add the new location to the locations array
        setLocations([...locations, response])

        // Set the new location as the selected value in the form
        formik.setFieldValue("clientHo", response.locationName)

        // Reset the new location form
        setNewLocation("")
        setShowNewLocationForm(false)
      } else {
        console.error("Failed to create location:", response)
      }
    } catch (error) {
      console.error("Error creating location:", error)
    }
  }

  return (
    <div className="bg-white shadow-lg rounded-xl mx-auto max-w-2xl p-6">
      <div className="border-b border-gray-200 pb-4 mb-6">
        <h2 className="text-xl font-bold text-gray-800">Add New Client</h2>
      </div>

      <form className="space-y-6" onSubmit={formik.handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
          {/* Country Selection */}
          {/* <div className="md:col-span-2">
            <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
              Country
            </label>
            <select
              id="country"
              name="country"
              className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
              value={selectedCountry.code}
              onChange={handleCountryChange}
            >
              {countryCodes.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.name} ({country.code})
                </option>
              ))}
            </select>
          </div> */}

          {/* Client Name */}
          <div>
            <label htmlFor="clientName" className="block text-sm font-medium text-gray-700 mb-1">
              Client Name <span className="text-red-500">*</span>
            </label>
            <input
              id="clientName"
              name="clientName"
              type="text"
              className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
              placeholder="Enter client name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.clientName}
            />
            {formik.touched.clientName && formik.errors.clientName ? (
              <div className="text-red-500 text-xs mt-1">{formik.errors.clientName}</div>
            ) : null}
          </div>

          {/* Client HO (Location) */}
          <div>
            <label htmlFor="clientHo" className="block text-sm font-medium text-gray-700 mb-1">
              Client Headquarters <span className="text-red-500">*</span>
            </label>

            {!showNewLocationForm ? (
              <div className="relative">
                <select
                  id="clientHo"
                  name="clientHo"
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.clientHo}
                  disabled={isLoading}
                >
                  <option value="">Select a location</option>
                  {locations.map((location) => (
                    <option key={location.id} value={location.locationName}>
                      {location.locationName}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  className="absolute right-0 top-0 h-full px-3 text-blue-600 hover:text-blue-800 transition-colors"
                  onClick={() => setShowNewLocationForm(true)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            ) : (
              <div className="flex space-x-2">
                <input
                  type="text"
                  className="flex-1 px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                  placeholder="Enter new location"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                />
                <button
                  type="button"
                  className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                  onClick={handleAddLocation}
                >
                  Add
                </button>
                <button
                  type="button"
                  className="px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm"
                  onClick={() => setShowNewLocationForm(false)}
                >
                  Cancel
                </button>
              </div>
            )}

            {formik.touched.clientHo && formik.errors.clientHo ? (
              <div className="text-red-500 text-xs mt-1">{formik.errors.clientHo}</div>
            ) : null}
          </div>

          {/* Finance POC */}
          <div>
            <label htmlFor="financePocName" className="block text-sm font-medium text-gray-700 mb-1">
              Finance Point of Contact
            </label>
            <input
              id="financePocName"
              name="financePocName"
              type="text"
              className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
              placeholder="Enter contact name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.financePocName}
            />
            {formik.touched.financePocName && formik.errors.financePocName ? (
              <div className="text-red-500 text-xs mt-1">{formik.errors.financePocName}</div>
            ) : null}
          </div>

          {/* Finance Number */}
          <div>
            <label htmlFor="financeNumber" className="block text-sm font-medium text-gray-700 mb-1">
              Finance Contact Number
            </label>
            <input
              id="financeNumber"
              name="financeNumber"
              type="text"
              className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
              placeholder="Enter contact number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.financeNumber}
            />
            {formik.touched.financeNumber && formik.errors.financeNumber ? (
              <div className="text-red-500 text-xs mt-1">{formik.errors.financeNumber}</div>
            ) : null}
          </div>

          {/* Finance Email */}
          <div>
            <label htmlFor="financeEmail" className="block text-sm font-medium text-gray-700 mb-1">
              Finance Email Address
            </label>
            <input
              id="financeEmail"
              name="financeEmail"
              type="email"
              className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
              placeholder="email@example.com"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.financeEmail}
            />
            {formik.touched.financeEmail && formik.errors.financeEmail ? (
              <div className="text-red-500 text-xs mt-1">{formik.errors.financeEmail}</div>
            ) : null}
          </div>

          {/* GST - Only show if country has GST */}
          {showGSTField && (
            <div>
              <label htmlFor="gstnumber" className="block text-sm font-medium text-gray-700 mb-1">
                GST Number
              </label>
              <input
                id="gstnumber"
                name="gstnumber"
                type="text"
                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                placeholder={`Enter ${selectedCountry.name} GST number`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.gstnumber}
              />
              {formik.touched.gstnumber && formik.errors.gstnumber ? (
                <div className="text-red-500 text-xs mt-1">{formik.errors.gstnumber}</div>
              ) : null}
            </div>
          )}

          {/* CIN */}
          <div>
            <label htmlFor="cinnumber" className="block text-sm font-medium text-gray-700 mb-1">
              CIN Number
            </label>
            <input
              id="cinnumber"
              name="cinnumber"
              type="text"
              className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
              placeholder="Enter CIN number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.cinnumber}
            />
            {formik.touched.cinnumber && formik.errors.cinnumber ? (
              <div className="text-red-500 text-xs mt-1">{formik.errors.cinnumber}</div>
            ) : null}
          </div>

          {/* PAN */}
          <div>
            <label htmlFor="pannumber" className="block text-sm font-medium text-gray-700 mb-1">
              PAN Number
            </label>
            <input
              id="pannumber"
              name="pannumber"
              type="text"
              className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
              placeholder="Enter PAN number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.pannumber}
            />
            {formik.touched.pannumber && formik.errors.pannumber ? (
              <div className="text-red-500 text-xs mt-1">{formik.errors.pannumber}</div>
            ) : null}
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200 mt-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              Add Client
            </button>
            <button
              type="button"
              className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-all duration-300"
              onClick={() => setIsClientAdded(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>

      <div className="bg-white mx-auto max-w-2xl p-4 mt-16 rounded-md">
              <form
                className="space-y-8 text-xs md:text-base"
                onSubmit={formik.handleSubmit}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Client Name */}
                  <div className="space-y-2">
                    <label htmlFor="clientName" className="font-medium">
                      Client Name
                    </label>
                    <input
                      id="clientName"
                      name="clientName"
                      type="text"
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.clientName}
                    />
                    {formik.touched.clientName && formik.errors.clientName ? (
                      <div className="text-red-500 text-sm">
                        {formik.errors.clientName}
                      </div>
                    ) : null}
                  </div>

                  {/* Client HO */}
                  <div className="space-y-2">
                    <label htmlFor="clientHo" className="font-medium">
                      Client HO
                    </label>
                    <input
                      id="clientHo"
                      name="clientHo"
                      type="text"
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.clientHo}
                    />
                    {formik.touched.clientHo && formik.errors.clientHo ? (
                      <div className="text-red-500 text-sm">
                        {formik.errors.clientHo}
                      </div>
                    ) : null}
                  </div>

                  {/* Finance POC */}
                  <div className="space-y-2">
                    <label htmlFor="financePocName" className="font-medium">
                      Finance POC
                    </label>
                    <input
                      id="financePocName"
                      name="financePocName"
                      type="text"
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.financePocName}
                    />
                    {formik.touched.financePocName &&
                    formik.errors.financePocName ? (
                      <div className="text-red-500 text-sm">
                        {formik.errors.financePocName}
                      </div>
                    ) : null}
                  </div>

                  {/* Finance Number */}
                  <div className="space-y-2">
                    <label htmlFor="financeNumber" className="font-medium">
                      Finance Number
                    </label>
                    <input
                      id="financeNumber"
                      name="financeNumber"
                      type="text"
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.financeNumber}
                    />
                    {formik.touched.financeNumber &&
                    formik.errors.financeNumber ? (
                      <div className="text-red-500 text-sm">
                        {formik.errors.financeNumber}
                      </div>
                    ) : null}
                  </div>

                  {/* Finance Email */}
                  <div className="space-y-2">
                    <label htmlFor="financeEmail" className="font-medium">
                      Finance Email
                    </label>
                    <input
                      id="financeEmail"
                      name="financeEmail"
                      type="email"
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.financeEmail}
                    />
                    {formik.touched.financeEmail &&
                    formik.errors.financeEmail ? (
                      <div className="text-red-500 text-sm">
                        {formik.errors.financeEmail}
                      </div>
                    ) : null}
                  </div>

                  {/* GST */}
                  <div className="space-y-2">
                    <label htmlFor="gstnumber" className="font-medium">
                      GST
                    </label>
                    <input
                      id="gstnumber"
                      name="gstnumber"
                      type="text"
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.gstnumber}
                    />
                    {formik.touched.gstnumber && formik.errors.gstnumber ? (
                      <div className="text-red-500 text-sm">
                        {formik.errors.gstnumber}
                      </div>
                    ) : null}
                  </div>

                  {/* CIN */}
                  <div className="space-y-2">
                    <label htmlFor="cinnumber" className="font-medium">
                      CIN
                    </label>
                    <input
                      id="cinnumber"
                      name="cinnumber"
                      type="text"
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.cinnumber}
                    />
                    {formik.touched.cinnumber && formik.errors.cinnumber ? (
                      <div className="text-red-500 text-sm">
                        {formik.errors.cinnumber}
                      </div>
                    ) : null}
                  </div>

                  {/* PAN */}
                  <div className="space-y-2">
                    <label htmlFor="pannumber" className="font-medium">
                      PAN
                    </label>
                    <input
                      id="pannumber"
                      name="pannumber"
                      type="text"
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.pannumber}
                    />
                    {formik.touched.pannumber && formik.errors.pannumber ? (
                      <div className="text-red-500 text-sm">
                        {formik.errors.pannumber}
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="space-y-4 flex justify-end">
                  <button
                    type="submit"
                    className=" bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
                  >
                    Add Client
                  </button>
                  <button
                    type="button"
                    className=" bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition duration-300"
                    onClick={() => setIsClientAdded(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
        </div>
    </div>

    

  )
}

