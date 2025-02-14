import React from "react";

interface TypographyProps {
  style?: React.CSSProperties; 
  elementType?: "h2" | "h1" | "h4" | "h3" | "p" | "span" | "h6" | "h5"
  color?: string; 
  text: string; 
  children?: React.ReactNode
}

const Typography: React.FC<TypographyProps> = ({
  style,
  elementType = "span",
  color,
  text,
  children
}) => {
  const Component = elementType
  return (
    <Component style={{ ...style, color }}>
      {text}
      {children}
    </Component>
  );
};

export default Typography;
