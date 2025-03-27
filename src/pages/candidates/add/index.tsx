"use client";

import "react-toastify/dist/ReactToastify.css";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";

import { toast } from "react-toastify";
import { CandidateModel, CandidateSchema } from "@/lib/models/candidate";
import { createCandidate, uploadResume } from "@/api/candidates/candidates";
import type { Candidate, Location } from "@/lib/definitions";
import {
  CandidateStatus,
  Gender,
  HiringType,
  MaritalStatus,
  DifferentlyAbled,
  PreferredJobType,
} from "@/lib/constants";

import MainLayout from "@/components/Layouts/layout";
import ContentHeader from "@/components/Layouts/content-header";
import LocationAutocomplete from "@/components/Forms/location-autocomplete";
import { fetchAllLocations } from "@/api/master/masterLocation";

export default function Candidates() {
  // This will be used to show a spinner if the form isSubmitting }]
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [file, setFile] = useState<File | undefined>(undefined);
  const [updatedFileName, setUpdatedFileName] = useState<string | undefined>(
    undefined
  );
  const router = useRouter();
  const [locations, setLocations] = useState<Location[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchAllLocations().then((data) => {
      const allLocatoins = data;
      setLocations(allLocatoins);
    });
  }, []);

  const onChangeLocation = (location: Location) => {
    formik.setFieldValue("currentLocation", location);
  };

  const addNewLocation = async (location: Location) => {
    formik.setFieldValue("currentLocation", location);
  };

  // Pass the useFormik() hook initial form values, a validate function that will be called when
  // form values change or fields are blurred, and a submit function that will
  // be called when the form is submitted
  const formik = useFormik({
    initialValues: CandidateModel,
    validationSchema: CandidateSchema,
    validateOnMount: false,
    validateOnBlur: false, // Add this line to prevent validation on blur
    validateOnChange: false, // Add this line to prevent validation while typing
    onSubmit: async (values) => {
      setIsSubmitting(true);
      addNewCandidate(values);
    },
  });

  //---------------------------------------------------------
  // Add New Candidate
  //------------------------------------------------------------
  const addNewCandidate = async (reqData: Candidate) => {
    reqData.isActive =
      reqData.candidateStatus == CandidateStatus.ACTIVE ? true : false;
    reqData.differentlyAbled =
      reqData.isDifferentlyAbled == "yes" ? true : false;
    console.log(JSON.stringify(reqData, null, 2));

    try {
      createCandidate(reqData).then((data) => {
        console.log(data);
        if(data.status === 201) {
          toast.success("Candidate added successfully", {
            position: "top-center",
          });
          setTimeout(() => {
            router.push("/candidates");
          },1000);
          
        }
        else{
          toast.error(data.message, {
            position: "top-center",
          })
        }
      })
      
    } catch (err: any) {
      toast.error(err.message, {
        position: "bottom-right",
      });
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

  const handleUpload = async (event: any) => {
    event.stopPropagation();
    const fileName = file?.name;
    if (!file) return;

    const formData = new FormData();
    console.log(formData);
    console.log(file);
    formData.append("file", file);
    toast.warning("Uploading Resume...", {
      position: "bottom-right",
    });
    try {
      uploadResume(formData)
        .then((data) => {
          console.log(data);
          setUpdatedFileName(data);
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
          <div className="text-base md:text-lg font-semibold text-blue-500 mb-4">
            Personal Information
          </div>
          <div className="p-2 md:p-4 grid grid-cols-1 md:grid-cols-2 md:gap-8 gap-4 text-gray-900  text-sm md:text-base">
            <div className="space-y-3 rounded-lg">
              <label htmlFor="firstName" className="flex">
                <span className="  font-semibold text-gray-600 ">
                  First Name
                </span>
                <span className="px-1 font-bold text-red-500">*</span>
              </label>
              <input
                type="text"
                name="firstName"
                placeholder="Enter First Name"
                className="py-2 px-1 w-full focus:outline-[var(--theme-background)] border rounded-lg"
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
                <span className="  font-semibold text-gray-600 ">
                  Last Name
                </span>
                <span className="px-1 font-bold text-red-500">*</span>
              </label>
              <input
                type="text"
                name="lastName"
                placeholder="Enter Last Name"
                className="py-2 px-1 w-full border rounded-lg focus:outline-[var(--theme-background)]"
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
                <span className="font-semibold text-gray-600 ">
                  Date of Birth
                </span>
                <span className="px-1 font-bold text-red-500">*</span>
              </label>
              <input
                type="date"
                name="dob"
                placeholder="Enter Date of Birth"
                className="py-2 px-1 w-full border rounded-lg focus:outline-[var(--theme-background)]"
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
                <span className="  font-semibold text-gray-600">Email</span>
                <span className="px-1 font-bold text-red-500">*</span>
              </label>
              <input
                type="text"
                name="emailId"
                placeholder="Enter Email"
                className="py-2 px-1 w-full border rounded-lg focus:outline-[var(--theme-background)]"
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
                <span className="  font-semibold text-gray-600 ">
                  Mobile number
                </span>
                <span className="px-1 font-bold text-red-500">*</span>
              </label>
              <input
                type="text"
                name="primaryNumber"
                placeholder="Enter 10 digit mobile number"
                className="py-2 px-1 w-full border rounded-lg focus:outline-[var(--theme-background)]"
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
                <span className="  font-semibold text-gray-600 ">
                  Alternate Mobile number
                </span>
              </label>
              <input
                type="text"
                name="secondaryNumber"
                placeholder="Enter 10 digit mobile number"
                className="py-2 px-1 w-full border rounded-lg focus:outline-[var(--theme-background)]"
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
                <span className="  font-semibold text-gray-600 ">Gender</span>
                <span className="px-1 font-bold text-red-500">*</span>
              </label>
              <fieldset>
                <div className="flex items-center gap-2 py-1">
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
                <div className="flex items-center gap-2 py-1">
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
                <div className="flex items-center gap-2 py-1">
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
                <span className="  font-semibold text-gray-600 ">
                  Marital Status
                </span>
                <span className="px-1 font-bold text-red-500">*</span>
              </label>
              <fieldset>
                <div className="flex items-center gap-2 py-1">
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
                <div className="flex items-center gap-2 py-1">
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
                <span className="  font-semibold text-gray-600 ">Address</span>
              </label>
              <textarea
                name="address"
                className="py-2 px-1 border rounded-lg w-full focus:outline-[var(--theme-background)]"
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
                <span className="  font-semibold text-gray-600 ">
                  Address Locality
                </span>
              </label>
              <textarea
                name="addressLocality"
                className="py-2 px-1 border rounded-lg w-full focus:outline-[var(--theme-background)]"
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
                <span className="  font-semibold text-gray-600 ">Pincode</span>
              </label>
              <input
                type="text"
                name="pinCode"
                placeholder="Enter Pincode"
                className="py-2 px-1 w-full border rounded-lg focus:outline-[var(--theme-background)]"
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
            Upload Resume
          </div>
          <div className="text-sm md:text-base">
            <div className="h-auto space-y-3 rounded-lg">
              <div
                className="mt-2 flex flex-col items-center justify-center w-full h-64 rounded-lg border border-dashed border-gray-900/25 bg-gray-50 hover:bg-gray-100 cursor-pointer"
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
              >
                <svg
                  className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
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
                <div className="mb-4 flex text-sm/6 text-gray-500">
                  <button
                    className="border border-dashed  border-gray-900 px-2 font-semibold"
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
                  <p className="pl-2">or drag and drop</p>
                </div>
                <p className="text-xs/4 text-gray-500">
                  PDF, DOC, DOCX up to 5MB
                </p>
                {file && (
                  <p className="mt-4">
                    <b>Selected file : </b>
                    {updatedFileName}
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
                <span className="  font-semibold text-gray-600 ">Company</span>
              </label>
              <input
                type="text"
                name="companyName"
                placeholder="Enter Current or Previous Company"
                className="py-2 px-1 w-full border rounded-lg focus:outline-[var(--theme-background)]"
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
                <span className="  font-semibold text-gray-600 ">
                  Designation
                </span>
                <span className="px-1 font-bold text-red-500">*</span>
              </label>
              <input
                type="text"
                name="designation"
                placeholder="Enter Designation"
                className="py-2 px-1 w-full border rounded-lg focus:outline-[var(--theme-background)]"
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
                <span className="  font-semibold text-gray-600 ">
                  Experience (In Years)
                </span>
                <span className="px-1 font-bold text-red-500">*</span>
              </label>
              <input
                type="text"
                name="totalExperience"
                placeholder="Enter Minimum Work Experience"
                className="py-2 px-1 w-full border rounded-lg focus:outline-[var(--theme-background)]"
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
                <span className="  font-semibold text-gray-600 ">
                  Salary (In CTC)
                </span>
                <span className="px-1 font-bold text-red-500">*</span>
              </label>
              <input
                type="text"
                name="currentSalary"
                placeholder="Enter Minimum to Maximum Salary"
                className="py-2 px-1 w-full border rounded-lg focus:outline-[var(--theme-background)]"
                value={formik.values.currentSalary}
                onChange={formik.handleChange}
              />
              {formik.errors.currentSalary ? (
                <div className="text-red-500 text-sm border-red-500">
                  {formik.errors.currentSalary}
                </div>
              ) : null}
            </div>

            {/* <div className="h-auto space-y-3 rounded-lg">
              <label htmlFor="expectedSalary" className="flex">
                <span className="font-semibold text-gray-600">Expected Salary (In CTC)</span>
                <span className="px-1 font-bold text-red-500">*</span>
              </label>
              <input
                type="text"
                name="expectedSalary"
                placeholder="Enter Minimum to Maximum Salary"
                className="py-2 px-1 w-full border rounded-lg focus:outline-[var(--theme-background)]"
                value={formik.values.expectedSalary}
                onChange={formik.handleChange}
              />
              {formik.errors.expectedSalary ? (
                <div className="text-red-500 text-sm border-red-500">
                  {formik.errors.expectedSalary}
                </div>
              ) : null}
            </div> */}

            <div className="h-auto space-y-3 rounded-lg">
              <label htmlFor="highestEducation" className="flex">
                <span className="  font-semibold text-gray-600 ">
                  Education
                </span>
                <span className="px-1 font-bold text-red-500">*</span>
              </label>
              <input
                type="text"
                name="highestEducation"
                placeholder="Enter Highest Education"
                className="py-2 px-1 w-full border rounded-lg focus:outline-[var(--theme-background)]"
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
                <span className="  font-semibold text-gray-600 ">
                  Tech Role
                </span>
                <span className="px-1 font-bold text-red-500">*</span>
              </label>

              <input
                type="text"
                name="techRole"
                placeholder="Enter Tech Role"
                className="py-2 px-1 w-full border rounded-lg focus:outline-[var(--theme-background)]"
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
                <span className="  font-semibold text-gray-600 ">
                  Notice Period (In Days)
                </span>
                <span className="px-1 font-bold text-red-500">*</span>
              </label>
              <input
                type="text"
                name="noticePeriod"
                placeholder="Enter Minimum days"
                className="py-2 px-1 w-full border rounded-lg focus:outline-[var(--theme-background)]"
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
              <label htmlFor="differentlyAbledType" className="flex">
                <span className="font-semibold text-gray-600">
                  Differently Abled Type
                </span>
              </label>
              <select
                name="differentlyAbledType"
                className="py-2 px-1 w-full border rounded-lg focus:outline-[var(--theme-background)]"
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

            <div className="h-auto space-y-3 rounded-lg">
              <label htmlFor="hiringType" className="flex">
                <span className="  font-semibold text-gray-600 ">
                  Hiring Type
                </span>
              </label>
              <fieldset>
                <div className="flex items-center gap-2 py-1">
                  <input
                    type="radio"
                    name="hiringType"
                    id="full"
                    value={HiringType.FULL}
                    checked={formik.values.hiringType === `${HiringType.FULL}`}
                    onChange={formik.handleChange}
                  />
                  <label htmlFor="full">Full Time</label>
                </div>
                <div className="flex items-center gap-2 py-1">
                  <input
                    type="radio"
                    name="hiringType"
                    id="part"
                    value={HiringType.PART}
                    checked={formik.values.hiringType === `${HiringType.PART}`}
                    onChange={formik.handleChange}
                  />
                  <label htmlFor="part">Part Time</label>
                </div>
                <div className="flex items-center gap-2 py-1">
                  <input
                    type="radio"
                    name="hiringType"
                    id="contract"
                    value={HiringType.CONTRACT}
                    checked={
                      formik.values.hiringType === `${HiringType.CONTRACT}`
                    }
                    onChange={formik.handleChange}
                  />
                  <label htmlFor="contract">Contract</label>
                </div>
              </fieldset>
              {formik.errors.hiringType ? (
                <div className="text-red-500 text-sm border-red-500">
                  {formik.errors.hiringType}
                </div>
              ) : null}
            </div>
            <div className="h-auto space-y-3 rounded-lg">
              <label htmlFor="preferredJobType" className="flex">
                <span className="  font-semibold text-gray-600 ">
                  Preferred Job Type
                </span>
                <span className="px-1 font-bold text-red-500">*</span>
              </label>

              <fieldset>
                <div className="flex items-center gap-2 py-1">
                  <input
                    type="radio"
                    name="preferredJobType"
                    id="fulljob"
                    value={PreferredJobType.REMOTE}
                    checked={
                      formik.values.preferredJobType ===
                      `${PreferredJobType.REMOTE}`
                    }
                    onChange={formik.handleChange}
                  />
                  <label htmlFor="fulljob">{PreferredJobType.REMOTE}</label>
                </div>
                <div className="flex items-center gap-2 py-1">
                  <input
                    type="radio"
                    name="preferredJobType"
                    id="partjob"
                    value={PreferredJobType.HYBRID}
                    checked={
                      formik.values.preferredJobType ===
                      `${PreferredJobType.HYBRID}`
                    }
                    onChange={formik.handleChange}
                  />
                  <label htmlFor="partjob">{PreferredJobType.HYBRID}</label>
                </div>
                <div className="flex items-center gap-2 py-1">
                  <input
                    type="radio"
                    name="preferredJobType"
                    id="contractjob"
                    value={PreferredJobType.ONSITE}
                    checked={
                      formik.values.preferredJobType ===
                      `${PreferredJobType.ONSITE}`
                    }
                    onChange={formik.handleChange}
                  />
                  <label htmlFor="contractjob">{PreferredJobType.ONSITE}</label>
                </div>
              </fieldset>
              {formik.errors.preferredJobType ? (
                <div className="text-red-500 text-sm border-red-500">
                  {formik.errors.preferredJobType}
                </div>
              ) : null}
            </div>

            <div className="h-auto space-y-3 rounded-lg">
              <label htmlFor="candidateStatus" className="flex">
                <span className="font-semibold text-gray-600">
                  Candidate Status
                </span>
                <span className="px-1 font-bold text-red-500">*</span>
              </label>
              <fieldset>
                <div className="flex items-center gap-2 py-1">
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

                <div className="flex items-center gap-2 py-2">
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

            <div className="h-auto space-y-3 rounded-lg">
              <label htmlFor="isDifferentlyAbled" className="flex">
                <span className="font-semibold text-gray-600">
                  Differently Abled
                </span>
                <span className="px-1 font-bold text-red-500">*</span>
              </label>
              <fieldset>
                <div className="flex items-center gap-2 py-1">
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
                <div className="flex items-center gap-2 py-1">
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

            
          </div>

          <footer className="absolute -bottom-16 right-4 pb-4">
            <button
              className="bg-[var(--button-background)] text-white py-2 px-4 rounded mt-4 hover:bg-[var(--hover-button-background)] hover:text-[var(--hover-button-foreground)]  disabled:[var(--disabled-button-background)] "
              type="submit"
            >
              Add Candidate
            </button>
          </footer>
        </form>
      </div>
    </MainLayout>
  );
}
