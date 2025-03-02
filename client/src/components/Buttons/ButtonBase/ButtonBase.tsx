import React from "react";
import './buttonbase.css'

interface ButtonBaseProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  component?: React.ElementType; 
}

const ButtonBase = React.forwardRef<HTMLElement, ButtonBaseProps>(
  ({ component: Component = "button", children, style, ...props }, ref) => {
    return (
      <Component
      ref={ref as React.Ref<any>} 
      {...props}
        style={{
          background: "none",
          border: "none",
          padding: 0,
          cursor: "pointer",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          textDecoration: "none",
          ...style, // Allow overriding styles
        }}
      >
        {children}
      </Component>
    );
  }
);


export default ButtonBase;
