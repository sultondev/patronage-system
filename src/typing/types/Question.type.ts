import { Answer } from "./Answer.type";

export type Question = {
  id: number;
  title: string;
  scheduleId: number;
  answers?: Answer[];
};
