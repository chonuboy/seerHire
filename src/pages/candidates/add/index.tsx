import type React from "react";
import { useState, useRef, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";

import { toast } from "react-toastify";
import { CandidateModel, CandidateSchema } from "@/lib/models/candidate";
import {
  createCandidate,
  fetchCandidates,
  uploadAutofillResume,
  uploadResume,
} from "@/api/candidates/candidates";
import type { Candidate, Location } from "@/lib/definitions";
import {
  CandidateStatus,
  Gender,
  MaritalStatus,
  DifferentlyAbled,
} from "@/lib/constants";

import MainLayout from "@/components/Layouts/layout";
import ContentHeader from "@/components/Layouts/content-header";
import LocationAutocomplete from "@/components/Elements/utils/location-autocomplete";
import { fetchAllLocations } from "@/api/master/masterLocation";
import { Popup } from "@/components/Elements/cards/popup";
import ProfessionalForm from "@/components/Forms/candidates/addCandidateInfo";
import { fetchAllDomains } from "@/api/master/domain";
import { Technology } from "@/lib/models/candidate";
import { fetchAllTechnologies } from "@/api/master/masterTech";
import { fetchAllCertifications } from "@/api/master/certification";
import { fetchAllCompanies } from "@/api/master/masterCompany";
import { createContactInterview } from "@/api/candidates/interviews";

export default function Candidates() {
  // This will be used to show a spinner if the form isSubmitting }]
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [file, setFile] = useState<File | undefined>(undefined);
  const [updatedFileName, setUpdatedFileName] = useState<string | undefined>(
    undefined
  );
  const [successMsg, setSuccesMsg] = useState<string | null>(null);
  const router = useRouter();
  const [locations, setLocations] = useState<Location[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showForm, setShowForm] = useState(false);
  const [skills, setSkills] = useState<Technology[] | null>(null);
  const [domains, setDomains] = useState<any>();
  const [certifications, setCertifications] = useState<any>();
  const [previousCompanies, setPreviousCompanies] = useState<any>();
  const [candidateId, setCandidateId] = useState(0);
  const [locationAdded, setIsLocationAdded] = useState(false);
  const [isAutofill, setIsAutofill] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [assignInterview, setAssignInterview] = useState<number | null>(null);

  useEffect(() => {
    fetchAllLocations().then((data) => {
      const allLocatoins = data;
      setLocations(allLocatoins);
    });
    fetchAllTechnologies().then((data) => {
      setSkills(data);
    });
    fetchAllDomains().then((data) => {
      setDomains(data);
    });
    fetchAllCertifications().then((data) => {
      setCertifications(data);
    });
    fetchAllCompanies().then((data) => {
      setPreviousCompanies(data);
    });
    const interiewJobId = localStorage.getItem("jobId");
    setAssignInterview(interiewJobId ? JSON.parse(interiewJobId) : null);
  }, [locationAdded]);

  const handleSkip = () => {
    router.push("/candidates");
  };

  const onChangeLocation = (location: Location) => {
    formik.setFieldValue("currentLocation", location);
  };

  const addNewLocation = async (location: Location) => {
    if (locations.includes(location)) {
      toast.error("Location already exists");
      return;
    }
    formik.setFieldValue("currentLocation", location);
    setIsLocationAdded(true);
  };

  // Pass the useFormik() hook initial form values, a validate function that will be called when
  // form values change or fields are blurred, and a submit function that will
  // be called when the form is submitted
  const formik = useFormik({
    initialValues: CandidateModel,
    validationSchema: CandidateSchema,
    validateOnChange: false,
    validateOnMount: false,
    validateOnBlur: true, // Add this line to prevent validation on blur
    onSubmit: async (values) => {
      setIsSubmitting(true);
      addNewCandidate(values);
    },
  });

  const handleFormSubmit = (data: any) => {
    console.log(data);
    router.push("/candidates");
  };

  //---------------------------------------------------------
  // Add New Candidate
  //------------------------------------------------------------
  const addNewCandidate = async (reqData: Candidate) => {
    if (!reqData.resume) {
      toast.error("Resume is required", {
        position: "top-right",
      });
    }
    reqData.isActive =
      reqData.candidateStatus == CandidateStatus.ACTIVE ? true : false;
    reqData.differentlyAbled =
      reqData.isDifferentlyAbled == "yes" ? true : false;
    reqData.isExpectedCtcNegotiable = true;
    console.log(JSON.stringify(reqData, null, 2));

    try {
      createCandidate(reqData).then((data) => {
        console.log(data);
        if (data.status === 201) {
          toast.success("Candidate added successfully", {
            position: "top-center",
          });
          // setTimeout(() => {
          //   router.push("/candidates");
          // },1000);
          setCandidateId(data.data.contactId);
          setShowForm(true);
          if (assignInterview) {
            createContactInterview({
              interviewStatus: "Scheduled",
              clientJob: {
                jobId: assignInterview,
              },
              contactDetails: {
                contactId: data.data.contactId,
              },
            }).then((data) => {
              console.log(data);
              localStorage.removeItem("jobId");
              localStorage.removeItem("assignInterview");
            });
          }
        } else {
          if (data.message === "Location not found with id: 0") {
            toast.error("Current Location is required", {
              position: "top-center",
            });
            return;
          }
          toast.warn(data.message, {
            position: "top-center",
          });
          if (!data.message) {
            Object.entries(data).forEach(([fieldName, errorMessage]) => {
              toast.warn(
                `${
                  fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
                }: ${errorMessage}`,
                {
                  position: "top-center",
                  autoClose: 5000,
                }
              );
            });
          }
        }
      });
    } catch (err: any) {
      console.log(err);
    }
  };

  //---------------------------------------------------------
  // File upload Helper functions and Events
  //------------------------------------------------------------
  const handleFileClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    const target = event.target;
    if (target && target.type === "file") {
      setFile(target?.files?.[0]);
      setUpdatedFileName(target?.files?.[0]?.name);
      console.log(target?.files?.[0]);
    }
  };
  const handleChooseFile = (event: React.MouseEvent) => {
    event.stopPropagation();
    fileInputRef?.current?.click();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    setFile(droppedFile);
  };

  const handleUploadAutofillResume = async (event: any) => {
    event.stopPropagation();
    const fileName = file?.name;
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    setIsLoader(true);
    try {
      uploadAutofillResume(formData)
        .then((data) => {
          console.log(data);
          setIsLoader(false);
          setIsAutofill(false);
          formik.values.firstName = data.FirstName;
          formik.values.lastName = data.LastName;
          formik.values.emailId = data.Email;
          formik.values.primaryNumber = data.Phone;
          formik.values.companyName = data.CurrentCompany;
          formik.values.techRole = data.CurrentRole;
          formik.values.totalExperience = data.ExperienceInYears;
          formik.values.gender = data.Gender;
          formik.values.designation = data.CurrentDesignation;
          formik.values.address = data.Address;
          formik.values.addressLocality  = data.AddressLocality;
          formik.values.currentLocation.locationDetails = data.Location
        })
        .catch((err) => {
          toast.error(err.message, {
            position: "top-center",
          });
        });
      toast.dismiss();
    } catch (err) {
      toast.dismiss();
    }
  };

  const handleUpload = async (event: any) => {
    event.stopPropagation();
    const fileName = file?.name;
    if (!file) return;

    if (file.size > 50000) {
      toast.error("File size should be less than 5MB", {
        position: "top-right",
        delay: 500,
      });
      return;
    } else {
      const formData = new FormData();
      formData.append("file", file);
      try {
        uploadResume(formData)
          .then((data) => {
            setUpdatedFileName("");
            setSuccesMsg("Resume uploaded successfully");
            formik.setFieldValue("resume", data);
          })
          .catch((err) => {
            toast.error(err.message, {
              position: "top-center",
            });
          });
        toast.dismiss();
      } catch (err) {
        toast.dismiss();
      }
    }
  };

  return (
    <MainLayout>
      <div className="min-h-screen">
        <ContentHeader title="Add New Candidate" />
        <form
          className=" relative text-xs md:text-base mx-auto max-w-7xl"
          onSubmit={formik.handleSubmit}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
            }
          }}
        >
          <div className="text-base font-semibold flex items-center justify-between text-blue-500 mb-4">
            <span className="md:text-lg">Personal Information</span>
            <button
              type="button"
              className="bg-blue-500 text-white py-1 rounded-md px-4"
              onClick={() => setIsAutofill(true)}
            >
              AutoFill by Uploading Resume
            </button>
            {isAutofill ? (
              <Popup onClose={() => setIsAutofill(false)}>
                <div className="text-sm md:text-base mt-14">
                  <div className="h-auto space-y-3 rounded-lg">
                    <div
                      className="mt-2 flex flex-col items-center justify-center w-full h-64 rounded-lg border border-dashed border-gray-900/25 bg-gray-50 hover:bg-gray-100  dark:hover:bg-black cursor-pointer dark:bg-black dark:text-white"
                      onDrop={handleDrop}
                      onDragOver={(e) => e.preventDefault()}
                    >
                      <svg
                        className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-100"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <div className="mb-4 flex text-sm/6 text-gray-100">
                        <button
                          className="border border-dashed  text-black dark:text-white border-gray-900 px-2 font-semibold"
                          type="button"
                          onClick={handleChooseFile}
                        >
                          Choose a File
                        </button>
                        <input
                          type="file"
                          name="resume"
                          ref={fileInputRef}
                          accept=".pdf, .doc, .docx"
                          style={{ display: "none" }}
                          onClick={handleFileClick}
                          onChange={handleFileChange}
                        />
                        <p className="pl-2 text-gray-600 dark:text-white">
                          or drag and drop
                        </p>
                      </div>
                      <p className="text-xs/4 text-gray-800 dark:text-gray-100">
                        PDF, DOC, DOCX up to 5MB
                      </p>
                      {file && (
                        <p className="mt-4 text-green-500">
                          {updatedFileName}
                          {successMsg}
                        </p>
                      )}
                      {isLoader && (
                        <div className="w-10 h-10 rounded-full border-blue-300 border-4 border-t-blue-600 animate-spin" />
                      )}

                      <button
                        className="bg-[var(--button-background)] text-white py-2 px-4 rounded mt-4 hover:bg-[var(--hover-button-background)] hover:text-[var(--hover-button-foreground)]  disabled:[var(--disabled-button-background)] "
                        type="button"
                        onClick={handleUploadAutofillResume}
                      >
                        Upload
                      </button>
                    </div>
                  </div>
                </div>
              </Popup>
            ) : (
              ""
            )}
          </div>
          <div className="p-2 md:p-4 grid grid-cols-1 md:grid-cols-2 md:gap-8 gap-4 text-gray-900  text-sm md:text-base">
            <div className="space-y-3 rounded-lg">
              <label htmlFor="firstName" className="flex">
                <span className="font-semibold text-gray-600 dark:text-white ">
                  First Name
                </span>
                <span className="px-1 font-bold text-red-500">*</span>
              </label>
              <input
                type="text"
                name="firstName"
                placeholder="Enter First Name"
                className="py-2 px-1 w-full focus:outline-[var(--theme-background)] dark:bg-black dark:text-white border outline:none rounded-lg"
                value={formik.values.firstName}
                onChange={formik.handleChange}
              />
              {formik.errors.firstName ? (
                <div className="text-red-500 text-sm border-red-500">
                  {formik.errors.firstName}
                </div>
              ) : null}
            </div>
            <div className="space-y-3 rounded-lg">
              <label htmlFor="lastName" className="flex">
                <span className="  font-semibold text-gray-600 dark:text-white ">
                  Last Name
                </span>
                <span className="px-1 font-bold text-red-500">*</span>
              </label>
              <input
                type="text"
                name="lastName"
                placeholder="Enter Last Name"
                className="py-2 px-1 w-full border rounded-lg focus:outline-[var(--theme-background)] dark:bg-black dark:text-white"
                value={formik.values.lastName}
                onChange={formik.handleChange}
              />
              {formik.errors.lastName ? (
                <div className="text-red-500 text-sm border-red-500">
                  {formik.errors.lastName}
                </div>
              ) : null}
            </div>

            <div className="space-y-3 rounded-lg">
              <label htmlFor="dob" className="flex">
                <span className="font-semibold text-gray-600 dark:text-white ">
                  Date of Birth
                </span>
              </label>
              <input
                type="date"
                name="dob"
                placeholder="Enter Date of Birth"
                className="py-2 px-1 w-full border rounded-lg focus:outline-[var(--theme-background)] dark:bg-black dark:text-white"
                value={formik.values.dob}
                onChange={formik.handleChange}
              />
              {formik.errors.dob ? (
                <div className="text-red-500 text-sm border-red-500">
                  {formik.errors.dob}
                </div>
              ) : null}
            </div>
            <div className="space-y-3 h-auto rounded-lg">
              <label htmlFor="emailId" className="flex">
                <span className="  font-semibold text-gray-600 dark:text-white">
                  Email
                </span>
                <span className="px-1 font-bold text-red-500">*</span>
              </label>
              <input
                type="text"
                name="emailId"
                placeholder="Enter Email"
                className="py-2 px-1 w-full border rounded-lg focus:outline-[var(--theme-background)] dark:bg-black dark:text-white"
                value={formik.values.emailId}
                onChange={formik.handleChange}
              />
              {formik.errors.emailId ? (
                <div className="text-red-500 text-sm border-red-500">
                  {formik.errors.emailId}
                </div>
              ) : null}
            </div>

            <div className="space-y-3 h-auto  rounded-lg">
              <label htmlFor="primaryNumber" className="flex">
                <span className="  font-semibold text-gray-600 dark:text-white ">
                  Mobile number
                </span>
                <span className="px-1 font-bold text-red-500">*</span>
              </label>
              <input
                type="text"
                name="primaryNumber"
                placeholder="Enter 10 digit mobile number"
                className="py-2 px-1 w-full border rounded-lg focus:outline-[var(--theme-background)] dark:bg-black dark:text-white"
                value={formik.values.primaryNumber}
                onChange={formik.handleChange}
              />
              {formik.errors.primaryNumber ? (
                <div className="text-red-500 text-sm border-red-500">
                  {formik.errors.primaryNumber}
                </div>
              ) : null}
            </div>
            <div className="space-y-3 h-auto rounded-lg">
              <label htmlFor="secondaryNumber" className="flex">
                <span className="  font-semibold text-gray-600 dark:text-white ">
                  Alternate Mobile number
                </span>
                {/* <span className="px-1 font-bold text-red-500">*</span> */}
              </label>
              <input
                type="text"
                name="secondaryNumber"
                placeholder="Enter 10 digit mobile number"
                className="py-2 px-1 w-full border rounded-lg focus:outline-[var(--theme-background)] dark:bg-black dark:text-white"
                value={formik.values.secondaryNumber}
                onChange={formik.handleChange}
              />
              {formik.errors.secondaryNumber ? (
                <div className="text-red-500 text-sm border-red-500">
                  {formik.errors.secondaryNumber}
                </div>
              ) : null}
            </div>

            <div className="h-auto md:h-full space-y-3 rounded-lg">
              <label htmlFor="gender" className="flex">
                <span className="  font-semibold text-gray-600 dark:text-white ">
                  Gender
                </span>
                <span className="px-1 font-bold text-red-500">*</span>
              </label>
              <fieldset>
                <div className="flex items-center gap-2 py-1 dark:text-white">
                  <input
                    type="radio"
                    name="gender"
                    id="male"
                    value={Gender.MALE}
                    checked={formik.values.gender === `${Gender.MALE}`}
                    onChange={formik.handleChange}
                  />
                  <label htmlFor="male">{Gender.MALE}</label>
                </div>
                <div className="flex items-center gap-2 py-1 dark:text-white">
                  <input
                    type="radio"
                    name="gender"
                    id="female"
                    value={Gender.FEMALE}
                    checked={formik.values.gender === `${Gender.FEMALE}`}
                    onChange={formik.handleChange}
                  />
                  <label htmlFor="female">{Gender.FEMALE}</label>
                </div>
                <div className="flex items-center gap-2 py-1 dark:text-white">
                  <input
                    type="radio"
                    name="gender"
                    id="others"
                    value={Gender.OTHERS}
                    checked={formik.values.gender === `${Gender.OTHERS}`}
                    onChange={formik.handleChange}
                  />
                  <label htmlFor="others">{Gender.OTHERS}</label>
                </div>
              </fieldset>
              {formik.errors.gender ? (
                <div className="text-red-500 text-sm border-red-500">
                  {formik.errors.gender}
                </div>
              ) : null}
            </div>
            <div className="h-auto md:h-full space-y-3 rounded-lg">
              <label htmlFor="maritalStatus" className="flex">
                <span className="  font-semibold text-gray-600 dark:text-white ">
                  Marital Status
                </span>
                <span className="px-1 font-bold text-red-500">*</span>
              </label>
              <fieldset>
                <div className="flex items-center gap-2 py-1 dark:text-white">
                  <input
                    type="radio"
                    name="maritalStatus"
                    id="married"
                    value={MaritalStatus.MARRIED}
                    checked={
                      formik.values.maritalStatus === `${MaritalStatus.MARRIED}`
                    }
                    onChange={formik.handleChange}
                  />
                  <label htmlFor="married">{MaritalStatus.MARRIED}</label>
                </div>
                <div className="flex items-center gap-2 py-1 dark:text-white">
                  <input
                    type="radio"
                    name="maritalStatus"
                    id="unmarried"
                    value={MaritalStatus.UNMARRIED}
                    checked={
                      formik.values.maritalStatus ===
                      `${MaritalStatus.UNMARRIED}`
                    }
                    onChange={formik.handleChange}
                  />
                  <label htmlFor="unmarried">{MaritalStatus.UNMARRIED}</label>
                </div>
              </fieldset>
              {formik.errors.maritalStatus ? (
                <div className="text-red-500 text-sm border-red-500">
                  {formik.errors.maritalStatus}
                </div>
              ) : null}
            </div>

            <div className="h-auto space-y-3 rounded-lg">
              <label htmlFor="address" className="flex">
                <span className="  font-semibold text-gray-600 dark:text-white ">
                  Address
                </span>
              </label>
              <textarea
                name="address"
                className="py-2 px-1 border rounded-lg w-full focus:outline-[var(--theme-background)] dark:bg-black dark:text-white"
                placeholder="Enter address"
                rows={4}
                cols={50}
                value={formik.values.address ? formik.values.address : ""}
                onChange={formik.handleChange}
              ></textarea>
              {formik.errors.address ? (
                <div className="text-red-500 text-sm border-red-500">
                  {formik.errors.address}
                </div>
              ) : null}
            </div>
            <div className="h-auto space-y-3 rounded-lg">
              <label htmlFor="addressLocality" className="flex">
                <span className="  font-semibold text-gray-600 dark:text-white ">
                  Address Locality
                </span>
              </label>
              <textarea
                name="addressLocality"
                className="py-2 px-1 border rounded-lg w-full focus:outline-[var(--theme-background)] dark:bg-black dark:text-white"
                placeholder="Enter address"
                rows={4}
                cols={50}
                value={
                  formik.values.addressLocality
                    ? formik.values.addressLocality
                    : ""
                }
                onChange={formik.handleChange}
              ></textarea>
              {formik.errors.addressLocality ? (
                <div className="text-red-500 text-sm border-red-500">
                  {formik.errors.addressLocality}
                </div>
              ) : null}
            </div>

            <div className="h-auto space-y-3 rounded-lg">
              <label htmlFor="currentLocation" className="flex">
                <span className="font-semibold text-gray-600 dark:text-white">
                  Current Location
                </span>
                <span className="px-1 font-bold text-red-500">*</span>
              </label>

              <LocationAutocomplete
                name="currentLocation"
                placeholder="Enter Current Location"
                value={formik.values.currentLocation.locationDetails ?? ""}
                onChange={onChangeLocation}
                options={locations}
                onAdd={addNewLocation}
              ></LocationAutocomplete>
              {formik.errors.currentLocation?.locationId ? (
                <div className="text-red-500 text-sm border-red-500">
                  {formik.errors.currentLocation.locationId}
                </div>
              ) : null}
            </div>
            <div className="h-auto space-y-3 rounded-lg">
              <label htmlFor="pinCode" className="flex">
                <span className="  font-semibold text-gray-600 dark:text-white ">
                  Pincode
                </span>
              </label>
              <input
                type="text"
                name="pinCode"
                placeholder="Enter Pincode"
                className="py-2 px-1 w-full border rounded-lg focus:outline-[var(--theme-background)] dark:bg-black dark:text-white"
                value={formik.values.pinCode}
                onChange={formik.handleChange}
              />
              {formik.errors.pinCode ? (
                <div className="text-red-500 text-sm border-red-500">
                  {formik.errors.pinCode}
                </div>
              ) : null}
            </div>
          </div>
          <hr className="my-12 h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10" />
          {/* ================================= */}
          <div className="text-base md:text-lg font-semibold mb-4 text-blue-500">
            Upload Resume <span className="text-red-500">*</span>
          </div>
          <div className="text-sm md:text-base">
            <div className="h-auto space-y-3 rounded-lg">
              <div
                className="mt-2 flex flex-col items-center justify-center w-full h-64 rounded-lg border border-dashed border-gray-900/25 bg-gray-50 hover:bg-gray-100  dark:hover:bg-black cursor-pointer dark:bg-black dark:text-white"
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
              >
                <svg
                  className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-100"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <div className="mb-4 flex text-sm/6 text-gray-100">
                  <button
                    className="border border-dashed  text-black dark:text-white border-gray-900 px-2 font-semibold"
                    type="button"
                    onClick={handleChooseFile}
                  >
                    Choose a File
                  </button>
                  <input
                    type="file"
                    name="resume"
                    ref={fileInputRef}
                    accept=".pdf, .doc, .docx"
                    style={{ display: "none" }}
                    onClick={handleFileClick}
                    onChange={handleFileChange}
                  />
                  <p className="pl-2 text-gray-600 dark:text-white">
                    or drag and drop
                  </p>
                </div>
                <p className="text-xs/4 text-gray-800 dark:text-gray-100">
                  PDF, DOC, DOCX up to 5MB
                </p>
                {file && (
                  <p className="mt-4 text-green-500">
                    {updatedFileName}
                    {successMsg}
                  </p>
                )}
                <button
                  className="bg-[var(--button-background)] text-white py-2 px-4 rounded mt-4 hover:bg-[var(--hover-button-background)] hover:text-[var(--hover-button-foreground)]  disabled:[var(--disabled-button-background)] "
                  type="button"
                  onClick={handleUpload}
                >
                  Upload
                </button>
              </div>
            </div>

            {/* <div className="p-2 h-auto space-y-2 py-2 md:space-y-2 rounded-lg">
              <label htmlFor="profilepic" className="flex">
                <span className=" font-semibold ">Image</span>
              </label>
              <input
                type="file"
                name="profilepic"
                className="py-2 px-1 rounded-full w-full focus:outline-[var(--theme-background)]"
              />
              <button className="text-[var(--content-background)] bg-[var(--theme-background)] p-2 rounded-lg w-fit hover:bg-[var(--content-background)] hover:text-[var(--theme-background)] hover:shadow-md hover:shadow-[var(--theme-background)] text-xs md:text-base" type="button">Change</button>
            </div> */}
          </div>
          <hr className="my-12 h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10" />
          {/* ================================= */}
          <div className="text-base md:text-lg font-semibold mb-4 text-blue-500">
            Professional Summary
          </div>
          <div className="p-2 md:p-4  grid grid-cols-1 md:grid-cols-2 md: gap-8  text-gray-900   text-sm md:text-base">
            <div className="h-auto space-y-3 rounded-lg">
              <label htmlFor="companyName" className="flex">
                <span className="  font-semibold text-gray-600 dark:text-white ">
                  Company
                </span>
              </label>
              <input
                type="text"
                name="companyName"
                placeholder="Enter Current or Previous Company"
                className="py-2 px-1 w-full border rounded-lg focus:outline-[var(--theme-background)] dark:bg-black dark:text-white"
                value={
                  formik.values.companyName ? formik.values.companyName : ""
                }
                onChange={formik.handleChange}
              />
              {formik.errors.companyName ? (
                <div className="text-red-500 text-sm border-red-500">
                  {formik.errors.companyName}
                </div>
              ) : null}
            </div>
            <div className="h-auto space-y-3 rounded-lg">
              <label htmlFor="designation" className="flex">
                <span className="  font-semibold text-gray-600 dark:text-white ">
                  Designation
                </span>
                <span className="px-1 font-bold text-red-500">*</span>
              </label>
              <input
                type="text"
                name="designation"
                placeholder="Enter Designation"
                className="py-2 px-1 w-full border rounded-lg focus:outline-[var(--theme-background)] dark:bg-black dark:text-white"
                value={formik.values.designation}
                onChange={formik.handleChange}
              />
              {formik.errors.designation ? (
                <div className="text-red-500 text-sm border-red-500">
                  {formik.errors.designation}
                </div>
              ) : null}
            </div>

            <div className="h-auto space-y-3 rounded-lg">
              <label htmlFor="totalExperience" className="flex">
                <span className="  font-semibold text-gray-600 dark:text-white ">
                  Experience (In Years)
                </span>
                <span className="px-1 font-bold text-red-500">*</span>
              </label>
              <input
                type="text"
                name="totalExperience"
                placeholder="Enter Minimum Work Experience"
                className="py-2 px-1 w-full border rounded-lg focus:outline-[var(--theme-background)] dark:bg-black dark:text-white"
                value={formik.values.totalExperience}
                onChange={formik.handleChange}
              />
              {formik.errors.totalExperience ? (
                <div className="text-red-500 text-sm border-red-500">
                  {formik.errors.totalExperience}
                </div>
              ) : null}
            </div>
            <div className="h-auto space-y-3 rounded-lg">
              <label htmlFor="currentSalary" className="flex">
                <span className="  font-semibold text-gray-600 dark:text-white ">
                  Current Salary (In CTC)
                </span>
                <span className="px-1 font-bold text-red-500">*</span>
              </label>
              <input
                type="text"
                name="currentSalary"
                placeholder="Enter Minimum to Maximum Salary"
                className="py-2 px-1 w-full border rounded-lg focus:outline-[var(--theme-background)] dark:bg-black dark:text-white"
                value={formik.values.currentSalary}
                onChange={formik.handleChange}
              />
              {formik.errors.currentSalary ? (
                <div className="text-red-500 text-sm border-red-500">
                  {formik.errors.currentSalary}
                </div>
              ) : null}
            </div>

            <div className="h-auto space-y-3 rounded-lg">
              <label htmlFor="expectedSalary" className="flex">
                <span className="font-semibold text-gray-600 dark:text-white">
                  Expected Salary (In CTC)
                </span>
                <span className="px-1 font-bold text-red-500">*</span>
              </label>
              <input
                type="text"
                name="expectedSalary"
                placeholder="Enter Minimum to Maximum Salary"
                className="py-2 px-1 w-full border rounded-lg focus:outline-[var(--theme-background)] dark:bg-black dark:text-white"
                value={formik.values.expectedSalary}
                onChange={formik.handleChange}
              />
              {formik.errors.expectedSalary ? (
                <div className="text-red-500 text-sm border-red-500">
                  {formik.errors.expectedSalary}
                </div>
              ) : null}
            </div>

            <div className="h-auto space-y-3 rounded-lg">
              <label htmlFor="candidateStatus" className="flex">
                <span className="font-semibold text-gray-600 dark:text-white">
                  Salary Negotiable?
                </span>
              </label>
              <fieldset>
                <div className="flex items-center gap-2 py-1 dark:text-white">
                  <input
                    type="radio"
                    name="negotiable"
                    value="true"
                    id="negotiable_yes"
                    onChange={() => {
                      formik.setFieldValue("isExpectedCtcNegotiable", true);
                    }}
                  />
                  <label htmlFor="negotiable_yes">Yes</label>
                </div>

                <div className="flex items-center gap-2 py-2 dark:text-white">
                  <input
                    type="radio"
                    name="negotiable"
                    value="false"
                    id="negotiable_no"
                    onChange={() => {
                      formik.setFieldValue("isExpectedCtcNegotiable", false);
                    }}
                  />
                  <label htmlFor="inactive">No</label>
                </div>
              </fieldset>
              {formik.errors.isExpectedCtcNegotiable ? (
                <div className="text-red-500 text-sm border-red-500">
                  {formik.errors.isExpectedCtcNegotiable}
                </div>
              ) : null}
            </div>

            <div className="h-auto space-y-3 rounded-lg">
              <label htmlFor="highestEducation" className="flex">
                <span className="  font-semibold text-gray-600 dark:text-white ">
                  Education
                </span>
                <span className="px-1 font-bold text-red-500">*</span>
              </label>
              <input
                type="text"
                name="highestEducation"
                placeholder="Enter Highest Education"
                className="py-2 px-1 w-full border rounded-lg focus:outline-[var(--theme-background)] dark:bg-black dark:text-white"
                value={formik.values.highestEducation}
                onChange={formik.handleChange}
              />
              {formik.errors.highestEducation ? (
                <div className="text-red-500 text-sm border-red-500">
                  {formik.errors.highestEducation}
                </div>
              ) : null}
            </div>
            <div className="h-auto space-y-3 rounded-lg">
              <label htmlFor="techRole" className="flex">
                <span className="  font-semibold text-gray-600 dark:text-white ">
                  Tech Role
                </span>
                <span className="px-1 font-bold text-red-500">*</span>
              </label>

              <input
                type="text"
                name="techRole"
                placeholder="Enter Tech Role"
                className="py-2 px-1 w-full border rounded-lg focus:outline-[var(--theme-background)] dark:bg-black dark:text-white"
                value={formik.values.techRole}
                onChange={formik.handleChange}
              />
              {formik.errors.techRole ? (
                <div className="text-red-500 text-sm border-red-500">
                  {formik.errors.techRole}
                </div>
              ) : null}
            </div>

            <div className="h-auto space-y-3 rounded-lg">
              <label htmlFor="noticePeriod" className="flex">
                <span className="  font-semibold text-gray-600 dark:text-white ">
                  Notice Period (In Days)
                </span>
                <span className="px-1 font-bold text-red-500">*</span>
              </label>
              <input
                type="text"
                name="noticePeriod"
                placeholder="Enter Minimum days"
                className="py-2 px-1 w-full border rounded-lg focus:outline-[var(--theme-background)] dark:bg-black dark:text-white"
                value={formik.values.noticePeriod}
                onChange={formik.handleChange}
              />
              {formik.errors.noticePeriod ? (
                <div className="text-red-500 text-sm border-red-500">
                  {formik.errors.noticePeriod}
                </div>
              ) : null}
            </div>

            <div className="h-auto space-y-3 rounded-lg">
              <label htmlFor="isDifferentlyAbled" className="flex">
                <span className="font-semibold text-gray-600 dark:text-white">
                  Differently Abled
                </span>
                <span className="px-1 font-bold text-red-500">*</span>
              </label>
              <fieldset>
                <div className="flex items-center gap-2 py-1 dark:text-white">
                  <input
                    type="radio"
                    name="isDifferentlyAbled"
                    id="yes"
                    value={DifferentlyAbled.YES}
                    checked={
                      formik.values.isDifferentlyAbled ===
                      `${DifferentlyAbled.YES}`
                    }
                    onChange={formik.handleChange}
                  />
                  <label htmlFor="yes">{DifferentlyAbled.YES}</label>
                </div>
                <div className="flex items-center gap-2 py-1 dark:text-white">
                  <input
                    type="radio"
                    name="isDifferentlyAbled"
                    id="no"
                    value={DifferentlyAbled.NO}
                    checked={
                      formik.values.isDifferentlyAbled ===
                      `${DifferentlyAbled.NO}`
                    }
                    onChange={formik.handleChange}
                  />
                  <label htmlFor="no">{DifferentlyAbled.NO}</label>
                </div>
              </fieldset>
              {formik.errors.isDifferentlyAbled ? (
                <div className="text-red-500 text-sm border-red-500">
                  {formik.errors.isDifferentlyAbled}
                </div>
              ) : null}
            </div>

            <div className="h-auto space-y-3 rounded-lg">
              <label htmlFor="candidateStatus" className="flex">
                <span className="font-semibold text-gray-600 dark:text-white">
                  Candidate Status
                </span>
                <span className="px-1 font-bold text-red-500">*</span>
              </label>
              <fieldset>
                <div className="flex items-center gap-2 py-1 dark:text-white">
                  <input
                    type="radio"
                    name="candidateStatus"
                    value={CandidateStatus.ACTIVE}
                    id="active"
                    checked={
                      formik.values.candidateStatus ===
                      `${CandidateStatus.ACTIVE}`
                    }
                    onChange={formik.handleChange}
                  />
                  <label htmlFor="active">{CandidateStatus.ACTIVE}</label>
                </div>

                <div className="flex items-center gap-2 py-2 dark:text-white">
                  <input
                    type="radio"
                    name="candidateStatus"
                    value={CandidateStatus.INACTIVE}
                    id="inactive"
                    checked={
                      formik.values.candidateStatus ===
                      `${CandidateStatus.INACTIVE}`
                    }
                    onChange={formik.handleChange}
                  />
                  <label htmlFor="inactive">{CandidateStatus.INACTIVE}</label>
                </div>
              </fieldset>
              {formik.errors.candidateStatus ? (
                <div className="text-red-500 text-sm border-red-500">
                  {formik.errors.candidateStatus}
                </div>
              ) : null}
            </div>

            {DifferentlyAbled.YES === formik.values.isDifferentlyAbled && (
              <div className="h-auto space-y-3 rounded-lg">
                <label htmlFor="differentlyAbledType" className="flex">
                  <span className="font-semibold text-gray-600 dark:text-white">
                    Differently Abled Type
                  </span>
                </label>
                <select
                  name="differentlyAbledType"
                  className="py-2 px-1 w-full border rounded-lg focus:outline-[var(--theme-background)] dark:bg-black dark:text-white"
                  value={formik.values.differentlyAbledType || ""}
                  onChange={formik.handleChange}
                >
                  <option value="">None</option>
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
                {formik.errors.differentlyAbledType && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.differentlyAbledType}
                  </div>
                )}
              </div>
            )}
          </div>
          <footer className="absolute -bottom-16 right-4 pb-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
              type="submit"
            >
              Continue to Next Step
            </button>
          </footer>
        </form>
        {showForm && (
          <Popup onClose={() => setShowForm(false)}>
            <ProfessionalForm
              onClose={() => setShowForm(false)}
              masterlocations={locations}
              masterSkills={skills ? skills : []}
              masterCertifications={certifications}
              masterCompanies={previousCompanies}
              masterDomains={domains}
              onSubmit={handleFormSubmit}
              onSkip={handleSkip}
              candidateId={candidateId}
            ></ProfessionalForm>
          </Popup>
        )}
      </div>
    </MainLayout>
  );
}
