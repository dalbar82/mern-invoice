import * as React from "react";
import Box from "@mui/material/Box";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import StyledTableCell from "../StyledTableCell";
import { visuallyHidden } from "@mui/utils";

// Define sorting order type
type Order = "asc" | "desc";

// Define the structure of each head cell
interface HeadCell {
  id: string;
  label: string;
  numeric?: boolean;
  disablePadding?: boolean;
  align?: string;
  radius?: string;
}

// Define component props type
interface EnhancedTableHeadProps {
  order: Order;
  orderBy: string;
  onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void;
  headCells: HeadCell[];
}

// Type-safe component using React.FC
const EnhancedTableHead: React.FC<EnhancedTableHeadProps> = ({
  order,
  orderBy,
  onRequestSort,
  headCells,
}) => {
  const createSortHandler = (property: string) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow
        style={{
          background:"linear-gradient(194deg, rgb(0, 117, 180) 0%, rgb(65, 162, 215) 100%)",
        }}
      >
        {headCells?.map((headCell) => (
          <StyledTableCell
            radius={headCell.radius}
            key={headCell.id}
            align={headCell.align ? "center" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
            fontColor="#fff"
          
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </StyledTableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default EnhancedTableHead;
