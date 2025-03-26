// Components
import MainLayout from "@/components/Layouts/layout";
import { Popup } from "@/components/Elements/cards/popup";
import ProfileUpdateForm from "@/components/Forms/updateProfile";

// Next.js and React Imports
import { useRouter } from "next/router";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
// External Libraries
import { toast } from "react-toastify";

// Models and Definitions
import { Doc } from "@/lib/pdf";
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
import {
  fetchCandidate,
  fetchCandidateResume,
} from "@/api/candidates/candidates";
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
  const [techExp, setTechExp] = useState("");
  const [expLevel, setExpLevel] = useState("");
  const [isSkillUpdated, setIsSkillUpdated] = useState(false);
  const [selectedTech, setSelectedTech] = useState<allTechs | null>(null);
  const [originalTech, setoriginalTech] = useState<allTechs | null>(null);
  const [selectedDomain, setSelectedDomain] = useState("");
  const [selectedSkill, setSelectedSkill] = useState("");
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
  const [pdfResponse, setPdfResponse] = useState<string | null>(null);
  const router = useRouter();

  const { mode } = router.query;
  const isEdit = mode ? true : false;

  const [initialData, setInitialData] = useState<ReqData | null>(null);
  const [formData, setFormData] = useState<ReqData | null>(null);

  // Get Operations
  useEffect(() => {
    fetchCandidate(Number(router.query.id))
      .then((data) => {
        setCurrentCandidate(data);
        setInitialData(data);
        setFormData(data);
      })
      .catch((error) => console.log(error));

    fetchCandidateResume(Number(router.query.id))
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.log(error));

    fetchAllContactTechnologies()
      .then((data) => {
        const contactIdToMatch = Number(router.query.id); // Replace this with the desired contactId
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
      const contactIdToMatch = Number(router.query.id); // Replace this with the desired contactId
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
      const contactIdToMatch = Number(router.query.id); // Replace this with the desired contactId
      // Step 1: Filter objects with the matching contactId
      const filteredData = data.filter(
        (item: any) => item.contactDetails.contactId === contactIdToMatch
      );
      const companies = filteredData.map((item: any) => item);
      setCandidateCompanies(companies);
      console.log(companies);
    });

    fetchContactCertificationsByContact(Number(router.query.id)).then((data) => {
      setCandidateCertificates(data);
      console.log(data);
    })

    fetchAllCompanies()
      .then((data) => {
        setMasterCompanies(data);
      })
      .catch((error) => {
        console.log(error);
      });

    fetchAllCertifications().then((data) => {
      setMasterCertificates(data);
      console.log(data);
    });
  }, [isFormVisible]);

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

      // Normalize the selected skill for comparison
      const normalizedSelectedSkill = selectedSkill.toLowerCase();

      // Check if the skill exists in masterTech
      const skillExists = masterTech?.some(
        (tech) => tech.technology.toLowerCase() === normalizedSelectedSkill
      );

      let tempId;
      if (skillExists) {
        // If the skill exists, find its ID
        tempId = masterTech?.find(
          (tech) => tech.technology.toLowerCase() === normalizedSelectedSkill
        );
      } else {
        // If the skill doesn't exist, create it
        const newSkill = {
          technology: selectedSkill,
          experience: techExp,
          expertiseLevel: expLevel,
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
      const result = await createContactTechnology({
        contactDetails: currentCandidate,
        technology: tempId,
        experience: techExp,
        expertiseLevel: expLevel,
      });

      console.log("Skill added to candidate:", result.technology);

      // Reset form fields
      setSelectedSkill("");
      setExpLevel("");
      setTechExp("");

      // Show success message
      toast.success("Skill added successfully", {
        position: "top-center",
      });
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

      // Check if the domain exists in masterDomains
      const domainExists = masterDomains?.some(
        (domain) =>
          domain.domainDetails.toLowerCase() === selectedDomain.toLowerCase()
      );
      if (!domainExists) {
        const newDomain = {
          domainDetails: selectedDomain,
          //  fields for the createDomain API
        };
        createDomain(newDomain).then((data) => {
          setMasterDomains((prev) =>
            prev
              ? [...prev, data.domain.domainDetails]
              : [data.domain.domainDetails]
          );
        });
      }

      await createContactDomain({
        domain: {
          domainId: masterDomains?.find(
            (domain) =>
              domain.domainDetails.toLowerCase() ===
              selectedDomain.toLowerCase()
          )?.domainId,
        },
        contactDetails: {
          contactId: Number(router.query.id),
        },
      }).then((data) => {
        setSelectedDomain("");
        setCandidateDomains((prev) => (prev ? [...prev, data] : [data]));
      });
    } catch (error) {
      console.error("Error adding domain:", error);
      toast.error("Failed to add domain. Please try again.", {
        position: "top-center",
      });
    }
  };

  const postCompany = async () => {
    try {
      // Check if a company is selected
      if (selectedCompany.length === 0) {
        toast.error("Please select a company", {
          position: "top-center",
        });
        return;
      }

      // Check if the company exists in masterCompanies
      const companyExists = masterCompanies?.some(
        (company) =>
          company.companyName.toLowerCase() === selectedCompany.toLowerCase()
      );

      // If the company doesn't exist in masterCompanies, add it
      if (!companyExists) {
        const newCompany = {
          companyName: selectedCompany,
          //  fields for the createCompany API
        };

        await createCompany(newCompany).then((data) => {
          setMasterCompanies((prev) => (prev ? [...prev, data] : [data]));
        });

        // Update masterCompanies state with the new company
      }

      // Call createContactCompany to associate the company with the candidate
      if (companyExists) {
        await createContactCompany({
          contactDetails: currentCandidate,
          company: {
            companyId: masterCompanies?.find(
              (company) =>
                company.companyName.toLowerCase() ===
                selectedCompany.toLowerCase()
            )?.companyId,
          },
        }).then((data) => {
          setCandidateCompanies((prev) => (prev ? [...prev, data] : [data]));
        });
      }

      console.log("Company added to candidate:", selectedCompany);
      setSelectedCompany("");
      toast.success("Company added successfully", {
        position: "top-center",
      });
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
      // Check if a certification is selected
      if (selectedCertificate.length === 0) {
        toast.error("Please select a certification", {
          position: "top-center",
        });
        return;
      }

      // Check if the certification exists in masterCertificates
      const certificationExists = masterCertificates?.some(
        (certification) =>
          certification.certificationName.toLowerCase() ===
          selectedCertificate.toLowerCase()
      );
      if (!certificationExists) {
        const newCertification = {
          certificationName: selectedCertificate,
          //  fields for the createCertification API
        };
        createCertification(newCertification).then((data) => {
          setMasterCertificates((prev) =>
            prev ? [...prev, data.certificationName] : [data.certificationName]
          );
        });
      }

      const tempId = masterCertificates?.find(
        (certification) =>
          certification.certificationName.toLowerCase() ===
          selectedCertificate.toLowerCase()
      );
      if (tempId) {
        await createContactCertification({
          contactDetails: {
            contactId: Number(router.query.id),
          },
          certification: {
            certificationId: tempId.certificationId,
            certificationName: selectedCertificate,
          },
        }).then((data) => {
          setSelectedCertificate("");
          console.log(data);
          setCandidateCertificates((prev) => (prev ? [...prev, data.certification] : [data.certification]));
        });
      }
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

  const handleUpdateContactTechnology = async (event: React.MouseEvent) => {
    event.preventDefault();
    console.log("selectedTech", selectedTech);

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

    console.log("Updated Skill Payload:", updatedSkill);

    try {
      // Check if contactTechId is available
      if (selectedTech.contactTechId) {
        // Call the API to update the skill
        const response = await updateContactTechnology(
          selectedTech.contactTechId,
          updatedSkill
        );
        console.log("Skill updated successfully:", response);

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
      <section className="space-y-10 p-4 relative md:text-base text-xs">
        {/* Profile Section */}
        <h1 className="border-b border-black-200 font-semibold text-2xl">
          Profile
        </h1>
        <div
          id="profile"
          className="flex md:flex-row flex-col md:justify-between md:items-center md:text-base text-xs mt-4 bg-white p-4 rounded-lg shadow-sm border border-gray-200 space-y-4"
        >
          <div className="space-y-2">
            <h3 className="font-medium text-blue-500 text-2xl">
              {currentCandidate?.firstName} {currentCandidate?.lastName}
            </h3>
            <h4 className="font-semibold text-lg">
              {currentCandidate?.designation}
            </h4>
          </div>
          <div className="flex gap-2 items-center">
            <button
              onClick={() =>
                document
                  .getElementById("resume")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="bg-[var(--field-background)] border-black-200 border-2 py-1 px-2 rounded-lg hover:bg-black hover:text-[var(--content-background)]"
            >
              View Resume
            </button>
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
        <div className="bg-white p-4 rounded-lg space-y-4 shadow-lg">
          <div className="flex items-center gap-2">
            <h3 className="md:text-xl text-sm font-semibold">Personal Info</h3>
            {isEdit ? (
              <button
                className="bg-blue-500 text-white px-4 py-1 rounded-md border-2 border-blue-500 hover:bg-white hover:text-blue-500 hover:shadow-lg transition duration-200 box-border"
                onClick={() => {
                  setIsFormVisible(true);
                }} //Show form on the button click
              >
                Update
              </button>
            ) : (
              ""
            )}
          </div>

          <div id="profile_info" className="p-4 bg-zinc-50 rounded-lg">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2 rounded-lg p-2 shadow-md shadow-stone-200 bg-white">
                <p className="text-gray-500 break-words">Total Experience</p>
                <p className="text-blue-600 break-words text-wrap font-semibold text-xs md:text-base">
                  {currentCandidate?.totalExperience === null || undefined
                    ? "-"
                    : currentCandidate?.totalExperience}{" "}
                  Yrs
                </p>
              </div>
              {currentCandidate?.differentlyAbled === true && (
                <div className="space-y-2 rounded-lg p-2 shadow-md shadow-stone-200 bg-white">
                  <p className="text-gray-500 break-words">
                    Differently Abled Type
                  </p>
                  <p className="text-blue-600 break-words text-wrap font-semibold text-xs md:text-base">
                    {currentCandidate.differentlyAbledType === null ||
                    currentCandidate.differentlyAbledType === ""
                      ? "-"
                      : currentCandidate.differentlyAbledType}
                  </p>
                </div>
              )}

              <div className="space-y-2 rounded-lg p-2 shadow-md shadow-stone-200 bg-white">
                <p className="text-gray-500 break-words">Date of Birth</p>
                <p className="text-blue-600 break-words text-wrap font-semibold text-xs md:text-base">
                  {currentCandidate?.dob ? currentCandidate.dob : "-"}
                </p>
              </div>

              <div className="space-y-2 rounded-lg p-2 shadow-md shadow-stone-200 bg-white">
                <p className="text-gray-500 break-words">Qualification</p>
                <p className="text-blue-600 break-words text-wrap font-semibold text-xs md:text-base">
                  {currentCandidate?.highestEducation === null || undefined
                    ? "-"
                    : currentCandidate?.highestEducation}
                </p>
              </div>
              <div className="space-y-2 rounded-lg p-2 shadow-md shadow-stone-200 bg-white">
                <p className="text-gray-500 break-words">Mobile Number</p>
                <p className="text-blue-600 break-words text-wrap font-semibold text-xs md:text-base">
                  {currentCandidate?.primaryNumber === null || undefined
                    ? "-"
                    : currentCandidate?.primaryNumber}
                </p>
              </div>
              <div className="space-y-2 rounded-lg p-2 shadow-md shadow-stone-200 bg-white">
                <p className="text-gray-500 break-words">Email</p>
                <p className="text-blue-600 break-words whitespace-wrap font-semibold text-xs md:text-base">
                  {currentCandidate?.emailId === null || undefined
                    ? "-"
                    : currentCandidate?.emailId}
                </p>
              </div>
              <div className="space-y-2 rounded-lg p-2 shadow-md shadow-stone-200 bg-white">
                <p className="text-gray-500 break-words">Current Salary</p>
                <p className="text-blue-600 break-words text-wrap font-semibold text-xs md:text-base">
                  {currentCandidate?.currentSalary === null || undefined
                    ? "-"
                    : currentCandidate?.currentSalary}
                </p>
              </div>
              <div className="space-y-2 rounded-lg p-2 shadow-md shadow-stone-200 bg-white">
                <p className="text-gray-500 break-words">Preferred Job Type</p>
                <p className="text-blue-600 break-words text-wrap font-semibold text-xs md:text-base">
                  {currentCandidate?.preferredJobType === null || undefined
                    ? "-"
                    : currentCandidate?.preferredJobType}
                </p>
              </div>
              <div className="space-y-2 rounded-lg p-2 shadow-md shadow-stone-200 bg-white">
                <p className="text-gray-500 break-words">Gender</p>
                <p className="text-blue-600 break-words text-wrap font-semibold text-xs md:text-base">
                  {currentCandidate?.gender === null || undefined
                    ? "-"
                    : currentCandidate?.gender}
                </p>
              </div>
              <div className="space-y-2 rounded-lg p-2 shadow-md shadow-stone-200 bg-white">
                <p className="text-gray-500 break-words">Notice Period</p>
                <p className="text-blue-600 break-words text-wrap font-semibold text-xs md:text-base">
                  {currentCandidate?.noticePeriod === null || undefined
                    ? "-"
                    : currentCandidate?.noticePeriod}
                </p>
              </div>
              <div className="space-y-2 rounded-lg p-2 shadow-md shadow-stone-200 bg-white">
                <p className="text-gray-500 break-words">Marital Status</p>
                <p className="text-blue-600 break-words text-wrap font-semibold text-xs md:text-base">
                  {currentCandidate?.maritalStatus === null || undefined
                    ? "-"
                    : currentCandidate?.maritalStatus}
                </p>
              </div>
              <div className="space-y-2 rounded-lg p-2 shadow-md shadow-stone-200 bg-white">
                <p className="text-gray-500 break-words">Location</p>
                <p className="text-blue-600 break-words text-wrap font-semibold text-xs md:text-base">
                  {currentCandidate?.currentLocation.locationDetails === null ||
                  undefined
                    ? "-"
                    : currentCandidate?.currentLocation.locationDetails}
                </p>
              </div>
              <div className="space-y-2 rounded-lg p-2 shadow-md shadow-stone-200 bg-white">
                <p className="text-gray-500 break-words">Address</p>
                <p className="text-blue-600 break-words text-wrap font-semibold text-xs md:text-base">
                  {currentCandidate?.addressLocality === null || undefined
                    ? "-"
                    : currentCandidate?.addressLocality +
                        ", " +
                        currentCandidate?.address ===
                        null || undefined
                    ? "-"
                    : currentCandidate?.addressLocality}
                </p>
              </div>
            </div>
          </div>
          {isFormVisible && (
            <Popup onClose={() => setIsFormVisible(false)}>
              <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mb-6 mt-10">
                <ProfileUpdateForm
                  id={Number(router.query.id)}
                  initialValues={currentCandidate ? currentCandidate : null}
                  autoClose={() => setIsFormVisible(false)}
                />
              </div>
            </Popup>
          )}
        </div>

        {/* Interviews Section */}

        <section className="rounded-lg shadow-sm p-2">
          <h3 className="md:text-xl text-sm font-semibold">Interviews</h3>

          <div>
            {candidateInterviews?.length ? (
              candidateInterviews?.map((item, index) => (
                <div className="">
                  <h4 className="font-bold md:text-lg text-md text-blue-700 mb-4 mt-4">
                    {item.clientJob?.client.clientName}
                  </h4>
                  <div id="interviews" className="">
                    <div
                      key={index}
                      className="border border-black-200  shadow-md bg-[var(--content-background)] p-4 rounded-lg text-xs md:text-base space-y-4 relative"
                    >
                      <div className="flex items-center justify-between flex-wrap border-b border-black-200">
                        <h2 className="font-semibold md:text-xl text-lg">
                          {item.clientJob?.jobTitle}
                        </h2>
                        <div className="flex gap-2 items-center">
                          <div
                            className={`w-3 h-3 md:w-4 md:h-4 rounded-full ${
                              item.interviewStatus === "DONE"
                                ? "bg-green-500"
                                : item.interviewStatus === "PENDING"
                                ? "bg-yellow-500"
                                : item.interviewStatus === "REJECTED"
                                ? "bg-red-500"
                                : "bg-blue-500"
                            }`}
                          ></div>
                          <span className="text-xs md:text-base">
                            {item.interviewStatus}
                          </span>
                        </div>
                      </div>
                      <p className="text-xs md:text-base">
                        Date : {item.interviewDate}
                      </p>
                      <Link
                        href={`/candidates/${Number(
                          router.query.id
                        )}/interviews/${item.interviewId}`}
                      >
                        <button className="bg-[var(--theme-background)] border-black-200 border-2 py-1 px-2 absolute right-4 bottom-4 bg-blue-500 text-white rounded-md border-blue-500 hover:bg-white hover:text-blue-500 hover:shadow-lg transition duration-200 box-border">
                          View Results
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="mt-4">No interviews found</div>
            )}
          </div>
        </section>

        {/* Skills Section */}
        <div id="skills" className="p-2 rounded-lg shadow-sm space-y-6">
          {isEdit ? (
            <div className="space-y-2 border-b pb-4 border-gray-200">
              <h2 className="md:text-xl text-sm font-semibold">Skills</h2>
              <div className="flex md:flex-row flex-wrap flex-col gap-4 md:items-center">
                <div>
                  <input
                    id="skill-dropdown"
                    className="px-4 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
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
                    className="px-4 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
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
                    className="px-4 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
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
            <div id="Skills_rating" className="bg-white space-y-4">
              <h3 className="md:text-xl text-sm font-light">Skills Rating</h3>
              <div className="overflow-x-auto rounded-md">
                {" "}
                <table className="min-w-full text-xs md:text-base border border-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="font-light text-left text-blue-500 px-2 py-1 md:px-4 md:py-2">
                        Skill
                      </th>{" "}
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
                      <tr key={index} className="hover:bg-gray-50">
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
                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
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
                        Experience
                      </label>
                      <input
                        id="experience"
                        type="text"
                        value={selectedTech.experience}
                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
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
                      <input
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
                      />
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
            className="bg-white p-2 rounded-lg shadow-sm space-y-6"
          >
            <h3 className="md:text-xl text-sm font-semibold">Domains</h3>
            {isEdit ? (
              <div className="flex md:flex-row flex-col gap-4 md:items-center">
                <input
                  type="text"
                  list="domain-list"
                  placeholder="Select domain"
                  className="bg-white px-4 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
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
                    className="bg-gray-200 px-4 py-1 rounded-lg relative"
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

                    <p>{item.domain.domainDetails}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        {/* Companies Section */}

        <section>
          <div className="p-2 bg-white rounded-lg shadow-sm space-y-6">
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
                    className="bg-white px-4 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
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
            <div className="flex flex-wrap items-center gap-2">
              {candidateCompanies?.length === 0 ? (
                <p>No Companies Found</p>
              ) : (
                candidateCompanies?.map((company, index) => (
                  <div className="relative">
                    <p className="px-4 py-1 bg-gray-200 rounded-lg text-xs md:text-base">
                      {company.company.companyName}
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
          <div className="p-2 bg-white rounded-lg shadow-sm space-y-4">
            <h3 className="md:text-xl text-sm font-semibold">Certificates</h3>
            {isEdit ? (
              <div className="flex gap-4 items-center flex-wrap">
                <input
                  type="text"
                  value={selectedCertificate}
                  id="certificates"
                  list="certificate-list"
                  placeholder="Select Certificate"
                  className="bg-white px-4 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                  onChange={(e) => setSelectedCertificate(e.target.value)}
                />
                <button
                  className="bg-blue-500 text-white px-4 py-1 rounded-md border-2 border-blue-500 hover:bg-white hover:text-blue-500 hover:shadow-lg transition duration-200 box-border"
                  onClick={postCertification}
                >
                  Add Certificate
                </button>
                <datalist>
                  {masterCertificates?.length &&
                    masterCertificates?.map((certificate, index) => (
                      <option key={index} value={certificate.certificationName}>
                        {certificate.certificationName}
                      </option>
                    ))}
                </datalist>
              </div>
            ) : (
              ""
            )}
            {candidateCertificates && candidateCertificates?.length > 0 ? (
              <div className="p-2 bg-white rounded-lg shadow-sm space-y-4">
                <h3 className="md:text-xl text-sm font-semibold">
                  Certificates
                </h3>
                <div className="flex flex-wrap items-center gap-2">
                  {candidateCertificates?.map((certificate, index) => (
                    <div className="relative">
                      <p className="px-4 py-1 bg-gray-200 rounded-lg text-xs md:text-base">
                        {certificate.certification?.certificationName}
                      </p>
                      {isEdit ? (
                        <X
                          className="w-4 h-4 cursor-pointer bg-red-500 rounded-lg text-white hover:bg-red-600 transition duration-200 absolute -top-1 -right-1"
                          onClick={() => {
                            deleteContactCertification(
                              Number(certificate.contactCertificationId)
                            ).then((data) => {
                              console.log(certificate.contactCertificationId);
                              console.log(data);
                              setCandidateCertificates(
                                candidateCertificates.filter(
                                  (item) => item.contactCertificationId !== certificate.contactCertificationId
                                )
                              );
                            });
                          }}
                        />
                      ) : (
                        ""
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ):(
              <p>No Certificates Found</p>
            )}
          </div>
        </section>

        {/* Resume Section */}
        {/* <section
          id="resume"
          className="bg-white p-2 rounded-lg shadow-sm border space-y-6 border-gray-200"
        >
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-sm  md:text-xl">Resume</h3>
            <input type="file" className="hidden" id="resume_input" />
            {isEdit ? (
              <button
                className="bg-blue-500 text-white px-4 py-1 rounded-md border-2 border-blue-500 hover:bg-white hover:text-blue-500 hover:shadow-lg transition duration-200 box-border"
                type="button"
              >
                Update
              </button>
            ) : (
              ""
            )}
          </div>
        </section> */}

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
