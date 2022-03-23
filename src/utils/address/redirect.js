import { getHashParameters } from "./url";
import qs from "qs";

export const setHashParameters = (props, push = false) => {
    let hash = `#${qs.stringify({ ...getHashParameters(), ...props })}`;

    if(push) {
        window.history.pushState(null, null, hash);
    } else {
        window.history.replaceState(null, null, hash);
    }
};

export default {
    setHashParameters
};
