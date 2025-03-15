import { useState, useMemo } from "react";
import {
  Box,
  Button,
  Container,
  Tooltip,
  Paper,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TablePagination,
  TableRow
} from "@mui/material";
import Typography from "../../../components/Typography/Typography";
import EnhancedTableHead from "../../../components/Table/EnhancedTableHead";
import moment from "moment";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import { useNavigate } from "react-router-dom";
import Spinner from "../../../components/Spinner";
import GroupAddRoundedIcon from "@mui/icons-material/GroupAddRounded";
import StyledTableCell from "../../../components/StyledTableCell";
import StyledTableRow from "../../../components/StyledTableRow";
import { useGetAllDocsQuery } from "../documentsApiSlice";
import "../../../styles/pageHeader.css";

const ProjectsPage: React.FC = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState("dueDate");

  const { data, isLoading } = useGetAllDocsQuery(page);
  const rows = data?.myDocuments || [];

  function descendingComparator<T>(a: T, b: T, orderBy: keyof T): number {
    if (b[orderBy] < a[orderBy]) return -1;
    if (b[orderBy] > a[orderBy]) return 1;
    return 0;
  }

  function getComparator<Key extends keyof any>(
    order: "asc" | "desc",
    orderBy: Key
  ): (a: Record<Key, any>, b: Record<Key, any>) => number {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function stableSort<T>(array: T[], comparator: (a: T, b: T) => number): T[] {
    const stabilizedArray = array?.map((el, index) => [el, index] as [T, number]);
    stabilizedArray.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      return order !== 0 ? order : a[1] - b[1];
    });
    return stabilizedArray.map((el) => el[0]);
  }

  const handleRequestSort = (_event: React.MouseEvent<unknown>, property: string) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const headerDetails = [
    { id: "documentNumber", numeric: false, disablePadding: true, label: "Project #", align:"left", radius: "10px" },
    { id: "name", numeric: false, disablePadding: true, label: "Name" },
    { id: "customer", numeric: false, disablePadding: true, label: "Customer" },
    { id: "documentType", numeric: false, disablePadding: true, label: "Status" },
    { id: "dueDate", numeric: false, disablePadding: true, label: "Due" },
    { id: "status", numeric: false, disablePadding: true, label: "Payment Status" },
    { id: "view", numeric: false, disablePadding: true, label: "View" },
  ];

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, rows]
  );

  const statusColour = (status: string): string => {
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

  return (
    <Container component="main" maxWidth="xl" sx={{ mt: 14, ml: 15, width: "90%" }}>
      <Box className="page-header">
        <Typography elementType="h3" text="Projects" style={{ fontWeight: 600, marginBottom: '20px', fontFamily: 'Poppins' }}/>
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

      {isLoading ? (
        <Spinner />
      ) : !rows.length ? (
        <div>No projects</div>
      ) : (
        <TableContainer component={Paper} sx={{ mt: 2, backgroundColor: "transparent", boxShadow: "none" }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple-table">
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              headCells={headerDetails}
            />
            <TableBody>
              {visibleRows.map((row) => (
                <StyledTableRow key={row._id} sx={{ cursor: "pointer" }}>
                  <StyledTableCell
                    fontWeight="600"
                    leftborder={`2px solid ${statusColour(row.documentType)}`}
                    scope="row"
                  >
                    {row.documentNumber}
                  </StyledTableCell>
                  <StyledTableCell>{row.name}</StyledTableCell>
                  <StyledTableCell>{row.customer?.name}</StyledTableCell>
                  <StyledTableCell>
                    <Chip sx={{ backgroundColor: "transparent", color: statusColour(row.documentType) }} label={row.documentType} />
                  </StyledTableCell>
                  <StyledTableCell>{moment(row.dueDate).format("DD-MM-YYYY")}</StyledTableCell>
                  <StyledTableCell>
                    <Chip sx={{ backgroundColor: "#eeeeee", color: "rgb(0 0 0 / 67%)" }} label={row.status} />
                  </StyledTableCell>
                  <StyledTableCell >
                    <Box sx={{ cursor: "pointer" }}>
                      <VisibilityRoundedIcon color="success" fontSize="medium" onClick={() => navigate(`/edit-doc/${row._id}`)} />
                    </Box>
                  </StyledTableCell>
                </StyledTableRow>
              ))}

              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={7} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                  colSpan={7}
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  sx={{
                    background: "white",
                    borderTop: "10px solid #fbfcfc"
                  }}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default ProjectsPage;



// import React, { useState, useEffect, useRef, useCallback } from "react";
// import { Grid, Box, Button, Tooltip, Container, TextField, Typography } from "@mui/material";
// import GroupAddRoundedIcon from "@mui/icons-material/GroupAddRounded";
// import { useNavigate } from "react-router-dom";
// import { useGetAllDocsQuery } from "../documentsApiSlice";
// import ProjectListItem from "../../../components/ListItems/ProjectListItem";
// import "../../../styles/pageHeader.css";
// import Spinner from "../../../components/Spinner";
// import { JobDocument } from "../../../types/JobDocument";

// const ProjectManagement: React.FC = () => {
//   const navigate = useNavigate();
//   const [projects, setProjects] = useState<JobDocument[]>([]);
//   const [searchQuery, setSearchQuery] = useState<string>("");
//   const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
//   const [lastCreatedAt, setLastCreatedAt] = useState<string | null>(null);
//   console.log("lastCreatedAt before request:", lastCreatedAt);
//   const [fetchingMore, setFetching] = useState(false);
//   const { data, isFetching } = useGetAllDocsQuery(lastCreatedAt);
//   const observer = useRef<IntersectionObserver | null>(null);
//   const scrollContainerRef = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     console.log("API Response:", data);
//   }, [data]);

//   useEffect(() => {
//     if (data?.myDocuments?.length) {
//       setProjects((prevData) => {
//         const newProjects = data.myDocuments.filter(
//           (newDoc: { documentNumber: string }) =>
//             !prevData.some((oldDoc) => oldDoc.documentNumber === newDoc.documentNumber)
//         );
//         return [...prevData, ...newProjects];
//       });

//       setLastCreatedAt(data.lastCreatedAt || null); // Update lastCreatedAt only if new data is received
//     }
//   }, [data]);

//   const handleScroll = useCallback(() => {
//     if (!scrollContainerRef.current || isFetching || !data?.hasMore) return;

//     const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
//     if (scrollHeight - (scrollTop + clientHeight) < 10) {
//       // User is at the bottom, fetch more data
//       setLastCreatedAt(projects[projects.length - 1]?.createdAt?.toISOString() || null);
//       console.log("inside useEffect", lastCreatedAt);
      
//     }
//   }, [isFetching, projects, data]);

//   useEffect(() => {
//     const scrollDiv = scrollContainerRef.current;
//     if (scrollDiv) {
//       scrollDiv.addEventListener("scroll", handleScroll);
//     }
//     return () => {
//       if (scrollDiv) {
//         scrollDiv.removeEventListener("scroll", handleScroll);
//       }
//     };
//   }, [handleScroll]);

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case "Open":
//         return "#ffc356";
//       case "Quotation":
//         return "#7bbef3";
//       case "Order":
//         return "#4ab84a";
//       case "Invoice":
//         return "#e64d4d";
//       case "Paid":
//         return "#ca43ca";
//       default:
//         return "#eeeeee";
//     }
//   };

//   // **Filter Projects Based on Search Query**
//   const filteredProjects = projects.filter((project) => {
//     const searchLower = searchQuery.toLowerCase();
//     return (
//       project?.documentNumber?.toString().toLowerCase().includes(searchLower) ||
//       project?.name?.toLowerCase().includes(searchLower) ||
//       project?.customer?.name?.toLowerCase().includes(searchLower)
//     );
//   });

//   return (
//     <Grid container maxWidth="xl" sx={{ mt: 14, ml: 15, width: "90%" }}>
//       {/* Header Section */}
//       <Grid item xs={12} xl={12}>
//         <Box className="page-header">
//           <Typography
//             variant="h6"
//             sx={{ fontWeight: 600, marginBottom: "20px", fontFamily: "Poppins" }}>
//               Projects
//           </Typography>
//           <Box>
//             <Tooltip title="Add Job">
//               <Button
//                 sx={{ p: "15px 0px 15px 10px", color: "#a6aeb3" }}
//                 variant="text"
//                 startIcon={<GroupAddRoundedIcon />}
//                 onClick={() => navigate("/create-doc")}
//               ></Button>
//             </Tooltip>
//           </Box>
//         </Box>
//       </Grid>

//       {/* Project List */}
//       <Grid item xs={4} xl={4} sx={{height: "45%"}}>
//       <Container>
//         <TextField
//           fullWidth
//           label="Search"
//           placeholder="Search projects..."
//           value={searchQuery}
//           sx={{ marginBottom: 2 }}
//           onChange={(e) => setSearchQuery(e.target.value)}
//         />
//         <div ref={scrollContainerRef} id="scrollContainer" className="scroll-container" style={{height: "40%", display: "flex", flexDirection: "column"}}>
//           {isFetching && projects.length === 0 ? (
//             <Spinner />
//           ) : filteredProjects.length > 0 ? (
//             filteredProjects.map((project, index) => (
//               <ProjectListItem
//                 key={`${project?.documentNumber}-${index}`}
//                 projectNumber={project?.documentNumber?.toString() || "No Job #"}
//                 projectTitle={project?.name || "No Description"}
//                 dueDate={project?.dueDate ? new Date(project.dueDate) : null}
//                 customer={project?.customer?.name || "No Customer"}
//                 borderColor={getStatusColor(project?.documentType)}
//                 isSelected={selectedProjectId === project?.documentNumber}
//                 onClick={() => setSelectedProjectId(project.documentNumber ?? null)}
//               />
//             ))
//           ) : (
//             <Typography variant="body1" color="textSecondary">
//               No projects found.
//             </Typography>
//           )}
//         </div>
//         <div ref={scrollContainerRef} style={{ height: "10px" }}></div>

//         {isFetching && <Typography textAlign="center">Loading more...</Typography>}
//       </Container>

//       </Grid>
//     </Grid>
//   );
// };

// export default ProjectManagement;
