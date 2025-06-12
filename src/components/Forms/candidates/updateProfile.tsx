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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, parseISO, isValid } from "date-fns";
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
      // if (!e.target.checked) {
      //   const matchingtypeId = preferredJobModes
      //     .flat()
      //     .find((item: { jobType: string }) => item.jobType === "Flexible");
      //   deleteContactPreferredJobType(matchingtypeId.typeId).then((res) => {});
      // }
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
            if (!flexibletypeId) return;
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
          }).then((res) => {
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
          });
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
            if (!flexibletypeId) return;
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
          }).then((res) => {
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
          });
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
            if (!flexibletypeId) return;
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
          }).then((res) => {
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
          });
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
        }).then((res) => {
          createContactHiringType({
            contactDetails: {
              contactId: formik.values.contactId,
            },
            hiringType: "Full Time",
          }).then((res) => {
            createContactHiringType({
              contactDetails: {
                contactId: formik.values.contactId,
              },
              hiringType: "Part Time",
            }).then((res) => {
              createContactHiringType({
                contactDetails: {
                  contactId: formik.values.contactId,
                },
                hiringType: "Contract",
              }).then((res) => {});
            });
          });
        });
      }
      // When Flexible is checked, uncheck all others
      // if (!e.target.checked) {
      //   const matchingtypeId = hiringTypes
      //     .flat()
      //     .find(
      //       (item: { hiringType: string }) => item.hiringType === "Flexible"
      //     );
      //   deleteContactHiringType(matchingtypeId.typeId).then((res) => {});
      // }
    } else {
      // When any other option is checked, uncheck Flexible
      setIsFlexibleHiring(false);
      if (value === "Full Time") {
        setIsFullTime(!isFullTime);
        if (!e.target.checked) {
          const matchingtypeId = hiringTypes
            .flat()
            .find(
              (item: { hiringType: string }) => item.hiringType === "Full Time"
            );
          const flexibletypeId = hiringTypes
            .flat()
            .find(
              (item: { hiringType: string }) => item.hiringType === "Flexible"
            );
          deleteContactHiringType(matchingtypeId.typeId).then((res) => {
            if (!flexibletypeId) return;
            deleteContactHiringType(flexibletypeId.typeId).then((res) => {});
          });
        } else {
          createContactHiringType({
            contactDetails: {
              contactId: formik.values.contactId,
            },
            hiringType: value,
          }).then((res) => {
            if (isPartTime && isContract) {
              createContactHiringType({
                contactDetails: {
                  contactId: formik.values.contactId,
                },
                hiringType: "Flexible",
              }).then((res) => {
                setIsFlexibleHiring(true);
              });
            }
          });
        }
      } else if (value === "Part Time") {
        setIsPartTime(!isPartTime);
        if (!e.target.checked) {
          const matchingtypeId = hiringTypes
            .flat()
            .find(
              (item: { hiringType: string }) => item.hiringType === "Part Time"
            );
          const flexibletypeId = hiringTypes
            .flat()
            .find(
              (item: { hiringType: string }) => item.hiringType === "Flexible"
            );
          deleteContactHiringType(matchingtypeId.typeId).then((res) => {
            if (!flexibletypeId) return;
            deleteContactHiringType(flexibletypeId.typeId).then((res) => {});
          });
        } else {
          createContactHiringType({
            contactDetails: {
              contactId: formik.values.contactId,
            },
            hiringType: value,
          }).then((res) => {
            if (isFullTime && isContract) {
              createContactHiringType({
                contactDetails: {
                  contactId: formik.values.contactId,
                },
                hiringType: "Flexible",
              }).then((res) => {
                setIsFlexibleHiring(true);
              });
            }
          });
        }
      } else if (value === "Contract") {
        setIsContract(!isContract);
        if (!e.target.checked) {
          const matchingtypeId = hiringTypes
            .flat()
            .find(
              (item: { hiringType: string }) => item.hiringType === "Contract"
            );
          const flexibletypeId = hiringTypes
            .flat()
            .find(
              (item: { hiringType: string }) => item.hiringType === "Flexible"
            );
          deleteContactHiringType(matchingtypeId.typeId).then((res) => {
            if (!flexibletypeId) return;
            deleteContactHiringType(flexibletypeId.typeId).then((res) => {});
          });
        } else {
          createContactHiringType({
            contactDetails: {
              contactId: formik.values.contactId,
            },
            hiringType: value,
          }).then((res) => {
            if (isFullTime && isPartTime) {
              createContactHiringType({
                contactDetails: {
                  contactId: formik.values.contactId,
                },
                hiringType: "Flexible",
              }).then((res) => {
                setIsFlexibleHiring(true);
              });
            }
          });
        }
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
        : initialValues.isExpectedCtcNegotiable,
    preferredJobModes: initialValues.preferredJobModes,
    address1: initialValues.address1,
    linkedin: initialValues.linkedin,
  };

  const [isDifferentlyAbleEnabled, setIsDifferentlyAbleEnabled] =
    useState(false);

  const formik = useFormik({
    initialValues: transormedvalues, // Pass initialValues from props
    validationSchema: profileUpdateSchema,
    onSubmit: (values) => {
      console.log(values);
      const updatedFields = getUpdatedFields(initialValues, values);
      try {
        updateCandidate(updatedFields, id).then((data) => {
          console.log(data);
          if (data.status === 200) {
            toast.success("Profile updated successfully", {
              position: "top-right",
            });
            autoClose();
          } else {
            toast.error(data.message, {
              position: "top-right",
            });
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
    <div className="min-h-screen mt-4">
      <div className="rounded-2xl max-w-4xl">
        {/* Header */}
        <div className="px-8 py-6 border-b flex items-center gap-1 border-gray-200">
          <svg
            className="w-6 h-6 mr-2 text-cyan-500"
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
          <h1 className="text-2xl font-bold text-gray-900">Update Candidate</h1>
        </div>

        <form className="p-8" onSubmit={formik.handleSubmit}>
          {/* Basic Details Section */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-cyan-500 mb-8">
              Personal Information
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-6">
              {/* First Name */}
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  First Name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="e.g. John"
                  className="w-full px-0 py-1 border-0 border-b border-gray-300 focus:border-blue-500 focus:ring-0 text-sm placeholder-gray-400 focus:outline-none"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.firstName}
                />
                {formik.touched.firstName && formik.errors.firstName ? (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.firstName.toString()}
                  </div>
                ) : null}
              </div>

              {/* Last Name */}
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Last Name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="e.g. Doe"
                  className="w-full px-0 py-1 border-0 border-b border-gray-300 focus:border-blue-500 focus:ring-0 text-sm placeholder-gray-400 focus:outline-none"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.lastName}
                />
                {formik.touched.lastName && formik.errors.lastName ? (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.lastName.toString()}
                  </div>
                ) : null}
              </div>

              {/* Date of Birth */}
              <div>
                <label
                  htmlFor="dob"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Date of Birth
                </label>
                <DatePicker
                  id="dob"
                  name="dob"
                  selected={
                    typeof formik.values.dob === "string"
                      ? parseISO(formik.values.dob)
                      : formik.values.dob instanceof Date &&
                        isValid(formik.values.dob)
                      ? formik.values.dob
                      : null
                  }
                  onChange={(date: Date | null) => {
                    if (date) {
                      formik.setFieldValue("dob", format(date, "yyyy-MM-dd"));
                    } else {
                      formik.setFieldValue("dob", null);
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
                {formik.touched.dob && formik.errors.dob ? (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.dob.toString()}
                  </div>
                ) : null}
              </div>

              {/* Gender */}
              <div>
                <label
                  htmlFor="gender"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  className="w-full px-0 py-1 border-0 border-b border-gray-300 focus:border-blue-500 focus:ring-0 text-sm placeholder-gray-400 focus:outline-none"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.gender}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {formik.touched.gender && formik.errors.gender ? (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.gender.toString()}
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          {/* Contact Details Section */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-cyan-500 mb-8">
              Contact Information
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Email */}
              <div>
                <label
                  htmlFor="emailId"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Email
                </label>
                <input
                  id="emailId"
                  name="emailId"
                  type="email"
                  placeholder="e.g. john@example.com"
                  className="w-full px-0 py-1 border-0 border-b border-gray-300 focus:border-blue-500 focus:ring-0 text-sm placeholder-gray-400 focus:outline-none"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.emailId}
                />
                {formik.touched.emailId && formik.errors.emailId ? (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.emailId.toString()}
                  </div>
                ) : null}
              </div>

              {/* Primary Number */}
              <div>
                <label
                  htmlFor="primaryNumber"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Mobile Number (Primary)
                </label>
                <input
                  id="primaryNumber"
                  name="primaryNumber"
                  type="tel"
                  placeholder="e.g. +1234567890"
                  className="w-full px-0 py-1 border-0 border-b border-gray-300 focus:border-blue-500 focus:ring-0 text-sm placeholder-gray-400 focus:outline-none"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.primaryNumber}
                />
                {formik.touched.primaryNumber && formik.errors.primaryNumber ? (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.primaryNumber.toString()}
                  </div>
                ) : null}
              </div>

              {/* Secondary Number */}
              <div>
                <label
                  htmlFor="secondaryNumber"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Mobile Number (Secondary)
                </label>
                <input
                  id="secondaryNumber"
                  name="secondaryNumber"
                  type="tel"
                  placeholder="e.g. +1234567890"
                  className="w-full px-0 py-1 border-0 border-b border-gray-300 focus:border-blue-500 focus:ring-0 text-sm placeholder-gray-400 focus:outline-none"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.secondaryNumber}
                />
                {formik.touched.secondaryNumber &&
                formik.errors.secondaryNumber ? (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.secondaryNumber.toString()}
                  </div>
                ) : null}
              </div>

              {/* LinkedIn */}
              <div>
                <label
                  htmlFor="linkedin"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  LinkedIn
                </label>
                <input
                  id="linkedin"
                  name="linkedin"
                  placeholder="URL"
                  className="w-full px-0 py-1 border-0 border-b border-gray-300 focus:border-blue-500 focus:ring-0 text-sm placeholder-gray-400 focus:outline-none"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.linkedin}
                />
                {formik.touched.linkedin && formik.errors.linkedin ? (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.linkedin.toString()}
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          {/* Professional Details Section */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-cyan-500 mb-8">
              Professional Information
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Designation */}
              <div>
                <label
                  htmlFor="designation"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Designation
                </label>
                <input
                  id="designation"
                  name="designation"
                  type="text"
                  placeholder="e.g. Software Engineer"
                  className="w-full px-0 py-1 border-0 border-b border-gray-300 focus:border-blue-500 focus:ring-0 text-sm placeholder-gray-400 focus:outline-none"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.designation}
                />
                {formik.touched.designation && formik.errors.designation ? (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.designation.toString()}
                  </div>
                ) : null}
              </div>

              {/* Tech Role */}
              <div>
                <label
                  htmlFor="techRole"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Tech Role
                </label>
                <input
                  id="techRole"
                  name="techRole"
                  type="text"
                  placeholder="e.g. Software Engineer"
                  className="w-full px-0 py-1 border-0 border-b border-gray-300 focus:border-blue-500 focus:ring-0 text-sm placeholder-gray-400 focus:outline-none"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.techRole}
                />
                {formik.touched.techRole && formik.errors.techRole ? (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.techRole.toString()}
                  </div>
                ) : null}
              </div>

              {/* Company Name */}
              <div>
                <label
                  htmlFor="companyName"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Current Company
                </label>
                <input
                  id="companyName"
                  name="companyName"
                  type="text"
                  placeholder="e.g. Google"
                  className="w-full px-0 py-1 border-0 border-b border-gray-300 focus:border-blue-500 focus:ring-0 text-sm placeholder-gray-400 focus:outline-none"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.companyName}
                />
                {formik.touched.companyName && formik.errors.companyName ? (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.companyName.toString()}
                  </div>
                ) : null}
              </div>

              {/* Total Experience */}
              <div>
                <label
                  htmlFor="totalExperience"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Total Experience (Years)
                </label>
                <input
                  id="totalExperience"
                  name="totalExperience"
                  type="number"
                  placeholder="e.g. 5"
                  className="w-full px-0 py-1 border-0 border-b border-gray-300 focus:border-blue-500 focus:ring-0 text-sm placeholder-gray-400 focus:outline-none"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.totalExperience}
                />
                {formik.touched.totalExperience &&
                formik.errors.totalExperience ? (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.totalExperience.toString()}
                  </div>
                ) : null}
              </div>

              {/* Current Salary */}
              <div>
                <label
                  htmlFor="currentSalary"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Current Salary (LPA)
                </label>
                <input
                  id="currentSalary"
                  name="currentSalary"
                  type="number"
                  placeholder="e.g. 50000"
                  className="w-full px-0 py-1 border-0 border-b border-gray-300 focus:border-blue-500 focus:ring-0 text-sm placeholder-gray-400 focus:outline-none"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.currentSalary}
                />
                {formik.touched.currentSalary && formik.errors.currentSalary ? (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.currentSalary.toString()}
                  </div>
                ) : null}
              </div>

              {/* Expected Salary */}
              <div>
                <label
                  htmlFor="expectedSalary"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Expected Salary (LPA)
                </label>
                <input
                  id="expectedSalary"
                  name="expectedSalary"
                  type="number"
                  placeholder="e.g. 50000"
                  className="w-full px-0 py-1 border-0 border-b border-gray-300 focus:border-blue-500 focus:ring-0 text-sm placeholder-gray-400 focus:outline-none"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.expectedSalary}
                />
                {formik.touched.expectedSalary &&
                formik.errors.expectedSalary ? (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.expectedSalary.toString()}
                  </div>
                ) : null}
              </div>

              {/* Notice Period */}
              <div>
                <label
                  htmlFor="noticePeriod"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Notice Period (Days)
                </label>
                <input
                  id="noticePeriod"
                  name="noticePeriod"
                  type="number"
                  placeholder="e.g. 30"
                  className="w-full px-0 py-1 border-0 border-b border-gray-300 focus:border-blue-500 focus:ring-0 text-sm placeholder-gray-400 focus:outline-none"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.noticePeriod}
                />
                {formik.touched.noticePeriod && formik.errors.noticePeriod ? (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.noticePeriod.toString()}
                  </div>
                ) : null}
              </div>

              {/* Candidate Status */}
              <div className="space-y-2">
                <label htmlFor="isActive" className="text-gray-400 font-medium">
                  Candidate Status
                </label>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2">
                    <input
                      id="status_active"
                      name="isActive"
                      type="radio"
                      onChange={() => handleStatusChange(true)}
                      checked={formik.values.isActive === true}
                    />
                    <label htmlFor="status_active" className="dark:text-black">
                      Active
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      id="status_inactive"
                      name="isActive"
                      type="radio"
                      onChange={() => handleStatusChange(false)}
                      checked={formik.values.isActive === false}
                    />
                    <label
                      htmlFor="status_inactive"
                      className="dark:text-black"
                    >
                      Inactive
                    </label>
                  </div>
                </div>

                {/* Confirmation Dialog */}
                <Dialog
                  open={showConfirmation}
                  onClose={() => setShowConfirmation(false)}
                  className="relative z-50"
                >
                  <div
                    className="fixed inset-0 bg-black/30"
                    aria-hidden="true"
                  />
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
              <div>
                <label
                  htmlFor="isExpectedCtcNegotiable"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Salary Negotiability
                </label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <input
                      id="salary_negotiable"
                      name="negotiable"
                      type="radio"
                      onChange={() =>
                        formik.setFieldValue("isExpectedCtcNegotiable", true)
                      }
                      checked={formik.values.isExpectedCtcNegotiable === true}
                      className="text-cyan-500 focus:ring-cyan-500"
                    />
                    <label htmlFor="salary_negotiable">Negotiable</label>
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
                      className="text-cyan-500 focus:ring-cyan-500"
                    />
                    <label htmlFor="salary_innegotiable">Not Negotiable</label>
                  </div>
                </div>
              </div>

              {/* Preferred Job Type */}
              <div className="lg:col-span-2">
                <label
                  htmlFor="preferredJobType"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Preferred Job Type
                </label>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      value={"Onsite"}
                      name="preferredJobType_Onsite"
                      id="preferredJobType_Onsite"
                      onChange={(e) => handleJobTypeBoxCheck(e, "Onsite")}
                      checked={
                        isOnsite ||
                        isFlexible ||
                        preferredJobModes.includes("Onsite")
                      }
                      className="text-cyan-500 focus:ring-cyan-500"
                    />
                    <label htmlFor="preferredJobType_Onsite">Onsite</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      value={"Remote"}
                      name="preferredJobType_Remote"
                      id="preferredJobType_Remote"
                      onChange={(e) => handleJobTypeBoxCheck(e, "Remote")}
                      checked={
                        isRemote ||
                        isFlexible ||
                        preferredJobModes.includes("Remote")
                      }
                      className="text-cyan-500 focus:ring-cyan-500"
                    />
                    <label htmlFor="preferredJobType_Remote">Remote</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      value={"Hybrid"}
                      name="preferredJobType_Hybrid"
                      id="preferredJobType_Hybrid"
                      onChange={(e) => handleJobTypeBoxCheck(e, "Hybrid")}
                      checked={
                        isHybrid ||
                        isFlexible ||
                        preferredJobModes.includes("Hybrid")
                      }
                      className="text-cyan-500 focus:ring-cyan-500"
                    />
                    <label htmlFor="preferredJobType_Hybrid">Hybrid</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      value={"Flexible"}
                      name="preferredJobType_Flexible"
                      onChange={(e) => handleJobTypeBoxCheck(e, "Flexible")}
                      checked={isFlexible || (isHybrid && isRemote && isOnsite)}
                      className="text-cyan-500 focus:ring-cyan-500"
                    />
                    <label htmlFor="preferredJobType_Flexible">Flexible</label>
                  </div>
                </div>
              </div>

              {/* Preferred Hiring Type */}
              <div className="lg:col-span-2">
                <label
                  htmlFor="preferredHiringType"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Preferred Hiring Type
                </label>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      value="Full Time"
                      name="preferredHiringType_FullTime"
                      id="preferredHiringType_FullTime"
                      onChange={(e) => handleHiringTypeBoxCheck(e, "Full Time")}
                      checked={
                        isFullTime ||
                        isFlexibleHiring ||
                        hiringTypes.includes("Full Time")
                      }
                      className="text-cyan-500 focus:ring-cyan-500"
                    />
                    <label htmlFor="preferredHiringType_FullTime">
                      Full Time
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      value="Part Time"
                      id="preferredHiringType_PartTime"
                      name="preferredHiringType_PartTime"
                      onChange={(e) => handleHiringTypeBoxCheck(e, "Part Time")}
                      checked={
                        isPartTime ||
                        isFlexibleHiring ||
                        hiringTypes.includes("Part Time")
                      }
                      className="text-cyan-500 focus:ring-cyan-500"
                    />
                    <label htmlFor="preferredHiringType_PartTime">
                      Part Time
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      value="Contract"
                      id="HiringType_Contract"
                      name="HiringType_Contract"
                      onChange={(e) => handleHiringTypeBoxCheck(e, "Contract")}
                      checked={
                        isContract ||
                        isFlexibleHiring ||
                        hiringTypes.includes("Contract")
                      }
                      className="text-cyan-500 focus:ring-cyan-500"
                    />
                    <label htmlFor="HiringType_Contract">Contract</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      value="Flexible"
                      name="preferredHiringType_Flexible"
                      onChange={(e) => handleHiringTypeBoxCheck(e, "Flexible")}
                      checked={
                        isFlexibleHiring ||
                        (isContract && isFullTime && isPartTime)
                      }
                      className="text-cyan-500 focus:ring-cyan-500"
                    />
                    <label htmlFor="preferredHiringType_Flexible">
                      Flexible
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Education and Location Section */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-cyan-500 mb-6">
              Education & Location
            </h2>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {/* Row 1 */}
              <div className="space-y-1">
                <label
                  htmlFor="highestEducation"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Highest Qualification
                </label>
                <input
                  id="highestEducation"
                  name="highestEducation"
                  placeholder="e.g. Bachelor's in Computer Science"
                  className="w-full px-0 py-1 border-0 border-b border-gray-300 focus:border-blue-500 focus:ring-0 text-sm placeholder-gray-400 focus:outline-none"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.highestEducation}
                />
                {formik.touched.highestEducation &&
                formik.errors.highestEducation ? (
                  <div className="text-red-500 text-xs mt-1">
                    {formik.errors.highestEducation.toString()}
                  </div>
                ) : null}
              </div>

              <div className="space-y-0">
                <label
                  htmlFor="currentLocation"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Current Location
                </label>
                <LocationAutocomplete
                  name="currentLocation"
                  placeholder="Enter Current Location"
                  styleMod="w-full px-0 py-1 border-0 border-b border-gray-300 focus:border-blue-500 focus:ring-0 text-sm placeholder-gray-400 rounded-none"
                  value={formik.values.currentLocation.locationDetails}
                  onChange={onChangeLocation}
                  options={masterLocations}
                  onAdd={addNewLocation}
                />
              </div>

              {/* Row 2 */}
              <div className="space-y-1">
                <label
                  htmlFor="address1"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Address
                </label>
                <input
                  id="address1"
                  name="address1"
                  placeholder="e.g. 123 Main St"
                  className="w-full px-0 py-1 border-0 border-b border-gray-300 focus:border-blue-500 focus:ring-0 text-sm placeholder-gray-400 focus:outline-none"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.address1}
                />
                {formik.touched.address1 && formik.errors.address1 ? (
                  <div className="text-red-500 text-xs mt-1">
                    {formik.errors.address1.toString()}
                  </div>
                ) : null}
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="addressLocality"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Address Locality
                </label>
                <input
                  id="addressLocality"
                  name="addressLocality"
                  placeholder="e.g. Downtown"
                  className="w-full px-0 py-1 border-0 border-b border-gray-300 focus:border-blue-500 focus:ring-0 text-sm placeholder-gray-400 focus:outline-none"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.addressLocality}
                />
                {formik.touched.addressLocality &&
                formik.errors.addressLocality ? (
                  <div className="text-red-500 text-xs mt-1">
                    {formik.errors.addressLocality.toString()}
                  </div>
                ) : null}
              </div>

              {/* Row 3 */}
              <div className="space-y-1">
                <label
                  htmlFor="pinCode"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Pincode
                </label>
                <input
                  id="pinCode"
                  name="pinCode"
                  placeholder="e.g. xxxyyy"
                  className="w-full px-0 py-1 border-0 border-b border-gray-300 focus:border-blue-500 focus:ring-0 text-sm placeholder-gray-400 focus:outline-none"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.pinCode}
                />
                {formik.touched.pinCode && formik.errors.pinCode ? (
                  <div className="text-red-500 text-xs mt-1">
                    {formik.errors.pinCode.toString()}
                  </div>
                ) : null}
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="maritalStatus"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Marital Status
                </label>
                <select
                  id="maritalStatus"
                  name="maritalStatus"
                  className="w-full px-0 py-1 border-0 border-b border-gray-300 focus:border-blue-500 focus:ring-0 text-sm placeholder-gray-400 focus:outline-none"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.maritalStatus}
                >
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                  <option value="Widowed">Widowed</option>
                  <option value="Divorced">Divorced</option>
                  <option value="Other">Other</option>
                </select>
                {formik.touched.maritalStatus && formik.errors.maritalStatus ? (
                  <div className="text-red-500 text-xs mt-1">
                    {formik.errors.maritalStatus.toString()}
                  </div>
                ) : null}
              </div>

              {/* Row 4 */}
              <div className="space-y-1">
                <label
                  htmlFor="differentlyAbled"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Differently Abled
                </label>
                <div className="flex items-center gap-4 mt-1">
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="differentlyAbled"
                      id="differentlyAbledtrue"
                      value={"true"}
                      checked={formik.values.differentlyAbled}
                      onChange={() => {
                        setIsDifferentlyAbleEnabled(true);
                        formik.setFieldValue("differentlyAbled", true);
                      }}
                      className="text-cyan-500 focus:ring-cyan-500"
                    />
                    <label htmlFor="differentlyAbledtrue" className="text-sm">
                      Yes
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="differentlyAbled"
                      value={"false"}
                      checked={!formik.values.differentlyAbled}
                      id="differentlyAbledfalse"
                      onChange={() => {
                        setIsDifferentlyAbleEnabled(false);
                        formik.setFieldValue("differentlyAbled", false);
                      }}
                      className="text-cyan-500 focus:ring-cyan-500"
                    />
                    <label htmlFor="differentlyAbledfalse" className="text-sm">
                      No
                    </label>
                  </div>
                </div>
                {formik.touched.differentlyAbled &&
                formik.errors.differentlyAbled ? (
                  <div className="text-red-500 text-xs mt-1">
                    {formik.errors.differentlyAbled.toString()}
                  </div>
                ) : null}
              </div>

              {/* Differently Abled Type - Conditional */}
              {(isDifferentlyAbleEnabled || formik.values.differentlyAbled) && (
                <div className="space-y-1">
                  <label
                    htmlFor="differentlyAbledType"
                    className="block text-sm font-semibold text-gray-700"
                  >
                    Differently Abled Type
                  </label>
                  <select
                    id="differentlyAbledType"
                    name="differentlyAbledType"
                    className="w-full px-0 py-1 border-0 border-b border-gray-300 focus:border-blue-500 focus:ring-0 text-sm placeholder-gray-400 focus:outline-none"
                    value={formik.values.differentlyAbledType}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <option value={formik.values.differentlyAbledType || ""}>
                      {formik.values.differentlyAbledType
                        ? formik.values.differentlyAbledType
                        : "Select Differently Abled Type"}
                    </option>
                    <option value="Physical (e.g., mobility impairments, limb differences)">
                      Physical
                    </option>
                    <option value="Sensory (e.g., blindness, deafness)">
                      Sensory
                    </option>
                    <option value="Intellectual/Developmental (e.g., Down syndrome, Autism)">
                      Intellectual/Developmental
                    </option>
                    <option value="Mental Health (e.g., depression, anxiety)">
                      Mental Health
                    </option>
                    <option value="Neurological (e.g., epilepsy, TBI)">
                      Neurological
                    </option>
                    <option value="Chronic Illness (e.g., diabetes, MS)">
                      Chronic Illness
                    </option>
                    <option value="Other/Not Listed">Other/Not Listed</option>
                  </select>
                  {formik.touched.differentlyAbledType &&
                  formik.errors.differentlyAbledType ? (
                    <div className="text-red-500 text-xs mt-1">
                      {formik.errors.differentlyAbledType.toString()}
                    </div>
                  ) : null}
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6 justify-end">
            <button
              type="button"
              onClick={autoClose}
              className="flex-1 sm:flex-none sm:px-8 py-2 border-2 border-cyan-500 text-cyan-500 rounded-lg hover:bg-cyan-50 transition-colors duration-200 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 sm:flex-none sm:px-8 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors duration-200 font-medium"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileUpdateForm;
