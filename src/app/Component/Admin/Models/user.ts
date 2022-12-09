export interface IUser {
  id: Number; 
  userName: string;
  email   : string;
  phoneNumber : string;
  password: string;
  confirmPassword: string;
  imagePath: string;
  isActive: boolean;
}
export class User
{
  id: Number=0 ;
  userName: string="";
  email   : string="";
  phoneNumber : string="";
  password: string="";
  confirmPassword: string="";
  imagePath: string="";
  isActive: boolean=true;
}