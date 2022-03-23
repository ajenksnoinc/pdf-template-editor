// CloseDetector - Detect escape key, history back, etc

import { useEffect, useRef } from "react";

function CloseDetector({ onClose, disabled = false, children }) {
    const ref = useRef(null);

    useEffect(() => {
        let handler = e => {
            if(e.key === "Escape") {
                // e.preventDefault();
                // e.stopPropagation();
                return onClose("escape");
            }
        };

        if(!disabled) {
            window.addEventListener("keydown", handler, { capture: true });
        }

        return () => window.removeEventListener("keydown", handler);
    }, [ onClose, disabled ]);

    const handleClickOutside = (event) => {
        if(ref.current && ref.current !== event.target && !ref.current.contains(event.target)) {
            onClose(false);
        }
    };

    useEffect(() => {
        if(!disabled) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ ref, disabled ]);

    return children ? children(ref) : null;
}

export default CloseDetector;
