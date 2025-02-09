import React from "react";

interface TypographyProps {
  style?: React.CSSProperties; 
  elementType?: "h2" | "h1" | "h4" | "h3" | "p" | "span" | "h6"
  color?: string; 
  text: string; 
}

const Typography: React.FC<TypographyProps> = ({
  style,
  elementType = "span",
  color,
  text,
}) => {
  const Component = elementType
  return (
    <Component style={{ ...style, color }}>
      {text}
    </Component>
  );
};

export default Typography;
