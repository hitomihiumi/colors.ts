<a href="https://www.npmjs.com/package/@hitomihiumi/colors.ts"><img src="https://img.shields.io/npm/v/@hitomihiumi/colors.ts.svg?maxAge=3600" alt="npm version" /></a>
<a href="https://www.npmjs.com/package/@hitomihiumi/colors.ts"><img src="https://img.shields.io/npm/dt/@hitomihiumi/colors.ts.svg?maxAge=3600" alt="npm downloads" /></a>

## Get Started

1. Install the module by using `npm i @hitomihiumi/colors.ts`
2. Enjoy!

## Colors

### text colors

- `black`
- `red`
- `green`
- `yellow`
- `blue`
- `magenta`
- `cyan`
- `white`
- `gray`
- `grey`

### bright text colors

- `brightRed`
- `brightGreen`
- `brightYellow`
- `brightBlue`
- `brightMagenta`
- `brightCyan`
- `brightWhite`

### background colors

- `bgBlack`
- `bgRed`
- `bgGreen`
- `bgYellow`
- `bgBlue`
- `bgMagenta`
- `bgCyan`
- `bgWhite`
- `bgGray`
- `bgGrey`

### bright background colors

- `bgBrightRed`
- `bgBrightGreen`
- `bgBrightYellow`
- `bgBrightBlue`
- `bgBrightMagenta`
- `bgBrightCyan`
- `bgBrightWhite`

### styles

- `reset`
- `bold`
- `dim`
- `italic`
- `underline`
- `inverse`
- `hidden`
- `strikethrough`

### extras

- `rainbow`
- `zebra`
- `america`
- `trap`
- `random`

## Usage

```ts
import '@hitomihiumi/colors.ts';

console.log('hello'.green); // outputs green text
console.log('i like cake and pies'.underline.red); // outputs red underlined text
console.log('inverse the color'.inverse); // inverses the color
console.log('OMG Rainbows!'.rainbow); // rainbow
console.log('Run the trap'.trap); // Drops the bass
```

## Important Notes

Specify the `bold` argument only after all style labels, otherwise you will get an error (applies to TS only) 

```ts
console.log('hello'.green.bold);
```

## Enabling/Disabling Colors

The package will auto-detect whether your terminal can use colors and enable/disable accordingly. When colors are disabled, the color functions do nothing. You can override this with a command-line flag:

```bash
node myapp.js --no-color
node myapp.js --color=false

node myapp.js --color
node myapp.js --color=true
node myapp.js --color=always

FORCE_COLOR=1 node myapp.js
```

Or in code:

```ts
import { colors } from '@hitomihiumi/colors.ts';

colors.enable();
colors.disable();
```

## Custom themes

### Using standard API

```ts
import { colors } from '@hitomihiumi/colors.ts';

colors.setTheme({
  silly: 'rainbow',
  input: 'grey',
  verbose: 'cyan',
  prompt: 'grey',
  info: 'green',
  data: 'grey',
  help: 'cyan',
  warn: 'yellow',
  debug: 'blue',
  error: 'red'
});

declare global {
  interface String {
    silly: string;
    input: string;
    verbose: string;
    prompt: string;
    info: string;
    data: string;
    help: string;
    warn: string;
    debug: string;
    error: string;
  }
}

// outputs red text
console.log("this is an error".error);

// outputs yellow text
console.log("this is a warning".warn);
```

### Combining Colors

```ts
import { colors } from '@hitomihiumi/colors.ts';

colors.setTheme({
  custom: ['red', 'underline']
});

declare global {
    interface String {
        custom: string;
    }
}

console.log('test'.custom);
```
