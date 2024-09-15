export function rainbow(colors: any) {
    // RoY G BiV
    var rainbowColors = ['red', 'yellow', 'green', 'blue', 'magenta'];
    return function(letter: string, i: number, exploded: any): string | undefined {
        if (letter === ' ') {
            return letter;
        } else {
            return colors[rainbowColors[i++ % rainbowColors.length]](letter);
        }
    };
};

export default rainbow;
