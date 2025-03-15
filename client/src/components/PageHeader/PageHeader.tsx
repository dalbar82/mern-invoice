import React from "react";
import { Box, Button, Tooltip, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface PageHeaderProps {
  title: string;
  buttonTooltip?: string;
  buttonIcon?: React.ReactNode;
  buttonAction?: () => void;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  buttonTooltip = "Add",
  buttonIcon,
  buttonAction,
}) => {
  const navigate = useNavigate();

  return (
    <Box className="page-header">
      <Typography
        component="h3"
        sx={{
          fontWeight: 600,
          marginBottom: "20px",
          fontFamily: "Poppins",
        }}
      >
        {title}
      </Typography>
      {buttonIcon && (
        <Box>
          <Tooltip title={buttonTooltip}>
            <Button
              sx={{ p: "15px 0px 15px 10px", color: "#a6aeb3" }}
              variant="text"
              startIcon={buttonIcon}
              onClick={buttonAction || (() => navigate("/create-doc"))}
            />
          </Tooltip>
        </Box>
      )}
    </Box>
  );
};

export default PageHeader;
