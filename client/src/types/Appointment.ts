type JobAddress = {
  streetNumber: number;
  streetName: string;
  city: string;
  state: string;
  postcode: string;
};

export type Appointment = {
  jobName: string;
  jobNumber: string;
  contactName: string;
  contactPhone: string;
  jobAddressLong: JobAddress;
  jobAddressShort: string;
  itemId: number;
  assigneeId: string;
  assigneeName: string;
  duration: string; // Consider changing to `number` if it's always numeric
  due: string; // Consider `Date` type if working with actual date objects
  startDate: string; // Consider `Date` if it's always a full date object
  startTime: string;
  jobDetails: string;
};

export type AppointmentList = Appointment[]