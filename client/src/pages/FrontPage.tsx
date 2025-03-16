import React, { createContext, useState, useContext, JSX } from "react";
import { Box, Container, Typography } from "@mui/material";
import { configContext } from "../App";
import useTitle from "../hooks/useTitle";
import "./frontpage.css";
import DayView from "../modules/days/DayView";
import WeekView from "../modules/weeks/WeekView";
import MonthView from "../modules/months/MonthView";
import TopNav from "../components/Navigation/TopNav";

// ✅ Define Context Types
type DateContextType = [Date, React.Dispatch<React.SetStateAction<Date>>];
type ActiveViewType = [string, React.Dispatch<React.SetStateAction<string>>];

// ✅ Create Contexts with Proper Types
export const dateContext = createContext<DateContextType | null>(null);
export const activeViewContext = createContext<ActiveViewType | null>(null);

const FrontPage: React.FC = () => {
  useTitle("Scheduling");
  const config = useContext(configContext);

  const todayDate: Date = new Date();
  const [dateSelected, setDateSelected] = useState<Date>(todayDate);
  const [viewSelected, setViewSelected] = useState<string>("day");

  // ✅ Type the `selected` parameter correctly
  const viewRenderSwitch = (selected: string): JSX.Element => {
    switch (selected) {
      case "week":
        return <WeekView />;
      case "month":
        return <MonthView />;
      default:
        return <DayView />;
    }
  };

  return (
    <Container component="main" maxWidth="xl" sx={{ mt: 14, ml: 15, width: "90%" }}>
      <Box className="page-header">
        <Typography variant="h6">Scheduling</Typography>
      </Box>
      <div className="frontpage-container">
        <dateContext.Provider value={[dateSelected, setDateSelected]}>
          <activeViewContext.Provider value={[viewSelected, setViewSelected]}>
            <TopNav />
            {viewRenderSwitch(viewSelected)}
          </activeViewContext.Provider>
        </dateContext.Provider>
      </div>
    </Container>
  );
};

export default FrontPage;
