import React, { forwardRef } from "react";
import { Box, Typography } from "@mui/material";
import moment from "moment";

interface ProjectListItemProps {
  projectNumber: string;
  projectTitle: string;
  dueDate: Date | null;
  customer: string;
  borderColor: string;
  isSelected: boolean;
  onClick: () => void;
}

// Forward ref to support lazy loading
const ProjectListItem = forwardRef<HTMLDivElement, ProjectListItemProps>(
  ({ projectNumber, projectTitle, dueDate, customer, borderColor, isSelected, onClick }, ref) => {
    return (
      <Box
        ref={ref}
        className={isSelected ? "selected" : ""}
        onClick={onClick}
        sx={{
          borderLeft: `4px solid ${borderColor}`,
          padding: "16px",
          marginBottom: "12px",
          backgroundColor: isSelected ? "#f0f8ff" : "#fff", // Light blue when selected
          boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
          borderRadius: "6px",
          maxWidth: "550px",
          cursor: "pointer",
          "&:hover": {
            backgroundColor: "#f9f9f9",
          },
        }}
      >
        {/* Line 1: Project Number - Customer */}
        <Typography variant="subtitle1" fontWeight={600}>
          {projectNumber} - {customer}
        </Typography>

        {/* Line 2: Project Title | Due Date */}
        <Box display="flex" justifyContent="space-between">
          <Typography variant="body2" color="textSecondary">
            {projectTitle}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Due: {dueDate ? moment(dueDate).format("DD-MM-YYYY") : "N/A"}
          </Typography>
        </Box>
      </Box>
    );
  }
);

// Set display name for debugging
ProjectListItem.displayName = "ProjectListItem";

export default ProjectListItem;
