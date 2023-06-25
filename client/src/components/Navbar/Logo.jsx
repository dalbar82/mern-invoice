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
					color: "white", 
					cursor: "pointer", 
					fontSize: '1.5rem'
				 }}
			>
				JOB FORGE
			</Link>
		</>

	);
};

export default Logo;