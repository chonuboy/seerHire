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
import JobInfoUpdateForm from "@/components/Forms/updateJobInfo";
import { Popup } from "./popup";

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
  autoClose,
}: {
  job: JobData;
  autoClose: () => void;
}) {
  
  const [showJdModal, setShowJdModal] = useState(false);
  const [isJobUpdated, setIsJobUpdated] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  useEffect(() => {
    let objectUrl: string | null = null;
    const blob = new Blob([job.jd], { type: "application/pdf" });
    objectUrl = URL.createObjectURL(blob);
    setPdfUrl(objectUrl);
    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, []);

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
    }[job.isJobActive] || "bg-gray-100 text-gray-800";

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {job.jobTitle || "Untitled Position"}
            </h2>
            <div className="flex items-center mt-1 text-gray-600">
              <Tag className="h-4 w-4 mr-1" />
              <span className="text-sm mr-3">{job.jobCode}</span>
              <span className={`text-xs px-2 py-1 rounded-full ${statusColor}`}>
                {job.isJobActive}
              </span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold text-gray-800 flex items-center">
              <DollarSign className="h-5 w-5 mr-1 text-gray-600" />
              {job.salaryInCtc} LPA
            </div>
            <span className="text-sm text-gray-500">CTC</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div className="flex items-center text-gray-700">
            <Briefcase className="h-5 w-5 mr-2 text-gray-500" />
            <div>
              <div className="text-sm font-medium">Experience Required</div>
              <div>
                {job.experience} {job.experience === 1 ? "Year" : "Years"}
              </div>
            </div>
          </div>

          <div className="flex items-center text-gray-700">
            <User className="h-5 w-5 mr-2 text-gray-500" />
            <div>
              <div className="text-sm font-medium">Posted By</div>
              <div>{job.insertedBy}</div>
            </div>
          </div>

          <div className="flex items-center text-gray-700">
            <Calendar className="h-5 w-5 mr-2 text-gray-500" />
            <div>
              <div className="text-sm font-medium">Created On</div>
              <div>{formatDate(job.createdOn)}</div>
            </div>
          </div>

          <div className="flex items-center text-gray-700">
            <Clock className="h-5 w-5 mr-2 text-gray-500" />
            <div>
              <div className="text-sm font-medium">Job Post Type</div>
              <div>{job.jobPostType}</div>
            </div>
          </div>
        </div>

        {job.jd && (
          <div className="mt-6">
            <button
              onClick={() => setShowJdModal(true)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <FileText className="h-4 w-4 mr-2" />
              View Job Description
            </button>
          </div>
        )}
        <div className="flex justify-end">
          <button
            className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 mt-4"
            onClick={() => setIsJobUpdated(true)}
          >
            Update
          </button>
        </div>
        {isJobUpdated && (
          <Popup onClose={() => setIsJobUpdated(false)}>
            <JobInfoUpdateForm
              currentJob={job}
              id={job.jobId}
              autoClose={() => {
                setIsJobUpdated(false);
                autoClose();
              }}
            />
          </Popup>
        )}
      </div>

      {/* JD Modal */}
      {showJdModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full h-full overflow-auto">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-medium">Job Description</h3>
              <button
                onClick={() => setShowJdModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            {pdfUrl!==null && (
              <iframe
                src={pdfUrl}
                width="100%"
                height="100%"
                style={{ border: "none" }}
                title="Candidate Resume"
              />
            )}

            <div className="p-4 border-t border-gray-200 flex justify-end">
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
