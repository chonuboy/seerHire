import { useState } from "react"
import { createCertification } from "@/api/master/certification"
import { Certificates } from "@/lib/models/candidate"
import { toast } from "react-toastify"


export default function CertificateTable({ initialData }: { initialData: Certificates[] }) {
  const [certificates, setCertificates] = useState<Certificates[]>(initialData)
  const [newCertificate, setNewCertificate] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleAddcertificate = async () => {
    if (!newCertificate.trim()) return

    setIsLoading(true);
    try {
      createCertification({certificationName: newCertificate}).then((data) => {
        setCertificates([...certificates, data]);
        setNewCertificate("");
        toast.success(
                  "Certificate added successfully",
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
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Certificates</h2>
          <div className="flex space-x-2">
            <input
              type="text"
              value={newCertificate}
              onChange={(e) => setNewCertificate(e.target.value)}
              placeholder="New Certificate"
              className="px-4 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={handleAddcertificate}
              disabled={isLoading || !newCertificate.trim()}
              className={`px-4 py-1 rounded-md text-white font-medium transition-colors ${
                isLoading || !newCertificate.trim() ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {isLoading ? "Adding..." : "Add"}
            </button>
          </div>
        </div>

        <div className="overflow-x-auto border rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left">
                  Certificate
                </th>
                <th className="px-6 py-3 text-left">
                  Date Added
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {certificates.map((certificate) => (
                <tr key={certificate.certificationId} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{certificate.certificationName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{formatDate(certificate.insertedOn? certificate.insertedOn : "")}</td>
                </tr>
              ))}
              {certificates.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-6 py-4 text-center text-sm text-gray-500">
                    No Certificates found
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
