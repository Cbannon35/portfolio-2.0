/**
 * 
 * @param {string} url
 * @returns {void}
 * @description "Resets" the URL to a given URL without a trailing '/'. 'resets' because used in context to reset url.
 */
export function resetURL(url) {
    if (url.endsWith('/')) { window.history.pushState({}, "", url.slice(0, -1)); }
    else { window.history.pushState({}, "", url); }
}

/**
 * 
 * @param {string} url
 * @returns {void}
 * @description Sets the URL to passed url.
 */
export function setURL(url) {
    window.history.pushState({}, "", url);
}

/**
 * 
 * @param {string} url
 * @returns {string} resulting pathname
 * @description Joins the current url with the passed url without appending '/' if the current path ends with '/'.
 */
export function joinURL(url) {
    const pathname = window.location.pathname;
    if (pathname.endsWith('/')) {
        return pathname + url;
    }
    return pathname + '/' + url;
}

/**
 * 
 * @param {string} url
 * @param {boolean} debug optional
 * @returns {void}
 * @description Sets the URL to the result of joining the current url with the passed url. If debug is true, logs the new path before setting it.
 */

export function joinAndSetURL(url, debug=false) {
    const new_path = joinURL(url);
    if (debug) { console.log('new_path', new_path); }
    setURL(new_path);
}