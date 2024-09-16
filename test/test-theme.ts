import { colors } from '../dist';

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
    error: 'red',
    custom: ['red', 'underline']
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
        custom: string;
    }
}

// outputs red text
console.log("this is an error".error);

// outputs yellow text
console.log("this is a warning".warn);

// outputs red underlined text
console.log('test'.custom);
