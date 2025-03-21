import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MenuIcon from "@mui/icons-material/Menu";
import { Box, Divider, Stack, Toolbar } from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import MuiDrawer from "@mui/material/Drawer";
import Drawer from "../Drawer/Drawer";
import IconButton from "@mui/material/IconButton";
import { styled, Theme, useTheme } from "@mui/material/styles";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { isExpired } from "react-jwt";
import { logOut } from "../../features/auth/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Logo from "./Logo";
import MenuList from "./MenuList";
import ProfileInfo from "./ProfileInfo";
import { RootState } from "../../app/store";
import { User } from "../../types/User";

const drawerWidth = 240;
interface AppBarProps extends MuiAppBarProps {
  open?: boolean; // ✅ Explicitly add 'open' prop
}
const DrawerHeader = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	justifyContent: "flex-end",
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open", // ✅ Prevent passing 'open' to DOM
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
// 	shouldForwardProp: (prop) => prop !== "open",
// })(({ theme, open }) => ({
// 	width: drawerWidth,
// 	flexShrink: 0,
// 	whiteSpace: "nowrap",
// 	boxSizing: "border-box",
// 	...(open && {
// 		...openedMixin(theme),
// 		"& .MuiDrawer-paper": openedMixin(theme),
// 	}),
// 	...(!open && {
// 		...closedMixin(theme),
// 		"& .MuiDrawer-paper": closedMixin(theme),
// 	}),
// }));

const AuthNav = () => {
	const { user, googleToken } = useSelector((state: RootState) => state?.auth);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const theme: Theme = useTheme();
	const [open, setOpen] = useState(false);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	useEffect(() => {
		if (googleToken) {
			const isMyTokenExpired = isExpired(googleToken);

			if (isMyTokenExpired) {
				dispatch(logOut());
				navigate("/login");
				toast.warning("Your session has expired, login again");
			}
		}
	}, [navigate, dispatch, googleToken]);

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="fixed" open={open} theme={theme as Theme}>
				<Stack
					direction="row"
					alignItems="center"
					justifyContent="space-between"
				>
					<Toolbar>
						<IconButton
							color="inherit"
							aria-label="open drawer"
							onClick={handleDrawerOpen}
							edge="start"
							sx={{
								marginRight: 5,
								...(open && { display: "none" }),
							}}
						>
							<MenuIcon fontSize="large" />
						</IconButton>
						<Logo fontSize="15px" />
					</Toolbar>
					<Box>
						<ProfileInfo user={user as User} />
					</Box>
				</Stack>
			</AppBar>
			<Drawer variant="permanent" open={open}>
				<DrawerHeader>
					<IconButton onClick={handleDrawerClose}>
						{theme.direction === "rtl" ? (
							<ChevronRightIcon
								color="success"
								fontSize="large"
							/>
						) : (
							<ChevronLeftIcon color="success" fontSize="large" />
						)}
					</IconButton>
				</DrawerHeader>
				<Divider />
				<MenuList />
			</Drawer>
		</Box>
	);
};

export default AuthNav;