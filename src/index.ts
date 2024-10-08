export interface Color {
    (text: string): string;

    strip: Color;
    stripColors: Color;

    black: Color;
    red: Color;
    green: Color;
    yellow: Color;
    blue: Color;
    magenta: Color;
    cyan: Color;
    white: Color;
    gray: Color;
    grey: Color;

    brightRed: Color;
    brightGreen: Color;
    brightYellow: Color;
    brightBlue: Color;
    brightMagenta: Color;
    brightCyan: Color;
    brightWhite: Color;

    bgBlack: Color;
    bgRed: Color;
    bgGreen: Color;
    bgYellow: Color;
    bgBlue: Color;
    bgMagenta: Color;
    bgCyan: Color;
    bgWhite: Color;

    reset: Color;
    bold: Color;
    dim: Color;
    italic: Color;
    underline: Color;
    inverse: Color;
    hidden: Color;
    strikethrough: Color;

    rainbow: Color;
    zebra: Color;
    america: Color;
    trap: Color;
    random: Color;
    zalgo: Color;
    error: Color;
}

declare global {
    interface String {
        strip: string;
        stripColors: string;

        black: string;
        red: string;
        green: string;
        yellow: string;
        blue: string;
        magenta: string;
        cyan: string;
        white: string;
        gray: string;
        grey: string;

        brightRed: string;
        brightGreen: string;
        brightYellow: string;
        brightBlue: string;
        brightMagenta: string;
        brightCyan: string;
        brightWhite: string;

        bgBlack: string;
        bgRed: string;
        bgGreen: string;
        bgYellow: string;
        bgBlue: string;
        bgMagenta: string;
        bgCyan: string;
        bgWhite: string;

        reset: string;
        //@ts-ignore
        bold: string;
        dim: string;
        italic: string;
        underline: string;
        inverse: string;
        hidden: string;
        strikethrough: string;

        rainbow: string;
        zebra: string;
        america: string;
        trap: string;
        random: string;
        zalgo: string;
        error: string;
    }
}

import { colors } from "./colors";
export { colors }
