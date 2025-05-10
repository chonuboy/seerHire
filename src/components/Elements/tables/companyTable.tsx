import { useState } from "react"
import { createCompany } from "@/api/master/masterCompany"
import { toast } from "react-toastify"
import { Company } from "@/lib/models/client"

export default function CompanyTable({ initialData }: { initialData: Company[] }) {
  const [companies, setCompanies] = useState<Company[]>(initialData)
  const [newCompany, setNewCompany] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleAddCompany = async () => {
    if (!newCompany.trim()) return

    setIsLoading(true)
    try {
      createCompany({ companyName: newCompany }).then((data) => {
        setCompanies([...companies, data])
        setNewCompany("")
        toast.success(
                  "Company added successfully",
                  { position: "top-center" }
                );
        setIsLoading(false)
      })
    } catch (error) {
      console.error("Failed to add company:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full mx-auto bg-white rounded-lg overflow-hidden">
      <div className="p-6 dark:bg-black">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Companies</h2>
          <div className="flex space-x-2">
            <input
              type="text"
              value={newCompany}
              onChange={(e) => setNewCompany(e.target.value)}
              placeholder="New company"
              className="px-4 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={handleAddCompany}
              disabled={isLoading || !newCompany.trim()}
              className={`px-4 py-1 rounded-md text-white font-medium transition-colors ${
                isLoading || !newCompany.trim() ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {isLoading ? "Adding..." : "Add"}
            </button>
          </div>
        </div>

        <div className="overflow-x-auto rounded-lg border">
          <table className="min-w-full divide-y divide-gray-200">
            <tbody className="bg-white divide-y divide-gray-200 dark:bg-black">
              {companies.map((company) => (
                <tr key={company.companyId} className="hover:bg-gray-50 hover:text-black">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium">{company.companyName}</div>
                  </td>
                </tr>
              ))}
              {companies.length === 0 && (
                <tr>
                  <td colSpan={2} className="px-6 py-4 text-center text-sm text-gray-500">
                    No companies found
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
