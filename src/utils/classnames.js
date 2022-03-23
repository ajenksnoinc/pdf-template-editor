// It's basically https://www.npmjs.com/package/classnames but with less features. We really don't need a dependency for just the below.


/**
 * Condense a list of class names and conditional class names into a single className property value
 */
export const classNames = (...classes) => classes.reduce((classes, entry) => {
    if(typeof entry === "string" && entry.trim().length) {
        return classes + " " + entry.trim();
    }

    if(Array.isArray(entry)) {
        return classes + " " + classNames(...entry);
    }

    if(typeof entry === "object") {
        let parsed = Object.keys(entry).filter(x => !!entry[x]);
        return classes + " " + parsed.join(" ");
    }

    return classes;
}, "").trim();

export default classNames;
