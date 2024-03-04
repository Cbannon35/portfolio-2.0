import About from './content/about';
import Experience from "./content/experience";
import Projects from "./content/projects";
import Teaching from "./content/teaching";
import Contact from "./content/contact";

/**
 * A section object
 * @typedef {Object} Section
 * @property {JSX.Element} component - The component representing the section.
 * @property {string[]} subsections - The subsections of the section.
 */

/**
 * The sections of the home page.
 * @type {Object}
 * @property {Section} About - The About section.
 * @property {Section} Experience - The Experience section.
 * @property {Section} Projects - The Projects section.
 * @property {Section} Teaching - The Teaching section.
 * @property {Section} Contact - The Contact section.
 */
export const sections = {
    'About': {
        component: About,
        subsections: ['']
    },
    'Experience': {
        component: Experience,
        subsections: ["HEL Researcher", "CS160 TA", "SWE Intern"]
    },
    'Projects': {
        component: Projects,
        subsections: ['']
    },
    'Teaching': {
        component: Teaching,
        subsections: ['']
    },
    'Contact': {
        component: Contact,
        subsections: ['']
    }
};