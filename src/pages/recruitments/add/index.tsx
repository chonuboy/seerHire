import { useEffect, useRef, useState } from "react";
import ContentHeader from "@/components/Layouts/content-header";
import MainLayout from "@/components/Layouts/layout";
import { RecruitCandidateData } from "@/lib/models/recruitmentCandidate";
import RecruitmentCandidateSchema from "@/lib/models/recruitmentCandidate";
import { useFormik } from "formik";
import { addRecruitmentData, uploadRecruitmentCandidateResume } from "@/api/recruitment/recruitmentData";
import { X } from "lucide-react";
import { toast } from "react-toastify";
import LocationAutocomplete from "@/components/Elements/utils/location-autocomplete";
import { fetchAllLocations } from "../../../api/master/masterLocation";
import { Location } from "@/lib/definitions";
import { set } from "date-fns";
import { useRouter } from "next/router";

export default function CandidateForm() {

  const [resumeName,setResumeName] = useState("");
  const router = useRouter();

  const initialValues: RecruitCandidateData = {
    date: new Date().toISOString().split("T")[0],
    recruiterName: "",
    portal: "",
    candidateName: "",
    role: "",
    primarySkill: "",
    secondarySkill: "",
    contactNumber: "",
    emailID: "",
    totalExperience: 0,
    relevantExperience: 0,
    currentCTC: 0,
    expectedCTC: 0,
    noticePeriod: 0,
    currentLocation: "",
    preferredLocation: "",
    qualification: "",
    communicationSkillsRating: 0,
    technicalSkillsRating: 0,
    remarks: "",
    resumeLink: resumeName,
    sourcingStatus: "",
    preferredRoles: [],
  };

  const [currentPreferredRole, setCurrentPreferredRole] = useState("");
  const [locations, setLocations] = useState([]);
  const [file, setFile] = useState<File | undefined>(undefined);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [updatedFileName, setUpdatedFileName] = useState<string | undefined>(
    undefined
  );
  

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    setFile(droppedFile);
  };

  const handleChooseFile = (event: React.MouseEvent) => {
    event.stopPropagation();
    fileInputRef?.current?.click();
  };

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

  const handleUpload = async (event: any) => {
    event.stopPropagation();
    const fileName = file?.name;
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    try {
      uploadRecruitmentCandidateResume(formData)
        .then((data) => {
          setResumeName(data);
          setUpdatedFileName("File Uploaded Successfully");
      })
      toast.dismiss();
    } catch (err) {
      toast.dismiss();
    }
  };

  useEffect(() => {
    fetchAllLocations().then((data) => {
      setLocations(data);
    });
  }, []);

  const handleSubmit = (values: RecruitCandidateData) => {
    console.log("Form submitted:", values);
    values.resumeLink = resumeName;
    addRecruitmentData(values).then((data) => {
      toast.success(data.message, { position: "top-right" });
      router.push("/recruitments");
    }).catch((err) => toast.error(err,{position:"top-right"}));
  };

  const formik = useFormik<RecruitCandidateData>({
    initialValues,
    onSubmit: handleSubmit,
    validationSchema: RecruitmentCandidateSchema,
  });

  const onChangeCurrentLocation = (location: Location) => {
    formik.setFieldValue("currentLocation", location.locationDetails);
  };

  const addNewCurrentLocation = async (location: Location) => {
    formik.setFieldValue("currentLocation", location.locationDetails);
  };

  const onChangePreferredLocation = (location: Location) => {
    formik.setFieldValue("preferredLocation", location.locationDetails);
  };

  const addNewPreferredLocation = async (location: Location) => {
    formik.setFieldValue("preferredLocation", location.locationDetails);
  };

  return (
    <>
      <MainLayout>
        <ContentHeader title="Add New Candidate" />
        <div className="min-h-screen">
          <div className="max-w-8xl mx-auto">
            {/* Form */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 lg:p-8">
              <div className="mb-6 sm:mb-8"></div>
              <form
                className="space-y-6 sm:space-y-8"
                onSubmit={formik.handleSubmit}
              >
                {/* Basic Information */}
                <div className="border-b border-gray-200 pb-6 sm:pb-8">
                  <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-4 sm:mb-6 flex items-center">
                    {/* <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3">
                    </div> */}
                    Basic Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    <div className="space-y-2">
                      <label
                        htmlFor="recruiterName"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Recruiter Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formik.values.recruiterName}
                        onChange={formik.handleChange}
                        name="recruiterName"
                        placeholder="Enter recruiter name"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm sm:text-base placeholder-gray-400"
                      />
                      {formik.errors.recruiterName &&
                        formik.touched.recruiterName && (
                          <div className="text-red-500 text-sm mt-1">
                            {formik.errors.recruiterName}
                          </div>
                        )}
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="portal"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Portal <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="portal"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm sm:text-base bg-white"
                        value={formik.values.portal}
                        onChange={formik.handleChange}
                      >
                        <option value="" className="text-gray-400">
                          Select Portal
                        </option>
                        <option value="LinkedIn">LinkedIn</option>
                        <option value="Naukri">Naukri</option>
                        <option value="Indeed">Indeed</option>
                        <option value="Referral">Referral</option>
                        <option value="Other">Other</option>
                      </select>
                      {formik.errors.portal && formik.touched.portal && (
                        <div className="text-red-500 text-sm mt-1">
                          {formik.errors.portal}
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="candidateName"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Candidate Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formik.values.candidateName}
                        onChange={formik.handleChange}
                        name="candidateName"
                        placeholder="Enter candidate full name"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm sm:text-base placeholder-gray-400"
                      />
                      {formik.errors.candidateName &&
                        formik.touched.candidateName && (
                          <div className="text-red-500 text-sm mt-1">
                            {formik.errors.candidateName}
                          </div>
                        )}
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="role"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Role <span className="text-red-500">*</span>
                      </label>
                      <input
                        value={formik.values.role}
                        onChange={formik.handleChange}
                        type="text"
                        name="role"
                        placeholder="Enter job role/position"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm sm:text-base placeholder-gray-400"
                      />
                      {formik.errors.role && formik.touched.role && (
                        <div className="text-red-500 text-sm mt-1">
                          {formik.errors.role}
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="qualification"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Qualification <span className="text-red-500">*</span>
                      </label>
                      <input
                        value={formik.values.qualification}
                        onChange={formik.handleChange}
                        type="text"
                        name="qualification"
                        placeholder="Enter highest qualification"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm sm:text-base placeholder-gray-400"
                      />
                      {formik.errors.qualification &&
                        formik.touched.qualification && (
                          <div className="text-red-500 text-sm mt-1">
                            {formik.errors.qualification}
                          </div>
                        )}
                    </div>
                  </div>
                </div>

                {/* Skills & Experience */}
                <div className="border-b border-gray-200 pb-6 sm:pb-8">
                  <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-4 sm:mb-6 flex items-center">
                    {/* <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3">
                      2
                    </div> */}
                    Skills & Experience
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    <div className="space-y-2">
                      <label
                        htmlFor="primarySkill"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Primary Skill <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formik.values.primarySkill}
                        onChange={formik.handleChange}
                        name="primarySkill"
                        placeholder="e.g. React"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm sm:text-base placeholder-gray-400"
                      />
                      {formik.errors.primarySkill &&
                        formik.touched.primarySkill && (
                          <div className="text-red-500 text-sm mt-1">
                            {formik.errors.primarySkill}
                          </div>
                        )}
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="secondarySkill"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Secondary Skill <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formik.values.secondarySkill}
                        onChange={formik.handleChange}
                        name="secondarySkill"
                        placeholder="e.g. Node.js"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm sm:text-base placeholder-gray-400"
                      />
                      {formik.errors.secondarySkill &&
                        formik.touched.secondarySkill && (
                          <div className="text-red-500 text-sm mt-1">
                            {formik.errors.secondarySkill}
                          </div>
                        )}
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="totalExperience"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Total Experience (Years)
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        name="totalExperience"
                        value={formik.values.totalExperience}
                        onChange={formik.handleChange}
                        placeholder="0"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm sm:text-base placeholder-gray-400"
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="relevantExperience"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Relevant Experience (Years)
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        name="relevantExperience"
                        value={formik.values.relevantExperience}
                        onChange={formik.handleChange}
                        placeholder="0"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm sm:text-base placeholder-gray-400"
                      />
                      {formik.errors.relevantExperience &&
                        formik.touched.relevantExperience && (
                          <div className="text-red-500 text-sm mt-1">
                            {formik.errors.relevantExperience}
                          </div>
                        )}
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="communicationSkillsRating"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Communication Skills (1-5)
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        name="communicationSkillsRating"
                        value={formik.values.communicationSkillsRating}
                        onChange={formik.handleChange}
                        min={0}
                        max={10}
                        placeholder="0"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm sm:text-base placeholder-gray-400"
                      />
                      {formik.errors.communicationSkillsRating &&
                        formik.touched.communicationSkillsRating && (
                          <div className="text-red-500 text-sm mt-1">
                            {formik.errors.communicationSkillsRating}
                          </div>
                        )}
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="technicalSkillsRating"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Technical Skills (1-5)
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        name="technicalSkillsRating"
                        min={0}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm sm:text-base bg-white"
                        value={formik.values.technicalSkillsRating}
                        onChange={formik.handleChange}
                      />
                      {formik.errors.technicalSkillsRating &&
                        formik.touched.technicalSkillsRating && (
                          <div className="text-red-500 text-sm mt-1">
                            {formik.errors.technicalSkillsRating}
                          </div>
                        )}
                    </div>
                  </div>
                  <div className="text-sm md:text-base mt-28">
                    <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-4 sm:mb-6 flex items-center">Upload Resume</h3>
                    <div className="space-y-3 rounded-lg">
                      <div
                        className="mt-2 flex flex-col items-center justify-center w-full p-4 h-30 rounded-lg border border-dashed border-gray-900/25 bg-gray-50 hover:bg-gray-100 cursor-pointer"
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
                          <p className="mt-4 text-green-500">{updatedFileName}</p>
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
                  </div>
                </div>

                {/* Contact Information */}
                <div className="border-b border-gray-200 pb-6 sm:pb-8">
                  <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-4 sm:mb-6 flex items-center">
                    {/* <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3">
                      3
                    </div> */}
                    Contact Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div className="space-y-2">
                      <label
                        htmlFor="contactNumber"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Contact Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="contactNumber"
                        value={formik.values.contactNumber}
                        onChange={formik.handleChange}
                        placeholder="Enter Mobile Number"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm sm:text-base placeholder-gray-400"
                      />
                      {formik.errors.contactNumber &&
                        formik.touched.contactNumber && (
                          <div className="text-red-500 text-sm mt-1">
                            {formik.errors.contactNumber}
                          </div>
                        )}
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="emailID"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email ID <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="emailID"
                        value={formik.values.emailID}
                        onChange={formik.handleChange}
                        placeholder="candidate@example.com"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm sm:text-base placeholder-gray-400"
                      />
                      {formik.errors.emailID && formik.touched.emailID && (
                        <div className="text-red-500 text-sm mt-1">
                          {formik.errors.emailID}
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="currentLocation"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Current Location <span className="text-red-500">*</span>
                      </label>
                      <LocationAutocomplete
                        name="currentLocation"
                        placeholder="Enter Current Location"
                        value={formik.values.currentLocation}
                        onChange={onChangeCurrentLocation}
                        options={locations}
                        onAdd={addNewCurrentLocation}
                      ></LocationAutocomplete>
                      {formik.errors.currentLocation &&
                        formik.touched.currentLocation && (
                          <div className="text-red-500 text-sm mt-1">
                            {formik.errors.currentLocation}
                          </div>
                        )}
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="preferredLocation"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Preferred Location
                        <span className="text-red-500">*</span>
                      </label>
                      <LocationAutocomplete
                        name="preferredLocation"
                        placeholder="Enter preferred Location"
                        value={formik.values.preferredLocation}
                        onChange={onChangePreferredLocation}
                        options={locations}
                        onAdd={addNewPreferredLocation}
                      ></LocationAutocomplete>
                      {formik.errors.preferredLocation &&
                        formik.touched.preferredLocation && (
                          <div className="text-red-500 text-sm mt-1">
                            {formik.errors.preferredLocation}
                          </div>
                        )}
                    </div>
                  </div>
                </div>

                {/* Compensation & Notice Period */}
                <div className="border-b border-gray-200 pb-6 sm:pb-8">
                  <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-4 sm:mb-6 flex items-center">
                    {/* <div className="w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3">
                      4
                    </div> */}
                    Compensation & Availability
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    <div className="space-y-2">
                      <label
                        htmlFor="currentCTC"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Current CTC (₹) LPA{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        name="currentCTC"
                        min="0"
                        value={formik.values.currentCTC}
                        onChange={formik.handleChange}
                        placeholder=""
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm sm:text-base placeholder-gray-400"
                      />
                      {formik.errors.currentCTC &&
                        formik.touched.currentCTC && (
                          <div className="text-red-500 text-sm mt-1">
                            {formik.errors.currentCTC}
                          </div>
                        )}
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="expectedCTC"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Expected CTC (₹) LPA{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        name="expectedCTC"
                        min="0"
                        value={formik.values.expectedCTC}
                        onChange={formik.handleChange}
                        placeholder=""
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm sm:text-base placeholder-gray-400"
                      />
                      {formik.errors.expectedCTC &&
                        formik.touched.expectedCTC && (
                          <div className="text-red-500 text-sm mt-1">
                            {formik.errors.expectedCTC}
                          </div>
                        )}
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="noticePeriod"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Notice Period (Days)
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        name="noticePeriod"
                        min="0"
                        value={formik.values.noticePeriod}
                        onChange={formik.handleChange}
                        placeholder="15 or 30"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm sm:text-base placeholder-gray-400"
                      />
                      {formik.errors.noticePeriod &&
                        formik.touched.noticePeriod && (
                          <div className="text-red-500 text-sm mt-1">
                            {formik.errors.noticePeriod}
                          </div>
                        )}
                    </div>
                  </div>
                </div>

                {/* Preferred Roles */}
                <div className="border-b border-gray-200 pb-6 sm:pb-8">
                  <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-4 sm:mb-6 flex items-center">
                    {/* <div className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3">
                      5
                    </div> */}
                    Preferred Roles
                  </h3>
                  <div className="relative">
                    <input
                      type="text"
                      name="preferredRoles"
                      value={currentPreferredRole}
                      id="preferredRoles"
                      placeholder="Enter preferred roles"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm sm:text-base placeholder-gray-400"
                      onChange={(e) => {
                        setCurrentPreferredRole(e.target.value);
                      }}
                    />
                    <button
                      className="absolute -top-1 right-0 mt-2 mr-2 px-4 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
                      type="button"
                      onClick={() => {
                        const updatedRoles = [
                          ...formik.values.preferredRoles,
                          currentPreferredRole,
                        ];
                        formik.setFieldValue("preferredRoles", updatedRoles);
                        setCurrentPreferredRole("");
                      }}
                    >
                      Add
                    </button>
                    <div className="flex items-center gap-4">
                      {formik.values.preferredRoles.length > 0 &&
                        formik.values.preferredRoles.map((role, index) => (
                          <div key={index} className="mt-6">
                            <span className="relative bg-blue-500 text-white px-4 py-2 rounded-md">
                              {role}
                              <X
                                onClick={() => {
                                  const updatedRoles =
                                    formik.values.preferredRoles.filter(
                                      (_, i) => i !== index
                                    );
                                  formik.setFieldValue(
                                    "preferredRoles",
                                    updatedRoles
                                  );
                                }}
                                className="absolute cursor-pointer -top-2 -right-2 w-4 h-4 bg-red-500 text-white rounded-full"
                              ></X>
                            </span>
                          </div>
                        ))}
                    </div>
                    {formik.errors.preferredRoles &&
                      formik.touched.preferredRoles && (
                        <div className="text-red-500 text-sm mt-1">
                          {formik.errors.preferredRoles}
                        </div>
                      )}
                  </div>
                </div>

                {/* Additional Information */}
                <div className="border-b border-gray-200 pb-6 sm:pb-8">
                  <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-4 sm:mb-6 flex items-center">
                    {/* <div className="w-8 h-8 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3">
                      6
                    </div> */}
                    Additional Information
                  </h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                    <div className="space-y-2">
                      <label
                        htmlFor="sourcingStatus"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Sourcing Status <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="sourcingStatus"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm sm:text-base bg-white"
                        onChange={formik.handleChange}
                        value={formik.values.sourcingStatus}
                      >
                        <option value="" className="text-gray-400">
                          Select Status
                        </option>
                        <option value="Active">Active</option>
                        <option value="Passive">Inactive</option>
                        <option value="On Hold">On Hold</option>
                        <option value="Hired">Hired</option>
                      </select>
                      {formik.errors.sourcingStatus &&
                        formik.touched.sourcingStatus && (
                          <div className="text-red-500 text-sm mt-1">
                            {formik.errors.sourcingStatus}
                          </div>
                        )}
                    </div>

                    <div className="lg:col-span-2 space-y-2">
                      <label
                        htmlFor="remarks"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Remarks <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        name="remarks"
                        rows={4}
                        value={formik.values.remarks}
                        onChange={formik.handleChange}
                        placeholder="Enter any additional remarks, notes, or observations about the candidate..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm sm:text-base placeholder-gray-400 resize-vertical"
                      />
                      {formik.errors.remarks && formik.touched.remarks && (
                        <div className="text-red-500 text-sm mt-1">
                          {formik.errors.remarks}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium shadow-sm transition-colors duration-200 text-sm sm:text-base"
                  >
                    Add
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
}
