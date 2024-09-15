import { colors } from './colors';

export = function() {
    //
    // Extends prototype of native string object to allow for "foo".red syntax
    //
    const addProperty = (color: string, func: (this: string) => string) => {
        Object.defineProperty(String.prototype, color, {
            get: func,
            enumerable: false,
            configurable: true,
        });
    };

    addProperty('strip', function() {
        return colors.strip(this);
    });

    addProperty('stripColors', function() {
        return colors.strip(this);
    });

    addProperty('trap', function() {
        return colors.trap(this);
    });

    addProperty('zalgo', function() {
        return colors.zalgo(this);
    });

    addProperty('zebra', function() {
        return colors.zebra(this);
    });

    addProperty('rainbow', function() {
        return colors.rainbow(this);
    });

    addProperty('random', function() {
        return colors.random(this);
    });

    addProperty('america', function() {
        return colors.america(this);
    });

    //
    // Iterate through all default styles and colors

    //
    const x = Object.keys(colors.styles);
    x.forEach(function(style) {
        addProperty(style, function() {
            return colors.stylize(this, style);
        });
    });

    function applyTheme(theme: Record<string,
        string | string[]>) {
        //
        // Remark: This is a list of methods that exist
        // on String that you should not overwrite.
        //
        const stringPrototypeBlacklist = [
            '__defineGetter__', '__defineSetter__', '__lookupGetter__',
            '__lookupSetter__', 'charAt', 'constructor', 'hasOwnProperty',
            'isPrototypeOf',
            'propertyIsEnumerable', 'toLocaleString', 'toString',
            'valueOf', 'charCodeAt', 'indexOf', 'lastIndexOf', 'length',
            'localeCompare', 'match', 'repeat', 'replace', 'search', 'slice',
            'split', 'substring', 'toLocaleLowerCase', 'toLocaleUpperCase',
            'toLowerCase', 'toUpperCase', 'trim', 'trimLeft', 'trimRight',
        ];

        Object.keys(theme).forEach(function(prop) {
            if (stringPrototypeBlacklist.indexOf(prop) !== -1) {
                // @ts-ignore
                console.log('warn: '.red + ('String.prototype' + prop).magenta +
                    ' is probably something you don\'t want to override.  ' +
                    'Ignoring style name');
            } else {
                if (typeof(theme[prop]) === 'string') {
                    // @ts-ignore
                    colors[prop] = colors[theme[prop]];
                    addProperty(prop, function() {
                        return colors[prop](this);
                    });
                } else
                {
                    const themePropApplicator = function(str?: string) {
                        // @ts-ignore
                        let ret = str || this;
                        for (let t = 0; t < theme[prop].length; t++) {
                            ret = colors[theme[prop][t]](ret);
                        }
                        return ret;
                    };
                    addProperty(prop, themePropApplicator);
                    colors[prop] = function(str:
                                                string) {
                        return themePropApplicator(str);
                    };
                }
            }
        });
    }

    colors.setTheme = function(theme: Record<string, string | string[]>) {
        if (typeof theme === 'string') {
            console.log('colors.setTheme now only accepts an object, not a string. ' +
                'If you are trying to set a theme from a file, it is now your (the ' +
                'caller\'s) responsibility to require the file.  The old syntax ' +
                'looked like colors.setTheme(__dirname + ' +
                '\'/../themes/generic-logging.js\'); The new syntax looks like '+
                'colors.setTheme(require(__dirname + ' +
                '\'/../themes/generic-logging.js\'));');
            return;

        } else {
            applyTheme(theme);

        }
    };
};
