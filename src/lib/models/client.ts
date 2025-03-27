import { Candidate, Columns } from "../definitions";
import * as yup from "yup";

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
  clientHo: string;
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
    accessor: "clientHo",
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
    Header: "FinancePocName",
    accessor: "financePocName",
  }
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
  jobCode: yup.string().min(3, "Must be at least 3 characters"),
  jobTitle: yup.string().min(3, "Must be at least 3 characters"),
  jobDescription: yup
    .string()
    .min(3, "Must be at least 3 characters")
    .nullable(),
  salaryInCtc: yup.number(),
  experience: yup.string(),
  isJobActive: yup.string(),
  jobPostType: yup.string().min(3, "Must be at least 3 characters"),
  createdOn: yup.date(),
  insertedBy: yup.string().min(3, "Must be at least 3 characters"),
});

export const clientFormSchema = yup.object().shape({
  clientHo: yup
    .string()
    .min(3, "Client HO must be at least 3 characters")
    .nullable(),
  financePocName: yup
    .string()
    .min(3, "Finance POC Name must be at least 3 characters")
    .nullable(),
  financeNumber: yup.string().nullable(),
  financeEmail: yup.string().email("Finance Email is invalid").nullable(),
  gstnumber: yup.string().nullable(),
  cinnumber: yup.string().nullable(),
  pannumber: yup.string().nullable(),
});


export const clientValidationSchema = yup.object().shape({
  clientName: yup.string().required('Client Name is required'),
  clientHo: yup.string().required('Client HO is required'),
  financePocName: yup.string().required('Finance POC is required'),
  financeNumber: yup.string()
    .required('Finance Number is required')
    .matches(/^[0-9]{10}$/, 'Must be a valid 10-digit number'),
  financeEmail: yup.string().matches(
    /^[a-zA-Z0-9][-a-zA-Z0-9._]+@([-a-zA-Z0-9]+\.)+.[a-zA-Z]{2,4}$/i,
    "Invalid email format"
  )
    .email('Invalid email format')
    .required('Finance Email is required'),
  gstnumber: yup.string()
    .required('GST is required'),
  cinnumber: yup.string()
    .required('CIN is required'),
  pannumber: yup.string()
    .required('PAN is required'),
});
