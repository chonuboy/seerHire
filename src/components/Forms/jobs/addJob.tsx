import type React from "react";

import { useState, useRef } from "react";
import { useFormik } from "formik";
import { jobFormSchema } from "@/lib/models/client";
import { createJob, uploadJD } from "@/api/client/clientJob";
import type { ClientInfo } from "@/lib/models/client";
import { FileText, Upload, X } from "lucide-react";
import dynamic from "next/dynamic";
import { uploadJobDescriptionById } from "@/api/client/clientJob";
import { fetchAllJobs } from "@/api/client/clientJob";
import { toast } from "react-toastify";

// Dynamic import of JoditEditor to avoid SSR issues
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

export const AddJob = ({
  client,
  autoClose,
  newjobId,
  User,
}: {
  client?: ClientInfo | null;
  autoClose: () => void;
  newjobId?: number;
  User?: string;
}) => {
  const [jd, setJobDescription] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [jobId, setJobId] = useState(0);
  const [jobDescriptionDocName, setJobDescriptionDocName] = useState("");

  const formik = useFormik({
    initialValues: {
      jobCode: null,
      jobTitle: null,
      salaryInCtc: null,
      jd: "",
      experience: "",
      jobDescription: "",
      isJobActive: "",
      jobPostType: "",
      insertedBy:
        User?.replace('"', "").replace('"', "").charAt(0).toUpperCase() +
        "" +
        User?.slice(2, User.length - 1),
      client: {
        clientId: client?.clientId,
      },
    },
    validationSchema: jobFormSchema,
    validateOnBlur: false,
    validateOnChange: true,
    onSubmit: (values) => {
      setIsSubmitting(true);

      try {
        // Process rich text editor content
        if (jd) {
          values.jobDescription = jd
            ?.replace(/\s+style="[^"]*"/g, "")
            .replace(/\s+/g, "")
            .replace(/&nbsp;/g, "");
        }

        // Handle file upload if needed
        if (uploadedFile) {
          // In a real application, you would upload the file to a server
          // and get back a URL or file identifier
          console.log("File to upload:", uploadedFile);

          // For this example, we'll just set the filename
          // values.jd = uploadedFile.name;
          // uploadJobDescription(newjobId, uploadedFile).then((res) => {
          //   console.log(res);
          // });
        }

        // Submit the form

        console.log(values);
        if (
          formik.values.jd === "" ||
          formik.values.jd === null ||
          !uploadedFile
        ) {
          toast.error("Please upload Job description Document", {
            position: "top-right",
          });
          return;
        } else {
          createJob(values).then((data) => {
            if (data.status === 201) {
              toast.success("Job added successfully", {
                position: "top-right",
              });
              autoClose();
            }else{
              toast.error(data.message, {
                position: "top-right",
              })
            }
          });
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setUploadedFile(files[0]);
    }
  };

  const uploadJobDescription = (uploadedFile: File) => {
    uploadJD({
      file: uploadedFile,
    }).then((res) => {
      toast.success("File uploaded successfully", { position: "top-right" });
      setJobDescriptionDocName(res);
      formik.values.jd = res;
    });
  };

  const clearFile = () => {
    setUploadedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="bg-white mt-12 rounded-lg shadow-md overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-800">Add New Job</h2>
      </div>

      <form onSubmit={formik.handleSubmit} className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Job Title */}
          <div className="space-y-2">
            <label
              htmlFor="jobTitle"
              className="block text-sm font-medium text-gray-700"
            >
              Job Title <span className="text-red-500">*</span>
            </label>
            <input
              id="jobTitle"
              name="jobTitle"
              type="text"
              placeholder="Enter job title"
              className={`w-full px-3 py-2 border  rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:text-black`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.jobTitle || ""}
            />
            {formik.errors.jobTitle && (
              <p className="mt-1 text-sm text-red-600">
                {formik.errors.jobTitle.toString()}
              </p>
            )}
          </div>

          {/* Job Code */}
          <div className="space-y-2">
            <label
              htmlFor="jobCode"
              className="block text-sm font-medium text-gray-700"
            >
              Job Code
            </label>
            <input
              id="jobCode"
              name="jobCode"
              type="text"
              placeholder="Enter job code"
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:text-black`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.jobCode || ""}
            />
            {formik.errors.jobCode && (
              <p className="mt-1 text-sm text-red-600">
                {formik.errors.jobCode.toString()}
              </p>
            )}
          </div>

          {/* Salary */}
          <div className="space-y-2">
            <label
              htmlFor="salaryInCtc"
              className="block text-sm font-medium text-gray-700"
            >
              Salary (In CTC) <span className="text-red-500">*</span>
            </label>
            <input
              id="salaryInCtc"
              name="salaryInCtc"
              type="number"
              placeholder="Enter salary"
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:text-black`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.salaryInCtc || ""}
            />
            {formik.errors.salaryInCtc && (
              <p className="mt-1 text-sm text-red-600">
                {formik.errors.salaryInCtc?.toString()}
              </p>
            )}
          </div>

          {/* Experience */}
          <div className="space-y-2">
            <label
              htmlFor="experience"
              className="block text-sm font-medium text-gray-700"
            >
              Experience (In Years) <span className="text-red-500">*</span>
            </label>
            <input
              id="experience"
              name="experience"
              type="number"
              placeholder="Enter experience"
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:text-black`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.experience || ""}
            />
            {formik.errors.experience && (
              <p className="mt-1 text-sm text-red-600">
                {formik.errors.experience?.toString()}
              </p>
            )}
          </div>

          {/* Job Status */}
          <div className="space-y-2">
            <label
              htmlFor="isJobActive"
              className="block text-sm font-medium text-gray-700"
            >
              Job Status <span className="text-red-500">*</span>
            </label>
            <select
              id="isJobActive"
              name="isJobActive"
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:text-black`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.isJobActive || ""}
            >
              <option value="">Select Status</option>
              <option value="Active">Active</option>
              <option value="OnHold">On Hold</option>
              <option value="Closed">Closed</option>
            </select>
            {formik.errors.isJobActive && (
              <p className="mt-1 text-sm text-red-600">
                {formik.errors.isJobActive?.toString()}
              </p>
            )}
          </div>

          {/* Job Post Type */}
          <div className="space-y-2">
            <label
              htmlFor="jobPostType"
              className="block text-sm font-medium text-gray-700"
            >
              Job Post Type <span className="text-red-500">*</span>
            </label>
            <select
              id="jobPostType"
              name="jobPostType"
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:text-black`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.jobPostType || ""}
            >
              <option value="">Select Post Type</option>
              <option value="Replacement">Replacement</option>
              <option value="New">New</option>
              <option value="Temporary">Temporary</option>
            </select>
            {formik.errors.jobPostType && (
              <p className="mt-1 text-sm text-red-600">
                {formik.errors.jobPostType?.toString()}
              </p>
            )}
          </div>

          {/* Inserted By */}
          <div className="space-y-2">
            <label
              htmlFor="insertedBy"
              className="block text-sm font-medium text-gray-700"
            >
              Inserted By
            </label>
            <input
              id="insertedBy"
              name="insertedBy"
              type="text"
              placeholder="Enter name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:text-black"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.insertedBy || ""}
            />
            {formik.errors.insertedBy && (
              <p className="mt-1 text-sm text-red-600">
                {formik.errors.insertedBy?.toString()}
              </p>
            )}
          </div>

          {/* JD File Upload */}
          <div className="space-y-2 md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Upload JD File <span className="text-red-500">*</span>
            </label>
            <div className="mt-1 flex items-center">
              <div
                className={`flex-1 ${
                  uploadedFile
                    ? "border-green-300 bg-green-50"
                    : "border-gray-300"
                } border-dashed border-2 rounded-md px-6 pt-5 pb-6`}
              >
                <div className="space-y-1 text-center">
                  {!uploadedFile ? (
                    <>
                      <div className="flex text-sm text-gray-600 justify-center">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                        >
                          <span>Upload a file</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            accept=".pdf,.doc,.docx"
                            onChange={handleFileChange}
                            ref={fileInputRef}
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        PDF, DOC, DOCX up to 5MB
                      </p>
                      <div className="flex justify-center">
                        <Upload className="h-10 w-10 text-gray-400" />
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <FileText className="h-8 w-8 text-green-500 mr-2" />
                        <div className="text-left">
                          <p className="text-sm font-medium text-gray-900">
                            {uploadedFile.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {(uploadedFile.size / 1024).toFixed(2)} KB
                          </p>
                        </div>
                      </div>
                      <button
                        className="bg-blue-500 text-white rounded-full p-1 hover:bg-blue-600"
                        onClick={() => uploadJobDescription(uploadedFile)}
                      >
                        Upload
                      </button>
                      <button
                        type="button"
                        onClick={clearFile}
                        className="ml-2 bg-white rounded-full p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        <span className="sr-only">Remove file</span>
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          {formik.errors.jd && (
            <p className="mt-1 text-sm text-red-600">
              {formik.errors.jd?.toString()}
            </p>
          )}
        </div>

        {/* Job Description (Editor) */}
        <div className="space-y-2 mt-4">
          <label className="font-semibold text-gray-600">Job Description</label>
          <JoditEditor
            value={jd || ""}
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
          {formik.touched.jobDescription && formik.errors.jobDescription && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.jobDescription}
            </div>
          )}
        </div>

        {/* Form Actions */}
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
            Add
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
  );
};
