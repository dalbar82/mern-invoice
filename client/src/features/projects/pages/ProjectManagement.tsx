import React, { useState, useEffect, useRef, useCallback } from "react";
import { Grid, Box, Button, Tooltip, Container, TextField, Typography } from "@mui/material";
import GroupAddRoundedIcon from "@mui/icons-material/GroupAddRounded";
import { useNavigate } from "react-router-dom";
import { useGetAllDocsQuery } from "../documentsApiSlice";
import ProjectListItem from "../../../components/ListItems/ProjectListItem";
import "../../../styles/pageHeader.css";
import Spinner from "../../../components/Spinner";
import { JobDocument } from "../../../types/JobDocument";

const ProjectManagement: React.FC = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<JobDocument[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [lastCreatedAt, setLastCreatedAt] = useState<string | null>(null);
  const { data, isFetching, refetch } = useGetAllDocsQuery(lastCreatedAt);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (data?.myDocuments?.length) {
      setProjects((prevData) => {
        const newProjects = data.myDocuments.filter(
          (newDoc: { documentNumber: string }) =>
            !prevData.some((oldDoc) => oldDoc.documentNumber === newDoc.documentNumber)
        );
        return [...prevData, ...newProjects];
      });

      setLastCreatedAt(data?.lastCreatedAt || null); // Update lastCreatedAt only if new data is received
    }
  }, [data]);

  const handleScroll = useCallback(() => {
    if (!scrollContainerRef.current || isFetching || !data?.hasMore) return;
  
    const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
  
    if (scrollHeight - (scrollTop + clientHeight) < 10) {
      // Ensure projects array has data before accessing the last item
      if (projects.length === 0) return;
  
      const lastCreatedAtScroll = new Date(projects[projects.length - 1]?.createdAt)
      console.log("Updating lastCreatedAt:", lastCreatedAtScroll);
      
      if (lastCreatedAtScroll) {
        setLastCreatedAt(lastCreatedAt);
      }
    }
  }, [isFetching, data?.hasMore, projects, lastCreatedAt]);
  
 
  useEffect(() => {
    const scrollDiv = scrollContainerRef?.current;
    if (scrollDiv) {
      scrollDiv.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (scrollDiv) {
        scrollDiv.removeEventListener("scroll", handleScroll);
      }
    };
  }, [handleScroll]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open":
        return "#ffc356";
      case "Quotation":
        return "#7bbef3";
      case "Order":
        return "#4ab84a";
      case "Invoice":
        return "#e64d4d";
      case "Paid":
        return "#ca43ca";
      default:
        return "#eeeeee";
    }
  };
  useEffect(() => {
    if (lastCreatedAt) {
      refetch();
    }
  }, [lastCreatedAt, refetch]);
  // **Filter Projects Based on Search Query**
  const filteredProjects = projects.filter((project) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      project?.documentNumber?.toString().toLowerCase().includes(searchLower) ||
      project?.name?.toLowerCase().includes(searchLower) ||
      project?.customer?.name?.toLowerCase().includes(searchLower)
    );
  });

  return (
    <Grid container maxWidth="xl" sx={{ mt: 14, ml: 15, width: "90%" }}>
      {/* Header Section */}
      <Grid item xs={12} xl={12}>
        <Box className="page-header">
          <Typography
            variant="h6"
            sx={{ fontWeight: 600, marginBottom: "20px", fontFamily: "Poppins" }}>
              Projects
          </Typography>
          <Box>
            <Tooltip title="Add Job">
              <Button
                sx={{ p: "15px 0px 15px 10px", color: "#a6aeb3" }}
                variant="text"
                startIcon={<GroupAddRoundedIcon />}
                onClick={() => navigate("/create-doc")}
              ></Button>
            </Tooltip>
          </Box>
        </Box>
      </Grid>

      {/* Project List */}
      <Grid item xs={4} xl={4} sx={{height: "45%"}}>
      <Container>
        <TextField
          fullWidth
          label="Search"
          placeholder="Search projects..."
          value={searchQuery}
          sx={{ marginBottom: 2 }}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div ref={scrollContainerRef} id="scrollContainer" className="scroll-container" style={{maxHeight: "50vh", display: "flex", flexDirection: "column", overflowY: "auto"}}>
          {isFetching && projects.length === 0 ? (
            <Spinner />
          ) : filteredProjects?.length > 0 ? (
            filteredProjects.map((project, index) => (
              <ProjectListItem
                key={`${project?.documentNumber}-${index}`}
                projectNumber={project?.documentNumber?.toString() || "No Job #"}
                projectTitle={project?.name || "No Description"}
                dueDate={project?.dueDate ? new Date(project.dueDate) : null}
                customer={project?.customer?.name || "No Customer"}
                borderColor={getStatusColor(project?.documentType)}
                isSelected={selectedProjectId === project?.documentNumber}
                onClick={() => setSelectedProjectId(project.documentNumber ?? null)}
              />
            ))
          ) : (
            <Typography variant="body1" color="textSecondary">
              No projects found.
            </Typography>
          )}
        </div>

        {isFetching && <Typography textAlign="center">Loading more...</Typography>}
      </Container>

      </Grid>
    </Grid>
  );
};

export default ProjectManagement;
