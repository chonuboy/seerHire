import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Interviews } from "@/lib/models/candidate";
import { createInterviewRound } from "@/api/interviews/InterviewRounds";
import { toast } from "react-toastify";

export default function AddRound({
  className,
  interviewInfo,
  onclose,
}: {
  className?: string;
  interviewInfo?: Interviews;
  onclose?: () => void;
}) {
  const [roundNumber, setRoundNumber] = useState<number | null>(null);
  const [roundDate, setInterviewDate] = useState("");
  const [interviewerName, setInterviewerName] = useState("");
  const [interviewStatus, setInterviewStatus] = useState("Scheduled");
  const [remarks, setRemarks] = useState("");
  const [technologies, setTechnologies] = useState<string[]>([]);
  const [newTechnology, setNewTechnology] = useState("");
  const [techRating, setTechRating] = useState<number | undefined>(undefined);
  const [softskillsRating, setSoftSkillsRating] = useState<number | undefined>(
    undefined
  );

  const handleAddRound = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(interviewInfo);

    const roundData: any = {
      roundNumber,
      roundDate,
      interviewerName,
      technologyInterviewed: technologies.join(", "),
      interviewStatus,
      techRating,
      softskillsRating,
      remarks,
      interview: interviewInfo?.interview,
    };

    try {
      const response = await createInterviewRound(roundData).then((data)=>console.log(data));
      // if (response) {
      //   toast.success("Round added successfully", {
      //     position: "top-center",
      //     autoClose: 5000,
      //   });
      // }
      if (onclose) {
        onclose();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const addTechnology = () => {
    if (newTechnology && !technologies.includes(newTechnology)) {
      setTechnologies([...technologies, newTechnology]);
      setNewTechnology("");
    }
  };

  const removeTechnology = (tech: string) => {
    setTechnologies(technologies.filter((t) => t !== tech));
  };

  return (
    <div className={`${className}`}>
      <div className="w-full max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-semibold mb-6">Add New Round</h1>

        <form className="space-y-6" onSubmit={handleAddRound}>
          <div className="space-y-2">
            <label
              htmlFor="interview-date"
              className="block text-sm font-medium"
            >
              Interview Date
            </label>
            <input
              type="date"
              id="interview-date"
              value={roundDate}
              onChange={(e) => setInterviewDate(e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="interview-date"
              className="block text-sm font-medium"
            >
              Round Number
            </label>
            <input
              type="number"
              id="round-number"
              value={roundNumber}
              onChange={(e) => setRoundNumber(Number(e.target.value))}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="interviewer-name"
              className="block text-sm font-medium"
            >
              Interviewer Name
            </label>
            <input
              type="text"
              id="interviewer-name"
              value={interviewerName}
              onChange={(e) => setInterviewerName(e.target.value)}
              placeholder="Enter Interviewer Name"
              className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-2">
            <span className="block text-sm font-medium">Interview Status</span>
            <div className="flex gap-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="status"
                  value="Passed"
                  onChange={(e) => setInterviewStatus(e.target.value)}
                  className="form-radio text-blue-600"
                />
                <span className="ml-2">Passed</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="status"
                  value="Rejected"
                  onChange={(e) => setInterviewStatus(e.target.value)}
                  className="form-radio text-blue-600"
                />
                <span className="ml-2">Rejected</span>
              </label>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="remarks" className="block text-sm font-medium">
              Remarks
            </label>
            <textarea
              id="remarks"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="Enter Remarks"
              className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
            />
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="tech-rating"
                className="block text-sm font-medium"
              >
                Tech Rating
              </label>
              <input
                type="number"
                id="tech-rating"
                value={techRating}
                onChange={(e) => setTechRating(parseInt(e.target.value, 10))}
                placeholder="Enter Rating from 1 to 10"
                min="1"
                max="10"
                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="soft-skill-rating"
                className="block text-sm font-medium"
              >
                Soft Skill Rating
              </label>
              <input
                type="number"
                id="soft-skill-rating"
                value={softskillsRating}
                onChange={(e) =>
                  setSoftSkillsRating(parseInt(e.target.value, 10))
                }
                placeholder="Enter Rating from 1 to 10"
                min="1"
                max="10"
                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-medium">
                Technologies Interviewed
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter Single or Multiple Technologies"
                  className="flex-grow px-3 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newTechnology}
                  onChange={(e) => setNewTechnology(e.target.value)}
                />
                <button
                  type="button"
                  className="px-4 py-1 bg-blue-600 text-white rounded-md hover:bg-gray-300 hover:text-black focus:outline-none focus:ring-2 focus:ring-gray-500"
                  onClick={addTechnology}
                >
                  Add
                </button>
              </div>

              {technologies.length > 0 && (
                <div className="space-y-2">
                  <span className="block text-sm font-medium">
                    Technologies Added
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {technologies.map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex items-center bg-gray-200 text-gray-700 rounded-full px-3 py-1 text-sm"
                      >
                        {tech}
                        <button
                          type="button"
                          onClick={() => removeTechnology(tech)}
                          className="ml-2 hover:bg-gray-300 rounded-full p-0.5"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Add Round
          </button>
          <button className="w-full py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" onClick = {
            () => {
              if(onclose){
                onclose();
              }
            }
          }>Cancel</button>
        </form>
      </div>
    </div>
  );
}
