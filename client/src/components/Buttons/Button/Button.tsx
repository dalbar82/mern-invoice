import React from "react";
import { styled } from "@mui/material/styles";

type ButtonVariant = "contained" | "outlined" | "text";
type ButtonColor = "primary" | "secondary" | "error" | "success" | "warning";
type ButtonSize = "small" | "medium" | "large";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: ButtonSize;
  fullWidth?: boolean;
  startIcon?: React.ReactNode; // ✅ Allows passing an icon
}

const StyledButton = styled("button")<ButtonProps>(
  ({ theme, variant = "contained", color = "primary", size = "medium", fullWidth }) => {
    const colors = {
      primary: theme.palette.primary.main,
      secondary: theme.palette.secondary.main,
      error: theme.palette.error.main,
      success: theme.palette.success.main,
      warning: theme.palette.warning.main,
    };

    const sizes = {
      small: "8px 16px",
      medium: "10px 20px",
      large: "12px 24px",
    };

    return {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px", // ✅ Space between icon and text
      fontSize: "1rem",
      fontWeight: 500,
      borderRadius: "4px",
      textTransform: "uppercase",
      cursor: "pointer",
      padding: sizes[size],
      width: fullWidth ? "100%" : "auto",
      transition: "background 0.2s, border-color 0.2s, color 0.2s",
      ...(variant === "contained" && {
        backgroundColor: colors[color],
        color: "#fff",
        border: "none",
        "&:hover": {
          backgroundColor: theme.palette[color].dark,
        },
      }),
      ...(variant === "outlined" && {
        backgroundColor: "transparent",
        border: `2px solid ${colors[color]}`,
        color: colors[color],
        "&:hover": {
          backgroundColor: colors[color],
          color: "#fff",
        },
      }),
      ...(variant === "text" && {
        backgroundColor: "transparent",
        border: "none",
        color: colors[color],
        "&:hover": {
          backgroundColor: theme.palette.action.hover,
        },
      }),
      "&:disabled": {
        backgroundColor: theme.palette.action.disabledBackground,
        color: theme.palette.action.disabled,
        cursor: "not-allowed",
      },
    };
  }
);

const Button: React.FC<ButtonProps> = ({ startIcon, children, ...props }) => {
  return (
    <StyledButton {...props}>
      {startIcon && <span>{startIcon}</span>} {/* ✅ Render startIcon if provided */}
      {children}
    </StyledButton>
  );
};

export default Button;
