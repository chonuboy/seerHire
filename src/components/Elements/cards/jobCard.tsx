import { useEffect, useState } from "react";
import {
  Calendar,
  Briefcase,
  User,
  DollarSign,
  FileText,
  Tag,
  Clock,
} from "lucide-react";
import JobInfoUpdateForm from "@/components/Forms/jobs/updateJobInfo";
import { Popup } from "./popup";
import { useRouter } from "next/router";
import { fetchJobDescription } from "@/api/client/clientJob";
import mammoth from "mammoth";
import { fetchCandidateResume } from "@/api/candidates/candidates";
import JobDescriptionUploader from "@/components/Forms/jobs/jdUploader";
import { JobDescription } from "./jobDescription";

interface JobData {
  createdOn: string;
  experience: number;
  insertedBy: string;
  isJobActive: string;
  jd: string;
  jobCode: string;
  jobDescription: string | null;
  jobId: number;
  jobPostType: string;
  jobTitle: string;
  postCreatedOn: string | null;
  salaryInCtc: number;
}

export default function JobCard({
  job,
  onUpdate,
  isClient,
}: {
  job: JobData;
  onUpdate?: () => void;
  isClient?: boolean;
}) {
  const [showJdModal, setShowJdModal] = useState(false);
  const [isJobUpdated, setIsJobUpdated] = useState(false);
  const [pdfData, setPdfData] = useState<any>(null);
  const [pdfUrl, setPdfUrl] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isJdUpdated, setJdUpdated] = useState(false);
  const [isJdopen, setIsJdopen] = useState(false);
  const router = useRouter();

  const loadPdf = async (jd: any, jobId: any) => {
    let objectUrl: string | null = null;
    let pdfData: any;

    setShowJdModal(true);
    try {
      pdfData = await fetchJobDescription(jobId)
        .then((response) => response)
        .catch((error) => console.error(error));

      if (jd.includes("pdf")) {
        const blob = new Blob([pdfData], { type: "application/pdf" });

        // Create a URL for the Blob
        objectUrl = URL.createObjectURL(blob);
        setPdfUrl(objectUrl);
        setError(null);
      } else if (jd.includes("docx")) {
        setPdfData(pdfData);
        mammoth
          .convertToHtml({ arrayBuffer: pdfData })
          .then((result) => {
            // Create HTML from the DOCX content
            const html = result.value;
            const blob = new Blob([html], { type: "text/html" });
            objectUrl = URL.createObjectURL(blob);
            setPdfUrl(objectUrl);
          })
          .catch((err) => {
            setError("Failed to render DOCX file");
          });
      }
    } catch (err) {
      console.error("Failed to load PDF:", err);
      setError("Failed to load resume. Please try again.");
    }
  };
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const statusColor =
    {
      Active: "bg-green-100 text-green-800",
      OnHold: "bg-yellow-100 text-yellow-800",
      Closed: "bg-red-100 text-red-800",
    }[job.isJobActive] || "bg-gray-100 text-gray-800 dark:text-black";

  return (
    <div className="bg-white dark:bg-black dark:text-white rounded-lg shadow-md overflow-hidden border border-gray-200">
      <div className="p-6">
        <div
          onClick={() => {
            router.push(`/jobs/${job.jobId}`);
          }}
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                {job.jobTitle || "Untitled Position"}
              </h2>
              <div className="flex items-center mt-1 text-gray-600 dark:text-white">
                <Tag className="h-4 w-4 mr-1" />
                <span className="text-sm mr-3">{job.jobCode}</span>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${statusColor}`}
                >
                  {job.isJobActive}
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold text-gray-800 dark:text-white flex items-center">
                <DollarSign className="h-5 w-5 mr-1 text-gray-600 dark:text-white" />
                {job.salaryInCtc} LPA
              </div>
              <span className="text-sm text-gray-500 dark:text-white">CTC</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="flex items-center text-gray-700">
              <Briefcase className="h-5 w-5 mr-2 text-gray-500 dark:text-white" />
              <div>
                <div className="text-sm font-medium dark:bg-black dark:text-white">
                  Experience Required
                </div>
                <div className="dark:bg-black dark:text-white">
                  {job.experience} {job.experience === 1 ? "Year" : "Years"}
                </div>
              </div>
            </div>

            <div className="flex items-center text-gray-700">
              <User className="h-5 w-5 mr-2 text-gray-500 dark:text-white" />
              <div>
                <div className="text-sm font-medium dark:bg-black dark:text-white">
                  Posted By
                </div>
                <div className="dark:bg-black dark:text-white">
                  {job.insertedBy}
                </div>
              </div>
            </div>

            <div className="flex items-center text-gray-700">
              <Calendar className="h-5 w-5 mr-2 text-gray-500 dark:text-white" />
              <div>
                <div className="text-sm font-medium dark:bg-black dark:text-white">
                  Created On
                </div>
                <div className="dark:bg-black dark:text-white">
                  {formatDate(job.createdOn)}
                </div>
              </div>
            </div>

            <div className="flex items-center text-gray-700">
              <Clock className="h-5 w-5 mr-2 text-gray-500 dark:text-white" />
              <div>
                <div className="text-sm font-medium dark:bg-black dark:text-white">
                  Job Post Type
                </div>
                <div className="dark:bg-black dark:text-white">
                  {job.jobPostType}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 space-x-4">
          <button
            onClick={() => {
              loadPdf(job.jd, job.jobId);
            }}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium dark:bg-black dark:text-white text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:hover:text-black"
          >
            <FileText className="h-4 w-4 mr-2" />
            View JD Document
          </button>
          {!isClient && (
            <button
              onClick={() => setIsJdopen(true)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium dark:bg-black dark:text-white text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:hover:text-black"
            >
              <FileText className="h-4 w-4 mr-2" />
              View Job Description
            </button>
          )}

          {isJdopen && !isClient && (
            <Popup onClose={() => setIsJdopen(false)} styleMod="-left-3.5">
              <div className="mt-20 mr-4">
                <JobDescription currentJob={job} />
              </div>
            </Popup>
          )}
        </div>
        <div className="flex items-center gap-2 justify-end">
          <div className="flex justify-end">
            <button
              className="bg-blue-500 text-white px-4 py-1 rounded-md border-2 border-blue-500 hover:bg-white hover:text-blue-500 hover:shadow-lg transition duration-200 box-border flex items-center gap-2"
              onClick={() => setIsJobUpdated(true)}
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
              Update Job
            </button>
          </div>
          {isClient && (
            <div className="flex justify-end">
              <button
                className="bg-blue-500 text-white px-4 py-1 rounded-md border-2 border-blue-500 hover:bg-white hover:text-blue-500 hover:shadow-lg transition duration-200 box-border flex items-center gap-4"
                onClick={() => setJdUpdated(true)}
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
                Update JD
              </button>
            </div>
          )}
        </div>

        {isJdUpdated && (
          <Popup onClose={() => setJdUpdated(false)}>
            <JobDescriptionUploader jobId={Number(router.query.id)} />
          </Popup>
        )}

        {isJobUpdated && (
          <Popup onClose={() => setIsJobUpdated(false)}>
            <JobInfoUpdateForm
              currentJob={job}
              id={job.jobId}
              autoClose={() => {
                setIsJobUpdated(false);
                if (onUpdate) {
                  onUpdate();
                }
              }}
            />
          </Popup>
        )}
      </div>

      {/* JD Modal */}
      <div className="grid md:grid-cols-2 gap-8 grid-cols-1 p-4">
        {pdfUrl && showJdModal && pdfUrl !== "" && (
          <Popup onClose={() => setShowJdModal(false)}>
            <iframe
              src={pdfUrl}
              width="100%"
              height="100%"
              style={{
                border: "none",
                backgroundColor: "white",
                overflow: "auto",
                padding: "20px",
                marginTop: "60px",
              }}
              title="jd"
            />
          </Popup>
        )}
        {!pdfUrl && showJdModal && (
          <Popup onClose={() => setShowJdModal(false)}>
            <div className="mt-20">
              <JobDescriptionUploader
                autoClose={() => setShowJdModal(false)}
                jobId={job.jobId}
              />
            </div>
          </Popup>
        )}
      </div>
    </div>
  );
}
