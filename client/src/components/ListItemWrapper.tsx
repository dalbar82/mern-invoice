import { ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material'

type ListItemWrapperProps = {
label: string,
text: string,
icon?: string
}

const ListItemWrapper: React.FC<ListItemWrapperProps>= ({ label, text, icon }) => {
	return (
		<>
			<ListItem
				sx={{
					padding: '20px',
					borderBottom: '1px solid #efefef',
					justifyContent: 'space-between'
				}}>
				{icon ? <ListItemIcon>{icon}</ListItemIcon> : ''}
				<ListItemText sx={{ flex: 'none' }}>
					<Typography
						variant='h6'
						sx={{ fontSize: 'medium' }}>
						{label}
					</Typography>
				</ListItemText>
				<ListItemText sx={{ flex: 'none' }}>
					<Typography sx={{ fontSize: 'medium', fontWeight: '300' }}>
						{text}
					</Typography>
				</ListItemText>
			</ListItem>
		</>
	)
}

export default ListItemWrapper
