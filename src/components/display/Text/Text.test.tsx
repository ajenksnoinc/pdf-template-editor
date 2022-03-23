import utils from "tests/utils";

jest.mock("../i18n", () => () => utils.translationString);

describe("components/display/Text", () => {
    let component = utils.withImport(() => import("./index"));

    it("mounts", () => {
        let element = component.render();
        utils.expectComponentTagName(element, "p");
    });

    utils.expectAsPropertySupport(component);

    utils.expectLocalizationSupport(component, "text", { localized: true }, (elem) => utils.getDOMNode(elem).textContent);
});
