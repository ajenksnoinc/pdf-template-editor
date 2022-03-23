import utils from "tests/utils";

import Background from "./index";

describe("components/boilerplate/Background", () => {
    let component;

    afterEach(() => {
        if(component) {
            component.unmount();
            component = null;
        }
    });

    it("mounts", () => {
        component = utils.render(<Background />);
        utils.expectComponentClass(component, "background");
    });

    utils.expectAsPropertySupport(Background);
});
