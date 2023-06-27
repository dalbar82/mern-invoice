import { Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const Logo = () => {
	return (
		<>
			<Link
				component={RouterLink}
				to="/"
				sx={{ 
					textDecoration: "none", 
					color: "#c7cbd4", 
					cursor: "pointer", 
					fontSize: '1rem',
					fontWeight: '500'
				 }}
			>
				JobForge
			</Link>
		</>

	);
};

export default Logo;