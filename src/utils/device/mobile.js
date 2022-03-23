//? Another way to "detect" (somewhat-safely presume) mobile/desktop. Only time this doesn't work is if you have a touchscreen laptop/all-in-one PC.

const enableDesktop = () => {
    // console.log("Enabling desktop");
    document.body.classList.add("is-desktop");
    document.body.classList.remove("is-mobile");
};

const disableDesktop = () => {
    // console.log("Enabling mobile");
    document.body.classList.remove("is-desktop");
    document.body.classList.add("is-mobile");
};

let _mobile = !window.matchMedia("(hover)").matches;
export const isMobile = () => _mobile;

const update = () => {
    if(_mobile) {
        disableDesktop();
    } else {
        enableDesktop();
    }
};

window.matchMedia("(hover)").addEventListener("change", e => {
    console.log("E");
    _mobile = !e.matches;
    update();
});

update();

export default {
    isMobile
};
