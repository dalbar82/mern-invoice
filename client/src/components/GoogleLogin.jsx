import Button from "@mui/material/Button";
import { FcGoogle } from "react-icons/fc";

const GoogleLogin = () => {
	const google = () => {
		// TODO: change this in production
		window.open("http://localhost:8080/api/v1/auth/google", "_self");
	};
	return (
		<Button variant="filled" sx={{ cursor: "pointer", width: '100%', boxShadow:'-2px 2px 7px 0px #c8cdd2' }} onClick={google} startIcon={<FcGoogle className="google-icon" />}>
			Google
		</Button>
	);
};

export default GoogleLogin;