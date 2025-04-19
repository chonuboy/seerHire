"use client"

import type { ClientInfo } from "@/lib/models/client"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { Popup } from "./popup"
import { fetchClient } from "@/api/master/clients"
import ClientInfoUpdateForm from "@/components/Forms/clients/updateClientInfo"

export default function ClientCard({ id }: { id: number }) {
  const router = useRouter()
  const [currentClient, setCurrentClient] = useState<ClientInfo | null>(null)
  const [isclientUpdated, setIsClientUpdated] = useState(false)

  useEffect(() => {
    fetchClient(id).then((res) => setCurrentClient(res))
  }, [isclientUpdated])

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden text-xs md:text-base">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-4">
        <h1 className="text-lg md:text-2xl font-bold text-white">{currentClient?.clientName}</h1>
      </div>

      {/* Content Section */}
      <div className="p-2">
        <div className="bg-gray-50 rounded-lg p-5 mb-2">
          <h2 className="text-gray-700 font-semibold mb-4 text-sm md:text-base border-b pb-2">Client Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-3 rounded-md shadow-sm">
              <p className="text-gray-500 text-xs md:text-sm">Head office country</p>
              <p className="text-blue-600 font-semibold text-sm md:text-base mt-1">
                {currentClient?.clientHeadQuarterCountry.locationDetails ? currentClient?.clientHeadQuarterCountry.locationDetails : "-"}
              </p>
            </div>
            <div className="bg-white p-3 rounded-md shadow-sm">
              <p className="text-gray-500 text-xs md:text-sm">Head office state</p>
              <p className="text-blue-600 font-semibold text-sm md:text-base mt-1">
                {currentClient?.clientHeadQuarterState.locationDetails ? currentClient?.clientHeadQuarterState.locationDetails : "-"}
              </p>
            </div>
            <div className="bg-white p-3 rounded-md shadow-sm">
              <p className="text-gray-500 text-xs md:text-sm">Finance POC Person</p>
              <p className="text-blue-600 font-semibold text-sm md:text-base mt-1">
                {currentClient?.financePocName ? currentClient?.financePocName : "-"}
              </p>
            </div>
            <div className="bg-white p-3 rounded-md shadow-sm">
              <p className="text-gray-500 text-xs md:text-sm">Finance Mobile Number</p>
              <p className="text-blue-600 font-semibold text-sm md:text-base mt-1">
                {currentClient?.financeNumber ? currentClient?.financeNumber : "-"}
              </p>
            </div>
            <div className="bg-white p-3 rounded-md shadow-sm">
              <p className="text-gray-500 text-xs md:text-sm">Finance Email</p>
              <p className="text-blue-600 font-semibold text-sm md:text-base mt-1 truncate">
                {currentClient?.financeEmail ? currentClient?.financeEmail : "-"}
              </p>
            </div>
          </div>

          <h2 className="text-gray-700 font-semibold my-4 text-sm md:text-base border-b pb-2 pt-4">
            Legal Information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white p-3 rounded-md shadow-sm">
              <p className="text-gray-500 text-xs md:text-sm">GST</p>
              <p className="text-blue-600 font-semibold text-sm md:text-base mt-1">
                {currentClient?.gstnumber ? currentClient?.gstnumber : "-"}
              </p>
            </div>
            <div className="bg-white p-3 rounded-md shadow-sm">
              <p className="text-gray-500 text-xs md:text-sm">CIN</p>
              <p className="text-blue-600 font-semibold text-sm md:text-base mt-1">
                {currentClient?.cinnumber ? currentClient?.cinnumber : "-"}
              </p>
            </div>
            <div className="bg-white p-3 rounded-md shadow-sm">
              <p className="text-gray-500 text-xs md:text-sm">PAN</p>
              <p className="text-blue-600 font-semibold text-sm md:text-base mt-1">
                {currentClient?.pannumber ? currentClient?.pannumber : "-"}
              </p>
            </div>
          </div>
        </div>

        {isclientUpdated && (
          <Popup onClose={() => setIsClientUpdated(false)}>
            <ClientInfoUpdateForm
              currentClient={currentClient}
              id={id}
              autoClose={() => {
                setIsClientUpdated(false)
              }}
            />
          </Popup>
        )}

        <div className="flex justify-end">
          <button
            className="bg-[var(--theme-background)] hover:opacity-90 transition-opacity text-white py-2 px-6 rounded-md font-medium text-xs md:text-base flex items-center shadow-md"
            onClick={() => setIsClientUpdated(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
            Update
          </button>
        </div>
      </div>
    </div>
  )
}

