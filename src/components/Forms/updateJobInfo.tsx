import { useFormik } from "formik";
import { toast } from "react-toastify";
import { jobFormSchema } from "@/lib/models/client";
import { updateJob } from "@/api/client/clientJob";

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
  const getUpdatedFields = (initialValues: any, values: any) => {
    return Object.keys(values).reduce((acc: Record<string, any>, key) => {
      if (values[key] !== initialValues[key]) {
        acc[key] = values[key];
      }
      return acc;
    }, {});
  };

  console.log(currentJob);


  // Formik setup
  const formik = useFormik({
    initialValues: currentJob,
    validationSchema: jobFormSchema,
    onSubmit: async (values) => {
      const updatedFields = getUpdatedFields(currentJob, values);
      console.log(id,updatedFields);
      try {
        updateJob(id,updatedFields).then((data) => {
            console.log(data);
        });
        toast.success("Job updated successfully", { position: "top-right" });
        autoClose(); // Close the form after successful update
      } catch (error: any) {
        toast.error(error.message || "An error occurred during update.", {
          position: "top-right",
        });
      }
    },
  });

  return (
    <div className="mx-auto max-w-3xl p-4 rounded-md">
    <h3 className="font-semibold text-lg">Update Job</h3>
      <form onSubmit={formik.handleSubmit} className="space-y-8 mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Experience */}
          <div className="space-y-2">
            <label htmlFor="experience" className="font-medium">
              Experience
            </label>
            <input
              id="experience"
              name="experience"
              type="number"
              value={formik.values.experience}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
            {formik.touched.experience && formik.errors.experience ? (
              <div className="text-red-500 text-sm">
                {formik.errors.experience.toString()}
              </div>
            ) : null}
          </div>

          {/* Status */}
          <div className="space-y-2">
            <label htmlFor="isJobActive" className="font-medium">
              Status
            </label>
            <select
              id="isJobActive"
              name="isJobActive"
              value={formik.values.isJobActive ? "true" : "false"}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            >
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
            {formik.touched.isJobActive && formik.errors.isJobActive ? (
              <div className="text-red-500 text-sm">
                {formik.errors.isJobActive.toString()}
              </div>
            ) : null}
          </div>

          {/* Budget */}
          <div className="space-y-2">
            <label htmlFor="salaryInCtc" className="font-medium">
              Budget (CTC)
            </label>
            <input
              id="salaryInCtc"
              name="salaryInCtc"
              type="number"
              value={formik.values.salaryInCtc}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
            {formik.touched.salaryInCtc && formik.errors.salaryInCtc ? (
              <div className="text-red-500 text-sm">
                {formik.errors.salaryInCtc.toString()}
              </div>
            ) : null}
          </div>

          {/* Job Code */}
          <div className="space-y-2">
            <label htmlFor="jobCode" className="font-medium">
              Job Code
            </label>
            <input
              id="jobCode"
              name="jobCode"
              type="text"
              value={formik.values.jobCode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
            {formik.touched.jobCode && formik.errors.jobCode ? (
              <div className="text-red-500 text-sm">
                {formik.errors.jobCode.toString()}
              </div>
            ) : null}
          </div>

          {/* Posted On */}
          <div className="space-y-2">
            <label htmlFor="createdOn" className="font-medium">
              Posted On
            </label>
            <input
              id="createdOn"
              name="createdOn"
              type="date"
              value={formik.values.createdOn}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
            {formik.touched.postCreatedOn && formik.errors.postCreatedOn ? (
              <div className="text-red-500 text-sm">
                {formik.errors.postCreatedOn.toString()}
              </div>
            ) : null}
          </div>

          {/* Inserted By */}
          <div className="space-y-2">
            <label htmlFor="insertedBy" className="font-medium">
              Inserted By
            </label>
            <input
              id="insertedBy"
              name="insertedBy"
              type="text"
              value={formik.values.insertedBy}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
            {formik.touched.insertedBy && formik.errors.insertedBy ? (
              <div className="text-red-500 text-sm">
                {formik.errors.insertedBy.toString()}
              </div>
            ) : null}
          </div>
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
  );
}