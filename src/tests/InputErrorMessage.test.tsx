import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { InputErrorMessage } from "@/components/citability-scorer/InputErrorMessage";

describe("InputErrorMessage", () => {
  it("renders the message as an alert", () => {
    render(<InputErrorMessage message="Something went wrong" />);

    expect(screen.getByRole("alert")).toHaveTextContent("Something went wrong");
  });
});
