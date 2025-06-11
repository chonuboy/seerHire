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
          } else {
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
    <div className="min-h-screen py-12 px-4 mt-8">
      <div className="bg-white shadow-lg rounded-2xl mx-auto max-w-4xl">
        {/* Header */}
        <div className="px-8 py-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">Add New Round</h1>
        </div>

        <form className="p-8" onSubmit={formik.handleSubmit}>
          {/* Interview Date */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-cyan-500 mb-8">
              Interview Details
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-6">
              <div>
                <label
                  htmlFor="roundDate"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Interview Date
                  <span className="text-red-500">*</span>
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
                  className="w-full px-0 py-1 border-0 border-b border-gray-300 focus:border-blue-500 focus:ring-0 text-sm placeholder-gray-400 focus:outline-none"
                  maxDate={new Date()}
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                />
                {formik.touched.roundDate && formik.errors.roundDate ? (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.roundDate.toString()}
                  </div>
                ) : null}
              </div>

              {/* Interviewer Name */}
              <div>
                <label
                  htmlFor="interviewerName"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Interviewer Name
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="interviewerName"
                  name="interviewerName"
                  value={formik.values.interviewerName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Enter Interviewer Name"
                  className="w-full px-0 py-1 border-0 border-b border-gray-300 focus:border-blue-500 focus:ring-0 text-sm placeholder-gray-400 focus:outline-none"
                />
                {formik.touched.interviewerName &&
                  formik.errors.interviewerName && (
                    <div className="text-red-500 text-sm mt-1">
                      {formik.errors.interviewerName}
                    </div>
                  )}
              </div>
            </div>
          </div>

          {/* Interview Status */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-cyan-500 mb-8">
              Evaluation
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-6">
              <div>
                <span className="block text-sm font-semibold text-gray-700 mb-2">
                  Interview Status
                  <span className="text-red-500">*</span>
                </span>
                <div className="flex gap-4 mt-4">
                  {["Passed", "Rejected", "On-Hold", "Pending"].map(
                    (status) => (
                      <label key={status} className="inline-flex items-center">
                        <input
                          type="radio"
                          name="interviewStatus"
                          value={status}
                          checked={formik.values.interviewStatus === status}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className="form-radio text-blue-500 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-gray-700 text-sm">
                          {status}
                        </span>
                      </label>
                    )
                  )}
                </div>
                {formik.touched.interviewStatus &&
                  formik.errors.interviewStatus && (
                    <div className="text-red-500 text-sm mt-1">
                      {formik.errors.interviewStatus}
                    </div>
                  )}
              </div>

              {/* Technology Interviewed */}
              <div>
                <label
                  htmlFor="technologyInterviewed"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Technology Interviewed
                  <span className="text-red-500">*</span>
                </label>
                <select
                  name="technologyInterviewed"
                  className="w-full px-0 py-1 border-0 border-b border-gray-300 focus:border-blue-500 focus:ring-0 text-sm placeholder-gray-400 focus:outline-none"
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
                {formik.touched.technologyInterviewed &&
                  formik.errors.technologyInterviewed && (
                    <div className="text-red-500 text-sm mt-1">
                      {formik.errors.technologyInterviewed}
                    </div>
                  )}
              </div>
            </div>
          </div>

          {/* Ratings and Remarks */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-cyan-500 mb-8">
              Ratings
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-6">
              {/* Tech Rating */}
              <div>
                <label
                  htmlFor="techRating"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Tech Rating
                  <span className="text-red-500">*</span>
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
                  className="w-full px-0 py-1 border-0 border-b border-gray-300 focus:border-blue-500 focus:ring-0 text-sm placeholder-gray-400 focus:outline-none"
                />
                {formik.touched.techRating && formik.errors.techRating && (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.techRating}
                  </div>
                )}
              </div>

              {/* Soft Skills Rating */}
              <div>
                <label
                  htmlFor="softskillsRating"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Soft Skill Rating
                  <span className="text-red-500">*</span>
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
                  className="w-full px-0 py-1 border-0 border-b border-gray-300 focus:border-blue-500 focus:ring-0 text-sm placeholder-gray-400 focus:outline-none"
                />
                {formik.touched.softskillsRating &&
                  formik.errors.softskillsRating && (
                    <div className="text-red-500 text-sm mt-1">
                      {formik.errors.softskillsRating}
                    </div>
                  )}
              </div>
            </div>

            {/* Remarks */}
            <div>
              <label
                htmlFor="remarks"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Remarks
                <span className="text-red-500">*</span>
              </label>
              <textarea
                id="remarks"
                name="remarks"
                value={formik.values.remarks}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter Remarks"
                className="w-full px-0 py-1 border-0 border-b border-gray-300 focus:border-blue-500 focus:ring-0 text-sm placeholder-gray-400 focus:outline-none min-h-[100px]"
              />
              {formik.touched.remarks && formik.errors.remarks && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.remarks}
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6 justify-end">
            <button
              type="button"
              onClick={onclose}
              className="flex-1 sm:flex-none sm:px-8 py-2 border-2 border-cyan-500 text-cyan-500 rounded-lg hover:bg-cyan-50 transition-colors duration-200 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 sm:flex-none sm:px-8 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors duration-200 font-medium"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
