import { useState, useEffect } from "react";
import { Candidate } from "@/lib/definitions";
import { fetchCandidateResume } from "@/api/candidates/candidates";
import { CandidateCard } from "./candidateCard";
import Link from "next/link";
import { useRouter } from "next/router";
import mammoth from "mammoth";
import { Popup } from "./popup";
import { is } from "tinymce";

export const ResultCard = ({
  candidateData,
}: {
  candidateData?: Candidate[];
}) => {
  const [currentCandidate, setCurrentCandidate] = useState<Candidate[] | null>(
    null
  );

  const [technologies, setTechnologies] = useState<any[]>([]);
  const [pdfUrl, setPdfUrl] = useState("");
  const [pdfData, setPdfData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (candidateData) setCurrentCandidate(candidateData);
  });

  const loadPdf = async (resume: any, candidateId: any) => {
    let objectUrl: string | null = null;
    let pdfData: any;
    setIsResumeOpen(true);
    try {
      fetchCandidateResume(candidateId).then((data)=>{
        console.log(data);
      })
      pdfData = await fetchCandidateResume(candidateId)
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

  return (
    <div className="grid md:grid-cols-2 gap-8 grid-cols-1 p-4">
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
      {currentCandidate ? (
        currentCandidate?.map((candidate, index) => (
          <div className="space-y-4">
            <CandidateCard candidateData={candidate}>
              <div className="space-y-4 mt-8">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <h3 className="font-semibold">Action</h3>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => {
                        loadPdf(candidate.resume, candidate.contactId);
                      }}
                      className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-700"
                    >
                      View Resume
                    </button>
                    <Link href={`/candidates/${candidate.contactId}`}>
                      <button className="px-2 py-1 bg-gray-500 text-white rounded hover:bg-gray-700">
                        View Profile
                      </button>
                    </Link>
                    <button
                      className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-700"
                      onClick={() => {
                        router.push("/interviews");
                        localStorage.setItem(
                          "interviewCandidateId",
                          JSON.stringify(candidate.contactId)
                        );
                      }}
                    >
                      Assign Interview
                    </button>
                  </div>
                </div>
              </div>
            </CandidateCard>
          </div>
        ))
      ) : (
        <p className="p-4">No Relevant candidates Found</p>
      )}
    </div>
  );
};
