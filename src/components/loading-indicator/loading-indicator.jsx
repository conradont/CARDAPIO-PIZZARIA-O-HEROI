import React from "react";

export const LoadingIndicator = ({
  type = "line-spinner",
  size = "md",
  label = "Loading...",
}) => {
  const sizeMap = {
    sm: "40px",
    md: "60px",
    lg: "80px",
  };

  const spinnerSize = sizeMap[size] || sizeMap.md;

  if (type === "line-spinner") {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "16px",
        }}
      >
        <div
          style={{
            width: spinnerSize,
            height: spinnerSize,
            border: "4px solid rgba(255, 255, 255, 0.1)",
            borderTop: "4px solid #fff",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
          }}
        />
        {label && (
          <p
            style={{
              color: "#fff",
              fontSize: "16px",
              fontWeight: "500",
              margin: 0,
            }}
          >
            {label}
          </p>
        )}
        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>
    );
  }

  return null;
};
