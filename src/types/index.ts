export type Mail = {
  _id: string;
  subject: string;
  to: {
    name: string;
    email: string;
    _id: string;

  }
  message: string;
  createdBy?: {
    name: string;
    email: string;
    _id: string;
  };
  createdAt?: string;
};


export interface Employee{
  _id: string;
  name: string;
  email: string;
  employeeID: string;
  otherDetails?: string;

}