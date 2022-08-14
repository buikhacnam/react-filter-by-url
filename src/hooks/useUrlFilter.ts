import { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

/**
 *
 * @Author Casey Bui
 * @Email buikhacnam11@gmail.com
 * @Github https://github.com/buikhacnam
 * @License MIT
 */

export function useUrlFilter(params: string[], apiUrl: string) {
    const query = useQuery();
    const navigate = useNavigate();
    const [apiQuery, setApiQuery] = useState<string>(apiUrl);
    const [queryString, setQueryString] = useState<string>('');

    const handleSelectFilter = (name: string, value: string): void => {
        const filter = convertParamsToFilterObject(params);
        filter[name] = value;
        const query = buildQuery(params, filter);
        setApiQuery(apiUrl + query);
        setQueryString(query);
        navigate(query);
    };

    const buildQuery = (params: string[], filter: any): string => {
        let url = '?';
        params.forEach((param) => {
            url += `&${param}=${filter[param]}`;
        });
        return url;
    };

    const convertParamsToFilterObject = (params: string[]): any => {
        const filter: any = {};
        params.forEach((param: string) => {
            filter[param] = query.get(param) || '';
        });
        return filter;
    };

    const getDefaultParamValue = (params: string, defaultValue: string): string => {
        return query.get(params) || defaultValue;
    };

    return {
        apiQuery,
        queryString,
        getDefaultParamValue,
        handleSelectFilter
    };
}

function useQuery() {
    const { search } = useLocation();
    return useMemo(() => new URLSearchParams(search), [search]);
}
