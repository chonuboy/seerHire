import { useFormik } from "formik";
import { Interview, interviewRoundSchema } from "@/lib/models/candidate";
import { createInterviewRound } from "@/api/interviews/InterviewRounds";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, parseISO, isValid } from "date-fns";

export default function AddRound({
  className,
  interviewId,
  onclose,
  roundNumber,
  masterTechnologies,
}: {
  className?: string;
  interviewId?: number | string | string[] | undefined | null;
  onclose?: () => void;
  roundNumber?: number;
  masterTechnologies?: any[] | undefined | null;
}) {
  const formik = useFormik({
    initialValues: {
      // roundNumber: undefined,
      roundDate: "",
      interviewerName: "",
      interviewStatus: "Scheduled",
      technologyInterviewed: "",
      techRating: undefined,
      softskillsRating: undefined,
      remarks: "",
      interview: {
        interviewId: interviewId,
      },
    },
    validationSchema: interviewRoundSchema,
    onSubmit: async (values) => {
      console.log(interviewId);
      console.log(values);

      try {
        await createInterviewRound(values).then((data) => {
          if (data.status === 200) {
            toast.success("Round added successfully", {
              position: "top-right",
            });
          }else{
            toast.error(data.message, {
              position: "top-right",
            });
          }
          if (onclose) onclose();
        });
      } catch (err) {
        console.error(err);
        toast.error("Failed to add round", {
          position: "top-right",
        });
      }
    },
  });

  return (
    <div className={`${className}`}>
      <div className="w-full max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-semibold mb-6 dark:text-black">
          Add New Round
        </h1>

        <form className="space-y-6" onSubmit={formik.handleSubmit}>
          {/* Interview Date */}
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="roundDate"
              className="block text-sm font-medium dark:text-black"
            >
              Interview Date <span className="text-red-500">*</span>
            </label>
            <DatePicker
              id="roundDate"
              name="roundDate"
              selected={
                formik.values.roundDate
                  ? parseISO(formik.values.roundDate)
                  : null
              }
              onChange={(date: Date | null) => {
                if (date) {
                  // Store in ISO format
                  formik.setFieldValue("roundDate", format(date, "yyyy-MM-dd"));
                } else {
                  formik.setFieldValue("roundDate", null);
                }
              }}
              dateFormat="dd/MM/yyyy"
              placeholderText="dd/mm/yyyy"
              className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-black"
              maxDate={new Date()}
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
            />
            {formik.touched.roundDate && formik.errors.roundDate ? (
              <div className="text-red-500 text-sm">
                {formik.errors.roundDate.toString()}
              </div>
            ) : null}
          </div>

          {/* Round Number */}
          {/* <div className="space-y-2">
            <label
              htmlFor="roundNumber"
              className="block text-sm font-medium dark:text-black"
            >
              Round Number<span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="roundNumber"
              name="roundNumber"
              value={formik.values.roundNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-black"
            />
            {formik.touched.roundNumber && formik.errors.roundNumber && (
              <div className="text-red-500 text-sm">
                {formik.errors.roundNumber}
              </div>
            )}
          </div> */}

          {/* Interviewer Name */}
          <div className="space-y-2">
            <label
              htmlFor="interviewerName"
              className="block text-sm font-medium dark:text-black"
            >
              Interviewer Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="interviewerName"
              name="interviewerName"
              value={formik.values.interviewerName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter Interviewer Name"
              className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-black"
            />
            {formik.touched.interviewerName &&
              formik.errors.interviewerName && (
                <div className="text-red-500 text-sm">
                  {formik.errors.interviewerName}
                </div>
              )}
          </div>

          {/* Interview Status */}
          <div className="space-y-2">
            <span className="block text-sm font-medium dark:text-black">
              Interview Status <span className="text-red-500">*</span>
            </span>
            <div className="flex gap-4">
              {["Passed", "Rejected", "On-Hold", "Pending"].map((status) => (
                <label key={status} className="inline-flex items-center">
                  <input
                    type="radio"
                    name="interviewStatus"
                    value={status}
                    checked={formik.values.interviewStatus === status}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="form-radio text-blue-600"
                  />
                  <span className="ml-2 dark:text-black">{status}</span>
                </label>
              ))}
            </div>
            {formik.touched.interviewStatus &&
              formik.errors.interviewStatus && (
                <div className="text-red-500 text-sm">
                  {formik.errors.interviewStatus}
                </div>
              )}
          </div>

          {/* Remarks */}
          <div className="space-y-2">
            <label
              htmlFor="remarks"
              className="block text-sm font-medium dark:text-black"
            >
              Remarks<span className="text-red-500">*</span>
            </label>
            <textarea
              id="remarks"
              name="remarks"
              value={formik.values.remarks}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter Remarks"
              className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px] dark:text-black"
            />
            {formik.touched.remarks && formik.errors.remarks && (
              <div className="text-red-500 text-sm">
                {formik.errors.remarks}
              </div>
            )}
          </div>

          {/* Tech Rating */}
          <div className="space-y-2">
            <label
              htmlFor="techRating"
              className="block text-sm font-medium dark:text-black"
            >
              Tech Rating<span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="techRating"
              name="techRating"
              value={formik.values.techRating || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter Rating from 1 to 10"
              min="1"
              max="10"
              className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-black"
            />
            {formik.touched.techRating && formik.errors.techRating && (
              <div className="text-red-500 text-sm">
                {formik.errors.techRating}
              </div>
            )}
          </div>

          {/* Soft Skills Rating */}
          <div className="space-y-2">
            <label
              htmlFor="softskillsRating"
              className="block text-sm font-medium dark:text-black"
            >
              Soft Skill Rating<span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="softskillsRating"
              name="softskillsRating"
              value={formik.values.softskillsRating || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter Rating from 1 to 10"
              min="1"
              max="10"
              className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-black"
            />
            {formik.touched.softskillsRating &&
              formik.errors.softskillsRating && (
                <div className="text-red-500 text-sm">
                  {formik.errors.softskillsRating}
                </div>
              )}
          </div>

          {/* Technology Interviewed */}
          <div className="space-y-2">
            <label
              htmlFor="technologyInterviewed"
              className="block text-sm font-medium dark:text-black"
            >
              Technology Interviewed<span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2">
              <select
                name=""
                id=""
                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-black"
                onChange={(e) =>
                  formik.setFieldValue("technologyInterviewed", e.target.value)
                }
                value={formik.values.technologyInterviewed}
              >
                <option value="">Select a Skill</option>
                {masterTechnologies?.map((skill: any, index: number) => (
                  <option key={index} value={skill.technology}>
                    {skill.technology}
                  </option>
                ))}
              </select>
            </div>
            {formik.touched.technologyInterviewed &&
              formik.errors.technologyInterviewed && (
                <div className="text-red-500 text-sm">
                  {formik.errors.technologyInterviewed}
                </div>
              )}
          </div>

          {/* Submit and Cancel Buttons */}
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
              onClick={onclose}
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
