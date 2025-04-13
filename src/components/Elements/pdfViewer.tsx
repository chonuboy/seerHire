import { useState, useEffect } from 'react';
import { fetchCandidateResume } from '@/api/candidates/candidates';

const PdfViewer = ({ candidateId }: { candidateId: number }) => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let objectUrl: string | null = null;

    const loadPdf = async () => {
      try {
        const pdfData = await fetchCandidateResume(candidateId).then((response) => response).catch((error) => console.error(error));
        
        // Create a Blob from the PDF data
        const blob = new Blob([pdfData], { type: 'application/pdf' });
        
        // Create a URL for the Blob
        objectUrl = URL.createObjectURL(blob);
        setPdfUrl(objectUrl);
        setError(null);
      } catch (err) {
        console.error('Failed to load PDF:', err);
        setError('Failed to load resume. Please try again.');
      }
    };

    loadPdf();

    // Clean up the object URL when component unmounts
    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [candidateId]);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!pdfUrl) {
    return <div>Loading resume...</div>;
  }

  return (
    <div className="h-screen w-full">
      <iframe 
        src={pdfUrl} 
        width="100%"
        height="100%"
        style={{ border: 'none' }}
        title="Candidate Resume"
      />
    </div>
  );
};

export default PdfViewer;