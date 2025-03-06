/**
 * Test if a bit is set in a flag
 * @param flag the flag
 * @param bit the bit to test
 * @returns true if the bit is set, false otherwise
 */
export function flagBitIsSet(flag, bit) {
    return ((flag >> bit) & 1) == 1;
}
const formatter = new Intl.NumberFormat('en-US', {
    style: 'decimal',
    maximumFractionDigits: 0,
    useGrouping: true,
});
export function formatNumber(n) {
    return formatter.format(n);
}
export function timeSinceEpoch() {
    const timestamp = Math.floor(Date.now() / 1000);
    return timestamp;
}
export function moveLastToFirst(arr) {
    if (arr.length === 0)
        return arr;
    const lastElement = arr.pop();
    if (lastElement !== undefined) {
        arr.unshift(lastElement);
    }
    return arr;
}
export function moveFirstToLast(arr) {
    if (arr.length === 0)
        return arr;
    const firstElement = arr.shift();
    if (firstElement !== undefined) {
        arr.push(firstElement);
    }
    return arr;
}
