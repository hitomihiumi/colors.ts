<a href="https://www.npmjs.com/package/@hitomihiumi/colors.ts"><img src="https://img.shields.io/npm/v/@hitomihiumi/colors.ts.svg?maxAge=3600" alt="npm version" /></a>
<a href="https://www.npmjs.com/package/@hitomihiumi/colors.ts"><img src="https://img.shields.io/npm/dt/@hitomihiumi/colors.ts.svg?maxAge=3600" alt="npm downloads" /></a>

## get color and style in your node.js console

![Demo](https://raw.githubusercontent.com/Marak/colors.js/master/screenshots/colors.png)

## Get Started

1. Install the module by using `npm i @hitomihiumi/colors.ts`
2. Enjoy!

## colors and styles!

### text colors

- black
- red
- green
- yellow
- blue
- magenta
- cyan
- white
- gray
- grey

### bright text colors

- brightRed
- brightGreen
- brightYellow
- brightBlue
- brightMagenta
- brightCyan
- brightWhite

### background colors

- bgBlack
- bgRed
- bgGreen
- bgYellow
- bgBlue
- bgMagenta
- bgCyan
- bgWhite
- bgGray
- bgGrey

### bright background colors

- bgBrightRed
- bgBrightGreen
- bgBrightYellow
- bgBrightBlue
- bgBrightMagenta
- bgBrightCyan
- bgBrightWhite

### styles

- reset
- bold
- dim
- italic
- underline
- inverse
- hidden
- strikethrough

### extras

- rainbow
- zebra
- america
- trap
- random


## Usage

By popular demand, `colors` now ships with two types of usages!

The super nifty way

```ts
import '@hitomihiumi/colors.ts';

console.log('hello'.green); // outputs green text
console.log('i like cake and pies'.underline.red); // outputs red underlined text
console.log('inverse the color'.inverse); // inverses the color
console.log('OMG Rainbows!'.rainbow); // rainbow
console.log('Run the trap'.trap); // Drops the bass
```

I prefer the first way. Some people seem to be afraid of extending `String.prototype` and prefer the second way.

If you are writing good code you will never have an issue with the first approach. If you really don't want to touch `String.prototype`, the second usage will not touch `String` native object.

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

```javascript
var colors = require('colors');
colors.enable();
colors.disable();
```

## Console.log [string substitution](http://nodejs.org/docs/latest/api/console.html#console_console_log_data)

```js
var name = 'Marak';
console.log(colors.green('Hello %s'), name);
// outputs -> 'Hello Marak'
```

## Custom themes

### Using standard API

```js

var colors = require('colors');

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

// outputs red text
console.log("this is an error".error);

// outputs yellow text
console.log("this is a warning".warn);
```

### Using string safe API

```js
var colors = require('colors/safe');

// set single property
var error = colors.red;
error('this is red');

// set theme
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

// outputs red text
console.log(colors.error("this is an error"));

// outputs yellow text
console.log(colors.warn("this is a warning"));

```

### Combining Colors

```javascript
var colors = require('colors');

colors.setTheme({
  custom: ['red', 'underline']
});

console.log('test'.custom);
```
