import {
    QueryFunctionContext,
    UseQueryOptions,
    useQuery,
} from '@tanstack/react-query';
import { getHeader } from '../ApiBase';
import { _Urls } from '../_Urls';
import axios from "axios"

export const useFetch = <T>(
    url: string,
    params?: object,
    config?: UseQueryOptions<T, Error, T, any>
) => {
    return useQuery<T, Error, T, any>(
        [url!, params],
        ({ queryKey, meta }) =>
            fetcher({ queryKey, meta}),
        {
            enabled: !!url,
            refetchOnWindowFocus: false,
            ...config,
        }
    );
};

export const fetcher = async <T>({
    queryKey,
    token,
}: QueryFunctionContext & { token?: any }): Promise<T> => {
    const [url, params] = queryKey;
    return axios
        .get<T>(`${url}`, {
            params: { ...(params as object) },
            headers: {
                Authorization: token ? `Bearer ${token}` : '',
                ...getHeader(),
            },
        })
        .then((res) => res.data);
};
