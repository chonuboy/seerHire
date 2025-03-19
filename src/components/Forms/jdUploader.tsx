import React, { useState } from "react";
import { uploadJobDescription } from "@/api/client/clientJob";
import { useRouter } from "next/router";

export default function JobDescriptionUploader({ jobId }: { jobId: number }) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!file) {
      setError("Please select a file to upload.");
      return;
    }

    setUploading(true);
    setError(null);
    setResponse(null);

    try {
      uploadJobDescription(jobId, file).then((res) => {
        console.log(res);
        setResponse(res);
        setUploading(false);
        setFile(null);
      });
    } catch (err: any) {
      setError(err.message || "An error occurred during upload.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      {/* File Upload Section */}
      <div className="mb-4 flex justify-center">
        <div className="flex flex-col items-center gap-4">
          <label className="block text-sm font-medium text-gray-700">
            Choose a file (PDF, DOC, DOCX)
          </label>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="py-2 px-2 border rounded-lg focus:outline-[var(--theme-background)]"
          />
        </div>
      </div>

      {/* Upload Button */}
      <button
        onClick={handleSubmit}
        disabled={uploading || !file}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed"
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>

      {/* Response and Error Messages */}
      {response && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-md text-green-700">
          <p className="font-medium">Upload Successful!</p>
          <pre className="mt-2 text-sm">
            {JSON.stringify(response, null, 2)}
          </pre>
        </div>
      )}

      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md text-red-700">
          <p className="font-medium">Error:</p>
          <p className="mt-2 text-sm">{error}</p>
        </div>
      )}
    </div>
  );
}
