import { useFormik } from "formik";
import { toast } from "react-toastify";
import { jobFormSchema, jobUpdateSchema } from "@/lib/models/client";
import { updateJob } from "@/api/client/clientJob";
import { Save, X } from "lucide-react";
import dynamic from "next/dynamic";
import { useState } from "react";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

export default function JobInfoUpdateForm({
  currentJob,
  id,
  autoClose,
}: {
  currentJob: any;
  id: number;
  autoClose: () => void;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [jd, setJobDescription] = useState<string | null>(null);
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
    validationSchema: jobUpdateSchema,
    onSubmit: (values) => {
      try {
        const updatedFields = getUpdatedFields(currentJob, values);
        console.log("Updating job with:", id, updatedFields);

        // Add await here to properly handle the promise
        updateJob(id, updatedFields).then((data) => {
          if(data.status === 200){
            console.log(data);
            toast.success("Job updated successfully", {
              position: "top-right",
            })
            autoClose();
          }
          else if(data.message){
            toast.error(data.message, {
              position: "top-right",
            })
          }
        });
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
          {formik.errors.insertedBy && (
              <p className="mt-2 text-sm text-red-600">
                {formik.errors.insertedBy?.toString()}
              </p>
            )}

          {/* Job Description */}
          <div className="space-y-2 mt-4">
            <label htmlFor="jobDescription" className="font-semibold text-gray-600">
              Job Description
            </label>
            <JoditEditor
            name="jobDescription"
            id="jobDescription"
              value={formik.values.jobDescription || ""}
              config={{
                height: 300,
                placeholder: "Type job description here...",
                readonly: false,
                showCharsCounter: false,
                showWordsCounter: false,
                showXPathInStatusbar: false,
                buttons:
                  "bold,italic,underline,strikethrough,ul,ol,fontsize,superscript,subscript,spellcheck,speechRecognize,paste,hr,indent,preview",
                buttonsMD:
                  "bold,italic,underline,strikethrough,ul,ol,fontsize,superscript,subscript,spellcheck,speechRecognize,paste,hr,indent,preview",
                buttonsSM:
                  "bold,italic,underline,strikethrough,ul,ol,fontsize,superscript,subscript,spellcheck,speechRecognize,paste,hr,indent,preview",
                buttonsXS:
                  "bold,italic,underline,strikethrough,ul,ol,fontsize,superscript,subscript,spellcheck,speechRecognize,paste,hr,indent,preview",
              }}
              onBlur={(content) => {
                setJobDescription(content);
              }}
              onChange={(content) => {
                formik.values.jobDescription = content;
              }}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center justify-center"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Update
            </button>
            <button
              type="button"
              onClick={autoClose}
              className="flex-1 bg-red-500 text-white py-3 px-6 rounded-lg hover:bg-gray-300 transition duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 flex items-center justify-center"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
