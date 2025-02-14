import React from "react";
import { styled } from "@mui/material/styles";

interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  container?: boolean;
  item?: boolean;
  spacing?: number;
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  children: React.ReactNode;
}

const Grid = styled("div")<GridProps>(
  ({ container, item, spacing, xs, sm, md, lg, xl}) => ({
    display: container ? "flex" : "block",
    flexWrap: container ? "wrap" : undefined,
    gap: container ? `${spacing ?? 0}px` : undefined,
    flexBasis: item ? "0" : undefined,
    flexGrow: item ? 1 : undefined,
    maxWidth: item ? "100%" : undefined,  
    

    ...(xs && {
      flexBasis: `${(xs / 12) * 100}%`,
      maxWidth: `${(xs / 12) * 100}%`,
    }),
    ...(sm && {
      "@media (min-width:600px)": {
        flexBasis: `${(sm / 12) * 100}%`,
        maxWidth: `${(sm / 12) * 100}%`,
      },
    }),
    ...(md && {
      "@media (min-width:960px)": {
        flexBasis: `${(md / 12) * 100}%`,
        maxWidth: `${(md / 12) * 100}%`,
      },
    }),
    ...(lg && {
      "@media (min-width:1280px)": {
        flexBasis: `${(lg / 12) * 100}%`,
        maxWidth: `${(lg / 12) * 100}%`,
      },
    }),
    ...(xl && {
      "@media (min-width:1920px)": {
        flexBasis: `${(xl / 12) * 100}%`,
        maxWidth: `${(xl / 12) * 100}%`,
      },
    }),
  })
);

export default Grid;
