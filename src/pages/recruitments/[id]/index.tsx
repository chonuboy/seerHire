import RecruitmentCandidateCard from "@/components/Elements/cards/recruitmentCandidate";
import { useEffect, useRef, useState } from "react";
import {
  fetchRecruitmentData,
  fetchRecruitmentResume,
  uploadRecruitmentResume,
} from "@/api/recruitment/recruitmentData";
import { useRouter } from "next/router";
import { Popup } from "@/components/Elements/cards/popup";
import { toast } from "react-toastify";
import ContentHeader from "@/components/Layouts/content-header";
import MainLayout from "@/components/Layouts/layout";
import mammoth from "mammoth";

export default function Home() {
  const [currentCandidate, setCurrentCandidate] = useState<any>(null);
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [file, setFile] = useState<File | undefined>(undefined);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [updatedFileName, setUpdatedFileName] = useState<string | undefined>(
    undefined
  );
  const [isResumeuploaded, setIsResumeUploaded] = useState(false);
  const [pdfUrl, setPdfUrl] = useState("");
  const [pdfData, setPdfData] = useState<any>(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isCandidateUpdated, setIsCandiateUpdated] = useState(false);

  useEffect(() => {
    if (router.isReady) {
      fetchRecruitmentData(Number(router.query.id)).then((data) => {
        setCurrentCandidate(data);
        console.log(data);
      });
    }
  }, [router.isReady]);

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
      uploadRecruitmentResume(Number(router.query.id), formData).then(
        (data) => {
          console.log(data);
        }
      );
      toast.dismiss();
    } catch (err) {
      toast.dismiss();
    }
  };


  const loadPdf = async (resume: any, candidateId: any) => {
    let objectUrl: string | null = null;
    let pdfData: any;
    setIsResumeOpen(true);
    try {
      pdfData = await fetchRecruitmentResume(candidateId)
        .then((response) => response)
        .catch((error) => console.error(error));

      if (resume.includes("pdf")) {
        const blob = new Blob([pdfData], { type: "application/pdf" });

        // Create a URL for the Blob
        objectUrl = URL.createObjectURL(blob);
        setPdfUrl(objectUrl);
        setError(null);
      } else if (resume.includes("docx")) {
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

  // Sample candidate data based on the provided JSON
  // const candidateData = {
  //   id: 1,
  //   date: "2023-03-09",
  //   recruiterName: "Dimple",
  //   portal: "Linkedin",
  //   candidateName: "Chetan Sawle",
  //   role: "UI /UX Designer",
  //   primarySkill: "Java, Hibernate, SQL",
  //   secondarySkill: "",
  //   contactNumber: "8626054838",
  //   emailID: "sawlechetan7@gmail.com",
  //   totalExperience: 4,
  //   relevantExperience: 0,
  //   currentCTC: 6,
  //   expectedCTC: 11,
  //   noticePeriod: 60,
  //   currentLocation: "Pune",
  //   preferredLocation: null,
  //   qualification: null,
  //   communicationSkillsRating: 0,
  //   technicalSkillsRating: 0,
  //   remarks: "Tool specifc /technical (how many exp, 1-10)",
  //   resumeLink: null,
  //   sourcingStatus: null,
  //   preferredRoles: [],
  // };

  return (
    <MainLayout>
      <ContentHeader title="Candidate Profile"></ContentHeader>
      <main className="min-h-screen">
        <div className="">
          {isResumeOpen && pdfUrl !== "" && (
            <Popup onClose={() => setIsResumeOpen(false)}>
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
                title="Candidate Resume"
              />
            </Popup>
          )}
          <div className="flex gap-4 justify-end pr-20">
            {((currentCandidate?.resumeLink &&
              currentCandidate?.resumeLink.includes("pdf")) ||
              (currentCandidate?.resumeLink &&
                currentCandidate?.resumeLink.includes("docx"))) && (
              <button
                onClick={() => {
                  loadPdf(
                    currentCandidate?.resumeLink,
                    Number(router.query.id)
                  );
                }}
                className="bg-blue-500 text-white px-4 py-1 rounded-md border-2 border-blue-500 hover:bg-white hover:text-blue-500 hover:shadow-lg transition duration-200 box-border"
              >
                View Resume
              </button>
            )}

            <button
              onClick={() => setIsResumeUploaded(true)}
              className="bg-blue-500 text-white px-4 py-1 rounded-md border-2 border-blue-500 hover:bg-white hover:text-blue-500 hover:shadow-lg transition duration-200 box-border"
            >
              Upload Resume
            </button>
          </div>

          <RecruitmentCandidateCard
            candidate={currentCandidate ? currentCandidate :[]}
          />
        </div>
        {isResumeuploaded && (
          <Popup onClose={() => setIsResumeUploaded(false)}>
            <div className="text-sm md:text-base mt-28">
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
                  {file && <p className="mt-4 text-green-500">File Selected</p>}
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
          </Popup>
        )}
      </main>
    </MainLayout>
  );
}
