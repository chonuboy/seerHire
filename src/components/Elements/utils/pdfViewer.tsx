import { useState, useEffect, useRef } from "react";
import {
  fetchCandidateResume,
  uploadCandidateResume,
} from "@/api/candidates/candidates";
import { toast } from "react-toastify";
import { fetchJobDescription } from "@/api/client/clientJob";
import mammoth from "mammoth";
import { Popup } from "../cards/popup";
const PdfViewer = ({
  isEdit,
  candidateId,
  autoClose,
  isJd,
  resume,
}: {
  candidateId: number;
  isEdit?: boolean;
  autoClose?: () => void;
  isJd?: boolean;
  resume: string;
}) => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [pdfData, setPdfData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [file, setFile] = useState<File | undefined>(undefined);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [updatedFileName, setUpdatedFileName] = useState<string | undefined>(
    undefined
  );
  const [isResumeuploaded, setIsResumeUploaded] = useState(false);

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
      uploadCandidateResume(formData, candidateId)
        .then((data) => {
          console.log(data);
          setTimeout(() => {
            setIsResumeUploaded(false);
          }, 2000);
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

  useEffect(() => {
    let objectUrl: string | null = null;

    const loadPdf = async () => {
      let pdfData: any;
      try {
        if (!isJd) {
          pdfData = await fetchCandidateResume(candidateId)
            .then((response) => response)
            .catch((error) => console.error(error));
        } else {
          pdfData = await fetchJobDescription(candidateId)
            .then((response) => response)
            .catch((error) => console.error(error));
        }

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

    loadPdf();

    // Clean up the object URL when component unmounts
    // return () => {
    //   if (objectUrl) {
    //     URL.revokeObjectURL(objectUrl);
    //   }
    // };
  }, [candidateId, setUpdatedFileName, isResumeuploaded]);

  if (error || !pdfUrl) {
    return (
      <div>
        <button
          className="bg-blue-500 text-white px-4 py-1 rounded-md border-2 border-blue-500 hover:bg-white hover:text-blue-500 hover:shadow-lg transition duration-200 box-border"
          onClick={() => {
            setIsResumeUploaded(true);
          }}
        >
          Add Document
        </button>
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
      </div>
    );
  }

  return (
    <div className="h-screen m-auto w-full sm:w-9/12  text-xs md:text-base dark:bg-white p-2">
      {!isJd && isEdit && (
        <div className="flex justify-end gap-4 my-4">
          <button
            className="bg-blue-500 text-white px-4 py-1 rounded-md border-2 border-blue-500 hover:bg-white hover:text-blue-500 hover:shadow-lg transition duration-200 box-border flex items-center gap-2"
            onClick={() => {
              setIsResumeUploaded(true);
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
          {!resume.includes("pdf") && (
            <button
              className="bg-blue-500 text-white px-4 py-1 rounded-md border-2 border-blue-500 hover:bg-white hover:text-blue-500 hover:shadow-lg transition duration-200 box-border"
              onClick={() => {
                // Use the original pdfData (ArrayBuffer/Uint8Array) not the pdfUrl
                const blob = new Blob([pdfData], {
                  type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "resume.docx"; // or use a dynamic filename
                document.body.appendChild(a); // Required for Firefox
                a.click();
                document.body.removeChild(a); // Clean up
                setTimeout(() => URL.revokeObjectURL(url), 100); // Revoke after download
              }}
            >
              Download
            </button>
          )}
        </div>
      )}

      {!isJd && isResumeuploaded && (
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
                {file && <p className="mt-4 text-green-500">{file.name}</p>}
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

      <iframe
        src={pdfUrl}
        width="100%"
        height="93%"
        style={{
          border: "none",
          overflow: "hidden",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
        title="Candidate Resume"
      />
    </div>
  );
};

export default PdfViewer;
