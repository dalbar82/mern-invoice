import {
	Box,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	styled,
} from "@mui/material";
import MenuText from "../MenuText";
import { useNavigate } from "react-router-dom";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import BarChartIcon from "@mui/icons-material/BarChart";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import Payments from "@mui/icons-material/Payments";
import useAuthUser from "../../hooks/useAuthUser";

const StyledList = styled(List)({
	"&:hover": {
		backgroundColor: "#555a64",
	},
});

const MenuList = () => {
	const navigate = useNavigate();

	const { isAdmin } = useAuthUser();

	return (
		<Box color="#c7cbd4">
			<StyledList>
				<ListItem disablePadding>
					<ListItemButton onClick={() => navigate("/profile")}>
						<ListItemIcon>
							<ManageAccountsIcon
								sx={{ fontSize: 25, color: "#c7cbd4" }}
							/>
						</ListItemIcon>
						<MenuText text="Manage Profile" />
					</ListItemButton>
				</ListItem>
			</StyledList>

			<StyledList>
				<ListItem disablePadding>
					<ListItemButton onClick={() => navigate("/dashboard")}>
						<ListItemIcon>
							<BarChartIcon
								sx={{ fontSize: 25, color: "#c7cbd4" }}
							/>
						</ListItemIcon>
						<MenuText text="Dashboard" />
					</ListItemButton>
				</ListItem>
			</StyledList>

			<StyledList>
				<ListItem disablePadding>
					<ListItemButton onClick={() => navigate("/documents")}>
						<ListItemIcon>
							<Payments
								sx={{ fontSize: 25, color: "#c7cbd4" }}
							/>
						</ListItemIcon>
						<MenuText text="Documents" />
					</ListItemButton>
				</ListItem>
			</StyledList>

			<StyledList>
				<ListItem disablePadding>
					<ListItemButton onClick={() => navigate("/customers")}>
						<ListItemIcon>
							<PeopleAltOutlinedIcon sx={{ fontSize: 25, color: "#c7cbd4" }}/>
						</ListItemIcon>
						<MenuText text="Customers" />
					</ListItemButton>
				</ListItem>
			</StyledList>

			{isAdmin && (
				<StyledList>
					<ListItem disablePadding>
						<ListItemButton onClick={() => navigate("/users")}>
							<ListItemIcon>
								<AdminPanelSettingsIcon
									sx={{ fontSize: 25, color: "#c7cbd4" }}
								/>
							</ListItemIcon>
							<MenuText text="Admin Panel" />
						</ListItemButton>
					</ListItem>
				</StyledList>
			)}
		</Box>
	);
};

export default MenuList;