import { Navigate, Outlet, useLocation } from 'react-router-dom'
import useAuthUser from '../hooks/useAuthUser'

type AuthRequiredProps = {
	allowedRoles: {
		includes(role?: string): unknown
		User: 'User',
		Admin: 'Admin',
		Basic: 'Basic',
		Mobile: 'Mobile',
	}
}

const AuthRequired: React.FC<AuthRequiredProps> = ({ allowedRoles }) => {
	const location = useLocation()

	const { roles } = useAuthUser()

	return roles.some((role) => allowedRoles.includes(role)) ? (
		<Outlet />
	) : (
		<Navigate
			to='/login'
			state={{ from: location }}
			replace
		/>
	)
}

export default AuthRequired
