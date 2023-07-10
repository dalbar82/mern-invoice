import { Box } from "@mui/material";

const AuthWrapper = ({ children }) => {
	return (
		<Box
			className="main-bg-image"
			sx={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				height: "100vh",
			}}
		>
			{children}
		</Box>
	);
};

export default AuthWrapper;