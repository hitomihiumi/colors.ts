export function zebra(colors: any) {
    return function(letter: string, i: number, exploded: any): string | undefined {
        return i % 2 === 0 ? letter : colors.inverse(letter);
    };
};

export default zebra;
