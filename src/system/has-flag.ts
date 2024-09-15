function hasFlag (flag: string, argv?: string[]) {
    argv = argv || process.argv;

    var terminatorPos = argv.indexOf('--');
    var prefix = /^-{1,2}/.test(flag) ? '' : '--';
    var pos = argv.indexOf(prefix + flag);

    return pos !== -1 && (terminatorPos === -1 ? true : pos < terminatorPos);
};

export { hasFlag }
