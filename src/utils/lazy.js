import React from "react";

/**
 * Wraps around the Suspense/Lazy API, with a few additional guardrails
 * Also allows you to to call Component.preload() to actively load the component,
 * which is useful for components that need to display ASAP once needed, but
 * don't necessarily need to be a part of the page's bundle.
 */
const loadLazy = (loader, fallback = "Loading...") => {
    if(loader.isLazy)
        return loader;

    let Component = React.lazy(loader);

    function LazyLoadedComponent(props, ref) {
        return (
            <React.Suspense fallback={fallback}>
                <Component ref={ref} {...props} />
            </React.Suspense>
        );
    }

    let LazyComponent = React.forwardRef(LazyLoadedComponent);

    LazyComponent.isLazy = true;
    LazyComponent.preload = loader;

    return LazyComponent;
};

export default loadLazy;
export { loadLazy };
