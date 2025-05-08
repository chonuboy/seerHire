import { useState } from "react";
import { Location } from "@/lib/definitions";
import { createLocation } from "@/api/master/masterLocation";
import { toast } from "react-toastify";

export default function LocationTable({
  initialData,
}: {
  initialData: Location[];
}) {
  const [locations, setLocations] = useState<Location[]>(initialData);
  const [newLocation, setNewLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAddLocation = async () => {
    if (!newLocation.trim()) return;

    setIsLoading(true);
    try {
      createLocation({ locationDetails: newLocation }).then((data) => {
        setLocations([...locations, data]);
        setNewLocation("");
        toast.success(
          "Location added successfully",
          { position: "top-center" }
        );
        setIsLoading(false);
      });
    } catch (error) {
      console.error("Failed to add location:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="w-full mx-auto bg-white rounded-lg overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Locations</h2>
          <div className="flex space-x-2">
            <input
              type="text"
              value={newLocation}
              onChange={(e) => setNewLocation(e.target.value)}
              placeholder="New location"
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={handleAddLocation}
              disabled={isLoading || !newLocation.trim()}
              className={`px-4 py-2 rounded-md text-white font-medium transition-colors ${
                isLoading || !newLocation.trim()
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
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
                <th className="px-6 py-3 text-left">Location</th>
                <th className="px-6 py-3 text-left">Date Added</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {locations.map((location) => (
                <tr key={location.locationId} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium">
                      {location.locationDetails}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {formatDate(location.insertedOn ? location.insertedOn : "")}
                  </td>
                </tr>
              ))}
              {locations.length === 0 && (
                <tr>
                  <td
                    colSpan={3}
                    className="px-6 py-4 text-center text-sm text-gray-500"
                  >
                    No locations found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
