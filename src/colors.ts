import { IColors, IStyles, IThemes, IMaps } from './types';
// @ts-ignore
import * as util from "util";

import * as styles0 from "./styles";

import { supportsColor } from "./system/supports-colors";

import americanFlag from "./custom/american";
import trap from "./custom/trap";
import zalgo from "./custom/zalgo";

import america from "./maps/america";
import zebra from "./maps/zebra";
import rainbow from "./maps/rainbow";
import random from "./maps/random";

const colors: IColors = {} as IColors;
colors.themes = {};

var ansiStyles = colors.styles = styles0.styles;
var defineProps = Object.defineProperties;
var newLineRegex = new RegExp(/[\r\n]+/g);

colors.supportsColor = supportsColor() as boolean;

if (typeof colors.enabled === 'undefined') {
    colors.enabled = colors.supportsColor !== false;
}

colors.enable = function() {
    colors.enabled = true;
};

colors.disable = function() {
    colors.enabled = false;
};

colors.stripColors = colors.strip = function(str: string): string {
    return ('' + str).replace(/\x1B\[\d+m/g, '');
};

colors.stylize = function stylize(str: string, style: string): string {
    if (!colors.enabled) {
        return str + '';
    }

    const styleMap = ansiStyles[style];

    if (!styleMap && style in colors) {
        return (colors as any)[style](str);
    }

    return styleMap.open + str + styleMap.close;
};

const matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;

const escapeStringRegexp = function(str: string): string {
    if (typeof str !== 'string') {
        throw new TypeError('Expected a string');
    }
    return str.replace(matchOperatorsRe, '\\$&');
};

function build(_styles: string[]) {
    const builder = function() {
        return applyStyle.apply(builder, arguments as any);
    };
    builder._styles = _styles;
    Object.setPrototypeOf(builder, proto);
    return builder;
}

const styles = (function() {
    const ret: any = {};
    ansiStyles.grey = ansiStyles.gray;
    Object.keys(ansiStyles).forEach(function(key) {
        ansiStyles[key].closeRe = new RegExp(escapeStringRegexp(ansiStyles[key].close), 'g');
        ret[key] = {
            get: function() {
                return build(this._styles.concat(key));
            }
        };
    });
    return ret;
})();

const proto = defineProps(function colors() {}, styles);

function applyStyle(this: any, ...args: any[]): string {
    let str = args.map((arg: any) => {
        if (arg != null && typeof arg === 'string') {
            return arg;
        } else {
            return util.inspect(arg);
        }
    }).join(' ');

    if (!colors.enabled || !str) {
        return str;
    }

    const newLinesPresent = str.indexOf('\n') !== -1;
    const nestedStyles = this._styles;

    let i = nestedStyles.length;
    while (i--) {
        const code = ansiStyles[nestedStyles[i]];
        str = code.open + str.replace(code.closeRe, code.open) + code.close;
        if (newLinesPresent) {
            str = str.replace(newLineRegex, (match: string) => {
                return code.close + match + code.open;
            });
        }
    }

    return str;
}

colors.setTheme = function(theme: Record<string, string | string[]>) {
    if (typeof theme === 'string') {
        console.log('colors.setTheme now only accepts an object, not a string.');
        return;
    }
    for (let style in theme) {
        if (theme.hasOwnProperty(style)) {
            colors[style] = function(str: string) {
                if (typeof theme[style] === 'object') {
                    return (theme[style] as string[]).reduce((out, styleName) => colors[styleName](out), str);
                }
                return colors[theme[style] as string](str);
            };
        }
    }
};

function init() {
    const ret: any = {};
    Object.keys(styles).forEach((name) => {
        ret[name] = {
            get: function() {
                return build([name]);
            }
        };
    });
    return ret;
}

const sequencer = function sequencer(map: string, str: string): string {
    // @ts-ignore
    return str.split('').map(map).join('');
};

// Custom formatter methods
colors.america = americanFlag;
colors.trap = trap;
colors.zalgo = zalgo;

// Maps
colors.maps = {} as IMaps;
colors.maps.america = america(colors);
colors.maps.zebra = zebra(colors);
colors.maps.rainbow = rainbow(colors);
colors.maps.random = random(colors);

for (const map in colors.maps) {
    if (colors.maps.hasOwnProperty(map)) {
        colors[map] = function(str: string) {
            // @ts-ignore
            return sequencer(colors.maps[map], str);
        };
    }
}

defineProps(colors, init());

require('./extendStringPrototype')();

export { colors };
