import { useState, useMemo } from "react";
import {
  Box,
  Button,
  Tooltip,
  Paper,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TablePagination,
  TableRow,
  Container,
} from "@mui/material";
import Typography from "../../../components/Typography/Typography";
import EnhancedTableHead from "../EnhancedTableHead";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import { useNavigate } from "react-router-dom";
import StyledTableCell from "../../StyledTableCell";
import StyledTableRow from "../../StyledTableRow";
import Spinner from "../../Spinner";
import GroupAddRoundedIcon from "@mui/icons-material/GroupAddRounded";
import moment from "moment";

interface TableColumn {
  id: string;
  numeric: boolean;
  disablePadding: boolean;
  label: string;
  align?: "left" | "right" | "center";
}

interface MaterialTableProps<T> {
  title: string;
  data: T[];
  columns: TableColumn[];
  isLoading: boolean;
  setPageSelected?: (page: number) => void;
  onRowClick?: (row: T) => void;
  onAddClick?: () => void;
  getStatusColor?: (status: string) => string;
}

const MaterialTable = <T extends { _id: string }>({
  title,
  data,
  columns,
  isLoading,
  onRowClick,
  onAddClick,
  getStatusColor,
  setPageSelected
}: MaterialTableProps<T>) => {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<string>(columns[0]?.id || "");

  const handleRequestSort = (_event: React.MouseEvent<unknown>, property: string) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPageSelected?.(newPage)
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const sortedRows = useMemo(() => {
    return [...data].sort((a, b) => {
      if (b[orderBy as keyof T] < a[orderBy as keyof T]) return order === "asc" ? -1 : 1;
      if (b[orderBy as keyof T] > a[orderBy as keyof T]) return order === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, order, orderBy]);

  const visibleRows = sortedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : !data.length ? (
        <div>No projects</div>
      ) : (
        <TableContainer component={Paper} sx={{ mt: 2, backgroundColor: "transparent", boxShadow: "none" }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple-table">
            <EnhancedTableHead order={order} orderBy={orderBy} onRequestSort={handleRequestSort} headCells={columns} />
            <TableBody>
              {visibleRows.map((row) => (
                <StyledTableRow key={row._id} sx={{ cursor: onRowClick ? "pointer" : "default" }} onClick={() => onRowClick?.(row)}>
                  {columns.map((column) => (
                    <StyledTableCell key={column.id} fontWeight={column.id === "documentNumber" ? "600" : "normal"}>
                    {column.id === "status" ? (
                      <Chip sx={{ backgroundColor: getStatusColor?.(String(row[column.id as keyof T])) || "#eeeeee" }} label={String(row[column.id as keyof T])} />
                    ) : column.id === "dueDate" ? (
                      moment(String(row[column.id as keyof T])).format("DD-MM-YYYY")
                    ) : column.id === "view" ? (
                      <Box sx={{ cursor: "pointer" }}>
                        <VisibilityRoundedIcon color="success" fontSize="medium" onClick={() => navigate(`/edit-doc/${row._id}`)} />
                      </Box>
                    ) : typeof row[column.id as keyof T] === "string" || typeof row[column.id as keyof T] === "number" ? (
                      String(row[column.id as keyof T]) // Ensure it's a valid ReactNode
                    ) : null}
                  </StyledTableCell>
                  ))}
                </StyledTableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                  colSpan={columns.length}
                  count={data.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  sx={{
                    background: "white",
                    borderTop: "10px solid #fbfcfc",
                  }}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default MaterialTable;
