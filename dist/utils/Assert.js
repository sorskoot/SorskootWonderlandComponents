/**
 * Utility class for type assertions and validation.
 * Provides static methods to ensure values meet specific type requirements.
 */
export class Assert {
    /**
     * Asserts that a value is a string.
     * @param value - The value to check
     * @throws Error if the value is not a string
     */
    static isString(value) {
        if (typeof value !== 'string') {
            throw new Error('Value must be a string');
        }
    }
    /**
     * Asserts that a value is a number.
     * @param value - The value to check
     * @throws Error if the value is not a number
     */
    static isNumber(value) {
        if (typeof value !== 'number') {
            throw new Error('Value must be a number');
        }
    }
    /**
     * Asserts that an object has a specific key.
     * @param obj - The object to check
     * @param key - The key to verify exists on the object
     * @throws Error if the key does not exist on the object
     */
    static hasKey(obj, key) {
        if (!(key in obj)) {
            throw new Error(`Property ${String(key)} is missing`);
        }
    }
    /**
     * Asserts that a value is not null or undefined.
     * @param value - The value to check
     * @throws Error if the value is null or undefined
     */
    static isNotNull(value) {
        if (value == null) {
            throw new Error('Value cannot be null or undefined');
        }
    }
    /**
     * Asserts that a value is a boolean.
     * @param value - The value to check
     * @throws Error if the value is not a boolean
     */
    static isBoolean(value) {
        if (typeof value !== 'boolean') {
            throw new Error('Value must be a boolean');
        }
    }
    /**
     * Asserts that a value is an array.
     * @param value - The value to check
     * @throws Error if the value is not an array
     */
    static isArray(value) {
        if (!Array.isArray(value)) {
            throw new Error('Value must be an array');
        }
    }
    /**
     * Asserts that a value is an object (not null, not an array).
     * @param value - The value to check
     * @throws Error if the value is not an object
     */
    static isObject(value) {
        if (typeof value !== 'object' || value === null || Array.isArray(value)) {
            throw new Error('Value must be an object');
        }
    }
    /**
     * Asserts that a value is a function.
     * @param value - The value to check
     * @throws Error if the value is not a function
     */
    static isFunction(value) {
        if (typeof value !== 'function') {
            throw new Error('Value must be a function');
        }
    }
    /**
     * Asserts that a value is an instance of a specific class.
     * @param value - The value to check
     * @param constructor - The constructor to check against
     * @throws Error if the value is not an instance of the specified class
     */
    static isInstanceOf(value, constructor) {
        if (!(value instanceof constructor)) {
            throw new Error(`Value must be an instance of ${constructor.name}`);
        }
    }
}
