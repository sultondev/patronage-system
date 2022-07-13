import { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { userAtom, defaultUser } from "../recoil/atoms";
import { authProtectedApi } from "../config/axios.config";
import { useNavigate } from "react-router-dom";
const getUser = async () => {
  try {
    const { data } = await authProtectedApi().get("/auth/me");
    return data;
  } catch (error) {
    return null;
  }
};
export const useUser = () => {
  const [user, setUser] = useRecoilState(userAtom);
  const navigate = useNavigate();

  const onMount = useCallback(async () => {
    if (!user.id) {
      const user = await getUser();
      if (user) {
        setUser(user);
      } else {
        navigate("/login");
      }
    }
  }, [setUser]);
  const logout = useCallback(async () => {
    setUser(defaultUser);
    localStorage.removeItem("token");
    navigate("/login");
  }, [setUser]);

  useEffect(() => {
    onMount();
  }, []);
  return { user, logout };
};
