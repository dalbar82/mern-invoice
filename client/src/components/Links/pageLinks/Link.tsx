import React from "react";
import "./link.css";

interface LinkProps {
  name: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  className?: string;
  styles?: React.CSSProperties;
  linkTo?: string;
  children?: React.ReactNode;
  component?: React.ElementType;
}

const Link: React.FC<LinkProps> = ({ name, onClick, className, styles, linkTo, component }) => {
  return (
    <div className="link-container" style={styles} onClick={onClick}>
      <a className={className} href={linkTo}>
        {name}
      </a>
    </div>
  );
};

export default Link;
