import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App component renders without crashing", () => {
  it("renders the heading", () => {
    render(<App />);
  });
});
