import { useCallback, useEffect } from "react";

type Modifiers = { ctrl: boolean, shift: boolean, alt: boolean };
type NudgeHandler = (x: number, y: number, modifiers: Modifiers) => any;

interface Options {
    active: boolean;
    onNudge: NudgeHandler;
}

const keys = ["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"];

let listeners: NudgeHandler[] = [];
window.addEventListener("keydown", e => {
    if(keys.includes(e.key)) {

        let dx = (e.key === "ArrowLeft" && -1) || (e.key === "ArrowRight" && 1) || 0;
        let dy = (e.key === "ArrowUp" && -1) || (e.key === "ArrowDown" && 1) || 0;

        let modifiers = { ctrl: e.ctrlKey, shift: e.shiftKey, alt: e.altKey };

        for(let listener of listeners) {
            if(listener(dx, dy, modifiers)) {
                e.preventDefault();
                return;
            }
        }
    }
});

function useArrowKeys({
    active,
    onNudge
}: Options) {
    const callback = useCallback((dx, dy, modifiers) => {
        if(active) {
            onNudge(dx, dy, modifiers);
        }

        return active;
    }, [ onNudge, active ]);

    useEffect(() => {
        listeners.push(callback);

        return () => {
            listeners.splice(listeners.indexOf(callback), 1);
        };
    }, [ onNudge ]);
}

export default useArrowKeys;
