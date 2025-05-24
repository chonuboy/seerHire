import type { ClientInfo } from "@/lib/models/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Popup } from "./popup";
import { fetchClient } from "@/api/master/clients";
import ClientInfoUpdateForm from "@/components/Forms/clients/updateClientInfo";
import { fetchAllLocations } from "@/api/master/masterLocation";
import { Location } from "@/lib/definitions";

export default function ClientCard({ id }: { id: number }) {
  const router = useRouter();
  const [currentClient, setCurrentClient] = useState<ClientInfo | null>(null);
  const [isclientUpdated, setIsClientUpdated] = useState(false);
  const [masterLocations, setMasterLocations] = useState<Location[]>([]);

  useEffect(() => {
    fetchClient(id).then((res) => {
      setCurrentClient(res);
    });
    fetchAllLocations().then((data) => {
      setMasterLocations(data);
    });
  }, [isclientUpdated]);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
        <h1 className="text-xl font-semibold text-white truncate">
          {currentClient?.clientName || "Client Details"}
        </h1>
      </div>

      {/* Content Section */}
      <div className="p-4 space-y-6">
        {/* Client Information Section */}
        <div className="space-y-4">
          <h2 className="text-gray-700 dark:text-gray-300 font-medium text-sm uppercase tracking-wider border-b border-gray-200 dark:border-gray-700 pb-2">
            Client Information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                Head office country
              </p>
              <p className="text-blue-600 dark:text-blue-400 font-medium text-sm">
                {currentClient?.clientHeadQuarterCountry?.locationDetails ||
                  "-"}
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                Head office state
              </p>
              <p className="text-blue-600 dark:text-blue-400 font-medium text-sm">
                {currentClient?.clientHeadQuarterState?.locationDetails || "-"}
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                Finance POC Person
              </p>
              <p className="text-blue-600 dark:text-blue-400 font-medium text-sm">
                {currentClient?.financePocName || "-"}
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                Finance Mobile Number
              </p>
              <p className="text-blue-600 dark:text-blue-400 font-medium text-sm">
                {currentClient?.financeNumber || "-"}
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                Finance Email
              </p>
              <p className="text-blue-600 dark:text-blue-400 font-medium text-sm truncate">
                {currentClient?.financeEmail || "-"}
              </p>
            </div>
          </div>
        </div>

        {/* Legal Information Section */}
        <div className="space-y-4">
          <h2 className="text-gray-700 dark:text-gray-300 font-medium text-sm uppercase tracking-wider border-b border-gray-200 dark:border-gray-700 pb-2">
            Legal Information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                GST
              </p>
              <p className="text-blue-600 dark:text-blue-400 font-medium text-sm">
                {currentClient?.gstnumber || "-"}
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                CIN
              </p>
              <p className="text-blue-600 dark:text-blue-400 font-medium text-sm">
                {currentClient?.cinnumber || "-"}
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                PAN
              </p>
              <p className="text-blue-600 dark:text-blue-400 font-medium text-sm">
                {currentClient?.pannumber || "-"}
              </p>
            </div>
          </div>
        </div>

        {/* Update Button */}
        <div className="flex justify-end">
          <button
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 transition-colors text-white py-2 px-4 rounded-md text-sm font-medium shadow-sm"
            onClick={() => setIsClientUpdated(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
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

      {/* Update Form Modal */}
      {isclientUpdated && (
        <Popup onClose={() => setIsClientUpdated(false)}>
          <ClientInfoUpdateForm
            currentClient={currentClient}
            id={id}
            autoClose={() => setIsClientUpdated(false)}
            locations = {masterLocations}
          />
        </Popup>
      )}
    </div>
  );
}
