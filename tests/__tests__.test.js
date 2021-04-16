import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import mock from "../mockData.json";
import App from "../pages/_app";
import Index from "../pages/index";

describe("App", () => {
  test("it test the index page form and Dialog Components", async () => {
    render(<Index />);
    fireEvent.click(screen.getByText("Sign In"));

    await waitFor(() => fireEvent.click(screen.getByText("Submit")));

    expect(screen.getByText("Submit")).toHaveAttribute("disabled");
    expect(screen.getByRole("alert")).toHaveTextContent("Welcome");
  });
});
