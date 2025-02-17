import { Document, Types } from "mongoose";

export interface Customer extends Document {
  createdBy: Types.ObjectId;
  name: string;
  email: string;
  organisation: string;
  accountNo?: string;
  vatTinNo?: number;
  abn?: number;
  address?: string;
  city?: string;
  country?: string;
  phoneNumber: string;
  createdAt: Date;
  updatedAt: Date;
}
