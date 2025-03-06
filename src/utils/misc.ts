/**
 * Test if a bit is set in a flag
 * @param flag the flag
 * @param bit the bit to test
 * @returns true if the bit is set, false otherwise
 */
export function flagBitIsSet(flag: number, bit: number): boolean {
    return ((flag >> bit) & 1) == 1;
}

const formatter = new Intl.NumberFormat('en-US', {
    style: 'decimal',
    maximumFractionDigits: 0,
    useGrouping: true,
});

export function formatNumber(n: number): string {
    return formatter.format(n);
}

export function timeSinceEpoch(): number {
    const timestamp = Math.floor(Date.now() / 1000);
    return timestamp;
}

export function moveLastToFirst<T>(arr: T[]): T[] {
    if (arr.length === 0) return arr;
    const lastElement = arr.pop();
    if (lastElement !== undefined) {
        arr.unshift(lastElement);
    }
    return arr;
}

export function moveFirstToLast<T>(arr: T[]): T[] {
    if (arr.length === 0) return arr;
    const firstElement = arr.shift();
    if (firstElement !== undefined) {
        arr.push(firstElement);
    }
    return arr;
}
