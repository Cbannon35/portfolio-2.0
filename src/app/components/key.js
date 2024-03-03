"use client"
import { useEffect, useState } from 'react';

const keyPressedClasses = "px-1 pb-1 pt-[.2rem] bg-white text-primary-blue"
const keyClasses = "p-1 border-t-[0.0625rem]"

export default function Key({ char, keyToListen, fn, mouseUp, setMouseUp }) {

    const [pressed, setPressed] = useState(false);
    useEffect(() => {
        if (mouseUp) setPressed(false);
    }, [mouseUp])

    return (
        <div className={`inline border-white border-b-[0.125rem] border-x-[0.0625rem] leading-[.85] cursor-pointer select-none ${pressed ? keyPressedClasses : keyClasses}`}
            onMouseDown={() => { setPressed(true); setMouseUp(false) }}
        >
            {char}
        </div>
    );
}