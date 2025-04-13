import RecruitmentCandidateCard from "@/components/Elements/cards/recruitmentCandidate"
import { useEffect, useState } from "react"
import { fetchRecruitmentData } from "@/api/recruitment/recruitmentData"
import { useRouter } from "next/router"

export default function Home() {

  const [currentCandidate,setCurrentCandidate] = useState(null);
  const router = useRouter();

  useEffect(() => {
      fetchRecruitmentData(Number(router.query.id)).then((data) => {
        setCurrentCandidate(data);
        console.log(data);
      })
  },[]);

  // Sample candidate data based on the provided JSON
  const candidateData = {
    id: 1,
    date: "2023-03-09",
    recruiterName: "Dimple",
    portal: "Linkedin",
    candidateName: "Chetan Sawle",
    role: "UI /UX Designer",
    primarySkill: "Java, Hibernate, SQL",
    secondarySkill: "",
    contactNumber: "8626054838",
    emailID: "sawlechetan7@gmail.com",
    totalExperience: 4,
    relevantExperience: 0,
    currentCTC: 6,
    expectedCTC: 11,
    noticePeriod: 60,
    currentLocation: "Pune",
    preferredLocation: null,
    qualification: null,
    communicationSkillsRating: 0,
    technicalSkillsRating: 0,
    remarks: "Tool specifc /technical (how many exp, 1-10)",
    resumeLink: null,
    sourcingStatus: null,
    preferredRoles: [],
  }

  return (
    <main className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Candidate Profile</h1>

        <RecruitmentCandidateCard candidate={currentCandidate ? currentCandidate : candidateData} />
        </div>
    </main>
  )
}

