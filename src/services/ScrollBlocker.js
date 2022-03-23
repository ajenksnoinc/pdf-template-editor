import createEmitter from "~/utils/emitter";
import getSize from "dom-helpers/scrollbarSize";

const blockers = new Set();
const events = createEmitter();
let oldPadding = null;

let recalc = false;

export const enableBlock = id => {
    let len = blockers.size;
    blockers.add(id);

    let success = blockers.size !== len;
    events.emit("enable", id, success);

    return success;
};

export const disableBlock = id => {
    let success = blockers.delete(id);
    events.emit("disable", id, success);

    return success;
};

events.on("enable", (id, success) => {
    document.body.classList.add("noscroll");

    if(success && blockers.size === 1) { // On first success, updated body padding
        oldPadding = document.body.style.paddingRight;

        document.body.style.paddingRight = getSize(recalc) + "px";

        if(!recalc) {
            recalc = true;
        }
    }
});

events.on("disable", () => {
    if(!blockers.size) {
        document.body.classList.remove("noscroll");
        document.body.style.paddingRight = oldPadding;
        oldPadding = "";
    }
});

export default { enableBlock, disableBlock };
