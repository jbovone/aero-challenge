import { useState, SetStateAction } from "react";
import axios from "axios";

type state = { loading: boolean; error: boolean | string; success: boolean };
const useFetch = (): [
  state,
  (endpoint: string, data?: any, callback?: () => any, minWait?: number) => any,
  React.Dispatch<SetStateAction<state>>
] => {
  const [state, setState] = useState<state>({
    loading: false,
    success: false,
    error: false,
  });
  function handleFetch(
    endpoint: string,
    data?: any,
    callback?: () => void,
    minWait?: number
  ) {
    setState(() => ({
      loading: true,
      error: false,
      success: false,
    }));
    axios
      .post(endpoint, {
        data: data,
      })
      .then(() => {
        setTimeout(
          () => {
            setState(() => ({
              loading: false,
              error: false,
              success: true,
            }));
            if (callback) callback();
          },
          minWait ? minWait : 0
        );
      })
      .catch((error) => {
        console.log(error.body);
        setTimeout(
          () => {
            setState(() => ({
              loading: false,
              error: true,
              success: false,
            }));
          },
          minWait ? minWait : 0
        );
      });
  }

  return [{ ...state }, handleFetch, setState];
};

export default useFetch;
