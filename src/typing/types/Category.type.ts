import { Application } from "./Application.type";
import { Schedule } from "./Schedule.type";

export type Category = {
  id: number;
  name: string;
  schedules: Schedule[];
  applications: Application[];
};
