import React from "react";
import "./link.css";

interface LinkProps {
  name: string;
  onClick?: () => void;
  className?: string;
  styles?: React.CSSProperties;
  linkTo?: string;
  children: React.ReactNode
}

const Link: React.FC<LinkProps> = ({ name, onClick, className, styles, linkTo }) => {
  return (
    <div className="link-container" style={styles} onClick={onClick}>
      <a className={className} href={linkTo}>
        {name}
      </a>
    </div>
  );
};

export default Link;
