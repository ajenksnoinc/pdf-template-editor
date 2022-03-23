import utils from "tests/utils";

import Badge from "./index";

describe("components/boilerplate/Badge", () => {
    let component;

    afterEach(() => {
        if(component) {
            component.unmount();
            component = null;
        }
    });

    it("mounts", () => {
        component = utils.render(<Badge />);
        utils.expectComponentClass(component, "badge");
    });

    utils.expectAsPropertySupport(Badge);
});
