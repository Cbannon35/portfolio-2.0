"use client"

import { useEffect, useState } from 'react';
import { sections } from "./sections";
import { joinAndSetURL, resetURL } from "@/app/utils/browser-url";
import Controls from '../components/controls';
import Navbar from '../components/navbar';

const sectionsArray = Object.keys(sections);
const reversedSections = Object.keys(sections).reverse();

export default function HomePage() {
    const [prevSection, setPrevSection] = useState('');
    const [sectionPointer, setSectionPointer] = useState(-1);
    const [prevSubSection, setPrevSubSection] = useState('');
    const [subSectionPointer, setSubSectionPointer] = useState(0);
    const [scrolling, setScrolling] = useState(true); // used to prevent keyboard navigation while scrolling

    function incrementSectionPointer() {
        if (sectionPointer < sectionsArray.length - 1) {
            setSectionPointer(sectionPointer + 1);
            setSubSectionPointer(0);
        }
    }
    function decrementSectionPointer() {
        /* pointer can be -1 if we are at the top of the page... see navbar.js */
        if (sectionPointer > -1) {
            setSectionPointer(sectionPointer - 1);
            setSubSectionPointer(0);
        }
    }
    function incrementSubSectionPointer() {
        if (sectionPointer === -1) {
            incrementSectionPointer();
            return;
        }
        console.log(sections[sectionsArray[sectionPointer]])
        if (subSectionPointer < sections[sectionsArray[sectionPointer]].subsections.length - 1) {
            setSubSectionPointer(subSectionPointer + 1);
        } else {
            incrementSectionPointer();
        }
    }
    function decrementSubSectionPointer() {
        if (subSectionPointer > 0) {
            setSubSectionPointer(subSectionPointer - 1);
        } else {
            if (sectionPointer === -1) return;
            if (sectionPointer === 0) {
                setSectionPointer(-1);
                setSubSectionPointer(0);
            } else {
                decrementSectionPointer();
                setSubSectionPointer(sections[sectionsArray[sectionPointer - 1]].subsections.length - 1);
            }
        }
    }


    /* Set url on scroll */
    useEffect(() => {
        const handleScroll = () => {
            setScrolling(true);
            const scrollTop = window.scrollY;
            let activeSection = '';
            let activeSubSection = '';

            for (const section of reversedSections) {
                const sectionElem = document.getElementById(section);
                if (!sectionElem) continue;
                const sectionTop = sectionElem.offsetTop;

                if (scrollTop >= sectionTop) {
                    activeSection = section;

                    const subSections = sections[section].subsections;
                    for (const subSection of subSections) {
                        const subSectionElem = document.getElementById(section + '/' + subSection);
                        if (!subSectionElem) continue;
                        const subSectionTop = subSectionElem.offsetTop;

                        if (scrollTop >= subSectionTop) activeSubSection = subSection;
                        else break;
                    }
                    break;
                }
            }

            if (activeSection !== prevSection || activeSubSection !== prevSubSection) {
                setPrevSection(activeSection);
                setPrevSubSection(activeSubSection);
                setSectionPointer(sectionsArray.indexOf(activeSection));
                const url = activeSubSection ? `#${activeSection}/${activeSubSection}` : `#${activeSection}`;
                joinAndSetURL(url);
            } else if (!activeSection && (prevSection || prevSubSection)) {
                setPrevSection('');
                setPrevSubSection('');
                setSectionPointer(-1);
                setSubSectionPointer(0);
                resetURL(window.location.pathname);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [prevSection, prevSubSection]);

    return (
        <>
            <Navbar pointer={sectionPointer} scrolling={scrolling} />
            {Object.keys(sections).map((section, index) => {
                const Section = sections[section].component;
                return (
                    <div key={index} id={`${section}`}>
                        <Section prefix={section} />
                    </div>
                );
            })}
            <Controls {...{
                incrementSectionPointer,
                decrementSectionPointer,
                incrementSubSectionPointer,
                decrementSubSectionPointer,
                setScrolling
            }} />
        </>
    );
}