import { Answer } from "./Answer.type";
export type Application = {
  id: number;
  createdBy: number;
  categoryId: number;
  clientId: number;
  answers: Answer[];
  location: string;
  comment: string;
};
