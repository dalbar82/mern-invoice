import { Document, Types } from "mongoose";

export interface PaymentRecord extends Document {
  paidBy?: string;
  datePaid?: string;
  amountPaid?: number;
  paymentMethod: 
    | "Cash"
    | "Mobile Money"
    | "PayPal"
    | "Credit Card"
    | "Bank Transfer"
    | "Others";
  additionalInfo?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface BillingItem {
  itemName: string;
  unitPrice: number;
  quantity: number;
  discount?: string;
  productionStatus: "Pre Production" | "Production" | "Complete";
}

export interface Customer {
  name?: string;
  email?: string;
  accountNo?: string;
  vatTinNo?: string;
  address?: string;
  city?: string;
  country?: string;
  phoneNumber?: string;
}

export interface JobDocument extends Document {
  createdBy: Types.ObjectId;
  customer?: Customer;
  documentType: "Invoice" | "Order" | "Quotation" | "Open" | "Paid";
  name?: string;
  documentNumber?: string;
  dueDate?: Date;
  additionalInfo?: string;
  termsConditions?: string;
  status: "Paid" | "Not Fully Paid" | "Not Paid";
  organisation?: string;
  subTotal?: number;
  salesTax?: number;
  rates?: string;
  total?: number;
  currency?: string;
  totalAmountReceived?: number;
  deliveryAddress?: string;
  deliveryCity?: string;
  deliveryState?: string;
  deliveryPostcode?: string;
  deliveryCountry?: string;
  deliveryNotes?: string;
  billingItems?: BillingItem[];
  paymentRecords?: PaymentRecord[];
  createdAt: Date;
  updatedAt: Date;
}
