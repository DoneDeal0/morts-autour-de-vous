import * as React from "react";
import { ErrorBoundary } from "components/error-boundary/index";
import ErrorLayout from "components/error-boundary/layout";
import Home from "pages/home";

export default function App() {
  return (
    <ErrorBoundary fallback={<ErrorLayout />}>
      <Home />
    </ErrorBoundary>
  );
}
