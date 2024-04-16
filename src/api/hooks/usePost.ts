import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { _Urls } from "../_Urls";
import { getHeader } from "../ApiBase";

export const usePost = <TData, TError>(
  url: string,
  options?:
    | Omit<
        UseMutationOptions<TData, AxiosError<TError, unknown>, TData, unknown>,
        "mutationFn"
      >
    | undefined
) => {
  const mutation = useMutation<TData, AxiosError<TError>, TData>(
    (data) => {
      return axios({
        method: "POST",
        url: `${_Urls.root}/${url}`,
        data,
        headers: {
          ...getHeader(true),
        },
      });
    },
    { ...options }
  );

  return mutation;
};
