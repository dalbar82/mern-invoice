import { styled, TableCell, tableCellClasses, TableCellProps } from "@mui/material";
import { ReactNode } from "react";

// Define Props for StyledTableCell
interface StyledTableCellProps extends TableCellProps {
  width?: string;
  fontWeight?: number | string;
  fontColor?: string;
  radius?: string;
  leftborder?: string;
  align?: "left" | "center" | "right";
}

// Styled Component
const TableCellStyled = styled(TableCell)<StyledTableCellProps>(
  ({ theme, width, radius, leftborder, align }) => ({
    [`&.${tableCellClasses.head}`]: {
      color: "#fff",
      height: "75px",
      width: width, // ✅ Safe dynamic width
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 15,
      color: "#222222de",
      borderBottom: "1px solid #efefef",
      height: "85px",
      padding: "11px 16px",
      background: "white",
      borderRadius: radius, // ✅ Use value directly
      textAlign: align, // ✅ Ensure correct type
      borderLeft: leftborder, // ✅ Use value directly
    },
  })
);

// Functional Component with Type Safety
const StyledTableCell: React.FC<StyledTableCellProps & { children?: ReactNode }> = ({
  width,
  children,
  fontWeight,
  fontColor,
  radius,
  leftborder,
  align,
  ...props // ✅ Allow passing other TableCellProps (like `sx`)
}) => {
  return (
    <TableCellStyled
      width={width}
      radius={radius}
      leftborder={leftborder}
      align={align}
      sx={{ fontWeight }} // ✅ Corrected sx syntax
      style={{ color: fontColor }} // ✅ Corrected inline style syntax
      {...props} // ✅ Spread other TableCellProps
    >
      {children}
    </TableCellStyled>
  );
};

export default StyledTableCell;
