// utils.js

/**
 * Generates a random integer between min (inclusive) and max (inclusive).
 * @param {number} min - The minimum value.
 * @param {number} max - The maximum value.
 * @returns {number} - A random integer between min and max.
 */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Capitalizes the first letter of a string.
 * @param {string} str - The string to capitalize.
 * @returns {string} - The capitalized string.
 */
function capitalizeFirstLetter(str) {
    if (typeof str !== 'string' || str.length === 0) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Checks if a value is an array.
 * @param {*} value - The value to check.
 * @returns {boolean} - True if the value is an array, f`alse otherwise.
 */
function isArray(value) {
    return Array.isArray(value);
}

/**
 * Deep clones an object or array.
 * @param {Object|Array} obj - The object or array to clone.
 * @returns {Object|Array} - The cloned object or array.
 */
function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

/**
 * Debounces a function, making it only callable after a certain delay.
 * @param {Function} func - The function to debounce.
 * @param {number} wait - The delay in milliseconds.
 * @returns {Function} - The debounced function.
 */
function debounce(func, wait) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

module.exports = {
    getRandomInt,
    capitalizeFirstLetter,
    isArray,
    deepClone,
    debounce
};