/**
 * Test if a bit is set in a flag
 * @param flag the flag
 * @param bit the bit to test
 * @returns true if the bit is set, false otherwise
 */
export function flagBitIsSet(flag, bit) {
    return ((flag >> bit) & 1) == 1;
}
