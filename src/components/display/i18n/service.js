import i18next from "i18next";
import Backend from "i18next-chained-backend";
import fetchBackend from "i18next-fetch-backend";
import localStorageBackend from "i18next-localstorage-backend";
import languageDetector from "i18next-browser-languagedetector";

export default () => i18next.use(Backend).use(languageDetector).init({
    fallbackLng: "en-US",
    detection: {
        caches: [ "localStorage" ]
    },
    backend: {
        backends: [ localStorageBackend, fetchBackend ],
        backendOptions: [{
            prefix: "i18n_loc_",
            expirationTime: 7 * 24 * 3600000 // 7 day locale caching
        }, {
            loadPath: "/assets/lang/{{lng}}/{{ns}}.json"
        }]
    }
});

export const getCurrentLang = () => i18next.language || "en-US";

export const setLanguage = lang => i18next.changeLanguage(lang);
