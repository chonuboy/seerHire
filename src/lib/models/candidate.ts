import * as yup from "yup";
import { Candidate, Columns } from "@/lib/definitions";
import { Client } from "./client";
import { Location } from "@/lib/definitions";
import {
  CandidateStatus,
  Gender,
  HiringType,
  MaritalStatus,
  DifferentlyAbled,
  PreferredJobType,
} from "../constants";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

// export const CandidateModel: Candidate = {
// 	firstName: '',
// 	lastName: '',
// 	dob: '',
// 	primaryNumber: '',
// 	secondaryNumber: '',
// 	emailId: '',
// 	designation: '',
// 	companyName: '',
// 	totalExperience: 0,
// 	candidateStatus: '',
// 	isActive: false,
// 	currentSalary: 0,
// 	highestEducation: '',
// 	gender: '',
// 	hiringType: '',
// 	pinCode: 0,
// 	maritalStatus: '',
// 	techRole: '',
// 	noticePeriod: 0,
// 	currentLocation: { locationId: 0 },
// 	differentlyAbled: false,
// 	isDifferentlyAbled: ',
// 	address: '',
// 	addressLocality: '',
// 	differentlyAbledType: '',
// 	preferredJobType: '',
// }

export const CandidateModel: Candidate = {
  id: 1,
  firstName: "Nantha",
  lastName: "Kumar",
  dob: "2000-12-19",
  primaryNumber: "9629978640",
  secondaryNumber: "8925173395",
  emailId: "nantha@gmail.com",
  designation: "full stack",
  companyName: "SeerTech",
  totalExperience: 1,
  isActive: true,
  candidateStatus: CandidateStatus.ACTIVE,
  currentSalary: 120000,
  highestEducation: "masters",
  gender: Gender.FEMALE,
  hiringType: HiringType.FULL,
  pinCode: 20987,
  maritalStatus: MaritalStatus.MARRIED,
  techRole: "software developer",
  noticePeriod: 15,
  currentLocation: { locationId: 1, locationDetails: "", insertedOn: "" },
  differentlyAbled: false,
  isDifferentlyAbled: DifferentlyAbled.NO,
  address: "Chennai",
  addressLocality: "North Street",
  differentlyAbledType: "",
  preferredJobType: PreferredJobType.REMOTE,
};

export const CandidateSchema = yup.object({
  firstName: yup
    .string()
    .min(3, "Must be at least 3 characters")
    .max(15, "Must be 15 characters or less")
    .required("First name is required"),
  lastName: yup
    .string()
    .min(3, "Must be at least 3 characters")
    .max(20, "Must be 20 characters or less")
    .required("Last name is required"),
  dob: yup
    .date()
    .required("Date of birth is required")
    .test("isPastDate", "Date of birth must be in the past", function (value) {
      const today = new Date();
      return new Date(value) < today;
    }),
  primaryNumber: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Mobile no. is required"),
  secondaryNumber: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Alternate mobile no. is required"),
  emailId: yup
    .string()
    .matches(
      /^[a-zA-Z0-9][-a-zA-Z0-9._]+@([-a-zA-Z0-9]+\.)+.[a-zA-Z]{2,4}$/i,
      "Invalid email format"
    )
    .email("Invalid email address")
    .required("Email address is required"),
  designation: yup
    .string()
    .min(3, "Must be at least 3 characters")
    .max(20, "Must be 50 characters or less")
    .required("Designation is required"),
  companyName: yup.string(),
  totalExperience: yup.number().required("Experience is required"),
  candidateStatus: yup.string().required("Select status"),
  currentSalary: yup.number().required("Current salary is required"),
  highestEducation: yup
    .string()
    .min(3, "Must be at least 3 characters")
    .max(30, "Must be 50 characters or less")
    .required("Highest education is required"),
  gender: yup.string().required("Select gender"),
  hiringType: yup.string(),
  pinCode: yup.number(),
  maritalStatus: yup.string().required("Select marital status"),
  techRole: yup
    .string()
    .min(3, "Must be at least 3 characters")
    .required("Tech role is required"),
  noticePeriod: yup.number().required("Notice period is required"),
  currentLocation: yup.object().required("Current location is required"),
  isDifferentlyAbled: yup.string().required("Select your preference"),
  address: yup.string(),
  addressLocality: yup.string(),
  differentlyAbledType: yup.string(),
  preferredJobType: yup.string().required("Select preferred job type"),
});




export const candidateSearchSchema = yup.object().shape({
  techRole: yup.string().nullable(),
  minExperience: yup.number().nullable(),
  maxExperience: yup.number().nullable(),
  currentLocation: yup.string().nullable(),
  minSalary: yup.number().nullable(),
  maxSalary: yup.number().nullable(),
  noticePeriod: yup.number().nullable(),
  preferredJobType: yup.string().nullable(),
  highestEducation: yup.string().nullable(),
  preferredLocation: yup.array().nullable(),
  domain: yup.array().nullable(),
  mustHaveTechnologies: yup.array().nullable(),
  goodToHaveTechnologies: yup.array().nullable()
    .of(yup.string()).nullable(),
  companies: yup.array().nullable()
    .of(yup.string()).nullable(),
});



export interface Resume {
  doc?: string;
}

export const candidateTableColumns: Columns = [
  {
    Header: "Name",
    accessor: "fullName",
  },
  {
    Header: "Tech Role",
    accessor: "techRole",
  },
  {
    Header: "Primary Number",
    accessor: "primaryNumber",
    hiddenOnSmall: true,
  },
  {
    Header: "Email Id",
    accessor: "emailId",
    hiddenOnSmall: true,
  },
  {
    Header: "Status",
    accessor: "isActive",
  },
];

//   Contact Details for Profile Page Demo Data

export interface Certificates {
  id?: number;
  certificationName: string;
}

export interface Interview {
  interviewId: number;
  interviewDate: string;
  interviewStatus: string;
  clientJob?:Client|null
  contactDetails?:Candidate|null;
};


export interface Round {
  roundId?: number;
  roundNumber: number;
  roundName?: string;
  roundDate: string;
  interviewerName: string;
  technologyInterviewed?: string | string[];
  techRating?: number;
  softskillsRating?: number;
  interviewStatus: string;
  remarks: string;
  interview:Interview|null;
  contactDetails?:Candidate;
  clientJob?:Client;
}


export interface Interviews {
  interview:Interview,
  contactDetails?:Candidate|null,
}

export interface Technology{
  techId?:number,
  technology:string,
  inserteOn?:string,
}

export interface allTechs{
  contactTechId?:number,
  experience?:string,
  expertiseLevel?:string,
  contactDetails?:Candidate|null,
  technology:Technology
}

export interface domainDetails{
  domainId?:number,
  domainDetails:string,
  insertedOn?:string
}

export interface Domains{
  contactDomainId:number,
  contactDetails:Candidate|null,
  domain:domainDetails
}

export interface SearchQueries {
  techRole: string|null;
  minExperience: number|null;
  maxExperience: number|null;
  currentLocation: string|null;
  minSalary: number|null;
  maxSalary: number|null;
  noticePeriod: number|null;
  preferredJobType: string|null;
  highestEducation: string|null;
  preferredLocation: string[]|null;
  domain: string[]|null;
  mustHaveTechnologies: string[] |null;
  goodToHaveTechnologies: string[] |null;
  companies: string[]|null;
}


export interface ReqData {
  contactId?: number;
  firstName?:string |null;
  lastName?: string |null;
  dob?: string |null;
  address1?: string |null;
  secondaryNumber?: string |null;
  designation?: string |null;
  totalExperience?: number|null;
  image?: string |null;
  isActive?: boolean|null;
  highestEducation?: string |null;
  primaryNumber?: string |null;
  emailId?: string |null;
  hiringType?: string |null;
  pincode?: number|null;
  techRole?: string |null;
  currentSalary?: number|null;
  preferredJobType?: string |null;
  gender?: string |null;
  noticePeriod?: number|null;
  maritalStatus?: string |null;
  currentLocation?:Location|null;
  differentlyAbled?: boolean|null;
  differentlyAbledType?: string |null;
  linkedin?: string |null;
  addressLocality?: string |null;
}

export const profileUpdateSchema = yup.object().shape({
  firstName: yup.string().min(3, "Must be at least 3 characters").nullable(),
  lastName: yup.string().min(3, "Must be at least 3 characters").nullable(),
  isActive: yup.boolean().nullable(),
  designation: yup.string().min(3, "Must be at least 3 characters").nullable(), 
  totalExperience: yup
    .number()
    .typeError('Total Experience must be a number') // Ensure it's a number
    .positive('Total Experience must be a positive number') // Must be positive
    .nullable(), 
  highestEducation: yup.string().min(3, "Must be at least 3 characters").nullable(), 
  primaryNumber: yup
    .string()
    .matches(/^\+?[0-9]{10,15}$/, 'Mobile Number is invalid') // Validate phone number format
    .nullable(), 
  emailId: yup
    .string()
    .email('Email is invalid') // Validate email format
    .nullable(), 
  currentSalary: yup
    .number()
    .typeError('Current Salary must be a number') // Ensure it's a number
    .positive('Current Salary must be a positive number') // Must be positive
    .nullable(), 
  preferredJobType: yup
    .string()
    .nullable(), 
  gender: yup
    .string()
    .nullable(), 
  noticePeriod: yup
    .number()
    .typeError('Notice Period must be a number') // Ensure it's a number
    .positive('Notice Period must be a positive number') // Must be positive
    .nullable(), 
  maritalStatus: yup
    .string()
    .nullable(),
  address1: yup.string().nullable(), 
  addressLocality: yup.string().nullable(), 
  differentlyAbledType: yup.string().nullable(), 
});


export const interviewFormSchema = yup.object().shape({
  roundDate: yup
    .date()
    .nullable()
    .typeError('Interview Date must be a valid date'), // Validate date format
  interviewerName: yup
    .string()
    .min(3, 'Interviewer Name must be at least 3 characters')
    .nullable(),
  status: yup
    .string()
    .oneOf(['passed', 'rejected'], 'Status must be either "passed" or "rejected"') // Validate status
    .nullable(),
  remarks: yup
    .string()
    .nullable(),
  techRating: yup
    .number()
    .typeError('Tech Rating must be a number') // Ensure it's a number
    .min(1, 'Tech Rating must be at least 1') // Minimum value
    .max(10, 'Tech Rating cannot exceed 10') // Maximum value
    .nullable(),
  softskillsRating: yup
    .number()
    .typeError('Soft Skills Rating must be a number') // Ensure it's a number
    .min(1, 'Soft Skills Rating must be at least 1') // Minimum value
    .max(10, 'Soft Skills Rating cannot exceed 10') // Maximum value
    .nullable(),
  technologies: yup
    .array()
    .of(yup.string().min(1, 'Technology must be at least 1 character')) // Validate each technology
    .nullable(),
});