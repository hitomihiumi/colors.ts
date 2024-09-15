export interface IColors {
    themes: IThemes;
    styles: IStyles;
    enabled: boolean;
    supportsColor: boolean;

    enable(): void;
    disable(): void;
    stripColors(str: string): string;
    strip(str: string): string;
    stylize(str: string, style: string): string;
    setTheme(theme: Record<string, string | string[]>): void;

    trap(str: string): string;
    zalgo(str: string): string;

    maps: IMaps;

    [key: string]: any;
}

export interface IThemes {
    [themeName: string]: {
        [style: string]: string | string[];
    };
}

export interface IStyles {
    [key: string]: {
        closeRe: RegExp;
        open: string; close: string };
}

export interface IMaps {
    [key: string]: (letter: string, i: number, exploded: any) => string | undefined
}
