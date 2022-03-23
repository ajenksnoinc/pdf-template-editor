import utils from "tests/utils";

import BottomNav from "./index";

describe("components/boilerplate/BottomNav", () => {
    let component;

    afterEach(() => {
        if(component) {
            component.unmount();
            component = null;
        }
    });

    it("mounts", () => {
        component = utils.render(<BottomNav />);
        utils.expectComponentClass(component, "navbar-bottom");
    });

    utils.expectAsPropertySupport(BottomNav);
});
