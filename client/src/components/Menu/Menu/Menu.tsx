import React, { useEffect, useRef } from "react";

interface MenuProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  onClick?: () => void; // ✅ Handle menu clicks
  children: React.ReactNode;
  id: string;
  keepMounted?: boolean;
  anchorOrigin?: {
    vertical: "top" | "center" | "bottom";
    horizontal: "left" | "center" | "right";
  };
  transformOrigin?: {
    vertical: "top" | "center" | "bottom";
    horizontal: "left" | "center" | "right";
  };
}

const Menu: React.FC<MenuProps> = ({
  anchorEl,
  open,
  onClose,
  onClick,
  children,
  id,
  keepMounted = false,
  anchorOrigin = { vertical: "bottom", horizontal: "left" },
  transformOrigin = { vertical: "top", horizontal: "right" }, // ✅ Default transformOrigin
}) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        anchorEl &&
        !anchorEl.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, onClose, anchorEl]);

  // If `keepMounted` is false, remove from DOM when closed
  if (!open && !keepMounted) return null;

  // Get anchor element's bounding rectangle
  const anchorRect = anchorEl?.getBoundingClientRect();

  // Calculate menu position based on `anchorOrigin`
  const getPosition = () => {
    if (!anchorRect) return { top: 0, left: 0 };

    let top = anchorRect.bottom;
    let left = anchorRect.left;

    if (anchorOrigin.vertical === "top") {
      top = anchorRect.top;
    } else if (anchorOrigin.vertical === "center") {
      top = anchorRect.top + anchorRect.height / 2;
    }

    if (anchorOrigin.horizontal === "right") {
      left = anchorRect.right;
    } else if (anchorOrigin.horizontal === "center") {
      left = anchorRect.left + anchorRect.width / 2;
    }

    return { top, left };
  };

  const { top, left } = getPosition();

  // Calculate transformOrigin positioning
  const getTransformOrigin = () => {
    let transformX = "0%";
    let transformY = "0%";

    if (transformOrigin.horizontal === "right") {
      transformX = "100%";
    } else if (transformOrigin.horizontal === "center") {
      transformX = "50%";
    }

    if (transformOrigin.vertical === "bottom") {
      transformY = "100%";
    } else if (transformOrigin.vertical === "center") {
      transformY = "50%";
    }

    return `${transformX} ${transformY}`;
  };

  const menuStyles: React.CSSProperties = {
    position: "absolute",
    top,
    left,
    background: "#fff",
    boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
    borderRadius: "4px",
    padding: "8px 0",
    minWidth: "150px",
    zIndex: 1000,
    opacity: open ? 1 : 0,
    visibility: open ? "visible" : "hidden",
    transformOrigin: getTransformOrigin(), // ✅ Apply transformOrigin
    transform: open ? "scale(1)" : "scale(0.9)", // Smooth opening effect
    transition: "opacity 0.2s ease-in-out, transform 0.2s ease-in-out",
  };

  return (
    <div id={id} ref={menuRef} style={menuStyles} onClick={onClick}>
      {children}
    </div>
  );
};

export default Menu;
