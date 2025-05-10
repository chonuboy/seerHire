
import { useState } from "react"
import { Technology } from "@/lib/models/candidate"
import { createTechnology } from "@/api/master/masterTech"
import { toast } from "react-toastify"

export default function TechnologyTable({ initialData }: { initialData: Technology[] }) {
  const [technologies, setTechnologies] = useState<Technology[]>(initialData)
  const [newTechnology, setNewTechnology] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleAddTechnology = async () => {
    if (!newTechnology.trim()) return
    setIsLoading(true);
    createTechnology({ technology: newTechnology }).then((data) => {
      setTechnologies([...technologies, data]);
      setNewTechnology("");
      toast.success(
                "Technology added successfully",
                { position: "top-center" }
              );
      setIsLoading(false);
    })
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
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Technologies</h2>
          <div className="flex space-x-2">
            <input
              type="text"
              value={newTechnology}
              onChange={(e) => setNewTechnology(e.target.value)}
              placeholder="Add New technology"
              className="px-4 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={handleAddTechnology}
              disabled={isLoading || !newTechnology.trim()}
              className={`px-4 py-1 rounded-md text-white font-medium transition-colors ${
                isLoading || !newTechnology.trim() ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {isLoading ? "Adding..." : "Add"}
            </button>
          </div>
        </div>

        <div className="overflow-x-auto rounded-lg">
          <table className="min-w-full border divide-y divide-gray-200 dark:text-white">
            <thead className="bg-gray-50 dark:bg-white dark:text-black">
              <tr>
                <th className="px-6 py-3 text-left">
                  Technology
                </th>
                <th className="px-6 py-3 text-left">
                  Date Added
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-black divide-y divide-gray-200">
              {technologies.map((tech) => (
                <tr key={tech.techId} className="hover:bg-gray-50 dark:hover:text-black">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium">{tech.technology}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{formatDate(tech.insertedOn? tech.insertedOn : "")}</td>
                </tr>
              ))}
              {technologies.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-6 py-4 text-center text-sm text-gray-500">
                    No technologies found
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
