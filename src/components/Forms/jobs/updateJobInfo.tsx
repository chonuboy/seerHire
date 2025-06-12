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
          if (data.status === 200) {
            console.log(data);
            toast.success("Job updated successfully", {
              position: "top-right",
            });
            autoClose();
          } else if (data.message) {
            toast.error(data.message, {
              position: "top-right",
            });
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
    <div className="min-h-screen py-8 px-4 mt-8">
      <div className="bg-white shadow-lg rounded-2xl mx-auto max-w-4xl">
        {/* Header */}
        <div className="px-8 py-6 border-b border-gray-200 flex items-center gap-2">
          {currentJob.jobId ? (
            <svg
            className="w-6 h-6 mr-2 text-cyan-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
          ):""}
          
          <h1 className="text-2xl font-bold text-gray-900">
            {currentJob.jobId ? "Update Job" : "Create New Job"}
          </h1>
        </div>

        <form className="p-8" onSubmit={formik.handleSubmit}>
          {/* Basic Job Details */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-cyan-500 mb-8">
              Job Details
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-6">
              {/* Job Title */}
              <div>
                <label
                  htmlFor="jobTitle"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Job Title
                </label>
                <input
                  type="text"
                  name="jobTitle"
                  id="jobTitle"
                  value={formik.values.jobTitle || ""}
                  onChange={formik.handleChange}
                  className="w-full px-0 py-1 border-0 border-b border-gray-300 focus:border-blue-500 focus:ring-0 text-sm placeholder-gray-400 focus:outline-none"
                />
                {formik.errors.jobTitle && (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.jobTitle.toString()}
                  </div>
                )}
              </div>

              {/* Job Code */}
              <div>
                <label
                  htmlFor="jobCode"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Job Code
                </label>
                <input
                  type="text"
                  name="jobCode"
                  id="jobCode"
                  value={formik.values.jobCode || ""}
                  onChange={formik.handleChange}
                  className="w-full px-0 py-1 border-0 border-b border-gray-300 focus:border-blue-500 focus:ring-0 text-sm placeholder-gray-400 focus:outline-none"
                />
                {formik.errors.jobCode && (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.jobCode.toString()}
                  </div>
                )}
              </div>

              {/* Experience */}
              <div>
                <label
                  htmlFor="experience"
                  className="block text-sm font-semibold text-gray-700 mb-2"
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
                  className="w-full px-0 py-1 border-0 border-b border-gray-300 focus:border-blue-500 focus:ring-0 text-sm placeholder-gray-400 focus:outline-none"
                />
                {formik.errors.experience && (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.experience?.toString()}
                  </div>
                )}
              </div>

              {/* Salary */}
              <div>
                <label
                  htmlFor="salaryInCtc"
                  className="block text-sm font-semibold text-gray-700 mb-2"
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
                  className="w-full px-0 py-1 border-0 border-b border-gray-300 focus:border-blue-500 focus:ring-0 text-sm placeholder-gray-400 focus:outline-none"
                />
                {formik.errors.salaryInCtc && (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.salaryInCtc?.toString()}
                  </div>
                )}
              </div>

              {/* Job Status */}
              <div>
                <label
                  htmlFor="isJobActive"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Job Status
                </label>
                <select
                  name="isJobActive"
                  id="isJobActive"
                  value={formik.values.isJobActive || "OnHold"}
                  onChange={formik.handleChange}
                  className="w-full px-0 py-1 border-0 border-b border-gray-300 focus:border-blue-500 focus:ring-0 text-sm placeholder-gray-400 focus:outline-none"
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
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Job Post Type
                </label>
                <select
                  name="jobPostType"
                  id="jobPostType"
                  value={formik.values.jobPostType || "Replacement"}
                  onChange={formik.handleChange}
                  className="w-full px-0 py-1 border-0 border-b border-gray-300 focus:border-blue-500 focus:ring-0 text-sm placeholder-gray-400 focus:outline-none"
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
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Posted By
                </label>
                <input
                  type="text"
                  name="insertedBy"
                  id="insertedBy"
                  value={formik.values.insertedBy || ""}
                  onChange={formik.handleChange}
                  className="w-full px-0 py-1 border-0 border-b border-gray-300 focus:border-blue-500 focus:ring-0 text-sm placeholder-gray-400 focus:outline-none"
                />
                {formik.errors.insertedBy && (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.insertedBy?.toString()}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Job Description */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-cyan-500 mb-8">
              Job Description
            </h2>
            <div className="border border-gray-300 rounded-lg p-2">
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
          </div>

          {/* Form Actions */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6 justify-end">
            <button
              type="button"
              onClick={autoClose}
              className="flex-1 sm:flex-none sm:px-8 py-2 border-2 border-cyan-500 text-cyan-500 rounded-lg hover:bg-cyan-50 transition-colors duration-200 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 sm:flex-none sm:px-8 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors duration-200 font-medium"
            >
              {currentJob.jobId ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
