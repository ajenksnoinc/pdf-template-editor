const now = () => new Date().getTime();

export const syncElements = className => {
    let lastStart = 0;

    const onStart = ({ target }) => {
        if(target.classList.contains(className)) { //! TODO: Only supports one animation for the element. Need to switch to combo className & animationName
            let time = now();
            if(!lastStart)
                lastStart = time;

            let diff = time - lastStart;
            target.style.setProperty("animation-delay", `${-diff}ms`);
        }
    };

    window.addEventListener("animationstart", onStart, true);
};
