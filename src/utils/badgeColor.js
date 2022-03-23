const palette = [
    "#ff8080",
    "#789bef",
    "#b0df6f",
    "#cd66c0",
    "#5db9aa",
    "#f3bb7a",
    "#8e71e3",
    "#6dd169",
    "#be5f7f",
    "#7bc9f7"
];

const len = palette.length;
export default function getBadgeColor(id) {
    return palette[id % len];
}
