"use client"

import Link from "next/link";
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import About from './content/about';
import Experience from "./content/experience";
import Projects from "./content/projects";
import Teaching from "./content/teaching";
import Contact from "./content/contact";

const sections = ['About', 'Experience', 'Projects', 'Teaching', 'Contact'];

export default function HomePage() {

    useEffect(() => {
        const handleScroll = () => {
            for (let i = 0; i < sections.length; i++) {
                const section = document.getElementById(sections[i]);
                if (!section) return;
                const scrollTop = window.scrollY;
                const sectionTop = section.offsetTop;
                if (scrollTop >= sectionTop) {
                    window.history.replaceState({}, '', `#${sections[i]}`);
                }
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