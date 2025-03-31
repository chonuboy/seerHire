import { ClientInfo } from "@/lib/models/client";
import { useFormik } from "formik";
import { jobFormSchema } from "@/lib/models/client";
import { createJob } from "@/api/client/clientJob";
import { useState } from "react";
import dynamic from 'next/dynamic';
// import JoditEditor from "jodit-react";
const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

export const AddJob = ({
  client,
  autoClose,
}: {
  client?: ClientInfo | null;
  autoClose: () => void;
}) => {
  const [jd, setJobDescription] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      jobCode: null,
      jobTitle: null,
      salaryInCtc: null,
      jd: null,
      experience: null,
      jobDescription: null as string | null,
      isJobActive: null,
      jobPostType: null,
      postCreatedOn: null,
      insertedBy: null,
      client: client,
    },
    validationSchema: jobFormSchema,
    onSubmit: async (values) => {
      console.log(values);
      if (jd) {
        values.jobDescription = jd?.replace(/\s+style="[^"]*"/g, "")
          .replace(/\s+/g, "")
          .replace(/&nbsp;/g, "");
      }
      createJob(values).then((res) => console.log(res)).catch((err) => console.log(err));
      autoClose();
    },
  });

  return (
    <div className="mt-16 p-2 bg-white rounded-md space-y-4">
      <p className="text-xl font-semibold">Add New Job</p>
      <form onSubmit={formik.handleSubmit}>
        <div className="grid gap-4 grid-cols-1">
          {/* Job Title */}
          <div className="space-y-2">
            <label htmlFor="jobTitle" className="font-semibold text-blue-500">
              Job Title
            </label>
            <input
              id="jobTitle"
              name="jobTitle"
              type="text"
              placeholder="Job Title"
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.jobTitle ? formik.values.jobTitle : ""}
            />
          </div>

          {/* Job Code */}
          <div className="space-y-2">
            <label htmlFor="jobCode" className="font-semibold text-blue-500">
              Job Code
            </label>
            <input
              id="jobCode"
              name="jobCode"
              type="text"
              placeholder="Job Code"
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.jobCode ? formik.values.jobCode : ""}
            />
          </div>

          {/* Job Description (Editor) */}
          <div className="space-y-2">
            <label className="font-semibold text-blue-500">Job Description</label>
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
            />
          </div>

          {/* Salary */}
          <div className="space-y-2">
            <label htmlFor="salaryInCtc" className="font-semibold text-blue-500">
              Salary (In CTC)
            </label>
            <input
              id="salaryInCtc"
              name="salaryInCtc"
              type="text"
              placeholder="Salary"
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.salaryInCtc ? formik.values.salaryInCtc : ""}
            />
          </div>

          {/* Experience */}
          <div className="space-y-2">
            <label htmlFor="experience" className="font-semibold text-blue-500">
              Experience (In Years)
            </label>
            <input
              id="experience"
              name="experience"
              type="text"
              placeholder="Experience"
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.experience ? formik.values.experience : ""}
            />
          </div>

          {/* Job Status */}
          <div className="space-y-2">
            <label htmlFor="isJobActive" className="font-semibold text-blue-500">
              Job Status
            </label>
            <select
              id="isJobActive"
              name="isJobActive"
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.isJobActive ? formik.values.isJobActive : ""}
            >
              <option value="">Select Status</option>
              <option value="Active">Active</option>
              <option value="Closed">Inactive</option>
            </select>
          </div>

          {/* Job Post Type */}
          <div className="space-y-2">
            <label htmlFor="jobPostType" className="font-semibold text-blue-500">
              Job Post Type
            </label>
            <select className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500" name="jobPPostType" id="jobPostType" onChange={(e) => formik.setFieldValue("jobPostType", e.target.value)} onBlur={formik.handleBlur} value={formik.values.jobPostType ? formik.values.jobPostType : ""}>
              <option value="">Select Post Type</option>
              <option value="Replacement">Replacement</option>
              <option value="New">New</option>
            </select>
          </div>

          {/* Created On */}
          <div className="space-y-2">
            <label htmlFor="postCreatedOn" className="font-semibold text-blue-500">
              Created On
            </label>
            <input
              id="postCreatedOn"
              name="postCreatedOn"
              type="date"
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.postCreatedOn ? formik.values.postCreatedOn : ""}
            />
          </div>

          {/* Inserted By */}
          <div className="space-y-2">
            <label htmlFor="insertedBy" className="font-semibold text-blue-500">
              Inserted By
            </label>
            <input
              id="insertedBy"
              name="insertedBy"
              type="text"
              placeholder="Inserted By"
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.insertedBy ? formik.values.insertedBy : ""}
            />
          </div>
        </div>

        {/* Submit Button (Only Show if Job Description is Filled) */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 mt-6 rounded-md hover:bg-blue-700 transition duration-300"
        >
          Submit
        </button>
        <button className="w-full bg-red-600 text-white py-2 mt-6 rounded-md hover:bg-red-700 transition duration-300" onClick={autoClose}>Cancel</button>
      </form>
    </div>
  );
};
