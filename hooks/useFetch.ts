import { useState } from "react";
import axios from "axios";

const useFetch = (): [
  { loading: boolean; error: boolean; success: boolean },
  (endpoint: string, data?: any, callback?: () => any) => any
] => {
  const [state, setState] = useState({
    loading: false,
    success: false,
    error: false,
  });
  function handleFetch(endpoint: string, data?: any, callback?: () => void) {
    setState((state) => ({ ...state, loading: true }));
    axios
      .post(endpoint, {
        data: data,
      })
      .then(() => {
        setState(() => ({
          loading: false,
          error: false,
          success: true,
        }));
        if (callback) callback();
      })
      .catch(() => {
        setState(() => ({
          loading: false,
          success: false,
          error: true,
        }));
      });
  }

  return [{ ...state }, handleFetch];
};

export default useFetch;
