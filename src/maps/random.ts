export function random(colors: any) {
    var available = ['underline', 'inverse', 'grey', 'yellow', 'red', 'green',
        'blue', 'white', 'cyan', 'magenta', 'brightYellow', 'brightRed',
        'brightGreen', 'brightBlue', 'brightWhite', 'brightCyan', 'brightMagenta'];
    return function(letter: string, i: number, exploded: any): string | undefined {
        return letter === ' ' ? letter :
            colors[
                available[Math.round(Math.random() * (available.length - 2))]
                ](letter);
    };
};

export default random;
