import * as React from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      style={{
        padding: "8px 16px",
        borderRadius: "6px",
        border: "none",
        backgroundColor: "#2563eb",
        color: "white",
        fontWeight: 500,
        cursor: "pointer"
      }}
    >
      {children}
    </button>
  );
}