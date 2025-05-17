import { useState } from "react"
import { domainDetails as Domain } from "@/lib/models/candidate"
import { createDomain } from "@/api/master/domain"
import {toast} from "react-toastify"


export default function DomainTable({ initialData }: { initialData: Domain[] }) {
  const [domains, setDomains] = useState<Domain[]>(initialData)
  const [newDomain, setNewDomain] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleAddDomain = async () => {
    if (!newDomain.trim()) return

    setIsLoading(true)
    try {
      createDomain({ domainDetails: newDomain }).then((data) => {
        setDomains([...domains, data]);
        setNewDomain("");
        toast.success(
                  "Domain added successfully",
                  { position: "top-center" }
                );
        setIsLoading(false);
      })
    } catch (error) {
      console.error("Failed to add domain:", error);
    } finally {
      setIsLoading(false);
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="w-full mx-auto bg-white rounded-lg overflow-hidden">
      <div className="p-6 dark:bg-black">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Domains</h2>
          <div className="flex space-x-2">
            <input
              type="text"
              value={newDomain}
              onChange={(e) => setNewDomain(e.target.value)}
              placeholder="New domain"
              className="px-4 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={handleAddDomain}
              disabled={isLoading || !newDomain.trim()}
              className={`px-4 py-1 rounded-md text-white font-medium transition-colors ${
                isLoading || !newDomain.trim() ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {isLoading ? "Adding..." : "Add"}
            </button>
          </div>
        </div>

        <div className="overflow-x-auto border rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 dark:bg-white dark:text-black">
              <tr>
                <th className="px-6 py-3 text-left">
                  Domain
                </th>
                <th className="px-6 py-3 text-left">
                  Date Added
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-black divide-y divide-gray-200">
              {domains && domains.length>1 &&domains.map((domain) => (
                <tr key={domain.domainId} className="hover:bg-gray-50 hover:text-black">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium">{domain.domainDetails}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{formatDate(domain.insertedOn? domain.insertedOn : "")}</td>
                </tr>
              ))}
              {domains.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-6 py-4 text-center text-sm text-gray-500">
                    No domains found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
