import { Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const Logo = (fontSize) => {
	return (
		<>
			<Link
				component={RouterLink}
				to="/"
				sx={{ 
					textDecoration: "none", 
					color: "#c7cbd4", 
					cursor: "pointer", 
					fontSize: fontSize,
					fontWeight: '500',
					fontFamily: 'Rubik Dirt',
					display:'flex',
					flexDirection:'row'
				 }}
			>
				<div style={{
					transform:"rotate(90deg)",
					marginRight:"5px",
					height:"48px",
					fontFamily: 'Londrina Sketch'
				}}>[=]</div>
				JobForge
			</Link>
		</>

	);
};

export default Logo;