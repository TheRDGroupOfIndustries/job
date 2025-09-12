export type Mail = {
  id: string;
  subject: string;
  body: string;
  sender: string;
  timestamp: string;
};


export interface Employee{
  _id: string;
  name: string;
  email: string;
  employeeID: string;
  otherDetails: string;

}