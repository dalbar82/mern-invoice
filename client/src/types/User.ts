
export type Person = {
  firstName: string
  lastName: string
  age: number
  visits: number
  progress: number
  status: 'relationship' | 'complicated' | 'single'
  createdAt: Date
  subRows?: Person[]
}
export type UserRoles = string[];

export type User = {
  _id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  password?: string; // Optional because `select: false` in Mongoose schema
  passwordConfirm?: string;
  isEmailVerified: boolean;
  provider: "email" | "google";
  googleID?: string;
  avatar?: string;
  businessName?: string;
  phoneNumber?: string;
  address?: string;
  city?: string;
  country?: string;
  passwordChangedAt?: Date;
  roles: UserRoles;
  organisation: string;
  active: boolean;
  refreshToken: string[];
  createdAt: Date;
  updatedAt: Date;
  accessToken: string; // ✅ Access token
}  
