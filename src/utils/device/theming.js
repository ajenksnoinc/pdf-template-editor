//? Adds support for system dark theme detection.

const force = false;

if(window.matchMedia("(prefers-color-scheme: dark)").matches || force) {
    document.body.classList.add("is-dark-theme");
}

if(!force) {
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", e => {
        if(e.matches) {
            document.body.classList.add("is-dark-theme");
        } else {
            document.body.classList.remove("is-dark-theme");
        }
    });
}
