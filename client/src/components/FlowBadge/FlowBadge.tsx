import React from 'react'
import './flow-badge.css'

interface FlowBadgeProps {
	title: string
}

const FlowBadge: React.FC<FlowBadgeProps> = ({ title }) => {
	return (
		<div className='flow-badge-container'>
			<h4>{title}</h4>
		</div>
	)
}

export default FlowBadge
