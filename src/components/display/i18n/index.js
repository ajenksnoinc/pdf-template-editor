// https://xkcd.com/2044/

import { observable, action, observe } from "mobx";
import observesState from "~/hooks/observesState";
import { observer } from "mobx-react";

/** @type {import("mobx").IObservableValue<import("i18next").TFunction>} */
const translator = observable.box(e => e);
const lang = observable.box(null);

export const init = action(async() => {
    let { default: init, getCurrentLang } = await import("./service");
    let translate = await init();
    lang.set(getCurrentLang());

    translator.set(translate);
    return translate;
});

export const setLanguage = action(async(lang) => {
    if(!lang)
        return;
    let { setLanguage } = await import("./service");
    let translate = await setLanguage(lang);

    translator.set(translate);
    return translate;
});

export const getCurrentLanguage = () => lang;

export const observesLanguage = () => observesState(lang);

export const useLanguageKey = key => {
    observesLanguage();
    return translator.get()(key);
};

export const overrideTranslator = action((replacement = e => e) => {
    translator.set(replacement);
});

export const getCurrentTranslator = () => translator.get();

observe(translator, action(async() => {
    let { getCurrentLang } = await import("./service");
    lang.set(getCurrentLang());
}));

// Not well optimized, but we can do better later.
export default observer(({ tag }) => translator.get()(tag));
