import { useFormik } from "formik";
import { toast } from "react-toastify";
import { jobFormSchema } from "@/lib/models/client";
import { updateJob, uploadJobDescription } from "@/api/client/clientJob";
import { Save, X } from "lucide-react";
import { useState } from "react";

export default function JobInfoUpdateForm({
  currentJob,
  id,
  autoClose,
}: {
  currentJob: any;
  id: number;
  autoClose: () => void;
}) {
  // Helper function to get updated fields

  const [isSubmitting, setIsSubmitting] = useState(false);
  const getUpdatedFields = (initialValues: any, values: any) => {
    return Object.keys(values).reduce((acc: Record<string, any>, key) => {
      if (values[key] !== initialValues[key]) {
        acc[key] = values[key];
      }
      return acc;
    }, {});
  };

  const formik = useFormik({
    initialValues: currentJob,
    // validationSchema: jobFormSchema,
    onSubmit: (values) => {
      console.log(values);
      try {
        const updatedFields = getUpdatedFields(currentJob, values);
        console.log("Updating job with:", id, updatedFields);

        // Add await here to properly handle the promise
        updateJob(id, updatedFields).then((data) => {
          console.log(data);
        });

        toast.success("Job updated successfully", { position: "top-right" });
        autoClose();
      } catch (error: any) {
        console.error("Update error:", error);
        toast.error(error.message || "An error occurred during update.", {
          position: "top-right",
        });
      }
    },
  });

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border mt-14 border-gray-200">
      <div className="p-6 space-y-6">
        <h2 className="text-xl font-bold text-gray-800">
          {currentJob.jobId ? "Update Job" : "Create New Job"}
        </h2>

        <form onSubmit={formik.handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Job Title */}
            <div>
              <label
                htmlFor="jobTitle"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Job Title
              </label>
              <input
                type="text"
                name="jobTitle"
                id="jobTitle"
                value={formik.values.jobTitle || ""}
                onChange={formik.handleChange}
                className={`w-full px-3 py-2 border ${
                  formik.errors.jobTitle ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:text-black`}
              />
              {formik.errors.jobTitle && (
                <p className="mt-1 text-sm text-red-600">
                  {formik.errors.jobTitle.toString()}
                </p>
              )}
            </div>

            {/* Job Code */}
            <div>
              <label
                htmlFor="jobCode"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Job Code
              </label>
              <input
                type="text"
                name="jobCode"
                id="jobCode"
                value={formik.values.jobCode || ""}
                onChange={formik.handleChange}
                className={`w-full px-3 py-2 border ${
                  formik.errors.jobCode ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:text-black`}
              />
              {formik.errors.jobCode && (
                <p className="mt-1 text-sm text-red-600">
                  {formik.errors.jobCode.toString()}
                </p>
              )}
            </div>

            {/* Experience */}
            <div>
              <label
                htmlFor="experience"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Experience (Years)
              </label>
              <input
                type="number"
                name="experience"
                id="experience"
                min="0"
                value={formik.values.experience || 0}
                onChange={formik.handleChange}
                className={`w-full px-3 py-2 border ${
                  formik.errors.experience
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:text-black`}
              />
              {formik.errors.experience && (
                <p className="mt-1 text-sm text-red-600">
                  {formik.errors.experience?.toString()}
                </p>
              )}
            </div>

            {/* Salary */}
            <div>
              <label
                htmlFor="salaryInCtc"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Salary (LPA)
              </label>
              <input
                type="number"
                name="salaryInCtc"
                id="salaryInCtc"
                min="0"
                value={formik.values.salaryInCtc || 0}
                onChange={formik.handleChange}
                className={`w-full px-3 py-2 border ${
                  formik.errors.salaryInCtc
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:text-black`}
              />
              {formik.errors.salaryInCtc && (
                <p className="mt-1 text-sm text-red-600">
                  {formik.errors.salaryInCtc?.toString()}
                </p>
              )}
            </div>

            {/* Job Status */}
            <div>
              <label
                htmlFor="isJobActive"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Job Status
              </label>
              <select
                name="isJobActive"
                id="isJobActive"
                value={formik.values.isJobActive || "OnHold"}
                onChange={formik.handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:text-black"
              >
                <option value="Active">Active</option>
                <option value="OnHold">On Hold</option>
                <option value="Closed">Closed</option>
              </select>
            </div>

            {/* Job Post Type */}
            <div>
              <label
                htmlFor="jobPostType"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Job Post Type
              </label>
              <select
                name="jobPostType"
                id="jobPostType"
                value={formik.values.jobPostType || "Replacement"}
                onChange={formik.handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:text-black"
              >
                <option value="New">New</option>
                <option value="Replacement">Replacement</option>
                <option value="Temporary">Temporary</option>
              </select>
            </div>

            {/* Inserted By */}
            <div>
              <label
                htmlFor="insertedBy"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Posted By
              </label>
              <input
                type="text"
                name="insertedBy"
                id="insertedBy"
                value={formik.values.insertedBy || ""}
                onChange={formik.handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:text-black"
              />
            </div>
          </div>

          {/* Job Description */}
          <div className="mt-6">
            <label
              htmlFor="jobDescription"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Job Description
            </label>
            <textarea
              name="jobDescription"
              id="jobDescription"
              rows={4}
              value={formik.values.jobDescription || ""}
              onChange={formik.handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:text-black"
            />
          </div>

          <div className="mt-8 items-center gap-4 flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center px-4 py-1 border border-transparent text-xs md:text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-1" />
                  Save Job
                </>
              )}
            </button>
            <div className="flex space-x-2">
            <button
              type="button"
              onClick={autoClose}
              className="inline-flex items-center px-4 py-1 border border-gray-300 shadow-sm text-xs md:text-base leading-4 font-medium rounded-md text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
          </div>
          </div>
        </form>
      </div>
    </div>
  );
}
