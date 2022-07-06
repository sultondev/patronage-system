import { atom } from "recoil";
export const authStatusStateData = atom({
  key: "authStatusStateData",
  default: false,
});

export const userAtom = atom({
  key: "userAtom",
  default: {
    id: null,
    username: "",
    name: "",
    surname: "",
    role: "",
    phone: null,
    createdAt: "",
    updatedAt: "",
  },
});
