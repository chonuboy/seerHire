import { Candidate, Columns } from "../definitions";
import * as yup from "yup";
import { Location as location } from "../definitions";

export interface Client {
  jobId: number;
  jobCode: string;
  jd: string;
  jobDescription: string;
  salaryInCtc: number;
  experience: number;
  jobTitle: string;
  createdOn: string;
  isJobActive: string;
  jobPostType: string;
  postCreatedOn: Date;
  insertedBy: string;
  client: {
    clientId: number;
    clientName: string;
    clientHo: string;
    financePocName: string;
    financeEmail: string;
    financeNumber: string;
    insertedOn: string;
    gstnumber: string;
    cinnumber: string;
    pannumber: string;
  };
  clientJob?: any;
}

export interface ClientInfo {
  clientId?: number;
  clientName: string;
  clientHeadQuarterCountry: location;
  clientHeadQuarterState: location;
  financePocName?: string;
  financeEmail?: string;
  financeNumber?: string;
  gstnumber: string;
  cinnumber: string;
  pannumber: string;
  insertedOn: string;
}

export interface Company {
  companyId?: number;
  companyName: string;
}

export interface Companies {
  contactCompanyId: number;
  contactDetails: Candidate;
  company: Company;
}

export interface Job {
  jobId: number;
  isClient?: boolean;
  techRole: string;
  companyName?: string;
  experience: string;
  status: string;
  budget: string;
  jobCode: string;
  postedOn: Date;
  insertedBy: string;
}

export const ClientTableColumn: Columns = [
  {
    Header: "Name",
    accessor: "clientName",
  },
  {
    Header: "Head Office",
    accessor: "clientHeadQuarterState.locationDetails",
    hiddenOnSmall: true,
  },
  {
    Header: "Email",
    accessor: "financeEmail",
    hiddenOnSmall: true,
  },
  {
    Header: "Finance Number",
    accessor: "financeNumber",
  },
  {
    Header: "Finance Poc",
    accessor: "financePocName",
  },
];

export const RecruitmentColumn = [
  {
    Header: "Candidate Name",
    accessor: "candidateName",
  },
  {
    Header: "Contact Number",
    accessor: "contactNumber",
    hiddenOnSmall: true,
  },
  {
    Header: "Email",
    accessor: "emailID",
    hiddenOnSmall: true,
  },
  {
    Header: "Role",
    accessor: "role",
  },
  {
    Header: "Action",
    accessor: "",
  },
];

export const jobFormSchema = yup.object().shape({
  jobCode: yup.string().min(3, "Must be at least 3 characters").nullable(),
  jobTitle: yup
    .string()
    .min(3, "Must be at least 3 characters")
    .max(50, "Must be 50 characters or less")
    .required("Job title is required"),
  jobDescription: yup
    .string()
    .min(3, "Must be at least 3 characters")
    .required("Job description is required"),
  salaryInCtc: yup.number().required("Salary is required"),
  jd: yup.string().required("JD is required"),
  experience: yup.string().required("Experience is required"),
  isJobActive: yup.string().required("Select status"),
  jobPostType: yup
    .string()
    .min(3, "Must be at least 3 characters")
    .required("Job type is required"),
  insertedBy: yup
    .string()
    .min(3, "Must be at least 3 characters")
    .required("Inserted by is required"),
  client: yup.object().shape({
    clientId: yup.number(),
  }),
});

export const clientFormSchema = yup.object().shape({
  financePocName: yup
    .string()
    .min(3, "Finance POC Name must be at least 3 characters")
    .nullable()
    .max(50, "Must be 50 characters or less")
    .matches(/^[a-zA-Z ]+$/, "Only alphabets are allowed"),
  financeNumber: yup
    .string()
    .matches(
      /^\+[0-9]{1,3}[0-9]{4,14}$/,
      "Must be a valid phone number with country code"
    )
    .nullable()
    .min(10, "Must be at least 10 characters")
    .max(15, "Must be less than 14 characters"),
  financeEmail: yup
    .string()
    .email("Finance Email is invalid")
    .nullable()
    .matches(
      /^[a-zA-Z0-9][-a-zA-Z0-9._]+@([-a-zA-Z0-9]+\.)+[a-zA-Z]{2,4}$/i,
      "Invalid email format"
    ),
  gstnumber: yup
    .string()
    // .matches(
    //   /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/i,"Invalid GST format"
    // )
    .nullable()
    .min(3, "GST must be at least 3 characters")
    .max(15, "Must be 15 characters or less"),
  cinnumber: yup
    .string()
    .nullable()
    //.
    // matches(
    //   /^\d{6,15}$/i,"Invalid CIN format"
    // )
    .min(3, "CIN must be at least 3 Numbers")
    .max(15, "Must be 15 Numbers or less"),
  pannumber: yup
    .string()
    // .matches(
    //   /^\d{6,15}$/i,"Invalid PAN format"
    // )
    .nullable()
    .min(3, "PAN must be at least 3 characters")
    .max(15, "Must be 15 characters or less"),
});

export const clientValidationSchema = yup.object().shape({
  clientName: yup
    .string()
    .required("Client Name is required")
    .min(3, "Must be at least 3 characters")
    .max(50, "Must be 50 characters or less"),
  clientHeadQuarterCountry: yup
    .object()
    .required("Client HQ Country is required"),
  clientHeadQuarterState: yup.object().required("Client HQ State is required"),
  financePocName: yup
    .string()
    .nullable()
    .min(3, "Finance POC Name must be at least 3 characters")
    .max(50, "Must be 50 characters or less"),
  financeNumber: yup
    .string()
    .matches(
      /^\+[0-9]{1,3}[0-9]{4,14}$/,
      "Must be a valid phone number with country code"
    )
    .nullable(),
  financeEmail: yup
    .string()
    .matches(
      /^[a-zA-Z0-9][-a-zA-Z0-9._]+@([-a-zA-Z0-9]+\.)+[a-zA-Z]{2,4}$/i,
      "Invalid email format"
    )
    .email("Invalid email format")
    .nullable(),
  gstnumber: yup.string().nullable().max(15, "Must be less than 15 characters"),
  cinnumber: yup.string().nullable().max(15, "Must be less than 15 characters"),
  pannumber: yup.string().nullable().max(15, "Must be less than 15 characters"),
});

export const clientLocationSchema = yup.object().shape({
  pincode: yup
    .string()
    .required("Pincode is required")
    .matches(/^\d+$/, "Pincode must be numeric")
    .min(6, "Must be at least 6 characters")
    .max(10, "Must be 10 characters or less"),
  address1: yup.string().required("Address is required"),
  hrContactPerson: yup
    .string()
    .required("HR Contact Person is required")
    .min(3, "Must be at least 3 characters")
    .max(30, "Must be 50 characters or less")
    .matches(/^[a-zA-Z ]+$/,"Only alphabets are allowed"),

  technicalPerson: yup
    .string()
    .required("Technical Person is required")
    .min(3, "Must be at least 3 characters")
    .max(30, "Must be 50 characters or less")
    .matches(/^[a-zA-Z ]+$/,"Only alphabets are allowed"),
  hrMobileNumber: yup
    .string()
    .required("HR Mobile Number is required")
    .matches(/^(?:\+?\d{1,3}[- ]?)?\d{8,12}$/i, "Invalid Mobile number format"),
  companyLandline: yup
    .string()
    .required("Company Landline is required")
    .matches(
      /^(?:\+?\d{1,3}[- ]?)?\d{8,12}$/i,
      "Invalid landline number format"
    ),
  hrContactPersonEmail: yup
    .string()
    .matches(
      /^[a-zA-Z0-9][-a-zA-Z0-9._]+@([-a-zA-Z0-9]+\.)+[a-zA-Z]{2,4}$/i,
      "Invalid email format"
    )
    .required("Email is required"),
  state: yup
    .object()
    .shape({
      locationId: yup.number().min(1, "Select a state"),
    })
    .required("State is required"),
  client: yup
    .object()
    .shape({
      clientId: yup
        .number()
        .required("Client is required")
        .min(1, "Select a client"),
    })
    .required("Client is required"),
  cityId: yup.object().shape({
    locationId: yup
      .number()
      .required("City is required")
      .min(1, "Select a city"),
  }),
});

export const jobUpdateSchema = yup.object().shape({
  jobCode: yup.string().min(3, "Must be at least 3 characters").nullable(),
  jobTitle: yup
    .string()
    .min(3, "Must be at least 3 characters")
    .max(50, "Must be 50 characters or less")
    .nullable(),
  jobDescription: yup
    .string()
    .min(3, "Must be at least 3 characters")
    .nullable(),
  salaryInCtc: yup.number().nullable(),
  experience: yup.string().nullable(),
  isJobActive: yup.string().nullable(),
  jobPostType: yup.string().min(3, "Must be at least 3 characters").nullable(),
  insertedBy: yup.string().min(3, "Must be at least 3 characters").nullable(),
  client: yup.object().shape({
    clientId: yup.number(),
  }),
});

export interface clientLocationFormValues {
  pincode: string;
  address1: string;
  hrContactPerson: string;
  technicalPerson: string;
  hrMobileNumber: string;
  companyLandline: string;
  hrContactPersonEmail: string;
  state: location;
  client: {
    clientId: number;
  };
  cityId: location;
}
