import { useFormik } from "formik";
import { profileUpdateSchema } from "@/lib/models/candidate";
import { toast } from "react-toastify";
import { Dialog } from "@headlessui/react"; // or any other modal library
import { updateCandidate } from "@/api/candidates/candidates";
import { useState } from "react";
import LocationAutocomplete from "@/components/Elements/utils/location-autocomplete";
import { Location } from "@/lib/definitions";
import {
  createContactPreferredJobType,
  deleteContactPreferredJobType,
} from "@/api/candidates/preferredJob";
import {
  createContactHiringType,
  deleteContactHiringType,
} from "@/api/candidates/hiringType";
const ProfileUpdateForm = ({
  initialValues,
  id,
  autoClose,
  masterLocations,
  preferredJobModes,
  preferredLocation,
  hiringTypes,
}: {
  initialValues: any;
  id: number;
  autoClose: () => void;
  masterLocations: any;
  preferredJobModes: any;
  preferredLocation: any;
  hiringTypes: any;
}) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [pendingValue, setPendingValue] = useState<boolean | null>(null);
  const [modes, setModes] = useState<any>([]);
  const [isRemote, setIsRemote] = useState(
    preferredJobModes
      .flat()
      .some((item: { jobType: string }) => item.jobType === "Remote")
  );

  const [isHybrid, setIsHybrid] = useState(
    preferredJobModes
      .flat()
      .some((item: { jobType: string }) => item.jobType === "Hybrid")
  );
  const [isOnsite, setIsOnsite] = useState(
    preferredJobModes
      .flat()
      .some((item: { jobType: string }) => item.jobType === "Onsite")
  );
  const [isFlexible, setIsFlexible] = useState(
    preferredJobModes
      .flat()
      .some((item: { jobType: string }) => item.jobType === "Flexible")
  );

  const [isFullTime, setIsFullTime] = useState(
    hiringTypes
      .flat()
      .some((item: { hiringType: string }) => item.hiringType === "Full Time")
  );

  const [isPartTime, setIsPartTime] = useState(
    hiringTypes
      .flat()
      .some((item: { hiringType: string }) => item.hiringType === "Part Time")
  );

  const [isContract, setIsContract] = useState(
    hiringTypes
      .flat()
      .some((item: { hiringType: string }) => item.hiringType === "Contract")
  );

  const [isFlexibleHiring, setIsFlexibleHiring] = useState(
    hiringTypes
      .flat()
      .some((item: { hiringType: string }) => item.hiringType === "Flexible")
  );
  const onChangeLocation = (location: Location) => {
    formik.setFieldValue("currentLocation", {
      locationId: location.locationId,
    });
  };

  const handleJobTypeBoxCheck = (
    e: React.ChangeEvent<HTMLInputElement>,
    value: string
  ) => {
    if (value === "Flexible") {
      setIsFlexible(!isFlexible);
      if (e.target.checked) {
        createContactPreferredJobType({
          contactDetails: {
            contactId: formik.values.contactId,
          },
          preferredJobMode: value,
        }).then((res) => {
          createContactPreferredJobType({
            contactDetails: {
              contactId: formik.values.contactId,
            },
            preferredJobMode: "Remote",
          }).then((res) => {
            createContactPreferredJobType({
              contactDetails: {
                contactId: formik.values.contactId,
              },
              preferredJobMode: "Onsite",
            }).then((res) => {
              createContactPreferredJobType({
                contactDetails: {
                  contactId: formik.values.contactId,
                },
                preferredJobMode: "Hybrid",
              }).then((res) => {});
            });
          });
        });
      }
      // When Flexible is checked, uncheck all others
      if (!e.target.checked) {
        setIsRemote(false);
        setIsHybrid(false);
        setIsOnsite(false);
      }
    } else {
      // When any other option is checked, uncheck Flexible
      setIsFlexible(false);
      if (value === "Remote") {
        setIsRemote(!isRemote);
        if (!e.target.checked) {
          const matchingtypeId = preferredJobModes
            .flat()
            .find((item: { jobType: string }) => item.jobType === "Remote");
          const flexibletypeId = preferredJobModes
            .flat()
            .find((item: { jobType: string }) => item.jobType === "Flexible");
          deleteContactPreferredJobType(matchingtypeId.typeId).then((res) => {
            deleteContactPreferredJobType(flexibletypeId.typeId).then(
              (res) => {}
            );
          });
        } else {
          createContactPreferredJobType({
            contactDetails: {
              contactId: formik.values.contactId,
            },
            preferredJobMode: value,
          }).then((res) => {});
          if (isHybrid && isOnsite) {
            createContactPreferredJobType({
              contactDetails: {
                contactId: formik.values.contactId,
              },
              preferredJobMode: "Flexible",
            }).then((res) => {
              setIsFlexible(true);
            });
          }
        }
      } else if (value === "Hybrid") {
        setIsHybrid(!isHybrid);
        if (!e.target.checked) {
          const matchingtypeId = preferredJobModes
            .flat()
            .find((item: { jobType: string }) => item.jobType === "Hybrid");
          const flexibletypeId = preferredJobModes
            .flat()
            .find((item: { jobType: string }) => item.jobType === "Flexible");
          deleteContactPreferredJobType(matchingtypeId.typeId).then((res) => {
            deleteContactPreferredJobType(flexibletypeId.typeId).then(
              (res) => {}
            );
          });
        } else {
          createContactPreferredJobType({
            contactDetails: {
              contactId: formik.values.contactId,
            },
            preferredJobMode: value,
          }).then((res) => {});
          if (isRemote && isOnsite) {
            createContactPreferredJobType({
              contactDetails: {
                contactId: formik.values.contactId,
              },
              preferredJobMode: "Flexible",
            }).then((res) => {
              setIsFlexible(true);
            });
          }
        }
      } else if (value === "Onsite") {
        setIsOnsite(!isOnsite);
        if (!e.target.checked) {
          const matchingtypeId = preferredJobModes
            .flat()
            .find((item: { jobType: string }) => item.jobType === "Onsite");
          const flexibletypeId = preferredJobModes
            .flat()
            .find((item: { jobType: string }) => item.jobType === "Flexible");
          deleteContactPreferredJobType(matchingtypeId.typeId).then((res) => {
            deleteContactPreferredJobType(flexibletypeId.typeId).then(
              (res) => {}
            );
          });
        } else {
          createContactPreferredJobType({
            contactDetails: {
              contactId: formik.values.contactId,
            },
            preferredJobMode: value,
          }).then((res) => {});
          if (isRemote && isHybrid) {
            createContactPreferredJobType({
              contactDetails: {
                contactId: formik.values.contactId,
              },
              preferredJobMode: "Flexible",
            }).then((res) => {
              setIsFlexible(true);
            });
          }
        }
      }
    }
  };

  const handleHiringTypeBoxCheck = (
    e: React.ChangeEvent<HTMLInputElement>,
    value: string
  ) => {
    if (value === "Flexible") {
      setIsFlexibleHiring(!isFlexibleHiring);
      if (e.target.checked) {
        createContactHiringType({
          contactDetails: {
            contactId: formik.values.contactId,
          },
          hiringType: value,
        }).then(() => {
          createContactHiringType({
            contactDetails: {
              contactId: formik.values.contactId,
            },
            hiringType: "Full Time",
          }).then(() => {
            createContactHiringType({
              contactDetails: {
                contactId: formik.values.contactId,
              },
              hiringType: "Part Time",
            }).then(() => {
              createContactHiringType({
                contactDetails: {
                  contactId: formik.values.contactId,
                },
                hiringType: "Contract",
              });
            });
          });
        });
      } else {
        // When Flexible is unchecked, uncheck all others
        setIsFullTime(false);
        setIsPartTime(false);
        setIsContract(false);
      }
    } else {
      // Uncheck Flexible if any other option is selected
      setIsFlexibleHiring(false);

      const updateStateAndServer = (
        type: string,
        isChecked: boolean,
        setFn: React.Dispatch<React.SetStateAction<boolean>>
      ) => {
        setFn(!isChecked);
        if (!e.target.checked) {
          const matchTypeId = hiringTypes
            .flat()
            .find((item: { hiringType: string }) => item.hiringType === type);
          const flexibleTypeId = hiringTypes
            .flat()
            .find(
              (item: { hiringType: string }) => item.hiringType === "Flexible"
            );

          if (matchTypeId)
            deleteContactHiringType(matchTypeId.typeId).then(() => {
              if (flexibleTypeId)
                deleteContactHiringType(flexibleTypeId.typeId).then((data)=>{console.log(data)});
            });
        } else {
          createContactHiringType({
            contactDetails: {
              contactId: formik.values.contactId,
            },
            hiringType: type,
          });

          const otherChecks =
            (type === "Full Time" && isPartTime && isContract) ||
            (type === "Part Time" && isFullTime && isContract) ||
            (type === "Contract" && isFullTime && isPartTime);

          if (otherChecks) {
            createContactHiringType({
              contactDetails: {
                contactId: formik.values.contactId,
              },
              hiringType: "Flexible",
            }).then(() => {
              setIsFlexibleHiring(true);
            });
          }
        }
      };

      if (value === "Full Time") {
        updateStateAndServer("Full Time", isFullTime, setIsFullTime);
      } else if (value === "Part Time") {
        updateStateAndServer("Part Time", isPartTime, setIsPartTime);
      } else if (value === "Contract") {
        updateStateAndServer("Contract", isContract, setIsContract);
      }
    }
  };

  const addNewLocation = async (location: Location) => {
    if (masterLocations.includes(location)) {
      toast.error("Location already exists");
      return;
    }
    formik.setFieldValue("currentLocation", {
      locationId: location.locationId,
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
        if (key === "currentLocation") {
          if (values[key].locationId !== initialValues[key].locationId) {
            acc[key] = values[key];
          }
        }

        if (values[key] !== initialValues[key]) {
          if (key !== "currentLocation") {
            acc[key] = values[key];
          }
        }
        return acc;
      },
      {}
    );

    return updatedFields;
  };

  const transormedvalues = {
    ...initialValues,
    isExpectedCtcNegotiable:
      initialValues.isExpectedCtcNegotiable === "true"
        ? true
        : initialValues.isExpectedCtcNegotiable === "false"
        ? false
        : false,
    preferredJobModes: initialValues.preferredJobModes,
  };

  const [isDifferentlyAbleEnabled, setIsDifferentlyAbleEnabled] =
    useState(false);

  const formik = useFormik({
    initialValues: transormedvalues, // Pass initialValues from props
    // validationSchema: profileUpdateSchema,
    onSubmit: (values) => {
      const updatedFields = getUpdatedFields(initialValues, values);
      console.log(modes);
      console.log(updatedFields);
      try {
        updateCandidate(updatedFields, id).then((data) => {
          console.log(updatedFields);
          console.log(data);
          if (data.status === 200) {
            toast.success("Profile updated successfully", {
              position: "top-right",
            });
            autoClose();
          } else {
            if (data.response.data) {
              const errorMessages = Object.values(data.response.data)[0];
              toast.error(errorMessages as string, {
                position: "top-right",
              });
            } else {
              toast.error("Failed to update profile. Please try again.", {
                position: "top-right",
              });
            }
          }
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
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 dark:text-black"
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
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 dark:text-black"
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

        {/* Date of Birth */}
        <div className="space-y-2">
          <label htmlFor="dob" className="text-gray-400 font-medium">
            Date of Birth
          </label>
          <input
            id="dob"
            name="dob"
            type="date"
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 dark:text-black"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.dob}
          />
          {formik.touched.dob && formik.errors.dob ? (
            <div className="text-red-500 text-sm">
              {formik.errors.dob.toString()}
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

        {/* Negotiable */}
        <div className="space-y-2">
          <label
            htmlFor="salary_negotiable"
            className="text-gray-400 font-medium"
          >
            Salary Negotiablility
          </label>
          <div>
            <div className="flex items-center gap-2">
              <input
                id="salary_negotiable"
                name="negotiable"
                type="radio"
                onChange={() =>
                  formik.setFieldValue("isExpectedCtcNegotiable", true)
                }
                checked={formik.values.isExpectedCtcNegotiable === true}
              />
              <label htmlFor="salary_negotiable">Yes</label>
            </div>
            <div className="flex items-center gap-2">
              <input
                id="salary_innegotiable"
                name="negotiable"
                type="radio"
                onChange={() =>
                  formik.setFieldValue("isExpectedCtcNegotiable", false)
                }
                checked={formik.values.isExpectedCtcNegotiable === false}
              />
              <label htmlFor="salary_innegotiable">No</label>
            </div>
          </div>
        </div>

        {/* Designation */}
        <div className="space-y-2">
          <label htmlFor="designation" className="text-gray-400 font-medium">
            Designation
          </label>
          <input
            id="designation"
            name="designation"
            type="text"
            placeholder="e.g. Software Engineer"
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 dark:text-black"
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

        {/* TechRole */}
        <div className="space-y-2">
          <label htmlFor="techrole" className="text-gray-400 font-medium">
            Tech Role
          </label>
          <input
            id="techrole"
            name="techrole"
            type="text"
            placeholder="e.g. Software Engineer"
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 dark:text-black"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.techRole}
          />
          {formik.touched.techRole && formik.errors.techRole ? (
            <div className="text-red-500 text-sm">
              {formik.errors.techRole.toString()}
            </div>
          ) : null}
        </div>

        {/* Company Name */}
        <div className="space-y-2">
          <label htmlFor="company" className="text-gray-400 font-medium">
            Current Company
          </label>
          <input
            id="companyName"
            name="companyName"
            type="text"
            placeholder="e.g. Google"
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 dark:text-black"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.companyName}
          />
          {formik.touched.companyName && formik.errors.companyName ? (
            <div className="text-red-500 text-sm">
              {formik.errors.companyName.toString()}
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
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 dark:text-black"
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
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 dark:text-black"
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
            Mobile Number (Primary)
          </label>
          <input
            id="primaryNumber"
            name="primaryNumber"
            type="tel"
            placeholder="e.g. +1234567890"
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 dark:text-black"
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
        {/* Secondary Number */}
        <div className="space-y-2">
          <label
            htmlFor="secondaryNumber"
            className="text-gray-400 font-medium"
          >
            Mobile Number (Secondary)
          </label>
          <input
            id="secondaryNumber"
            name="secondaryNumber"
            type="tel"
            placeholder="e.g. +1234567890"
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 dark:text-black"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.secondaryNumber}
          />
          {formik.touched.secondaryNumber && formik.errors.secondaryNumber ? (
            <div className="text-red-500 text-sm">
              {formik.errors.secondaryNumber.toString()}
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
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 dark:text-black"
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
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 dark:text-black"
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

        {/* Expected Salary */}
        <div className="space-y-2">
          <label htmlFor="expectedSalary" className="text-gray-400 font-medium">
            Expected Salary
          </label>
          <input
            id="expectedSalary"
            name="expectedSalary"
            type="number"
            placeholder="e.g. 50000"
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 dark:text-black"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.expectedSalary}
          />
          {formik.touched.expectedSalary && formik.errors.expectedSalary ? (
            <div className="text-red-500 text-sm">
              {formik.errors.expectedSalary.toString()}
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
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              value={"Onsite"}
              name="preferredJobType_Onsite"
              onChange={(e) => {
                handleJobTypeBoxCheck(e, "Onsite");
              }}
              checked={isOnsite || isFlexible}
            />
            <label htmlFor="preferredJobType_Onsite">Onsite</label>
            <input
              type="checkbox"
              value={"Remote"}
              name="preferredJobType_Remote"
              onChange={(e) => {
                handleJobTypeBoxCheck(e, "Remote");
              }}
              checked={isRemote || isFlexible}
            />
            <label htmlFor="preferredJobType_Remote">Remote</label>
            <input
              type="checkbox"
              value={"Hybrid"}
              name="preferredJobType_Hybrid"
              onChange={(e) => {
                handleJobTypeBoxCheck(e, "Hybrid");
              }}
              checked={isHybrid || isFlexible}
            />
            <label htmlFor="preferredJobType_Hybrid">Hybrid</label>
            <input
              type="checkbox"
              value={"Flexible"}
              name="preferredJobType_Flexible"
              onChange={(e) => {
                handleJobTypeBoxCheck(e, "Flexible");
              }}
              checked={isFlexible}
            />
            <label htmlFor="preferredJobType_Flexible">Flexible</label>
          </div>
        </div>

        {/* preferred hiring type */}
        <div className="space-y-2">
          <label
            htmlFor="preferredHiringType"
            className="text-gray-400 font-medium"
          >
            Preferred Hiring Type
          </label>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <input
                type="checkbox"
                value="Full Time"
                name="preferredHiringType_FullTime"
                onChange={(e) => {
                  handleHiringTypeBoxCheck(e, "Full Time");
                }}
                checked={isFullTime || isFlexibleHiring}
              />
              <label htmlFor="preferredHiringType_FullTime">Full Time</label>
            </div>
            <div className="flex items-center gap-1">
              <input
                type="checkbox"
                value="Part Time"
                name="preferredHiringType_PartTime"
                onChange={(e) => {
                  handleHiringTypeBoxCheck(e, "Part Time");
                }}
                checked={isPartTime || isFlexibleHiring}
              />
              <label htmlFor="preferredHiringType_PartTime">Part Time</label>
            </div>

            <div className="flex items-center gap-1">
              <input
                type="checkbox"
                value="Contract"
                name="HiringType_Contract"
                onChange={(e) => {
                  handleHiringTypeBoxCheck(e, "Contract");
                }}
                checked={isContract || isFlexibleHiring}
              />
              <label htmlFor="HiringType_Contract">Contract</label>
            </div>

            <div className="flex items-center gap-1">
              <input
                type="checkbox"
                value="Flexible"
                name="preferredHiringType_Flexible"
                onChange={(e) => {
                  handleHiringTypeBoxCheck(e, "Flexible");
                }}
                checked={isFlexibleHiring}
              />
              <label htmlFor="preferredHiringType_Flexible">Flexible</label>
            </div>
          </div>
        </div>

        {/* Gender */}
        <div className="space-y-2">
          <label htmlFor="gender" className="text-gray-400 font-medium">
            Gender
          </label>
          <select
            id="gender"
            name="gender"
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 dark:text-black"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.gender}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
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
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 dark:text-black"
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
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 dark:text-black"
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

        {/* preferred Locations */}
        {/* <div>
          <label
            htmlFor="preferredLocations"
            className="text-gray-400 font-medium"
          >
            Preferred Locations
          </label>
          <input type="text" value={preferredLocation.join(", ")} />
        </div> */}

        {/* Current Location */}

        <div className="h-auto mt-0.5 space-y-2 rounded-lg">
          <label htmlFor="currentLocation" className="flex">
            <span className="text-gray-400 font-medium">Current Location</span>
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
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 dark:text-black"
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
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 dark:text-black"
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

        {/* Pincode */}
        <div className="space-y-2">
          <label htmlFor="pinCode" className="text-gray-400 font-medium">
            Pincode
          </label>
          <input
            id="pinCode"
            name="pinCode"
            placeholder="e.g. xxxyyy"
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 dark:text-black"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.pinCode}
          />
          {formik.touched.pinCode && formik.errors.pinCode ? (
            <div className="text-red-500 text-sm">
              {formik.errors.pinCode.toString()}
            </div>
          ) : null}
        </div>

        {/* LinkedIn */}
        <div className="space-y-2">
          <label htmlFor="linkedin" className="text-gray-400 font-medium">
            LinkedIn
          </label>
          <input
            id="linkedin"
            name="linkedin"
            placeholder="URL"
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 dark:text-black"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.linkedin}
          />
          {formik.touched.linkedin && formik.errors.linkedin ? (
            <div className="text-red-500 text-sm">
              {formik.errors.linkedin.toString()}
            </div>
          ) : null}
        </div>

        {/* Differently Abled */}
        <div className="space-y-2">
          <label
            htmlFor="differentlyAbledType"
            className="text-gray-400 font-medium"
          >
            Differently Abled
          </label>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <input
                type="radio"
                name="differentlyAbled"
                id="differentlyAbledtrue"
                value={"true"}
                onChange={() => {
                  setIsDifferentlyAbleEnabled(true);
                  formik.setFieldValue("differentlyAbled", true);
                }}
              />
              <label htmlFor="differentlyAbledtrue">Yes</label>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="radio"
                name="differentlyAbled"
                value={"true"}
                id="differentlyAbledfalse"
                onChange={() => {
                  setIsDifferentlyAbleEnabled(false);
                  formik.setFieldValue("differentlyAbled", false);
                }}
              />
              <label htmlFor="differentlyAbledfalse">No</label>
            </div>
          </div>

          {formik.touched.differentlyAbled && formik.errors.differentlyAbled ? (
            <div className="text-red-500 text-sm">
              {formik.errors.differentlyAbled.toString()}
            </div>
          ) : null}
        </div>

        {/* Differently Abled Type */}
        {isDifferentlyAbleEnabled && (
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
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 dark:text-black"
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
        )}
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
