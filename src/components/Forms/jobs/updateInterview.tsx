import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { toast } from "react-toastify";
import { updateInterviewRound } from "@/api/interviews/InterviewRounds";
import { useFormik } from "formik";
import { interviewFormSchema } from "@/lib/models/candidate";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, parseISO, isValid } from "date-fns";
export default function InterviewForm({
  className,
  masterTechnologies,
  initialValues,
  id,
  autoClose,
}: {
  className?: string;
  initialValues: any;
  id: number;
  masterTechnologies: any;
  autoClose: () => void;
}) {
  // States for form fields
  const getUpdatedFields = (initialValues: any, values: any) => {
    return Object.keys(values).reduce((acc: Record<string, any>, key) => {
      if (values[key] !== initialValues[key]) {
        acc[key] = values[key];
      }
      return acc;
    }, {});
  };

  const formik = useFormik({
    initialValues: initialValues, // Pass initialValues from props
    validationSchema: interviewFormSchema,
    onSubmit: (values) => {
      // Compute updated fields
      const updatedFields = getUpdatedFields(initialValues, values);
      delete updatedFields.interview;
      console.log(updatedFields);

      // Call your API here with updatedFields
      try {
        updateInterviewRound(id, updatedFields).then((data) => {
          console.log(data);
          if (data.status === 200) {
            toast.success("Interview updated successfully", {
              position: "top-right",
            });
            autoClose();
          }else{
            toast.error(data.message, {
              position: "top-right",
            })
          }
        });
      } catch (error) {
        console.error("Form submission error", error);
      }
    },
  });
  return (
    <div className="mt-4 mb-4 w-full max-w-2xl mx-auto sm:px-2 lg:p-4">
      <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg dark:text-black">
        <div className="p-6 sm:p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <svg
              className="w-6 h-6 mr-2 text-blue-600"
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
            Update Round
          </h1>

          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <div className="space-y-6">
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
                      formik.setFieldValue(
                        "roundDate",
                        format(date, "yyyy-MM-dd")
                      );
                    } else {
                      formik.setFieldValue("roundDate", null);
                    }
                  }}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="dd/mm/yyyy"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-black focus:border-blue-500 transition-all duration-300"
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

              {/* Interviewer Name */}
              <div className="space-y-2 transition-all duration-200">
                <label
                  htmlFor="interviewerName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Interviewer Name
                </label>
                <input
                  id="interviewerName"
                  name="interviewerName"
                  type="text"
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ${
                    formik.touched.interviewerName &&
                    formik.errors.interviewerName
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.interviewerName}
                />
                {formik.touched.interviewerName &&
                formik.errors.interviewerName ? (
                  <div className="text-red-500 text-sm mt-1 animate-fadeIn">
                    {formik.errors.interviewerName.toString()}
                  </div>
                ) : null}
              </div>

              {/* Interview Status */}
              <div className="space-y-2 transition-all duration-200">
                <label className="block text-sm font-medium text-gray-700">
                  Interview Status
                </label>
                <div className="flex flex-wrap gap-4">
                  {["Passed", "Rejected", "On-Hold", "Pending"].map(
                    (status) => (
                      <label
                        key={status}
                        className="inline-flex items-center cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="interviewStatus"
                          value={status}
                          checked={formik.values.interviewStatus === status}
                          onChange={formik.handleChange}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 transition duration-150 ease-in-out"
                        />
                        <span className="ml-2 text-sm text-gray-700">
                          {status}
                        </span>
                      </label>
                    )
                  )}
                </div>
                {formik.touched.interviewStatus &&
                formik.errors.interviewStatus ? (
                  <div className="text-red-500 text-sm mt-1 animate-fadeIn">
                    {formik.errors.interviewStatus.toString()}
                  </div>
                ) : null}
              </div>

              {/* Remarks */}
              <div className="space-y-2 transition-all duration-200">
                <label
                  htmlFor="remarks"
                  className="block text-sm font-medium text-gray-700"
                >
                  Remarks
                </label>
                <textarea
                  id="remarks"
                  name="remarks"
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 min-h-[100px] ${
                    formik.touched.remarks && formik.errors.remarks
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.remarks}
                />
                {formik.touched.remarks && formik.errors.remarks ? (
                  <div className="text-red-500 text-sm mt-1 animate-fadeIn">
                    {formik.errors.remarks.toString()}
                  </div>
                ) : null}
              </div>

              {/* Tech Rating */}
              {initialValues.techRating !== undefined && (
                <div className="space-y-2 transition-all duration-200">
                  <label
                    htmlFor="techRating"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Tech Rating
                    <span className="ml-1 text-xs text-gray-500">(1-10)</span>
                  </label>
                  <input
                    id="techRating"
                    name="techRating"
                    type="number"
                    min="1"
                    max="10"
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ${
                      formik.touched.techRating && formik.errors.techRating
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.techRating}
                  />
                  {formik.touched.techRating && formik.errors.techRating ? (
                    <div className="text-red-500 text-sm mt-1 animate-fadeIn">
                      {formik.errors.techRating.toString()}
                    </div>
                  ) : null}
                </div>
              )}

              {/* Soft Skills Rating */}
              {initialValues.softskillsRating !== undefined && (
                <div className="space-y-2 transition-all duration-200">
                  <label
                    htmlFor="softskillsRating"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Soft Skills Rating
                    <span className="ml-1 text-xs text-gray-500">(1-10)</span>
                  </label>
                  <input
                    id="softskillsRating"
                    name="softskillsRating"
                    type="number"
                    min="1"
                    max="10"
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ${
                      formik.touched.softskillsRating &&
                      formik.errors.softskillsRating
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.softskillsRating}
                  />
                  {formik.touched.softskillsRating &&
                  formik.errors.softskillsRating ? (
                    <div className="text-red-500 text-sm mt-1 animate-fadeIn">
                      {formik.errors.softskillsRating.toString()}
                    </div>
                  ) : null}
                </div>
              )}

              {/* Technologies Interviewed */}
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
                      formik.setFieldValue(
                        "technologyInterviewed",
                        e.target.value
                      )
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
              </div>
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
    </div>
  );
}
