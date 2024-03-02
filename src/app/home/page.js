"use client"

import { useEffect, useState } from 'react';
import { sections } from "./sections";
import { joinAndSetURL, resetURL } from "@/app/utils/browser-url";

const reversedSections = Object.keys(sections).reverse();

export default function HomePage() {
    const [prevSection, setPrevSection] = useState('');
    const [prevSubSection, setPrevSubSection] = useState('');
   
    /* Set url on scroll */
    useEffect(() => {
        const handleScroll = () => {
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
                const url = activeSubSection ? `#${activeSection}/${activeSubSection}` : `#${activeSection}`;
                joinAndSetURL(url);
            } else if (!activeSection && (prevSection || prevSubSection)) {
                setPrevSection('');
                setPrevSubSection('');
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
        {Object.keys(sections).map((section, index) => {
            const Section = sections[section].component;
            return (
                <div key={index} id={`${section}`}>
                    <Section prefix={section} />
                </div>
            );
        })}
    </>
  );
}