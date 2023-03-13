import { Question } from "./Question.type";
export type Schedule = {
  id: number;
  name: string;
  category: number;
  createdAt: string;
  updatedAt: string;
  questions: Question[];
};
