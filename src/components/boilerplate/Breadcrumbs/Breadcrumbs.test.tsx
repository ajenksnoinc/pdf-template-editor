import utils from "tests/utils";

import Breadcrumbs from "./index";

describe("components/boilerplate/Breadcrumbs", () => {
    let component;

    afterEach(() => {
        if(component) {
            component.unmount();
            component = null;
        }
    });

    it("mounts", () => {
        component = utils.render(<Breadcrumbs />);
        utils.expectComponentClass(component, "breadcrumbs");
    });

    utils.expectAsPropertySupport(Breadcrumbs);
});
