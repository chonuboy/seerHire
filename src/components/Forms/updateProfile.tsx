import { useFormik } from "formik";
import { profileUpdateSchema } from "@/lib/models/candidate";
import { toast } from "react-toastify";
import { updateCandidate } from "@/api/candidates/candidates";
const ProfileUpdateForm = ({ initialValues,id,autoClose }: { initialValues: any,id:number,autoClose: () => void }) => {
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
    validationSchema: profileUpdateSchema,
    onSubmit: (values) => {
      // Compute updated fields
      const updatedFields = getUpdatedFields(initialValues, values);

      // Send only updated fields to the backend
      console.log("Updated fields:", updatedFields);
      // Call your API here with updatedFields
      try {
        updateCandidate(updatedFields, id);
        toast.success("Profile updated successfully", {
          position: "top-right",
        });
        autoClose();
      } catch (error) {
        console.error("Error updating profile:", error);
        toast.error("Failed to update profile. Please try again.", {
          position: "top-right",
        });
      }
    },
  });

  

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* First Name */}
        <div className="space-y-2">
          <label htmlFor="firstName" className="text-gray-400 font-medium">
            First Name
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            placeholder="e.g. John"
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.firstName}
          />
          {formik.touched.firstName && formik.errors.firstName ? (
            <div className="text-red-500 text-sm">
              {formik.errors.firstName.toString()}
            </div>
          ) : null}
        </div>

        {/* Last Name */}
        <div className="space-y-2">
          <label htmlFor="lastName" className="text-gray-400 font-medium">
            Last Name
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            placeholder="e.g. Doe"
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.lastName}
          />
          {formik.touched.lastName && formik.errors.lastName ? (
            <div className="text-red-500 text-sm">
              {formik.errors.lastName.toString()}
            </div>
          ) : null}
        </div>

        {/* Candidate Status */}
        <div className="space-y-2">
          <label htmlFor="isActive" className="text-gray-400 font-medium">
            Candidate Status
          </label>
          <div>
            <div className="flex items-center gap-2">
              <input
                id="status_active"
                name="isActive"
                type="radio"
                value="true"
                onChange={formik.handleChange}
                checked={formik.values.isActive === true}
              />
              <label htmlFor="status_active">Active</label>
            </div>
            <div className="flex items-center gap-2">
              <input
                id="status_inactive"
                name="isActive"
                type="radio"
                value="false"
                onChange={formik.handleChange}
                checked={formik.values.isActive === false}
              />
              <label htmlFor="status_inactive">Inactive</label>
            </div>
          </div>
          {formik.touched.isActive && formik.errors.isActive ? (
            <div className="text-red-500 text-sm">
              {formik.errors.isActive.toString()}
            </div>
          ) : null}
        </div>

        {/* Tech Role */}
        <div className="space-y-2">
          <label htmlFor="designation" className="text-gray-400 font-medium">
            Tech Role
          </label>
          <input
            id="designation"
            name="designation"
            type="text"
            placeholder="e.g. Software Engineer"
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.designation}
          />
          {formik.touched.designation && formik.errors.designation ? (
            <div className="text-red-500 text-sm">
              {formik.errors.designation.toString()}
            </div>
          ) : null}
        </div>

        {/* Total Experience */}
        <div className="space-y-2">
          <label
            htmlFor="totalExperience"
            className="text-gray-400 font-medium"
          >
            Total Experience (Years)
          </label>
          <input
            id="totalExperience"
            name="totalExperience"
            type="number"
            placeholder="e.g. 5"
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.totalExperience}
          />
          {formik.touched.totalExperience && formik.errors.totalExperience ? (
            <div className="text-red-500 text-sm">
              {formik.errors.totalExperience.toString()}
            </div>
          ) : null}
        </div>

        {/* Highest Qualification */}
        <div className="space-y-2">
          <label
            htmlFor="highestEducation"
            className="text-gray-400 font-medium"
          >
            Highest Qualification
          </label>
          <input
            id="highestEducation"
            name="highestEducation"
            placeholder="e.g. Bachelor's in Computer Science"
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.highestEducation}
          />
          {formik.touched.highestEducation && formik.errors.highestEducation ? (
            <div className="text-red-500 text-sm">
              {formik.errors.highestEducation.toString()}
            </div>
          ) : null}
        </div>

        {/* Mobile Number */}
        <div className="space-y-2">
          <label htmlFor="primaryNumber" className="text-gray-400 font-medium">
            Mobile Number
          </label>
          <input
            id="primaryNumber"
            name="primaryNumber"
            type="tel"
            placeholder="e.g. +1234567890"
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.primaryNumber}
          />
          {formik.touched.primaryNumber && formik.errors.primaryNumber ? (
            <div className="text-red-500 text-sm">
              {formik.errors.primaryNumber.toString()}
            </div>
          ) : null}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label htmlFor="emailId" className="text-gray-400 font-medium">
            Email
          </label>
          <input
            id="emailId"
            name="emailId"
            type="email"
            placeholder="e.g. john@example.com"
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.emailId}
          />
          {formik.touched.emailId && formik.errors.emailId ? (
            <div className="text-red-500 text-sm">
              {formik.errors.emailId.toString()}
            </div>
          ) : null}
        </div>

        {/* Current Salary */}
        <div className="space-y-2">
          <label htmlFor="currentSalary" className="text-gray-400 font-medium">
            Current Salary
          </label>
          <input
            id="currentSalary"
            name="currentSalary"
            type="number"
            placeholder="e.g. 50000"
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.currentSalary}
          />
          {formik.touched.currentSalary && formik.errors.currentSalary ? (
            <div className="text-red-500 text-sm">
              {formik.errors.currentSalary.toString()}
            </div>
          ) : null}
        </div>

        {/* Preferred Job Type */}
        <div className="space-y-2">
          <label
            htmlFor="preferredJobType"
            className="text-gray-400 font-medium"
          >
            Preferred Job Type
          </label>
          <select
            id="preferredJobType"
            name="preferredJobType"
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.preferredJobType}
          >
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
            <option value="contract">Contract</option>
          </select>
          {formik.touched.preferredJobType && formik.errors.preferredJobType ? (
            <div className="text-red-500 text-sm">
              {formik.errors.preferredJobType.toString()}
            </div>
          ) : null}
        </div>

        {/* Gender */}
        <div className="space-y-2">
          <label htmlFor="gender" className="text-gray-400 font-medium">
            Gender
          </label>
          <select
            id="gender"
            name="gender"
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.gender}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {formik.touched.gender && formik.errors.gender ? (
            <div className="text-red-500 text-sm">
              {formik.errors.gender.toString()}
            </div>
          ) : null}
        </div>

        {/* Notice Period */}
        <div className="space-y-2">
          <label htmlFor="noticePeriod" className="text-gray-400 font-medium">
            Notice Period (Days)
          </label>
          <input
            id="noticePeriod"
            name="noticePeriod"
            type="number"
            placeholder="e.g. 30"
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.noticePeriod}
          />
          {formik.touched.noticePeriod && formik.errors.noticePeriod ? (
            <div className="text-red-500 text-sm">
              {formik.errors.noticePeriod.toString()}
            </div>
          ) : null}
        </div>

        {/* Marital Status */}
        <div className="space-y-2">
          <label htmlFor="maritalStatus" className="text-gray-400 font-medium">
            Marital Status
          </label>
          <select
            id="maritalStatus"
            name="maritalStatus"
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.maritalStatus}
          >
            <option value="single">Single</option>
            <option value="married">Married</option>
          </select>
          {formik.touched.maritalStatus && formik.errors.maritalStatus ? (
            <div className="text-red-500 text-sm">
              {formik.errors.maritalStatus.toString()}
            </div>
          ) : null}
        </div>

        {/* Current Location */}
        <div className="space-y-2">
          <label
            htmlFor="currentLocation"
            className="text-gray-400 font-medium"
          >
            Current Location
          </label>
          <input
            id="currentLocation"
            name="currentLocation"
            placeholder="e.g. Los Angeles"
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.currentLocation.locationDetails}
          />
          {formik.touched.currentLocation && formik.errors.currentLocation ? (
            <div className="text-red-500 text-sm">
              {formik.errors.currentLocation.toString()}
            </div>
          ) : null}
        </div>

        {/* Address */}
        <div className="space-y-2">
          <label htmlFor="address1" className="text-gray-400 font-medium">
            Address
          </label>
          <input
            id="address1"
            name="address1"
            placeholder="e.g. 123 Main St"
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.address1}
          />
          {formik.touched.address1 && formik.errors.address1 ? (
            <div className="text-red-500 text-sm">
              {formik.errors.address1.toString()}
            </div>
          ) : null}
        </div>

        {/* Address Locality */}
        <div className="space-y-2">
          <label
            htmlFor="addressLocality"
            className="text-gray-400 font-medium"
          >
            Address Locality
          </label>
          <input
            id="addressLocality"
            name="addressLocality"
            placeholder="e.g. Downtown"
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.addressLocality}
          />
          {formik.touched.addressLocality && formik.errors.addressLocality ? (
            <div className="text-red-500 text-sm">
              {formik.errors.addressLocality.toString()}
            </div>
          ) : null}
        </div>

        {/* Differently Abled Type */}
        <div className="space-y-2">
          <label
            htmlFor="differentlyAbledType"
            className="text-gray-400 font-medium"
          >
            Differently Abled Type
          </label>
          <input
            id="differentlyAbledType"
            name="differentlyAbledType"
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.differentlyAbledType}
          />
          {formik.touched.differentlyAbledType &&
          formik.errors.differentlyAbledType ? (
            <div className="text-red-500 text-sm">
              {formik.errors.differentlyAbledType.toString()}
            </div>
          ) : null}
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
      >
        Submit
      </button>
      <button onClick={autoClose} className="w-full bg-red-600 hover:bg-red-700 transition duration-300 text-white py-2 rounded-md">
        Cancel
      </button>
    </form>
  );
};

export default ProfileUpdateForm;
