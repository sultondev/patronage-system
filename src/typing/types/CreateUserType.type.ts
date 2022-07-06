import { Roles } from "../enums/Role.enum";

export type CreateUserType = {
  username: string;
  email: string;
  password: string;
  id?: number;
  surename: string;
  name: string;
  role: Roles;
};
