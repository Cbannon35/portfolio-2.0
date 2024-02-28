"use client"

import Link from "next/link";
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import About from './content/about';
import Experience from "./content/experience";
import Projects from "./content/projects";
import Teaching from "./content/teaching";
import Contact from "./content/contact";

import { resetURL, joinAndSetURL } from "../utils/browser-url";

const sections = ['About', 'Experience', 'Projects', 'Teaching', 'Contact'];

export default function HomePage() {

    /* Set url on scroll */
    useEffect(() => {
        const handleScroll = () => {

            const scrollTop = window.scrollY;
            let flag = false;

            for (let i = sections.length - 1; i >= 0; i--) {

                const section = document.getElementById(sections[i]);
                if (!section) return;
                const sectionTop = section.offsetTop;

                if (scrollTop >= sectionTop) {
                    joinAndSetURL(`#${sections[i]}`)
                    flag = true;
                    break;
                }
            }
        
            if (!flag) {
                resetURL(window.location.pathname);
            }
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
        window.removeEventListener('scroll', handleScroll);
        };
    }, []);

  return (
    <>
        <div id="About">
            <About />
        </div>
        <div id="Experience">
            <Experience />
        </div>
        <div id="Projects">
            <Projects />
        </div>
        <div id="Teaching">
            <Teaching />
        </div>
        <div id="Contact">
            <Contact />
        </div>
    </>
  );
}