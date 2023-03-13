import { AxiosRequestConfig } from "axios";
import { useReducer, useEffect, useCallback } from "react";
import { authProtectedApi } from "../config/axios.config";

type State<T = any> = {
  loading: boolean;
  error: string | null;
  data: T;
};

type Payload = {
  type: "init" | "success" | "error";
  data?: any;
};

const initialState: State = {
  data: null,
  loading: false,
  error: null,
};

const reducer = (state: State, payload: Payload): State => {
  switch (payload.type) {
    case "init":
      return { ...state, loading: true };
    case "success":
      return { ...state, loading: false, data: payload.data };
    case "error":
      return { ...state, loading: false, error: payload.data };
    default:
      return state;
  }
};

export const useApi = <T = any>(
  url: string,
  config?: AxiosRequestConfig<any>
): State<T> => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const get = useCallback(async (url: string) => {
    dispatch({ type: "init" });
    try {
      const { data } = await authProtectedApi().get(url, config);
      dispatch({ type: "success", data });
    } catch (error) {
      dispatch({ type: "error", data: error });
    }
  }, []);

  useEffect(() => {
    get(url);
  }, [url]);

  return { ...state };
};
