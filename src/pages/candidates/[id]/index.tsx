// Components
import MainLayout from "@/components/Layouts/layout";
import { Popup } from "@/components/Elements/cards/popup";
import ProfileUpdateForm from "@/components/Forms/candidates/updateProfile";
import PdfViewer from "@/components/Elements/utils/pdfViewer";
import { parsePhoneNumberFromString } from "libphonenumber-js";

// Next.js and React Imports
import { useRouter } from "next/router";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
// External Libraries
import { toast } from "react-toastify";

// Models and Definitions
import { Companies, Company } from "@/lib/models/client";
import {
  Certificates,
  allTechs,
  Domains,
  Interview,
  Technology,
} from "@/lib/models/candidate";
import { Candidate } from "@/lib/definitions";
import { ReqData } from "@/lib/models/candidate";

// API Calls
import { fetchCandidate } from "@/api/candidates/candidates";
import {
  deleteContactDomain,
  fetchAllContactDomains,
} from "@/api/candidates/domains";
import { deleteContactCompany } from "@/api/candidates/companies";
import { fetchAllContactCompanies } from "@/api/candidates/companies";
import { fetchContactCertificationsByContact } from "@/api/candidates/certification";
import {
  fetchAllCertifications,
  createCertification,
} from "@/api/master/certification";
import {
  createContactCertification,
  deleteContactCertification,
} from "@/api/candidates/certification";
import {
  updateContactTechnology,
  createContactTechnology,
  fetchAllContactTechnologies,
} from "@/api/candidates/candidateTech";
import { contactCertificate } from "@/lib/models/candidate";
import {
  fetchAllTechnologies,
  createTechnology,
} from "@/api/master/masterTech";
import { domainDetails } from "@/lib/models/candidate";
import { fetchAllDomains, createDomain } from "@/api/master/domain";
import { createContactDomain } from "@/api/candidates/domains";
import { createContactCompany } from "@/api/candidates/companies";
import { fetchAllCompanies, createCompany } from "@/api/master/masterCompany";
import { fetchAllLocations } from "@/api/master/masterLocation";
import {
  getContactPreferredJobTypeByContact,
  getContactPreferredJobTypes,
} from "@/api/candidates/preferredJob";
import {
  fetchContactInterview,
  fetchInterviewsByContact,
} from "@/api/candidates/interviews";
import {
  fetchAllContactPreferredLocations,
  fetchContactPreferredLocation,
} from "@/api/candidates/preferredLocation";
import { getContactHiringTypeByContactId } from "@/api/candidates/hiringType";
import { formatDate } from "@/components/Elements/tables/domainTable";

export default function Candidates() {
  // candidate state
  const [currentCandidate, setCurrentCandidate] = useState<Candidate | null>(
    null
  );
  const [isFormVisible, setIsFormVisible] = useState(false); // State to control form visibility
  // candidate Interviews
  const [candidateInterviews, setCandidateInterviews] = useState<
    Interview[] | null
  >(null);
  // Candidate Technologies
  const [technologies, setTechnologies] = useState<allTechs[] | null>(null);
  // const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [techExp, setTechExp] = useState("");
  const [expLevel, setExpLevel] = useState("");
  const [isSkillAdded, setIsSkillAdded] = useState(false);
  const [isSkillUpdated, setIsSkillUpdated] = useState(false);
  const [selectedTech, setSelectedTech] = useState<allTechs | null>(null);
  const [originalTech, setoriginalTech] = useState<allTechs | null>(null);
  const [selectedDomain, setSelectedDomain] = useState("");
  const [selectedSkill, setSelectedSkill] = useState("");
  const [isResumeUpoladed, setIsResumeUpladed] = useState(false);
  const experienceOptions = []; // Start with "Less than a year"
  // Add options from 1 year to 10 years
  for (let i = 1; i <= 10; i++) {
    experienceOptions.push(`${i}`); // Add "year" or "years" based on the count
  }
  const [masterTech, setMasterTech] = useState<Technology[] | null>(null);
  const [masterDomains, setMasterDomains] = useState<domainDetails[] | null>(
    null
  );
  // Candidate Domains
  const [candidateDomains, setCandidateDomains] = useState<Domains[] | null>(
    null
  );

  const [masterCompanies, setMasterCompanies] = useState<Company[] | null>(
    null
  );
  const [locations, setLocations] = useState<Location[]>([]);
  const [candidateCompanies, setCandidateCompanies] = useState<
    Companies[] | null
  >(null);
  const [masterCertificates, setMasterCertificates] = useState<
    Certificates[] | null
  >(null);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedCertificate, setSelectedCertificate] = useState("");
  const [candidateCertificates, setCandidateCertificates] = useState<
    contactCertificate[] | null
  >(null);
  const router = useRouter();
  const [isEdit, setIsEdit] = useState(false);

  const [initialData, setInitialData] = useState<ReqData | null>(null);
  const [formData, setFormData] = useState<ReqData | null>(null);
  const [preferredJobType, setPreferredJobType] = useState<any[]>([]);
  const [preferredLocation, setPreferredLocation] = useState<any[]>([]);
  const [hiringTypes, setHiringTypes] = useState<any[]>([]);

  // Get Operations
  useEffect(() => {
    if (router.isReady) {
      const id = router.query.id;
      fetchCandidate(Number(id))
        .then((data) => {
          setCurrentCandidate(data);
          setInitialData(data);
          setFormData(data);
          console.log(data);
        })
        .catch((error) => console.log(error));

      fetchAllLocations().then((data) => {
        const allLocatoins = data;
        setLocations(allLocatoins);
      });

      fetchAllContactTechnologies()
        .then((data) => {
          const contactIdToMatch = Number(id);
          // Step 1: Filter objects with the matching contactId
          const filteredData = data.filter(
            (item: any) => item.contactDetails.contactId === contactIdToMatch
          );
          // Step 2: Extract the technology field from the filtered objects
          const technologies = filteredData.map((item: any) => item);
          setTechnologies(technologies);
        })
        .catch((error) => console.log(error));

      fetchAllContactDomains().then((data) => {
        const contactIdToMatch = Number(id);
        // Step 1: Filter objects with the matching contactId
        const filteredData = data.filter(
          (item: any) => item.contactDetails.contactId === contactIdToMatch
        );
        const domains = filteredData.map((item: any) => item);
        setCandidateDomains(domains);
      });

      fetchAllTechnologies()
        .then((data) => {
          setMasterTech(data);
        })
        .catch((error) => {
          console.log(error);
        });

      fetchAllDomains()
        .then((data) => {
          setMasterDomains(data);
        })
        .catch((error) => {
          console.log(error);
        });

      fetchAllContactCompanies().then((data) => {
        const contactIdToMatch = Number(id);
        // Step 1: Filter objects with the matching contactId
        const filteredData = data.filter(
          (item: any) => item.contactDetails.contactId === contactIdToMatch
        );
        const companies = filteredData.map((item: any) => item);
        setCandidateCompanies(companies);
      });

      fetchContactCertificationsByContact(Number(id)).then((data) => {
        setCandidateCertificates(data);
      });

      fetchAllCompanies()
        .then((data) => {
          setMasterCompanies(data);
        })
        .catch((error) => {
          console.log(error);
        });

      fetchAllCertifications().then((data) => {
        setMasterCertificates(data);
      });

      fetchInterviewsByContact(Number(id)).then((data) => {
        setCandidateInterviews(data);
        console.log(data);
      });

      getContactPreferredJobTypeByContact(Number(id)).then((data) => {
        let modes;
        if (data.status == "NOT_FOUND") {
          setPreferredJobType([]);
          return;
        }
        if (data.length > 1) {
          modes = data.map((job: any) => ({
            typeId: job.contactPreferredJobModeId,
            jobType: job.preferredJobMode,
          }));
        } else {
          modes = [data[0].preferredJobMode];
        }
        setPreferredJobType(modes);
      });

      fetchAllContactPreferredLocations().then((data) => {
        if (data.status == "NOT_FOUND") {
          setPreferredLocation([]);
          return;
        } else {
          const filtered = data.filter(
            (item: any) => item.contactDetails.contactId == id
          );
          setPreferredLocation(filtered);
        }
      });

      getContactHiringTypeByContactId(Number(id)).then((data) => {
        let types;
        if (data.status == "NOT_FOUND") {
          setHiringTypes([]);
          return;
        }
        if (data.length > 1) {
          types = data.map((item: any) => ({
            typeId: item.contactHiringTypeId,
            hiringType: item.hiringType,
          }));
        } else {
          types = [data[0].hiringType];
        }
        setHiringTypes(types);
      });
    }

    const { mode } = router.query;
    const isEdit = mode ? true : false;
    setIsEdit(isEdit);
  }, [
    isFormVisible,
    isSkillUpdated,
    isSkillAdded,
    isResumeUpoladed,
    router.isReady,
  ]);

  // Post Operations

  const postSkill = async () => {
    try {
      // Check if a skill is selected
      if (selectedSkill.length === 0) {
        toast.error("Please select a skill", {
          position: "top-center",
        });
        return;
      }
      if (selectedSkill.length > 30) {
        toast.error("Please select a skill with less than 30 characters", {
          position: "top-center",
        });
      }

      // Check if if the selected skill exist in the candidate's technologies array
      if (
        technologies?.some(
          (tech) =>
            tech.technology.technology.toLowerCase() ===
            selectedSkill.toLowerCase()
        )
      ) {
        toast.error("Skill already added", {
          position: "top-center",
        });
        setSelectedSkill("");
        setExpLevel("");
        setTechExp("");
        return;
      }

      // Check if the skill exists in masterTech
      const skillExists = masterTech?.some(
        (tech) => tech.technology.toLowerCase() === selectedSkill.toLowerCase()
      );

      let tempId;
      if (skillExists) {
        // If the skill exists, find its ID
        tempId = masterTech?.find(
          (tech) =>
            tech.technology.toLowerCase() === selectedSkill.toLowerCase()
        );
      } else {
        // If the skill doesn't exist, create it
        const newSkill = {
          technology: selectedSkill,

          //  fields for the createTechnology API
        };

        // Create the new technology
        const createdSkill = await createTechnology(newSkill);

        // Update masterTech with the new skill
        setMasterTech((prev) =>
          prev ? [...prev, createdSkill] : [createdSkill]
        );

        // Use the newly created skill's ID
        tempId = createdSkill;
      }

      // Add the skill to technologies
      const updatedTechnologies = technologies
        ? [
            ...technologies,
            {
              technology: { technology: selectedSkill },
              experience: techExp,
              expertiseLevel: expLevel,
            },
          ]
        : [];
      setTechnologies(updatedTechnologies);

      // Associate the skill with the candidate
      if (tempId && techExp && expLevel) {
        const result = await createContactTechnology({
          contactDetails: currentCandidate,
          technology: tempId,
          experience: techExp,
          expertiseLevel: expLevel,
        });
        console.log("Skill added to candidate:", result.technology.technology);
        setIsSkillAdded(true);
      } else if (tempId) {
        const result = await createContactTechnology({
          contactDetails: currentCandidate,
          technology: tempId,
        });
        setIsSkillAdded(true);
        console.log("Skill added to candidate:", result.technology.technology);
      }

      // Reset form fields
      setSelectedSkill("");
      setExpLevel("");
      setTechExp("");
      setTimeout(() => {
        setIsSkillAdded(true);
      }, 3000);

      // Show success message
      toast.success("Skill added successfully", {
        position: "top-center",
      });
      setIsSkillAdded(true);
    } catch (error) {
      console.error("Error adding skill:", error);
      toast.error("Failed to add skill. Please try again.", {
        position: "top-center",
      });
    }
  };

  const postDomain = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Check if a domain is selected
      if (selectedDomain.length === 0) {
        toast.error("Please select a domain", {
          position: "top-center",
        });
        return;
      }
      if (selectedDomain.length < 3) {
        toast.error("Domain Must be Greater than 3 characters", {
          position: "top-center",
        });
        return;
      }
      if (selectedDomain.length > 30) {
        toast.error("Domain Must be less than 30 characters", {
          position: "top-center",
        });
        return;
      }
      // Check if if the selected domain exist in the candidate's domain array
      if (
        candidateDomains?.some(
          (domain) =>
            domain.domain.domainDetails.toLowerCase() ===
            selectedDomain.toLowerCase()
        )
      ) {
        toast.error("Domain already added", {
          position: "top-center",
        });
        setSelectedDomain("");
        return;
      }

      // Check if the domain exists in masterDomains
      const domainExists = masterDomains?.some(
        (domain) =>
          domain.domainDetails.toLowerCase() === selectedDomain.toLowerCase()
      );
      let domainId;
      if (!domainExists) {
        const newDomain = {
          domainDetails: selectedDomain,
          //  fields for the createDomain API
        };
        const data = await createDomain(newDomain);
        if (!data.domainId) {
          toast.error("Please Enter Valid Domain", {
            position: "top-center",
          });
        }
        domainId = data.domainId;
      } else {
        domainId = masterDomains?.find(
          (domain) =>
            domain.domainDetails.toLowerCase() === selectedDomain.toLowerCase()
        )?.domainId;
      }

      if (!domainId) {
        return;
      } else {
        await createContactDomain({
          domain: {
            domainId: domainId,
          },
          contactDetails: {
            contactId: Number(router.query.id),
          },
        }).then((data) => {
          setCandidateDomains((prev) => (prev ? [...prev, data] : [data]));
          toast.success("Domain added successfully", {
            position: "top-center",
          });
          setSelectedDomain("");
          setIsSkillUpdated(true);
        });
      }
    } catch (error) {
      toast.error("Failed to add domain. Please try again.", {
        position: "top-center",
      });
    }
  };

  const postCompany = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(selectedCompany);

    try {
      // Check if a company is selected
      if (selectedCompany.length === 0) {
        toast.error("Please select a company", {
          position: "top-center",
        });
        return;
      }
      if (selectedCompany.length < 3) {
        toast.error("Please select a company with at least 3 characters", {
          position: "top-center",
        });
        return;
      }
      if (selectedCompany.length > 30) {
        toast.error("Please select a company with less than 30 characters", {
          position: "top-center",
        });
        return;
      }

      // Check if if the selected company exist in the candidate's company array
      if (
        candidateCompanies?.some(
          (company) =>
            company.company.companyName.toLowerCase() ===
            selectedCompany.toLowerCase()
        )
      ) {
        toast.error("Company already added", {
          position: "top-center",
        });
        setSelectedCompany("");
        return;
      }

      // Check if the company exists in masterCompanies
      const companyExists = masterCompanies?.some(
        (company) =>
          company.companyName.toLowerCase() === selectedCompany.toLowerCase()
      );

      let companyId;
      if (!companyExists) {
        const newCompany = {
          companyName: selectedCompany.trim(),
          //  fields for the createCompany API
        };
        const data = await createCompany(newCompany);
        if (!data.companyId) {
          toast.error("Please Enter Valid Company Name", {
            position: "top-center",
          });
        }
        companyId = data.companyId;
      } else {
        companyId = masterCompanies?.find(
          (company) =>
            company.companyName.toLowerCase() === selectedCompany.toLowerCase()
        )?.companyId;
      }
      if (!companyId) return;
      const data = await createContactCompany({
        contactDetails: currentCandidate,
        company: {
          companyId: companyId,
        },
      });
      setCandidateCompanies((prev) => (prev ? [...prev, data] : [data]));
      toast.success("Company added successfully", {
        position: "top-center",
      });
      setSelectedCompany("");
    } catch (error) {
      console.error("Error adding company:", error);
      toast.error("Failed to add company. Please try again.", {
        position: "top-center",
      });
    }
  };

  const postCertification = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Validate input
      if (!selectedCertificate.trim()) {
        toast.error("Please select a certification", {
          position: "top-center",
        });
        return;
      }

      let hasExistingCert: boolean = false;

      // Safely check if the selected certificate exists (handles undefined/null)
      if (candidateCertificates && candidateCertificates?.length > 0) {
        hasExistingCert = candidateCertificates?.some(
          (cert) =>
            cert.certification?.certificationName.toLowerCase() ===
            selectedCertificate.toLowerCase()
        );
      }

      if (hasExistingCert) {
        toast.error("Certification already added", {
          position: "top-center",
        });
        setSelectedCertificate("");
        return;
      }

      // Ensure masterCertificates is always treated as an array
      const currentMasterCerts = masterCertificates || [];

      // Find or create the certification
      const existingCert = currentMasterCerts.find(
        (cert) =>
          cert.certificationName.toLowerCase() ===
          selectedCertificate.toLowerCase()
      );

      let certificationId: number | undefined;

      if (!existingCert) {
        // Create new certification if it doesn't exist
        const newCert = await createCertification({
          certificationName: selectedCertificate,
        });
        certificationId = newCert.certificationId;
        setMasterCertificates((prev) => [...(prev || []), newCert]);
      } else {
        certificationId = existingCert.certificationId;
      }

      // Link certification to the contact
      const response = await createContactCertification({
        contactDetails: { contactId: Number(router.query.id) },
        certification: {
          certificationId,
          certificationName: selectedCertificate,
        },
      });
      if (response) {
        toast.success("Certification added successfully", {
          position: "top-center",
        });
      }

      // Ensure we're working with an array for candidateCertificates
      setCandidateCertificates((prev) => {
        const previousCertificates = Array.isArray(prev) ? prev : [];
        return [
          ...previousCertificates,
          {
            contactCertificationId: response.contactCertificationId,
            certification: {
              certificationId: certificationId as number,
              certificationName: selectedCertificate,
            },
          },
        ];
      });

      setSelectedCertificate(""); // Reset input
    } catch (error) {
      console.error("Error adding certification:", error);
      toast.error("Failed to add certification. Please try again.", {
        position: "top-center",
      });
    }
  };

  // Put Operation
  const handleUpdateSkill = async (id: number) => {
    setIsSkillUpdated(true);
    const tech = technologies?.[id];
    if (tech) {
      console.log(technologies?.[id]);
      setSelectedTech({
        contactTechId: tech.contactTechId,
        technology: tech.technology,
        experience: tech.experience,
        expertiseLevel: tech.expertiseLevel,
      });
      setoriginalTech({
        contactTechId: tech.contactTechId,
        technology: tech.technology,
        experience: tech.experience,
        expertiseLevel: tech.expertiseLevel,
      });
    } else {
      toast.error("Skill not found.", {
        position: "top-center",
      });
    }
  };

  const formatPhoneNumber = (phoneNumber: string) => {
    if (!phoneNumber) return "-";

    const phone = parsePhoneNumberFromString(phoneNumber);
    return phone?.formatInternational() || phoneNumber;
  };

  const handleUpdateContactTechnology = async (event: React.MouseEvent) => {
    event.preventDefault();
    // Check if selectedTech and originalTech are defined
    if (!selectedTech || !originalTech) {
      toast.error("No skill selected for update.", {
        position: "top-center",
      });
      return;
    }

    // Create an object to hold updated fields
    const updatedSkill: any = {};

    // Compare each property with the original value
    if (selectedTech.experience !== originalTech.experience) {
      updatedSkill.experience = selectedTech.experience;
    }
    if (selectedTech.expertiseLevel !== originalTech.expertiseLevel) {
      updatedSkill.expertiseLevel = selectedTech.expertiseLevel;
    }
    updatedSkill.contactDetails = currentCandidate;
    // updatedSkill.technology = selectedTech.technology;
    try {
      // Check if contactTechId is available
      if (selectedTech.contactTechId) {
        // Call the API to update the skill
        const response = await updateContactTechnology(
          selectedTech.contactTechId,
          updatedSkill
        );
        // Update the technologies array in state
        const updatedTechnologies = technologies?.map((tech) =>
          tech.contactTechId === selectedTech.contactTechId
            ? { ...tech, ...updatedSkill } // Merge updated fields
            : tech
        );

        // Update state with the new technologies array
        setTechnologies(updatedTechnologies || []);

        // Reset the update flag and show success message
        setIsSkillUpdated(false);
      } else {
        toast.error("Invalid skill ID. Cannot update.", {
          position: "top-center",
        });
      }
    } catch (error) {
      console.error("Error updating skill:", error);
      toast.error("Failed to update skill. Please try again.", {
        position: "top-center",
      });
    }
  };

  if (currentCandidate == null) {
    // Static pre-generated HTML
    return <h1>Loading...</h1>;
  }

  return (
    <MainLayout>
      <section className="space-y-10 p-4 relative md:text-base h-max text-xs">
        {/* Profile Section */}
        <h1 className="border-b border-black-200 font-semibold text-2xl">
          Profile
        </h1>
        <div
          id="profile"
          className="flex md:flex-row flex-col md:justify-between md:items-center md:text-base text-xs mt-4 bg-white dark:bg-black dark:text-white p-4 rounded-lg shadow-sm border border-gray-200 space-y-4"
        >
          <div className="space-y-2">
            <div className="flex gap-2">
              <h3 className="font-medium relative text-2xl">
                {currentCandidate?.firstName} {currentCandidate?.lastName}
                {currentCandidate?.isActive === true ? (
                  <span className="absolute top-0 -right-5 w-3 h-3 bg-green-500 rounded-full"></span>
                ) : (
                  <span className="absolute top-0 -right-5 w-3 h-3 bg-red-500 rounded-full"></span>
                )}
              </h3>
            </div>

            <h4 className="text-md">
              {currentCandidate?.designation} at{" "}
              <span className="text-blue-500 font-semibold font-sans ml-4">
                {currentCandidate?.companyName}
              </span>
            </h4>
          </div>
          <div className="flex gap-2 items-center">
            <button
              onClick={() =>
                document
                  .getElementById("resume")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="bg-blue-500 text-white px-4 py-1 rounded-md border-2 border-blue-500 hover:bg-white hover:text-blue-500 hover:shadow-lg transition duration-200 box-border"
            >
              Download Resume
            </button>
          </div>
        </div>

        {/* Personal Info Section */}
        <div className="bg-white dark:bg-black dark:text-white p-4 rounded-lg space-y-4 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="md:text-xl text-sm font-semibold">Personal Info</h3>
            {isEdit ? (
              <button
                className="bg-blue-500 text-white px-4 py-1 rounded-md border-2 border-blue-500 hover:bg-white hover:text-blue-500 hover:shadow-lg transition duration-200 box-border flex items-center gap-2"
                onClick={() => {
                  setIsFormVisible(true);
                }}
              >
                <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
                Update
              </button>
            ) : (
              ""
            )}
          </div>

          <div
            id="profile_info"
            className="p-4 bg-zinc-50 dark:bg-black dark:text-white rounded-lg"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2 rounded-lg p-2 shadow-md shadow-stone-200 bg-white dark:bg-black dark:text-white">
                <p className="text-gray-500 break-words dark:text-white">
                  Total Experience
                </p>
                <p className="text-blue-600 break-words text-wrap font-semibold text-xs md:text-base">
                  {currentCandidate?.totalExperience === null || undefined
                    ? "-"
                    : currentCandidate?.totalExperience}{" "}
                  Yrs
                </p>
              </div>

              <div className="space-y-2 rounded-lg p-2 shadow-md shadow-stone-200 bg-white dark:bg-black dark:text-white">
                <p className="text-gray-500 break-words dark:text-white">
                  Differently Abled Type
                </p>
                <p className="text-blue-600 break-words text-wrap font-semibold text-xs md:text-base">
                  {currentCandidate.differentlyAbledType === null ||
                  currentCandidate.differentlyAbledType === ""
                    ? "-"
                    : currentCandidate.differentlyAbledType}
                </p>
              </div>

              <div className="space-y-2 rounded-lg p-2 shadow-md shadow-stone-200 bg-white dark:bg-black dark:text-white">
                <p className="text-gray-500 break-words dark:text-white">
                  Date of Birth
                </p>
                <p className="text-blue-600 break-words text-wrap font-semibold text-xs md:text-base">
                  {currentCandidate?.dob
                    ? formatDate(currentCandidate.dob)
                    : "-"}
                </p>
              </div>

              <div className="space-y-2 rounded-lg p-2 shadow-md shadow-stone-200 bg-white dark:bg-black dark:text-white">
                <p className="text-gray-500 break-words dark:text-white">
                  Preferred Location
                </p>
                <p className="text-blue-600 break-words text-wrap font-semibold text-xs md:text-base">
                  {preferredLocation.length > 0
                    ? preferredLocation
                        .map((item) => item["location"]["locationDetails"])
                        .join(", ")
                    : "-"}
                </p>
              </div>

              <div className="space-y-2 rounded-lg p-2 shadow-md shadow-stone-200 bg-white dark:bg-black dark:text-white">
                <p className="text-gray-500 break-words dark:text-white">
                  Preferred Job Type
                </p>
                <p className="text-blue-600 break-words text-wrap font-semibold text-xs md:text-base">
                  {preferredJobType.length > 1
                    ? preferredJobType.map((item) => item["jobType"]).join(", ")
                    : preferredJobType.length === 1
                    ? preferredJobType[0]
                    : preferredJobType.length === 0
                    ? "-"
                    : ""}
                </p>
              </div>

              <div className="space-y-2 rounded-lg p-2 shadow-md shadow-stone-200 bg-white dark:bg-black dark:text-white">
                <p className="text-gray-500 break-words dark:text-white">
                  Hiring Type
                </p>
                <p className="text-blue-600 break-words text-wrap font-semibold text-xs md:text-base">
                  {hiringTypes.length > 1
                    ? hiringTypes.map((item) => item.hiringType).join(", ")
                    : hiringTypes[0]}
                  {hiringTypes.length === 0 ? "-" : ""}
                </p>
              </div>

              <div className="space-y-2 rounded-lg p-2 shadow-md shadow-stone-200 bg-white dark:bg-black dark:text-white">
                <p className="text-gray-500 break-words dark:text-white">
                  Highest Qualification
                </p>
                <p className="text-blue-600 break-words text-wrap font-semibold text-xs md:text-base">
                  {currentCandidate?.highestEducation === null || undefined
                    ? "-"
                    : currentCandidate?.highestEducation}
                </p>
              </div>
              <div className="space-y-2 rounded-lg p-2 shadow-md shadow-stone-200 bg-white dark:bg-black dark:text-white">
                <p className="text-gray-500 break-words dark:text-white">
                  Current Company
                </p>
                <p className="text-blue-600 break-words text-wrap font-semibold text-xs md:text-base">
                  {currentCandidate?.companyName === null || undefined
                    ? "-"
                    : currentCandidate?.companyName}
                </p>
              </div>
              <div className="space-y-2 rounded-lg p-2 shadow-md shadow-stone-200 bg-white dark:bg-black dark:text-white">
                <p className="text-gray-500 break-words dark:text-white">
                  Mobile Number
                </p>
                <p className="text-blue-600 break-words text-wrap font-semibold text-xs md:text-base">
                  {!currentCandidate?.primaryNumber
                    ? "-"
                    : formatPhoneNumber(currentCandidate.primaryNumber)}
                </p>
              </div>
              <div className="space-y-2 rounded-lg p-2 shadow-md shadow-stone-200 bg-white dark:bg-black dark:text-white">
                <p className="text-gray-500 break-words dark:text-white">
                  Secondary Mobile Number
                </p>
                <p className="text-blue-600 break-words text-wrap font-semibold text-xs md:text-base">
                  {currentCandidate?.secondaryNumber === null || undefined
                    ? "-"
                    : currentCandidate?.secondaryNumber}
                </p>
              </div>
              <div className="space-y-2 rounded-lg p-2 shadow-md shadow-stone-200 bg-white dark:bg-black dark:text-white">
                <p className="text-gray-500 break-words dark:text-white">
                  Email
                </p>
                <p className="text-blue-600 break-words whitespace-wrap font-semibold text-xs md:text-base">
                  {currentCandidate?.emailId === null || undefined
                    ? "-"
                    : currentCandidate?.emailId}
                </p>
              </div>
              <div className="space-y-2 rounded-lg p-2 shadow-md shadow-stone-200 bg-white dark:bg-black dark:text-white">
                <p className="text-gray-500 break-words dark:text-white">
                  Current Salary (LPA)
                </p>
                <p className="text-blue-600 break-words text-wrap font-semibold text-xs md:text-base">
                  {currentCandidate?.currentSalary === null || undefined
                    ? "-"
                    : currentCandidate?.currentSalary}{" "}
                  LPA
                </p>
              </div>
              <div className="space-y-2 rounded-lg p-2 shadow-md shadow-stone-200 bg-white dark:bg-black dark:text-white">
                <p className="text-gray-500 break-words dark:text-white">
                  Expected Salary (LPA)
                </p>
                <p className="text-blue-600 break-words text-wrap font-semibold text-xs md:text-base">
                  {currentCandidate?.expectedSalary === null || undefined
                    ? "-"
                    : currentCandidate?.expectedSalary}{" "}
                  LPA
                </p>
              </div>
              <div className="space-y-2 rounded-lg p-2 shadow-md shadow-stone-200 bg-white dark:bg-black dark:text-white">
                <p className="text-gray-500 break-words dark:text-white">
                  Tech Role
                </p>
                <p className="text-blue-600 break-words text-wrap font-semibold text-xs md:text-base">
                  {currentCandidate?.techRole === null || undefined
                    ? "-"
                    : currentCandidate?.techRole}
                </p>
              </div>
              <div className="space-y-2 rounded-lg p-2 shadow-md shadow-stone-200 bg-white dark:bg-black dark:text-white">
                <p className="text-gray-500 break-words dark:text-white">
                  Salary Negotiable
                </p>
                <p className="text-blue-600 break-words text-wrap font-semibold text-xs md:text-base">
                  {currentCandidate?.isExpectedCtcNegotiable === null ||
                  undefined
                    ? "-"
                    : currentCandidate?.isExpectedCtcNegotiable === true
                    ? "Yes"
                    : "No"}
                </p>
              </div>
              <div className="space-y-2 rounded-lg p-2 shadow-md shadow-stone-200 bg-white dark:bg-black dark:text-white">
                <p className="text-gray-500 break-words dark:text-white">
                  Gender
                </p>
                <p className="text-blue-600 break-words text-wrap font-semibold text-xs md:text-base">
                  {currentCandidate?.gender === null || undefined
                    ? "-"
                    : currentCandidate?.gender}
                </p>
              </div>
              <div className="space-y-2 rounded-lg p-2 shadow-md shadow-stone-200 bg-white dark:bg-black dark:text-white">
                <p className="text-gray-500 break-words dark:text-white">
                  Notice Period (Days)
                </p>
                <p className="text-blue-600 break-words text-wrap font-semibold text-xs md:text-base">
                  {currentCandidate?.noticePeriod === null || undefined
                    ? "-"
                    : currentCandidate?.noticePeriod}{" "}
                  Days
                </p>
              </div>
              <div className="space-y-2 rounded-lg p-2 shadow-md shadow-stone-200 bg-white dark:bg-black dark:text-white">
                <p className="text-gray-500 break-words dark:text-white">
                  Marital Status
                </p>
                <p className="text-blue-600 break-words text-wrap font-semibold text-xs md:text-base">
                  {currentCandidate?.maritalStatus === null || undefined
                    ? "-"
                    : currentCandidate?.maritalStatus}
                </p>
              </div>
              <div className="space-y-2 rounded-lg p-2 shadow-md shadow-stone-200 bg-white dark:bg-black dark:text-white">
                <p className="text-gray-500 break-words dark:text-white">
                  Current Location
                </p>
                <p className="text-blue-600 break-words text-wrap font-semibold text-xs md:text-base">
                  {currentCandidate?.currentLocation.locationDetails === null ||
                  undefined
                    ? "-"
                    : currentCandidate?.currentLocation.locationDetails}
                </p>
              </div>
              <div className="space-y-2 rounded-lg p-2 shadow-md shadow-stone-200 bg-white dark:bg-black dark:text-white">
                <p className="text-gray-500 break-words dark:text-white">
                  Address Locality
                </p>
                <p className="text-blue-600 break-words text-wrap font-semibold text-xs md:text-base">
                  {currentCandidate?.addressLocality === null || undefined
                    ? "-"
                    : currentCandidate?.addressLocality}
                </p>
              </div>
              <div className="space-y-2 rounded-lg p-2 shadow-md shadow-stone-200 bg-white dark:bg-black dark:text-white">
                <p className="text-gray-500 break-words dark:text-white">
                  Current Address
                </p>
                <p className="text-blue-600 break-words text-wrap font-semibold text-xs md:text-base">
                  {currentCandidate?.address1 === null || undefined
                    ? "-"
                    : currentCandidate?.address1}
                </p>
              </div>
              <div className="space-y-2 rounded-lg p-2 shadow-md shadow-stone-200 bg-white dark:bg-black dark:text-white">
                <p className="text-gray-500 break-words dark:text-white">
                  Pincode
                </p>
                <p className="text-blue-600 break-words text-wrap font-semibold text-xs md:text-base">
                  {currentCandidate?.pinCode === null || undefined
                    ? "-"
                    : currentCandidate?.pinCode}
                </p>
              </div>
              <div className="space-y-2 rounded-lg p-2 shadow-md shadow-stone-200 bg-white dark:bg-black dark:text-white">
                <p className="text-gray-500 break-words dark:text-white">
                  Linkedin URL
                </p>

                <p className="text-blue-600 break-words text-wrap font-semibold text-xs md:text-base">
                  {currentCandidate?.linkedin === null || undefined ? (
                    "-"
                  ) : (
                    <a href={currentCandidate?.linkedin} target="_blank">
                      Visit
                    </a>
                  )}
                </p>
              </div>
            </div>
          </div>
          {isFormVisible && (
            <Popup onClose={() => setIsFormVisible(false)}>
              <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mb-6 mt-10">
                <ProfileUpdateForm
                  preferredJobModes={preferredJobType}
                  preferredLocation={preferredLocation}
                  hiringTypes={hiringTypes}
                  id={Number(router.query.id)}
                  initialValues={currentCandidate ? currentCandidate : null}
                  masterLocations={locations}
                  autoClose={() => {
                    setIsFormVisible(false);
                  }}
                />
              </div>
            </Popup>
          )}
        </div>

        {/* Interviews Section */}

        <section className="rounded-lg shadow-sm p-2">
          <h3 className="md:text-xl text-sm font-semibold">Interviews</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
            {candidateInterviews?.length ? (
              candidateInterviews?.map((item, index) => (
                <div
                  key={index}
                  className="transform transition-all duration-300 hover:shadow-xl"
                >
                  <div id="interviews">
                    <div className="border border-gray-200 shadow-lg rounded-xl overflow-hidden bg-[var(--content-background)] relative">
                      {/* Header Section */}
                      <div className="bg-gray-50 dark:bg-gray-800 p-4 border-b border-gray-200">
                        <div className="flex items-center justify-between mb-1">
                          <h2 className="text-sm md:text-base font-medium text-gray-600 dark:text-gray-300">
                            {item.clientJob?.client.clientName}
                          </h2>
                          <div className="flex gap-2 items-center px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700">
                            <div
                              className={`w-3 h-3 md:w-3 md:h-3 rounded-full ${
                                item.interviewStatus === "DONE"
                                  ? "bg-green-500"
                                  : item.interviewStatus === "PENDING"
                                  ? "bg-yellow-500"
                                  : item.interviewStatus === "REJECTED"
                                  ? "bg-red-500"
                                  : "bg-blue-500"
                              }`}
                            ></div>
                            <span className="text-xs md:text-sm font-medium">
                              {item.interviewStatus}
                            </span>
                          </div>
                        </div>
                        <h2 className="font-bold md:text-xl text-lg text-gray-800 dark:text-white truncate">
                          {item.clientJob?.jobTitle}
                        </h2>
                      </div>

                      {/* Content Section */}

                      {/* Button Section */}
                      <div className="p-4 pt-4 flex justify-end">
                        <Link
                          href={{
                            pathname: `/candidates/${Number(
                              router.query.id
                            )}/interviews/${item?.clientJob?.jobId}`,
                            query: { contactInterViewId: item?.interviewId },
                          }}
                        >
                          <button className="text-xs md:text-sm font-medium transition-all duration-200 flex items-center bg-blue-500 text-white px-4 py-1 rounded-md border-2 border-blue-500 hover:bg-white hover:text-blue-500 hover:shadow-lg box-border">
                            View Results
                            <svg
                              className="w-4 h-4 ml-1"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-1 md:col-span-2 bg-gray-50 dark:bg-gray-800 rounded-lg p-8 text-center">
                <svg
                  className="w-12 h-12 mx-auto text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="mt-4 text-gray-600 dark:text-gray-300 font-medium">
                  No interviews found
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Skills Section */}
        <div id="skills" className="p-2 rounded-lg shadow-sm space-y-6">
          <h2 className="md:text-xl text-sm font-semibold">Skills</h2>
          {isEdit ? (
            <div className="space-y-2 border-b pb-4 border-gray-200">
              <div className="flex md:flex-row flex-wrap flex-col gap-4 md:items-center">
                <div>
                  <input
                    id="skill-dropdown"
                    className="px-4 py-1 border border-gray-300 dark:bg-black dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                    list="skill-list"
                    placeholder="Select or type a skill"
                    value={selectedSkill}
                    onChange={(e) => setSelectedSkill(e.target.value)}
                  />
                  <datalist id="skill-list">
                    {masterTech?.map((skill, index) => (
                      <option
                        key={index}
                        value={skill.technology}
                        className="hover:text-white"
                      >
                        {skill.technology}
                      </option>
                    ))}
                  </datalist>
                </div>
                <div>
                  <input
                    id="skillExp"
                    type="text"
                    list="exp-list"
                    placeholder="Select experience"
                    className="px-4 py-1 border border-gray-300 dark:bg-black dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                    value={techExp}
                    onChange={(e) => setTechExp(e.target.value)}
                  />
                  <datalist
                    id="exp-list"
                    className="absolute mt-1 w-48 bg-white border border-gray-300 rounded-md shadow-lg max-h-40 overflow-y-auto scrollbar-none appearance-none"
                  >
                    {experienceOptions.map((option, index) => (
                      <option
                        key={index}
                        value={option}
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                      >
                        {option}
                      </option>
                    ))}
                  </datalist>
                </div>
                <div>
                  <input
                    id="skillLevel"
                    type="text"
                    list="level-list"
                    placeholder="Select level"
                    className="px-4 py-1 border border-gray-300 dark:bg-black dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                    value={expLevel}
                    onChange={(e) => setExpLevel(e.target.value)}
                  />
                  <datalist
                    id="level-list"
                    className="absolute mt-1 w-48 bg-white border border-gray-300 rounded-md shadow-lg max-h-40 overflow-y-auto"
                  >
                    <option
                      value="Beginner"
                      className="hover:bg-blue-500 bg-white"
                    >
                      Beginner
                    </option>
                    <option
                      value="Intermediate"
                      className="hover:bg-blue-500 bg-white"
                    >
                      Intermediate
                    </option>
                    <option
                      value="Advanced"
                      className="hover:bg-blue-500 bg-white"
                    >
                      Advanced
                    </option>
                  </datalist>
                </div>
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded-md border-2 border-blue-500 hover:bg-white hover:text-blue-500 hover:shadow-lg transition duration-200 box-border"
                  onClick={postSkill}
                >
                  Add Skill
                </button>
              </div>
            </div>
          ) : (
            ""
          )}

          {technologies && technologies.length > 0 ? (
            <div
              id="Skills_rating"
              className="bg-white dark:bg-black dark:text-white rounded-md space-y-4"
            >
              <h3 className="md:text-xl text-sm font-light">Skills Rating</h3>
              <div className="overflow-x-auto rounded-md">
                <table className="min-w-full text-xs md:text-base border border-gray-200">
                  <thead className="bg-gray-100 ">
                    <tr>
                      <th className="font-light text-left text-blue-500 px-2 py-1 md:px-4 md:py-2">
                        Skill
                      </th>
                      <th className="font-light text-left text-blue-500 px-2 py-1 md:px-4 md:py-2">
                        Experience
                      </th>
                      <th className="font-light text-left text-blue-500 px-2 py-1 md:px-4 md:py-2">
                        Expertise Level
                      </th>
                      {isEdit ? (
                        <th className="font-light text-left text-blue-500 px-2 py-1 md:px-4 md:py-22">
                          Actions
                        </th>
                      ) : null}
                    </tr>
                  </thead>
                  <tbody>
                    {technologies?.map((item, index) => (
                      <tr
                        key={index}
                        className="hover:bg-gray-50 dark:hover:text-black"
                      >
                        <td className="text-left px-2 py-1 md:px-4 md:py-2 border border-gray-200">
                          {item.technology.technology}
                        </td>
                        <td className="text-left px-2 py-1 md:px-4 md:py-2 border border-gray-200">
                          {item.experience ? item.experience : "-"} Yrs
                        </td>
                        <td className="text-left px-2 py-1 md:px-4 md:py-2 border border-gray-200">
                          {item.expertiseLevel ? item.expertiseLevel : "-"}
                        </td>
                        {isEdit ? (
                          <td className="text-left px-2 py-1 md:px-4 md:py-2 border border-gray-200">
                            <button
                              className="text-yellow-400 hover:text-yellow-600 focus:outline-none"
                              onClick={() => {
                                handleUpdateSkill(index);
                              }}
                            >
                              Update
                            </button>
                          </td>
                        ) : null}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="mt-4">
              <p>No Skills Found</p>
            </div>
          )}

          {isSkillUpdated && selectedTech && (
            <Popup onClose={() => setIsSkillUpdated(false)}>
              <div className="bg-white mx-auto max-w-3xl p-4 mt-16 rounded-md">
                <form className="space-y-8">
                  <div className="grid grid-cols-1 gap-6">
                    <div className="space-y-2">
                      <label
                        htmlFor="skill"
                        className="text-gray-400 font-medium"
                      >
                        Skill
                      </label>

                      <input
                        id="skill"
                        disabled
                        type="text"
                        value={selectedTech.technology.technology}
                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 dark:text-black"
                        onChange={(e) =>
                          setSelectedTech({
                            ...selectedTech,
                            technology: { technology: e.target.value },
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="experience"
                        className="text-gray-400 font-medium"
                      >
                        Experience (In Years)
                      </label>
                      <input
                        id="experience"
                        type="text"
                        value={selectedTech.experience}
                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 dark:text-black"
                        onChange={(e) =>
                          setSelectedTech({
                            ...selectedTech,
                            experience: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="expertiseLevel"
                        className="text-gray-400 font-medium"
                      >
                        Expertise Level
                      </label>
                      <select
                        name="skill"
                        id="skill"
                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 dark:text-black"
                        value={selectedTech.expertiseLevel} // Controlled component
                        onChange={(e) => {
                          setSelectedTech({
                            ...selectedTech,
                            expertiseLevel: e.target.value,
                          });
                        }}
                      >
                        <option className="text-gray-500" disabled value="">
                          Select level
                        </option>
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                      </select>
                      {/* <input
                        id="expertiseLevel"
                        type="text"
                        value={selectedTech.expertiseLevel}
                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                        onChange={(e) =>
                          setSelectedTech({
                            ...selectedTech,
                            expertiseLevel: e.target.value,
                          })
                        }
                      /> */}
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
                    onClick={handleUpdateContactTechnology}
                  >
                    Update
                  </button>
                  <button
                    onClick={() => setIsSkillUpdated(false)}
                    className="w-full bg-red-500 text-white py-2 rounded-md transition duration-300"
                  >
                    Cancel
                  </button>
                </form>
              </div>
            </Popup>
          )}
        </div>

        {/* Domain Section */}
        <section>
          <div
            id="domain"
            className="bg-white dark:bg-black dark:text-white p-2 rounded-lg shadow-sm space-y-6"
          >
            <h3 className="md:text-xl text-sm font-semibold">Domains</h3>
            {isEdit ? (
              <div className="flex md:flex-row flex-col gap-4 md:items-center">
                <input
                  type="text"
                  list="domain-list"
                  placeholder="Select domain"
                  className="bg-white px-4 py-1 border border-gray-300 dark:bg-black dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                  value={selectedDomain}
                  onChange={(e) => setSelectedDomain(e.target.value)}
                />
                <datalist id="domain-list">
                  {masterDomains?.map((domain, index) => (
                    <option key={index} value={domain.domainDetails}>
                      {domain.domainDetails}
                    </option>
                  ))}
                </datalist>
                <button
                  className="bg-blue-500 text-white px-4 py-1 rounded-md border-2 border-blue-500 hover:bg-white hover:text-blue-500 hover:shadow-lg transition duration-200 box-border"
                  onClick={postDomain}
                >
                  Add Domain
                </button>
              </div>
            ) : (
              ""
            )}

            <div className="flex items-center gap-2 md:gap-4 flex-wrap">
              {candidateDomains?.length === 0 ? (
                <p>No Domains Found</p>
              ) : (
                candidateDomains?.map((item, index) => (
                  <div
                    key={index}
                    className="bg-gray-200 dark:bg-white dark:text-black px-4 py-1 rounded-lg relative"
                  >
                    {isEdit ? (
                      <X
                        onClick={() =>
                          deleteContactDomain(item.contactDomainId).then(() => {
                            setCandidateDomains(
                              candidateDomains.filter(
                                (domain) =>
                                  domain.contactDomainId !==
                                  item.contactDomainId
                              )
                            );
                          })
                        }
                        className="w-4 h-4 cursor-pointer bg-red-500 rounded-lg text-white hover:bg-red-600 transition duration-200 absolute -top-1 -right-1"
                      />
                    ) : (
                      ""
                    )}

                    <p>
                      {item.domain.domainDetails ?? item.domain.domainDetails}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        {/* Companies Section */}

        <section>
          <div className="p-2 bg-white dark:bg-black dark:text-white rounded-lg shadow-sm space-y-6">
            <div className="mb-4 space-y-6">
              <h2 className="md:text-xl text-sm font-semibold">
                Previous Companies
              </h2>
              {isEdit ? (
                <div className="flex md:flex-row flex-col gap-4 md:items-center">
                  <input
                    type="text"
                    name=""
                    id="companies"
                    list="company-list"
                    placeholder="Select Company"
                    className="bg-white px-4 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none dark:bg-black dark:text-white"
                    onChange={(e) => setSelectedCompany(e.target.value)}
                    value={selectedCompany}
                  />
                  <datalist id="company-list">
                    {masterCompanies ? (
                      masterCompanies?.map((company, index) => (
                        <option key={index} value={company.companyName}>
                          {company.companyName}
                        </option>
                      ))
                    ) : (
                      <option>select a company</option>
                    )}
                  </datalist>
                  <button
                    onClick={postCompany}
                    className="bg-blue-500 text-white px-4 py-1 rounded-md border-2 border-blue-500 hover:bg-white hover:text-blue-500 hover:shadow-lg transition duration-200 box-border"
                  >
                    Add Company
                  </button>
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="flex flex-wrap items-center gap-4">
              {candidateCompanies?.length === 0 ? (
                <p>No Companies Found</p>
              ) : (
                candidateCompanies?.map((company, index) => (
                  <div className="relative" key={index}>
                    <p className="px-4 py-1 bg-gray-200 dark:bg-white dark:text-black rounded-lg text-xs md:text-base">
                      {company.company.companyName ??
                        company.company.companyName}
                    </p>
                    {isEdit ? (
                      <X
                        className="w-4 h-4 cursor-pointer bg-red-500 rounded-lg text-white hover:bg-red-600 transition duration-200 absolute -top-1 -right-1"
                        onClick={() => {
                          deleteContactCompany(company.contactCompanyId).then(
                            () => {
                              setCandidateCompanies(
                                candidateCompanies.filter(
                                  (item) =>
                                    item.contactCompanyId !==
                                    company.contactCompanyId
                                )
                              );
                            }
                          );
                        }}
                      />
                    ) : (
                      ""
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        {/* Certificates Section */}

        <section>
          <div className="p-2 bg-white dark:bg-black dark:text-white rounded-lg shadow-sm space-y-4">
            <h3 className="md:text-xl text-sm font-semibold">Certificates</h3>
            {isEdit ? (
              <div className="flex md:flex-row flex-col gap-4 md:items-center">
                <input
                  type="text"
                  value={selectedCertificate}
                  id="certificates"
                  list="certificate-list"
                  placeholder="Select Certificate"
                  className="bg-white px-4 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none dark:bg-black dark:text-white"
                  onChange={(e) => setSelectedCertificate(e.target.value)}
                />
                <datalist id="certificate-list">
                  {masterCertificates?.map((certificate, index) => (
                    <option key={index} value={certificate.certificationName}>
                      {certificate.certificationName}
                    </option>
                  ))}
                </datalist>
                <button
                  className="bg-blue-500 text-white px-4 py-1 rounded-md border-2 border-blue-500 hover:bg-white hover:text-blue-500 hover:shadow-lg transition duration-200 box-border"
                  onClick={postCertification}
                >
                  Add Certificate
                </button>
              </div>
            ) : null}

            {candidateCertificates && candidateCertificates?.length > 0 ? (
              <div className="bg-white rounded-lg dark:bg-black dark:text-white space-y-4">
                <div className="flex flex-wrap items-center gap-4">
                  {candidateCertificates.map((certificate, index) => (
                    <div key={index} className="relative">
                      <p className="px-4 py-1 bg-gray-200 dark:bg-white dark:text-black rounded-lg text-xs md:text-base">
                        {certificate.certification?.certificationName}
                      </p>
                      {isEdit ? (
                        <X
                          className="w-4 h-4 cursor-pointer bg-red-500 rounded-lg text-white hover:bg-red-600 transition duration-200 absolute -top-1 -right-1"
                          onClick={() => {
                            deleteContactCertification(
                              Number(certificate.contactCertificationId)
                            ).then(() => {
                              setCandidateCertificates(
                                candidateCertificates.filter(
                                  (item) =>
                                    item.contactCertificationId !==
                                    certificate.contactCertificationId
                                )
                              );
                            });
                          }}
                        />
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p>No Certificates Found</p>
            )}
          </div>
        </section>

        {/* Resume Section */}
        <section id="resume" className="p-2 rounded-lg shadow-sm space-y-6">
          <h3 className="font-semibold text-sm  md:text-xl">Resume</h3>
          <PdfViewer
            isEdit={isEdit}
            candidateId={Number(router.query.id)}
            autoClose={() => {
              setIsFormVisible(false);
            }}
            resume={currentCandidate.resume ? currentCandidate.resume : ""}
          ></PdfViewer>
        </section>

        {/* Footer Buttons */}
        {/* <div className="flex justify-end gap-4">
          <button className="bg-gray-500 text-white px-4 py-1 rounded-md border-2 border-black hover:bg-white hover:text-blue-500 hover:shadow-lg transition duration-200 box-border">
            Back To Results
          </button>
          <button className="bg-blue-500 text-white px-4 py-1 rounded-md border-2 border-blue-500 hover:bg-white hover:text-blue-500 hover:shadow-lg transition duration-200 box-border">
            select Candidate
          </button>
        </div> */}
      </section>
    </MainLayout>
  );
}
