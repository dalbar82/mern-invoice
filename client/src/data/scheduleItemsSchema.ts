export type Appointment = {
    jobName: string;
    jobNumber: string;
    contactName: string;
    contactPhone: string;
    jobAddressLong: {
      streetNumber: number;
      streetName: string;
      city: string;
      state: string;
      postcode: string;
    };
    jobAddressShort: string;
    assignees: string[]; // Array of strings
    due: string; // JavaScript Date object for date/time
    jobDetails: string;
  };
  
  export type AppointmentList = Appointment[];
  