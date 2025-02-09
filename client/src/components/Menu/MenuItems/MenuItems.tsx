import React from "react";

interface MenuItemProps {
  onClick?: () => void;
  children: React.ReactNode;
}

const MenuItem: React.FC<MenuItemProps> = ({ onClick, children }) => {
  const menuItemStyles: React.CSSProperties = {
    padding: "10px 16px",
    cursor: "pointer",
    fontSize: "14px",
    color: "#333",
    transition: "background 0.2s",
  };

  return (
    <div
      style={menuItemStyles}
      onClick={onClick}
      onMouseEnter={(e) => (e.currentTarget.style.background = "#f0f0f0")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
    >
      {children}
    </div>
  );
};

export default MenuItem;
