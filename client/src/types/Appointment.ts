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
  duration: string; // If duration is a number, change to `number`
  due: string; // ISO Date String
  startDate: string;
  startTime: string;
  jobDetails: string;
};

export type AppointmentList = Appointment[]