// import config from "~/config";
import qs from "qs";

export const getSearchParameters = (query = window.location.search) => {
    return qs.parse(query, { ignoreQueryPrefix: true });
};

export const getSearchParameter = id => {
    let params = new URLSearchParams(window.location.search);
    return params.get(id);
};

export const getHashParameters = () => {
    let hash = window.location.hash;
    if(!hash || !hash.length)
        return {};

    let test = "?" + hash.substring(1);
    return getSearchParameters(test);
};

export const getHashParameter = key => getHashParameters()[key];

export const getHashString = () => {
    let hash = window.location.hash;
    if(!hash || !hash.length)
        return "";

    return hash.replace(/^#!?/, ""); // Remove #
};

export const getQueryString = () => {
    let query = window.location.search;
    if(!query || !query.length)
        return "";

    return query.substring(1); // Remove ?
};

export default {
    getSearchParameters,
    getSearchParameter,
    getHashParameters,
    getHashParameter,
    getHashString,
    getQueryString
};
