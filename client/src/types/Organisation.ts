import { Types } from 'mongoose';



export interface IOrganisation {
  _id?: Types.ObjectId;
  createdBy: Types.ObjectId;
  name: string;
  logo?: string;
  email: string;
  settings: {
		jobWorkflowTemplates: {
			workflowTemplateName: string
			workflowTemplateStagesList: string[]
		}[]
		productionStatusTemplates?: {
			statusTemplateName: string
			statusTemplateList: string[]
		}[]
	}
  accountNo?: string;
  tax?: number;
  abn?: number;
  users?: any[]; // If users have a specific structure, define an interface for them
  address: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
  phoneNumber: string;
  createdAt?: Date;
  updatedAt?: Date;
}
