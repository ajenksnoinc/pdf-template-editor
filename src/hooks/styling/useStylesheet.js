import React from "react";

let cache = {};

export const useStylesheet = (url) => {
    React.useEffect(() => {
        let elem = cache[url];

        if(!elem) {
            elem = document.createElement("link");
            elem.rel = "stylesheet";
            elem.href = url;

            document.head.appendChild(elem);
            cache[url] = elem;
        }

        //? Commented out to keep stylesheet links in head, better perf w/ toggle buttons
        // return () => {
        //     if(document.head.contains(elem) && cache[url]) {
        //         elem.remove();
        //         delete cache[url];
        //     }
        // };
    }, [ url ]);
};

export default useStylesheet;
