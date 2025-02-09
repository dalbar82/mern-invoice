
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
  roles: string[];
  organisation: string;
  active: boolean;
  refreshToken: string[];
  createdAt: Date;
  updatedAt: Date;
}
// export const newPerson = (): Person => {
//   return {
//     firstName,
//     lastName: faker.person.lastName(),
//     age: faker.number.int(40),
//     visits: faker.number.int(1000),
//     progress: faker.number.int(100),
//     createdAt: faker.date.anytime(),
//     status: faker.helpers.shuffle<Person['status']>([
//       'relationship',
//       'complicated',
//       'single',
//     ])[0]!,
//   }
// }