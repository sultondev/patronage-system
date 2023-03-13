import { atom, selector } from "recoil";
export const authStatusStateData = atom({
  key: "authStatusStateData",
  default: false,
});

export const defaultUser = {
  id: null,
  username: "",
  name: "",
  surname: "",
  role: "",
  phone: null,
  createdAt: "",
  updatedAt: "",
};

export const authTokenStateData = atom({
  key: "authTokenStateData",
  default: "",
});

export const userAtom = atom({
  key: "userAtom",
  default: defaultUser,
});

export const menuAtom = atom({
  key: "menuAtom",
  default: "hidden",
});

export const noOfPagesAtom = atom({
  key: "noOfPagesAtom",
  default: 0,
});

export const startStackAtom = atom({
  key: "startStackAtom",
  default: 1,
});

export const endStackAtom = atom({
  key: "endStackAtom",
  default: 10,
});
