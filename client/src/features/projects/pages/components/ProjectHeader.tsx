import React from 'react';
import { Container, Typography, Grid } from '@mui/material';
import '../../projects.css'

interface ProjectHeaderProps {
  documentType: string;
  documentNumber: string | null;
  createdAt: Date | null;
  name: string | null;
  customer: string | null;
  subTotal: number | null;
  salesTax: number | null;
  total: number | null;
}

const ProjectHeader: React.FC<ProjectHeaderProps> = ({
  documentType,
  documentNumber,
  createdAt,
  name,
  customer,
  subTotal,
  salesTax,
  total,
}) => {
  return (
    <Container sx={{ paddingY: 0 }} className="project-header">
      {!documentNumber ? 
          <div>
            <Typography>No Project selected</Typography>
          </div>
      :
        <div style={{display: "flex", justifyContent: "space-between"}}>
        {/* Project Name & Customer */}
          <div className='header-grid-item flex-column' style={{justifyContent: "space-between", maxWidth: "400px"}}>
            <Typography variant="h4" sx={{color: '#4f4f4f', maxHeight: "45px", overflow: "hidden"}}>{name}</Typography>
            <Typography><strong>Customer:</strong> {customer}</Typography>
          </div>

          {/* Document Details */}
          <div className='header-grid-item flex-column'>
            <Typography variant="h5" sx={{fontWeight: 'bold'}}>{documentType}</Typography>
            <Typography sx={{color: '#6d6d6f'}}>{documentNumber}</Typography>
            <Typography><strong>Created At:</strong> {createdAt?.toDateString()}</Typography>
          </div>

          {/* Financial Summary */}
          <div className='header-grid-item totals flex-row'>
            <div className='labels flex-column' style={{alignItems: "flex-end", marginLeft: '25px', justifyContent: 'space-between'}}>
              <strong>SubTotal:</strong>
              <strong>Sales Tax:</strong>
              <strong>Total:</strong> 
            </div>
            <div className='fields flex-column' style={{alignItems: "flex-end", marginLeft: '25px', justifyContent: 'space-between'}}>
              <Typography> ${subTotal?.toFixed(2)}</Typography>
              <Typography>${salesTax?.toFixed(2)}</Typography>
              <Typography>${total?.toFixed(2)}</Typography>
            </div>
          </div>
        </div>
      }
    </Container>
  );
};

export default ProjectHeader;

// Usage Example
// <ProjectHeader 
//   documentType="Invoice" 
//   documentNumber="INV-12345" 
//   createdAt="2024-03-30" 
//   name="Project X" 
//   customer="John Doe" 
//   subTotal={1000} 
//   salesTax={100} 
//   total={1100} 
// />
