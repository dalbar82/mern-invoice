import '../styles/jobForgeModularDiagramStyles.css'
import React from 'react'

const JobForgeModularDiagram = () => {
	return (
		<>
			<div className='diagram-container' style={{zIndex: 20}}>
				<div className='services-container'>
					<span
						className='modules'
						id='inventory'>
						Inventory
					</span>
					<span
						className='modules'
						id='suppliers'>
						Suppliers
					</span>
					<span
						className='modules'
						id='production'>
						Production
					</span>
					<span
						className='modules'
						id='phone-app'>
						Phone App
					</span>
					<span
						className='modules'
						id='analytics'>
						Analytics
					</span>
					{/* <span className='modules' id="the-forge">The Forge</span> */}
				</div>

				<p
					style={{
						position: 'absolute',
						top: '80px',
						fontSize: '12px',
						color: 'white',
					}}>
					Choose your Services
				</p>
				<span
					className='modules'
					id='job-forge'>
					JobForge
				</span>
				<span id='split'></span>
				<p
					style={{
						position: 'absolute',
						bottom: '80px',
						fontSize: '12px',
						color: 'white',
					}}>
					Choose your Industry
				</p>

				<div className='industries-container'>
					<span
						className='modules'
						id='signage'>
						Signage
					</span>
					<span
						className='modules'
						id='design'>
						Design
					</span>
					<span
						className='modules'
						id='print'>
						Print
					</span>
					<span
						className='modules'
						id='film'>
						Film
					</span>
					<span
						className='modules'
						id='audio'>
						Audio
					</span>
				</div>
			</div>
		</>
	)
}

export default JobForgeModularDiagram
