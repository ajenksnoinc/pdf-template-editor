import utils from "tests/utils";

describe("components/boilerplate/ScrollBlocker", () => {
    let component = utils.withImport(() => import("./index"));

    it("mounts", () => {
        let element = component.render();
        expect(utils.getDOMNode(element)).toBeFalsy();
    });
});
