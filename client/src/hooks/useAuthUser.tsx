import { decodeToken } from "react-jwt";
import { useSelector } from "react-redux";
import {
  selectCurrentUserToken,
  selectCurrentUserGoogleToken,
} from "../features/auth/authSlice";

// ✅ Define Type for Decoded Token
interface DecodedToken {
  roles: string[];
}

const useAuthUser = () => {
  const token = useSelector(selectCurrentUserToken);
  const googleToken = useSelector(selectCurrentUserGoogleToken);

  let isAdmin = false;
  let accessRight: "User" | "Admin" = "User"; // ✅ Restrict to valid values
  let roles: string[] = [];

  const decodeUserToken = (token: string | null): DecodedToken | null => {
    return token ? (decodeToken(token) as DecodedToken | null) : null;
  };

  const decodedToken = decodeUserToken(token);
  const gDecodedToken = decodeUserToken(googleToken);

  if (decodedToken?.roles) {
    roles = decodedToken.roles;
  } else if (gDecodedToken?.roles) {
    roles = gDecodedToken.roles;
  }

  isAdmin = roles.includes("Admin");
  if (isAdmin) accessRight = "Admin";

  return { roles, isAdmin, accessRight };
};

export default useAuthUser;
