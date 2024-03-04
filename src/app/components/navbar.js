"use client"
import React, { useEffect } from 'react';
import TextBlock from './textblock';

import { sections } from '../home/sections';

const NavBar = ({ pointer, scrolling }) => {

    useEffect(() => {
        if (scrolling) return;

        if (pointer === -1) {
            window.scrollTo({ top: 0 });
            return;
        }
        const currentSection = Object.keys(sections)[pointer];
        const sectionElem = document.getElementById(currentSection);
        sectionElem.scrollIntoView({ block: 'start' });
    }, [pointer])

    return (
        <nav>
            <ul className='flex flex-row gap-2 fixed'>
                <li><TextBlock text='Home' active={pointer === -1} /></li>
                {Object.keys(sections).map((section, index) => {
                    return (
                        <li key={index}>
                            <TextBlock text={section} active={pointer === index} />
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
}

export default NavBar;