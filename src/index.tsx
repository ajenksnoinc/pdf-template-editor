import "./assets";
import "./utils/device";

import ReactDOM from "react-dom";
// import * as serviceWorker from "./services/serviceWorker";

import PageManager from "./pages";

import "~/components/form/mixins";

ReactDOM.render(PageManager, document.getElementById("root"));
// serviceWorker.unregister();
