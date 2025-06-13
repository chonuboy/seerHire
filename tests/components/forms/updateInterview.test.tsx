import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, vi, beforeEach, expect } from "vitest";
import InterviewForm from "@/components/Forms/jobs/updateInterview";
import { updateInterviewRound } from "@/api/interviews/InterviewRounds";

// Mock the API call
vi.mock("@/api/interviews/InterviewRounds", () => ({
  updateInterviewRound: vi.fn().mockResolvedValue({ status: 200 }),
}));

const masterTechnologiesMock = [
  { technology: "React" },
  { technology: "Node.js" },
];

const defaultValues = {
  roundDate: "2024-06-01",
  interviewerName: "John Doe",
  interviewStatus: "Passed",
  technologyInterviewed: "React",
  techRating: 8,
  softskillsRating: 7,
  remarks: "Strong technical skills.",
};

describe("InterviewForm", () => {
  let autoCloseMock: () => void;

  beforeEach(() => {
    autoCloseMock = vi.fn();
  });

  it("renders form fields correctly", () => {
    render(
      <InterviewForm
        id={1}
        initialValues={defaultValues}
        masterTechnologies={masterTechnologiesMock}
        autoClose={autoCloseMock}
      />
    );

    expect(screen.getByLabelText("Interviewer Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Tech Rating (1-10)")).toHaveValue(8);
    expect(screen.getByLabelText("Soft Skill Rating (1-10)")).toHaveValue(7);
    expect(screen.getByLabelText("Remarks")).toHaveValue("Strong technical skills.");
    expect(screen.getByDisplayValue("React")).toBeInTheDocument();
  });

  it("shows validation error for empty required fields on blur", async () => {
    render(
      <InterviewForm
        id={1}
        initialValues={{ ...defaultValues, interviewerName: "" }}
        masterTechnologies={masterTechnologiesMock}
        autoClose={autoCloseMock}
      />
    );

    const nameInput = screen.getByLabelText("Interviewer Name");
    fireEvent.blur(nameInput);
  });

  it("submits the form with valid inputs", async () => {
    render(
      <InterviewForm
        id={1}
        initialValues={defaultValues}
        masterTechnologies={masterTechnologiesMock}
        autoClose={autoCloseMock}
      />
    );

    fireEvent.click(screen.getByText("Update"));

    await waitFor(() => {
      expect(updateInterviewRound).toHaveBeenCalled();
      expect(autoCloseMock).toHaveBeenCalled();
    });
  });

  it("does not call API if there are validation errors", async () => {
    render(
      <InterviewForm
        id={1}
        initialValues={{ ...defaultValues, remarks: "ok" }}
        masterTechnologies={masterTechnologiesMock}
        autoClose={autoCloseMock}
      />
    );

    fireEvent.change(screen.getByLabelText("Remarks"), { target: { value: "ok" } });
    fireEvent.blur(screen.getByLabelText("Remarks"));

    fireEvent.click(screen.getByText("Update"));
  });
});
