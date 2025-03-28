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
import useTitle from '../../../hooks/useTitle';
import Typography from "../../../components/Typography/Typography";
import EnhancedTableHead from "../../../components/Table/EnhancedTableHead";
import moment from "moment";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import { useNavigate } from "react-router-dom";
import Spinner from "../../../components/Spinner";
import GroupAddRoundedIcon from "@mui/icons-material/GroupAddRounded";
import StyledTableCell from "../../../components/StyledTableCell";
import StyledTableRow from "../../../components/StyledTableRow";
import { useGetAllCustomersQuery } from '../customersApiSlice';
import "../../../styles/pageHeader.css";
import React from "react";

const CustomersPage: React.FC = () => {
  useTitle('Customers');
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState("name");

  const { data, isLoading } = useGetAllCustomersQuery(page);
  const rows = data?.myCustomers || [];
  console.log("in customers",data?.myCustomers)

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
    { id: "accountNo", numeric: false, disablePadding: true, label: "Account #'", align:"left", radius: "10px" },
    { id: "name", numeric: false, disablePadding: true, label: "Name" },
    { id: "city", numeric: false, disablePadding: true, label: "City" },
    { id: "createdAt", numeric: false, disablePadding: true, label: "Created" },
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

  // const statusColour = (status: string): string => {
  //   switch (status) {
  //     case "Open":
  //       return "#ffc356";
  //     case "Quotation":
  //       return "#69b5d8";
  //     case "Order":
  //       return "#4ab84a";
  //     case "Invoice":
  //       return "#e64d4d";
  //     case "Paid":
  //       return "#ca43ca";
  //     default:
  //       return "#eeeeee";
  //   }
  // };

  return (
    <Container component="main" maxWidth="xl" sx={{ mt: 14, ml: 15, width: "90%" }}>
      <Box className="page-header">
        <Typography elementType="h3" text="Customers" style={{ fontWeight: 600, marginBottom: '20px', fontFamily: 'Poppins' }}/>
        <Box>
          <Tooltip title="Add Customer">
            <Button
              sx={{ p: "15px 0px 15px 10px", color: "#a6aeb3" }}
              variant="text"
              startIcon={<GroupAddRoundedIcon />}
              onClick={() => navigate("/create-customer")}
            ></Button>
          </Tooltip>
        </Box>
      </Box>

      {isLoading ? (
        <Spinner />
      ) : !rows.length ? (
        <div>No Customers</div>
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
                <StyledTableRow key={row?._id} sx={{ cursor: "pointer" }}>
                  <StyledTableCell
                    fontWeight="600"
                    // leftborder={`2px solid ${statusColour(row.documentType)}`}
                    scope="row"
                  >
                    {row?.accountNo}
                  </StyledTableCell>
                  <StyledTableCell>{row?.name}</StyledTableCell>
                  <StyledTableCell>{row?.city}</StyledTableCell>

                  <StyledTableCell>{moment(row?.createdAt).format("DD-MM-YYYY")}</StyledTableCell>
                  <StyledTableCell >
                    <Box sx={{ cursor: "pointer" }}>
                      <VisibilityRoundedIcon color="success" fontSize="medium" onClick={() => navigate(`/single-customer/${row?._id}`)} />
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

export default CustomersPage;
