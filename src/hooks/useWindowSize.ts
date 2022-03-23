import { useCallback, useEffect, useState } from "react";

interface Dimensions {
    width: number;
    height: number;
}

const getWindowSize = () => ({
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight
});

function useWindowSize() {
    let [ size, setSize ] = useState<Dimensions>(getWindowSize);

    const callback = useCallback(() => {
        setSize(getWindowSize());
    }, [ setSize ]);

    useEffect(() => {
        window.addEventListener("resize", callback);

        return () => {
            window.removeEventListener("resize", callback);
        };
    }, [ callback ]);

    return size;
}

export default useWindowSize;
