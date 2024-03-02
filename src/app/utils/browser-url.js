/**
 * Might not need these lol... was running into issues when I would try to 
 * route user to say /home#section, so I changed it to  /home/#section and next seemed to like it better.
 * 
 * So when a user pastes in the url /home/#section, the browser scrolls to the section, but the url displays as /home#section so idk..
 * If a user pastes in /home#section, it works occasionally? But then the url updates break.
 */

/**
 * 
 * @param {string} url
 * @returns {void}
 * @description "Resets" the URL to a given URL without a trailing '/'. 'resets' because used in context to reset url.
 */
export function resetURL(url) {
    if (url.endsWith('/')) { window.history.replaceState({}, "", url.slice(0, -1)); }
    else { window.history.replaceState({}, "", url); }
}

/**
 * 
 * @param {string} url
 * @returns {void}
 * @description Sets the URL to passed url.
 */
export function setURL(url) {
    window.history.replaceState({}, "", url);
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
        return pathname.slice(0, -1) + url;
    }
    return pathname + url;
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

/**
 * 
 * @param {string[]} sections a list of section ids that exist on the page
 * @param {string} currentSection the current section id
 * @param {Function} setCurrentSection a setState function to set the current section
 * @returns {void}
 * @description Handles scrolling and sets the current section based on the scroll position.
 */

export const handleScroll = (sections, currentSection, setCurrentSection) => {
            
    const scrollTop = window.scrollY;
    let flag = false;

    for (let i = sections.length - 1; i >= 0; i--) {

        const section = document.getElementById(sections[i]);
        if (!section) return;
        const sectionTop = section.offsetTop;

        if (scrollTop >= sectionTop) {

            if (currentSection !== sections[i]) {
                setCurrentSection(sections[i]);
                joinAndSetURL('#' + sections[i]);
            }
            flag = true;
            break;

        }
    }
    if (!flag && currentSection !== '') {
        setCurrentSection('');
        resetURL(window.location.pathname);
    }
};
