
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