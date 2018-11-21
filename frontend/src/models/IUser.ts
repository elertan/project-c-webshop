import IBaseModel from "./IBaseModel";

interface IUser extends IBaseModel {
  email: string;
  token?: string;
  dateOfBirth?: Date;
  firstname?: string;
  lastname?: string;
}

export default IUser;
