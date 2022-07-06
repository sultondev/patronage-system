import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { userAtom } from "../recoil/atoms";
import { authProtectedApi } from "../config/axios.config";
const getUser = async () => {
  try {
    // must be myself
    const { data } = await authProtectedApi().get("/user/1");
    return data;
  } catch (error) {
    return null;
  }
};
export const useUser = () => {
  const [user, setUser] = useRecoilState(userAtom);
  const [error, setError] = useState("");
  useEffect(async () => {
    if (!user.id) {
      const user = await getUser();
      if (user) {
        setUser(user);
      } else {
        setError("User not found!");
      }
    }
  }, []);
  return { user, error };
};
