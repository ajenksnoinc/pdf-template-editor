export {};
// import hook from "css-modules-require-hook";
// import { DOMWindow, JSDOM } from "jsdom";
// import path from "path";
// import sass from "sass";

// hook({
//     extensions: [".scss", ".sass", ".css"],
//     preprocessCss: (_, file) => sass.renderSync({
//         includePaths: [ path.resolve(file, "..") ],
//         file
//     }).css
// });

// interface Global extends NodeJS.Global {
//     window: DOMWindow | Window,
//     document: Document,
//     navigator: {
//         userAgent: string
//     }
// }

// const globalNode: Global = {
//     ...global,
//     window,
//     document: window.document,
//     navigator: {
//         userAgent: "node.js"
//     }
// };

// // Simulate window for Node.js
// if(!globalNode.window && !globalNode.document) {
//     const { window } = new JSDOM("<!doctype html><html><body></body></html>", {
//         beforeParse(win) {
//             win.scrollTo = () => { };
//         },
//         pretendToBeVisual: false,
//         userAgent: "mocha"
//     });

//     // Configure global variables which like to be used in testing
//     globalNode.window = window;
//     globalNode.document = window.document;
//     globalNode.navigator = window.navigator;
// }
