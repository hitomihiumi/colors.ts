import * as os from 'os';
import { hasFlag } from "./has-flag";

var env = process.env;

var forceColor: undefined | boolean = void 0;
if (hasFlag('no-color') || hasFlag('no-colors') || hasFlag('color=false')) {
    forceColor = false;
} else if (hasFlag('color') || hasFlag('colors') || hasFlag('color=true')
    || hasFlag('color=always')) {
    forceColor = true;
}
if (env.FORCE_COLOR) {
    forceColor = env.FORCE_COLOR.length === 0
        || parseInt(env.FORCE_COLOR, 10) !== 0;
}

function translateLevel(level: number) {
    if (level === 0) {
        return false;
    }

    return {
        level: level,
        hasBasic: true,
        has256: level >= 2,
        has16m: level >= 3,
    };
}

function supportsColor_1(stream: any) {
    if (forceColor === false) {
        return 0;
    }

    if (hasFlag('color=16m') || hasFlag('color=full')
        || hasFlag('color=truecolor')) {
        return 3;
    }

    if (hasFlag('color=256')) {
        return 2;
    }

    if (stream && !stream.isTTY && forceColor !== true) {
        return 0;
    }

    var min = forceColor ? 1 : 0;

    if (process.platform === 'win32') {
        // Node.js 7.5.0 is the first version of Node.js to include a patch to
        // libuv that enables 256 color output on Windows. Anything earlier and it
        // won't work. However, here we target Node.js 8 at minimum as it is an LTS
        // release, and Node.js 7 is not. Windows 10 build 10586 is the first
        // Windows release that supports 256 colors. Windows 10 build 14931 is the
        // first release that supports 16m/TrueColor.
        var osRelease = os.release().split('.');
        if (Number(process.versions.node.split('.')[0]) >= 8
            && Number(osRelease[0]) >= 10 && Number(osRelease[2]) >= 10586) {
            return Number(osRelease[2]) >= 14931 ? 3 : 2;
        }

        return 1;
    }

    if ('CI' in env) {
        if (['TRAVIS', 'CIRCLECI', 'APPVEYOR', 'GITLAB_CI'].some(function(sign) {
            return sign in env;
        }) || env.CI_NAME === 'codeship') {
            return 1;
        }

        return min;
    }

    if (env.TEAMCITY_VERSION) {
        return (/^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0
        );
    }

    if ('TERM_PROGRAM' in env) {
        var version = parseInt((env.TERM_PROGRAM_VERSION || '').split('.')[0], 10);

        switch (env.TERM_PROGRAM) {
            case 'iTerm.app':
                return version >= 3 ? 3 : 2;
            case 'Hyper':
                return 3;
            case 'Apple_Terminal':
                return 2;
            // No default
        }
    }

    if (env.TERM && /-256(color)?$/i.test(env.TERM)) {
        return 2;
    }

    if (env.TERM && /^screen|^xterm|^vt100|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
        return 1;
    }

    if ('COLORTERM' in env) {
        return 1;
    }

    if (env.TERM === 'dumb') {
        return min;
    }

    return min;
}

function getSupportLevel(stream?: any): boolean | { level: number; hasBasic: boolean; has256: boolean; has16m: boolean; } {
    var level = supportsColor_1(stream);
    return translateLevel(level);
}

const supportsColor = getSupportLevel;
const stdout = getSupportLevel(process.stdout);
const stderr = getSupportLevel(process.stderr);

export {
    supportsColor,
    stdout,
    stderr,
};
