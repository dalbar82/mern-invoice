import React from 'react'
import FlowBadge from '../../../components/FlowBadge/FlowBadge'

const exampleWorkflow = [
	'Inspection/Site Visit',
	'Order parts',
	'Awaiting parts',
	'Fabricate',
	'Packing',
	'Ready',
]

const Workflow = ({ settings }) => {
	const workflowList = settings?.jobWorkflowTemplates[0]?.workflowTemplateStagesList
	return (
		<div>
			<div className='three-column-grid-parent'>
				<div
					className='grid-item-container'
					style={{
						padding: '24px 24px',
						backgroundColor: '#71cce8',
						color: 'white',
						// display: 'inline-grid',
						// gridColumnStart: 1,
						// gridColumnEnd: 4,
					}}>
					<div>
						<h4>Workflow setup</h4>
						<p>
							Here we add in the stages that any of your products or services may go
							through. These stages will show up on your Production Board, where you
							are able to manage all items of a job.
						</p>
						<p>
							Different to on-site scheduling, the production board is a tool used for
							managing any internal processes you have <em>before</em> a job item goes
							to site/is delivered. You will be able to assign your workflow stages to
							any line item on an order, as well as assign any team member to that
							particular stage within a line item. This gives you absolute power over
							you internal production management.
						</p>
					</div>
				</div>
				<div className='grid-item-container'>
					<div
						style={{
							padding: '24px 24px',
							background:
								'linear-gradient(194deg, rgb(0, 117, 180) 0%, rgb(65, 162, 215) 100%)',
							color: 'white',
						}}>
						<h4>Example Usage</h4>
						<p>
							As shown to the right, we have set you up with a default workflow that we
							feel covers the basics, but you can add, delete or rearrange this list to
							suit your business needs.
						</p>
						<p>
							This particular list could be used for all sorts of items you may sell.
						</p>
						<p>
							For instance, let's say you offer carpentry services and part of a job
							you have in the system requires custom cabinetry to be pre fabricated.
							You would add most likely add each of these stages to the item and assign
							it to the relevant staff members to ensure the item will run smoothly and
							there is accountability and transparency throughout.
						</p>
					</div>
				</div>
				<div className='grid-item-container'>
					<div>
						<input
							type='text'
							style={{ marginRight: '20px', width: '96%', height: '50px' }}
							label='Billing email'
							// value={''}
							onChange={(e) => {
								console.log(e.target.value)
							}}
						/>
					</div>
					<div style={{ overflowY: 'auto' }}>
						{workflowList.map((stage, i) => {
							return (
								<FlowBadge
									key={i}
									title={stage}
								/>
							)
						})}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Workflow
