import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { updateInterviewRound } from "@/api/interviews/InterviewRounds";
import { useFormik } from "formik";
import { interviewFormSchema } from "@/lib/models/candidate";
export default function InterviewForm({
  className,
  initialValues,
  id,
  autoClose,
}: {
  className?: string;
  initialValues: any;
  id: number;
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
      console.log(updatedFields);
      // Call your API here with updatedFields
      try {
        updateInterviewRound(id, updatedFields).then((data) => {
          console.log(data);
          autoClose();
        })
      } catch (error) {}
    },
  });
  return (
    <div className={`${className}`}>
      <div className="w-full max-w-2xl mx-auto p-4">
        <h1 className="text-2xl font-semibold mb-6">Update Round</h1>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            {/* Interview Date */}
            <div className="space-y-2">
              <label
                htmlFor="interviewDate"
                className="text-gray-400 font-medium"
              >
                Interview Date
              </label>
              <input
                id="interviewDate"
                name="interviewDate"
                type="date"
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.roundDate}
              />
              {formik.touched.roundDate && formik.errors.roundDate ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.roundDate.toString()}
                </div>
              ) : null}
            </div>

            {/* Interviewer Name */}
            <div className="space-y-2">
              <label
                htmlFor="interviewerName"
                className="text-gray-400 font-medium"
              >
                Interviewer Name
              </label>
              <input
                id="interviewerName"
                name="interviewerName"
                type="text"
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.interviewerName}
              />
              {formik.touched.interviewerName &&
              formik.errors.interviewerName ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.interviewerName.toString()}
                </div>
              ) : null}
            </div>

            {/* Interview Status */}
            <div className="space-y-2">
              <label htmlFor="status" className="text-gray-400 font-medium">
                Interview Status
              </label>
              <div className="flex gap-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="status"
                    value="passed"
                    checked={formik.values.status === "passed"}
                    onChange={formik.handleChange}
                  />
                  <span className="ml-2">Passed</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="status"
                    value="rejected"
                    checked={formik.values.status === "rejected"}
                    onChange={formik.handleChange}
                  />
                  <span className="ml-2">Rejected</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="status"
                    value="On-Hold"
                    checked={formik.values.status === "On-Hold"}
                    onChange={formik.handleChange}
                  />
                  <span className="ml-2">On Hold</span>
                </label>
              </div>
              {formik.touched.status && formik.errors.status ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.status.toString()}
                </div>
              ) : null}
            </div>

            {/* Remarks */}
            <div className="space-y-2">
              <label htmlFor="remarks" className="text-gray-400 font-medium">
                Remarks
              </label>
              <textarea
                id="remarks"
                name="remarks"
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.remarks}
              />
              {formik.touched.remarks && formik.errors.remarks ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.remarks.toString()}
                </div>
              ) : null}
            </div>

            {/* Tech Rating */}
            {initialValues.techRating !== undefined && (
              <div className="space-y-2">
                <label
                  htmlFor="techRating"
                  className="text-gray-400 font-medium"
                >
                  Tech Rating
                </label>
                <input
                  id="techRating"
                  name="techRating"
                  type="number"
                  min="1"
                  max="10"
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.techRating}
                />
                {formik.touched.techRating && formik.errors.techRating ? (
                  <div className="text-red-500 text-sm">
                    {formik.errors.techRating.toString()}
                  </div>
                ) : null}
              </div>
            )}

            {/* Soft Skills Rating */}
            {initialValues.softskillsRating !== undefined && (
              <div className="space-y-2">
                <label
                  htmlFor="softskillsRating"
                  className="text-gray-400 font-medium"
                >
                  Soft Skills Rating
                </label>
                <input
                  id="softskillsRating"
                  name="softskillsRating"
                  type="number"
                  min="1"
                  max="10"
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.softskillsRating}
                />
                {formik.touched.softskillsRating &&
                formik.errors.softskillsRating ? (
                  <div className="text-red-500 text-sm">
                    {formik.errors.softskillsRating.toString()}
                  </div>
                ) : null}
              </div>
            )}

            {/* Technologies Interviewed */}
            {initialValues.technologyInterviewed && (
              <div className="space-y-4">
                <label className="text-gray-400 font-medium">
                  Technologies Interviewed
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter Single or Multiple Technologies"
                    className="flex-grow p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                    value={formik.values.technologyInterviewed}
                    onChange={(e) =>
                      formik.setFieldValue("technologyInterviewed", e.target.value)
                    }
                  />
                </div>
              </div>
            )}
          </div>

          {/* Submit and Cancel Buttons */}
          <div className="flex gap-4">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Update
            </button>
            <button
              type="button"
              onClick={autoClose}
              className="w-full bg-red-600 hover:bg-red-700 transition duration-300 text-white py-2 rounded-md"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
