import he from 'he';


export const filterWordLength = (name: string, length: number = 2) => {
    let splitNames = name.split(" ").filter(text => text.length);
    return (splitNames.length > length) ? splitNames.slice(0, length).join(" ") : name;
};

export const filterOnlyText = (text: string) => {
    const chars = '1234567890abcdefghijklmnopqrstuvwxyz'.split('');
    const stripped = text.split('').filter((char) => (char in chars));
    return stripped.join('');
}

export const formatName = (name: string, glue: string = " ") => {
    const splitNames = name.replace("  ", ' ').trim().split(' ');
    return {
        normal: splitNames[0] + ' ' + splitNames[splitNames.length - 1],
        full: splitNames.join(glue),
        first: splitNames[0],
        last: splitNames[splitNames.length - 1],
        middle: splitNames.length > 2 ? splitNames[1] : ""
    };
}

export const truncateText = (text: string, n: number, tail: string = "...") => {
    return (text?.length > n ? text.substr(0, n - 1) + tail : text);
}


export const capitalizeString = (sentence: string): string => {
    return sentence.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
}

export const nFormatter = (num: number, digits?: number) => {
    const lookup = [
        { value: 1, symbol: "" },
        { value: 1e3, symbol: "K" },
        { value: 1e6, symbol: "M" },
        { value: 1e9, symbol: "B" },
        { value: 1e12, symbol: "T" },
        { value: 1e15, symbol: "P" },
        { value: 1e18, symbol: "E" }
    ]

    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/
    const item = lookup.slice().reverse().find((item) => {
        return num >= item.value
    })
    return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0"
}

export const getInitials = (fullName: string) => {
    const allNames = fullName.trim().split(' ');
    const initials = allNames.reduce((acc, curr, index) => {
        if (index === 0 || index === allNames.length - 1) {
            acc = `${acc}${curr.charAt(0).toUpperCase()}`;
        }
        return acc;
    }, '');
    return initials;
}


export const stripHTMLAttributes = (text: string) => {
    const regex = /<[a-zA-Z]+\s*([^>]*)>/g;
    return text.replace(regex, '<$1>');
}

export const stripHTMLTags = (html: string) => {
    const decodedText = he.decode(html);
    return decodedText.replace(/<[^>]+>/g, '');
}