import React, { ComponentType } from "react";
import { FallbackProps } from "react-error-boundary";

const ErrorFallback: ComponentType<FallbackProps> = ({
  error,
  resetErrorBoundary,
}) => {
  // resetErrorBoundary();
  return (
    <div role="alert">
      <p>Что-то пошло не так</p>
      <pre style={{ color: "red" }}>{error.message}</pre>
    </div>
  );
};
export default ErrorFallback;
