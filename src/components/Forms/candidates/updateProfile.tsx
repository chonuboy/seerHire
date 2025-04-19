import { useFormik } from "formik";
import { profileUpdateSchema } from "@/lib/models/candidate";
import { toast } from "react-toastify";
import { Dialog } from "@headlessui/react"; // or any other modal library
import { updateCandidate } from "@/api/candidates/candidates";
import { useState } from "react";
import LocationAutocomplete from "@/components/Elements/utils/location-autocomplete";
import { Location } from "@/lib/definitions";
import { fetchAllLocations } from "@/api/master/masterLocation";
const ProfileUpdateForm = ({
  initialValues,
  id,
  autoClose,
  masterLocations
}: {
  initialValues: any;
  id: number;
  autoClose: () => void;
  masterLocations: any;
}) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [pendingValue, setPendingValue] = useState<boolean | null>(null);
  const onChangeLocation = (location: Location) => {
    formik.setFieldValue("currentLocation", {
      locationId: location.locationId
    });
  };

  const addNewLocation = async (location: Location) => {
    if(masterLocations.includes(location)){
      toast.error("Location already exists");
      return
    }
    formik.setFieldValue("currentLocation", {
      locationId: location.locationId
    });
    autoClose();
  };

  const handleStatusChange = (value: boolean) => {
    if (value === false) {
      // For inactive, show confirmation
      setPendingValue(false);
      setShowConfirmation(true);
    } else {
      // For active, update directly
      formik.setFieldValue("isActive", true);
    }
  };

  const confirmInactive = () => {
    formik.setFieldValue("isActive", false);
    setShowConfirmation(false);
  };

  const getUpdatedFields = (initialValues: any, values: any) => {
    const updatedFields = Object.keys(values).reduce(
      (acc: Record<string, any>, key) => {
        if(key === "currentLocation"){
          if(values[key].locationId !== initialValues[key].locationId){
            acc[key] = values[key];
          }
        }

        if (values[key] !== initialValues[key]) {
          if(key!=="currentLocation"){
            acc[key] = values[key];
          }
            
        }
        return acc;
      },
      {}
    );

    return updatedFields;
  };
  const formik = useFormik({
    initialValues: initialValues, // Pass initialValues from props
    // validationSchema: profileUpdateSchema,
    onSubmit: (values) => {
      const updatedFields = getUpdatedFields(initialValues, values);
      console.log(updatedFields);
      try {
        updateCandidate(updatedFields, id).then((data) => {
        console.log(updatedFields)
        console.log(data);
          autoClose();
        });

        toast.success("Profile updated successfully", {
          position: "top-right",
        });
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
                onChange={() => handleStatusChange(true)}
                checked={formik.values.isActive === true}
              />
              <label htmlFor="status_active">Active</label>
            </div>
            <div className="flex items-center gap-2">
              <input
                id="status_inactive"
                name="isActive"
                type="radio"
                onChange={() => handleStatusChange(false)}
                checked={formik.values.isActive === false}
              />
              <label htmlFor="status_inactive">Inactive</label>
            </div>
          </div>

          {/* Confirmation Dialog */}
          <Dialog
            open={showConfirmation}
            onClose={() => setShowConfirmation(false)}
            className="relative z-50"
          >
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
            <div className="fixed inset-0 flex items-center justify-center p-4">
              <Dialog.Panel className="w-full max-w-sm rounded bg-white p-6">
                <Dialog.Title className="font-bold text-lg">
                  Confirm Status Change
                </Dialog.Title>
                <Dialog.Description className="mt-2">
                  Are you sure you want to make this candidate inactive?
                </Dialog.Description>

                <div className="mt-4 flex gap-3 justify-end">
                  <button
                    onClick={() => setShowConfirmation(false)}
                    className="px-4 py-2 border border-gray-300 rounded  hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmInactive}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Confirm
                  </button>
                </div>
              </Dialog.Panel>
            </div>
          </Dialog>

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
        {/* <div className="space-y-2">
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
        </div> */}

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

        <div className="h-auto space-y-3 rounded-lg">
          <label htmlFor="currentLocation" className="flex">
            <span className="font-semibold text-gray-600">
              Current Location
            </span>
            <span className="px-1 font-bold text-red-500">*</span>
          </label>

          <LocationAutocomplete
            name="currentLocation"
            placeholder="Enter Current Location"
            value={formik.values.currentLocation.locationDetails}
            onChange={onChangeLocation}
            options={masterLocations}
            onAdd={addNewLocation}
          ></LocationAutocomplete>
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
      <button
        onClick={autoClose}
        className="w-full bg-red-600 hover:bg-red-700 transition duration-300 text-white py-2 rounded-md"
      >
        Cancel
      </button>
    </form>
  );
};

export default ProfileUpdateForm;
