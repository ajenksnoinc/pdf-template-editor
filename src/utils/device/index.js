const features = {
    theming: {
        enabled: true,
        factory: () => import("./theming")
    },
    mobile: {
        enabled: true,
        factory: () => import("./mobile")
    }
};

Object.keys(features).forEach(x => features[x].enabled && features[x].factory());
