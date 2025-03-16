import { styled, TableRow, TableRowProps } from "@mui/material";
import { ReactNode } from "react";

// Define Props for StyledTableRow
interface StyledTableRowProps extends TableRowProps {
  bgColor?: string;
  children: ReactNode;
}

// Styled Component
const TableRowStyled = styled(TableRow)(({ theme }) => ({
  // Add custom styles here if needed
}));

// Functional Component with Type Safety
const StyledTableRow: React.FC<StyledTableRowProps> = ({ children, bgColor, ...props }) => {
  return (
    <TableRowStyled
      style={{
        background: bgColor, // ✅ Fixed incorrect syntax
      }}
      {...props} // ✅ Spread other TableRowProps like `onClick`, `sx`, etc.
    >
      {children}
    </TableRowStyled>
  );
};

export default StyledTableRow;
