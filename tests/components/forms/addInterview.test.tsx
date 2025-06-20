// tests/components/forms/addInterview.test.tsx

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import AddRound from "@/components/Forms/jobs/addInterview";
import { createInterviewRound } from "@/api/interviews/InterviewRounds";

vi.mock("@/api/interviews/InterviewRounds", () => ({
  createInterviewRound: vi.fn(),
}));

describe("AddRound Component", () => {
  const mockOnClose = vi.fn();
  const mockTechnologies = [{ technology: "React" }, { technology: "Node.js" }];

  const defaultProps = {
    interviewId: 1,
    roundNumber: 1,
    onclose: mockOnClose,
    masterTechnologies: mockTechnologies,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders all input fields", () => {
    render(<AddRound {...defaultProps} />);

    expect(screen.getByText("Add New Round")).toBeInTheDocument();
    expect(screen.getByLabelText(/Interview Date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Interviewer Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Interview Status/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Technology Interviewed/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Tech Rating/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Soft Skill Rating/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Remarks/i)).toBeInTheDocument();
  });

  it("shows character limits and invalid values", async () => {
    render(<AddRound {...defaultProps} />);

    fireEvent.input(screen.getByLabelText(/Interviewer Name/i), {
      target: { value: "Jo" },
    });

    fireEvent.change(screen.getByLabelText(/Interview Status/i), {
      target: { value: "Unknown" },
    });

    fireEvent.input(screen.getByLabelText(/Technology Interviewed/i), {
      target: { value: "AI" },
    });

    fireEvent.input(screen.getByLabelText(/Tech Rating/i), {
      target: { value: "15" },
    });

    fireEvent.input(screen.getByLabelText(/Soft Skill Rating/i), {
      target: { value: "0" },
    });

    fireEvent.input(screen.getByLabelText(/Remarks/i), {
      target: { value: "No" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Add/i }));

  });

  it("calls onclose when Cancel is clicked", () => {
    render(<AddRound {...defaultProps} />);
    fireEvent.click(screen.getByRole("button", { name: /Cancel/i }));
    expect(mockOnClose).toHaveBeenCalled();
  });

  it("submits valid data successfully", async () => {
    (createInterviewRound as ReturnType<typeof vi.fn>).mockResolvedValue({ status: 200 });

    render(<AddRound {...defaultProps} />);

    fireEvent.input(screen.getByPlaceholderText(/dd\/mm\/yyyy/i), {
      target: { value: "2025-06-13" },
    });

    fireEvent.input(screen.getByLabelText(/Interviewer Name/i), {
      target: { value: "John Doe" },
    });

    fireEvent.change(screen.getByLabelText(/Interview Status/i), {
      target: { value: "Passed" },
    });

    fireEvent.change(screen.getByLabelText(/Technology Interviewed/i), {
      target: { value: "React" },
    });

    fireEvent.input(screen.getByLabelText(/Tech Rating/i), {
      target: { value: "9" },
    });

    fireEvent.input(screen.getByLabelText(/Soft Skill Rating/i), {
      target: { value: "8" },
    });

    fireEvent.input(screen.getByLabelText(/Remarks/i), {
      target: { value: "Excellent technical and communication skills." },
    });

    fireEvent.click(screen.getByRole("button", { name: /Add/i }));

    await waitFor(() => {
      expect(createInterviewRound).toHaveBeenCalledOnce();
      expect(mockOnClose).toHaveBeenCalled();
    });
  });
});
