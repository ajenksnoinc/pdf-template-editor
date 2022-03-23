export type PaletteType = "hex" | "rgb" | "css";

export function createColorPalette(swatchCount: number, output: PaletteType) {
    let rgb = Array(swatchCount).fill(0).map((_,i) => {
        let h = (i * GOLDEN_RATIO) % 1.0;
        let m = (i * GOLDEN_RATIO) % 0.5;
        let v = Math.sqrt(1 - m);

        return fromHSV(h * 360, 0.5, v).map(x => Math.round(x * 255));
    });

    switch(output) {
        case "rgb": return rgb;

        case "css": return rgb.map(x => {
            return `rgb(${x[0]}, ${x[1]}, ${x[2]})`;
        });

        case "hex": return rgb.map(rgb => {
            let r = rgb[0].toString(16).padStart(2, "0");
            let g = rgb[1].toString(16).padStart(2, "0");
            let b = rgb[2].toString(16).padStart(2, "0");
            return "#" + r + g + b;
        });
    }
}

export function fromHSV(h: number, s: number, v: number) {
    let f = (n, k = (n + h / 60) % 6) => v - v * s * Math.max(Math.min(k, 4 - k, 1), 0);
    return [f(5), f(3), f(1)];
}

export function toHSV(r, g, b) {
    let v = Math.max(r, g, b), c = v - Math.min(r, g, b);
    let h = c && ((v == r) ? (g - b) / c : ((v == g) ? 2 + (b - r) / c : 4 + (r - g) / c));
    return [60 * (h < 0 ? h + 6 : h), v && c / v, v];
}

export function mod(dividend, divisor, precision = 10) {
    let result = (dividend / divisor).toString();
    let dot = result.indexOf(".");

    if(dot == -1) {
        return 0; // it was a perfect division (9 / 3 for example)
    }

    let remainder = Number("0." + result.substr(dot + precision));  // get the part after the precision
    return Math.round(remainder * divisor);                 // multiply it by the divisor and round the result
}

export const GOLDEN_RATIO = 0.618033988749895;
