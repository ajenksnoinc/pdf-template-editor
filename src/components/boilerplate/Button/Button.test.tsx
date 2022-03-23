import utils from "tests/utils";

jest.mock("~/components/display/Text", () => () => utils.translationString);

describe("components/boilerplate/Button", () => {
    let component = utils.withImport(() => import("./index"));

    it("mounts", () => {
        let element = component.render();
        utils.expectComponentClass(element, "btn");
    });

    utils.expectAsPropertySupport(component);

    utils.expectVariantSupport(component, ["normal", "rounded"], (elem, variant) => {
        return utils.getDOMNode(elem).classList.contains(`is-${variant}`);
    });
});
