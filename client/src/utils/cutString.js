export const cutString = (str, length) => {
    if (str.length <= length) {
        return str;
    }
    if (str.length > length) {
        return str.slice(0, length) + '...';
    }
}
