import * as Yup from "yup"
export type recruitmentCandidate = {
  id: number;
  date: string;
  recruiterName: string;
  portal: string;
  candidateName: string;
  role: string;
  primarySkill: string;
  secondarySkill: string | null;
  contactNumber: string;
  emailID: string;
  totalExperience: number;
  relevantExperience: number;
  currentCTC: number;
  expectedCTC: number;
  noticePeriod: number;
  currentLocation: string;
  preferredLocation: string | null;
  qualification: string | null;
  communicationSkillsRating: number;
  technicalSkillsRating: number;
  remarks: string;
  resumeLink: string | null;
  sourcingStatus: string | null;
  preferredRoles: string[];
};
// Define the user type based on the provided JSON structure
export type RecruitmentSearch = {
  role: string;
  skills: string[];
  currentLocation: string;
  preferredLocations: string[];
  totalExperience: number;
  relevantExperience: number;
  communicationSkillsRating: number;
  technicalSkillsRating: number;
  noticePeriod: number;
  currentCTC: number;
  expectedCTC: number;
};

// Define the search form values type
export type recruitmentSearchFormValues = {
  role: string;
  skills: string[];
  currentLocation: string;
  preferredLocations: string[];
  totalExperience: number;
  relevantExperience: number;
  communicationSkillsRating: number;
  technicalSkillsRating: number;
  noticePeriod: number;
  currentCTC: number;
  expectedCTC: number;
};

export const recruitmentSearchSchema = Yup.object().shape({
  role: Yup.string().required("Role is required"),
  skills: Yup.array().required("At least one skill is required"),
  currentLocation: Yup.string().required("Current location is required"),
  preferredLocations: Yup.array().required("At least one preferred location is required"),
  totalExperience: Yup.number().required("Total experience is required"),
  relevantExperience: Yup.number().required("Relevant experience is required"),
  communicationSkillsRating: Yup.number().required("Communication skills rating is required"),
  technicalSkillsRating: Yup.number().required("Technical skills rating is required"),
  noticePeriod: Yup.number().required("Notice period is required"),
  currentCTC: Yup.number().required("Current CTC is required"),
  expectedCTC: Yup.number().required("Expected CTC is required"),
});