import React from 'react'
import Box from '../../../components/Box/Box'

type AuthWrapperProps = {
	children: React.ReactNode
}

const AuthWrapper:React.FC<AuthWrapperProps> = ({ children }) => {
	return (
		<Box
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				height: '100vh',
			}}>
			{children}
		</Box>
	)
}

export default AuthWrapper
