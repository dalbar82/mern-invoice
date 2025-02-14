import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Box,
  CssBaseline,
  Divider,
  Stack,
  Toolbar,
  IconButton,
} from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import MuiDrawer from "@mui/material/Drawer";
import { styled, useTheme } from "@mui/material/styles";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { isExpired } from "react-jwt";
import { logOut } from "../../features/auth/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Logo from "./Logo";
import MenuList from "./MenuList";
import ProfileInfo from "./ProfileInfo";
import { User } from "../../types/User";
import { RootState, AppDispatch } from "../../app/store"; 

const drawerWidth = 240;

// ✅ Typed theme styles
const openedMixin = (theme: any) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: any) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

// ✅ Typing for Styled Components
interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: "18px",
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

// const Drawer = styled(MuiDrawer, {
//   shouldForwardProp: (prop: string) => prop !== "open", // ✅ Explicitly type `prop`
// })<{ open?: boolean }>(({ theme, open = false }) => ({
//   width: drawerWidth,
//   flexShrink: 0,
//   whiteSpace: "nowrap",
//   boxSizing: "border-box",
//   ...(open && {
//     ...openedMixin(theme),
//     "& .MuiDrawer-paper": openedMixin(theme),
//   }),
//   ...(!open && {
//     ...closedMixin(theme),
//     "& .MuiDrawer-paper": closedMixin(theme),
//   }),
// }));


const AuthNav: React.FC = () => {
  const { user, googleToken } = useSelector((state: RootState) => state.auth); 

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>(); 
  const theme = useTheme();
  const [open, setOpen] = useState<boolean>(false); 

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  useEffect(() => {
    if (googleToken) {
      const isMyTokenExpired = isExpired(googleToken);
      if (isMyTokenExpired) {
        dispatch(logOut());
        navigate("/login");
        toast.warning("Your session has expired, login again");
      }
    }
  }, [googleToken, navigate, dispatch]); // ✅ Corrected dependencies

  return (
    <Box sx={{ flexGrow: 1 }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        sx={{ color: "#0075b4" }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ marginRight: 5, ...(open && { display: "none" }) }}
            >
              <MenuIcon />
            </IconButton>
            <Logo fontSize="1.5rem" />
          </Toolbar>
          {/* <Box>
            {user?._id && <ProfileInfo user={user} />}
          </Box> */}
        </Stack>
      </AppBar>
      {/* <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon fontSize="large" />
            ) : (
              <ChevronLeftIcon fontSize="large" />
            )}
          </IconButton>
        </DrawerHeader>
        <MenuList />
      </Drawer> */}
    </Box>
  );
};

export default AuthNav;
